using HRMS.Masters.Models;
using HRMS.Leave.Models;
using HRMS.Repositories;
using HRMS.Repositories.Masters;
using HRMS.Repositories.Upload;
using HRMS.Employee.Controller;
using HRMS.Repositories.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.IO;
using HRMS.Payroll.Model;
using HRMS.Employee.Models;
using HRMS.Skill.Models;
using HRMS.Payroll.Models;
using Microsoft.Win32;
using System.Threading.Tasks;
using System.Data;
using System.Data.OleDb;
using System.Text;
using log4net;
using System.Security.Cryptography;

namespace HRMS.Upload.Controllers
{
    public class ExcelUploadController : ApiController

    {
        static readonly IExcelUploadRepository repository = new ExcelUploadRepository();
        private readonly ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        [HttpPost]
        public List<String> AttachExcelFile()
        {
            //_logger.Info("a");
            // DataRow[] docfile = new DataRow();
            HttpResponseMessage result = null;
            string filePath = "";
            string returnPath = "";
            var docfiles = new List<String>();
            List<EmployeeModel> doc = new List<EmployeeModel>();

            string connString = "";
            DataTable DTB = new DataTable();
            //if (fileName != null)
            {
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                  //  _logger.Info("b");

                    foreach (string file in httpRequest.Files)
                    {
                      //  _logger.Info("c");
                        var postedFile = httpRequest.Files[file];
                        _logger.Info(postedFile.ContentType);
                        string extension = ConvertMimeTypeToExtension(postedFile.ContentType);
                        _logger.Info(extension);
                        var fileid = "{" + System.Guid.NewGuid() + "}"; //Storage Name
                        returnPath = "Documents/" + fileid + extension;
                        filePath = System.Web.HttpContext.Current.Server.MapPath("~/" + returnPath);
                        postedFile.SaveAs(filePath);
                        docfiles.Add(returnPath);
                        
                        //Connection String to Excel Workbook
                        if (extension.Trim() == ".xls")
                        {
                           // _logger.Info("d");
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + filePath + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                            // docfiles = ConvertXSLXtoDataTable(filePath, connString);

                        }
                        else if (extension.Trim() == ".xlsx")
                        {
                           // _logger.Info("e");
                            connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + filePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                            docfiles = ConvertXSLXtoDataTable(filePath, connString);

                        }


                    }

                    result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
                }
                else
                {
                    result = Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            return docfiles;
        }

        private static System.Collections.Concurrent.ConcurrentDictionary<string, string> MimeTypeToExtension = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();
        private static System.Collections.Concurrent.ConcurrentDictionary<string, string> ExtensionToMimeType = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();

        public  string ConvertMimeTypeToExtension(string mimeType)
        {
            try
            {
                
            if (string.IsNullOrWhiteSpace(mimeType))
                throw new ArgumentNullException("mimeType");

            string key = string.Format(@"MIME\Database\Content Type\{0}", mimeType);
            string result;
            if (MimeTypeToExtension.TryGetValue(key, out result))
                return result;
            
            RegistryKey regKey;
            object value;

            regKey = Registry.ClassesRoot.OpenSubKey(key, false);
                
            value = regKey != null ? regKey.GetValue("Extension", null) : null;
                
            result = value != null ? value.ToString() : string.Empty;
            MimeTypeToExtension[key] = result;

            return result;
            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message, ex);
                return "";
            }
        }


        public  List<String> ConvertXSLXtoDataTable(string strFilePath, string connString)
        {
           // _logger.Info("g");
            List<String> value = new List<String>();
            // List<string> Exceldata = new List<string>();
            List<EmployeeModel> modellist = new List<EmployeeModel>();
            var localconnString = connString;
            _logger.Info(localconnString);
            OleDbConnection oledbConn = new OleDbConnection(connString);
            DataTable dt = new DataTable();
            var Exceldata = new List<string>();
            object[] oo;
            List<Object> res;
            res = new List<Object>();

            try
            {

               // _logger.Info("h");
                oledbConn.Open();
               
                dt = oledbConn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
               // _logger.Info("hhh");
                if (dt == null)
                {
                 //   _logger.Info("i");
                    return null;
                }
               // _logger.Info("ss");
                String[] excelSheets = new String[dt.Rows.Count];
                int t = 0;
                //excel data saves in temp file here.
                foreach (DataRow row in dt.Rows)
                {
                   // _logger.Info("j");
                    excelSheets[t] = row["TABLE_NAME"].ToString();
                    t++;
                }
             
                OleDbConnection excelConnection1 = new OleDbConnection(connString);

                string query = string.Format("SELECT * FROM [{0}]", excelSheets[0]);

                OleDbCommand cmd = new OleDbCommand(query, oledbConn);
                //  res = doSelect(query, localconnString);
                //////excelConnection.Open();
                OleDbDataReader dReader;
                dReader = cmd.ExecuteReader();
             
                while (dReader.Read())
                {
                   // _logger.Info("k");
                    //oo = new Object[dReader.FieldCount];
                    //dReader.GetValues(oo);
                    //res.Add(oo);
                    EmployeeModel model = new EmployeeModel();
                    

                    model.Title_Name = (dReader[0] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[0]));
                    model.FirstName = (dReader[1] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[1]));
                    model.LastName = (dReader[2] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[2]));
                    model.MiddleName = (dReader[3] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[3]));
                    model.BirthDate = (dReader[4] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[4]));
                    model.Gender_Name = (dReader[5] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[5]));
                    model.Department_Name = (dReader[6] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[6]));
                    model.Designation_Name = (dReader[7] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[7]));
                    model.CountryName = (dReader[8] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[8]));
                    model.StateName = (dReader[9] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[9]));
                    model.LocationName = (dReader[10] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[10]));
                    model.Employee_No = (dReader[11] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[11]));
                    model.Status_Name = (dReader[12] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[12]));
                    model.UserName = (dReader[13] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[13]));

                    model.Password = (dReader[14] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[14]));
                    //Date_Of_Joining
                    model.Date_Of_Joining = (dReader[15] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[15]));
                    model.CompanyName = (dReader[16] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[16]));
                    model.SuffixName = (dReader[17] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[17]));
                    model.Citizenship_Name = (dReader[18] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[18]));
                    model.FullNamelist = (dReader[19] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[19]));

                    //2nd tab
                    model.Work_LocationName = (dReader[20] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[20]));
                    model.Grade_Name = (dReader[21] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[21]));
                    model.Branch_Name = (dReader[22] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[22]));
                    model.Marital_status_Name = (dReader[23] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[23]));
                    model.DivisionName = (dReader[24] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[24]));
                    model.SubDepartmentName = (dReader[25] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[25]));
                    model.ShortName = (dReader[26] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[26]));
                    model.Email1 = (dReader[27] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[27]));
                    model.Email2 = (dReader[28] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[28]));
                    model.PhoneNo_M1 = (dReader[29] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[29]));
                    model.PhoneNo_M2 = (dReader[30] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[30]));
                    model.Cell_No = (dReader[31] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[31]));
                    model.Date_Of_Confirmation = (dReader[32] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[32]));
                    model.Blood_Group = (dReader[33] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[33]));
                    model.EmpType_Name = (dReader[34] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[34]));
                    model.Emg_Contact_No = (dReader[35] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[35]));
                    model.Emg_Contact_Person = (dReader[36] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[36]));
                    model.Voter_Id = (dReader[37] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[37]));
                    model.PAN_No = (dReader[38] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[38]));
                    model.Aadhar_No = (dReader[39] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[39]));
                    model.ResidenceCountry = (dReader[40] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[40]));
                    model.AdditionalCountry_CitizenshipName = (dReader[41] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[41]));

                    //3rd tab

                    model.PermanentHouse_No = (dReader[42] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[42]));
                    model.PermanentStreetName1 = (dReader[43] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[43]));
                    model.PermanentStreetName2 = (dReader[44] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[44]));
                    model.PermanentStreetName3 = (dReader[45] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[45]));
                    model.Permanent_Attn_CO = (dReader[46] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[46]));
                    model.PermanentCountryName = (dReader[47] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[47]));
                    model.PermanentStateName = (dReader[48] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[48]));
                    model.PermanentCityName = (dReader[49] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[49]));
                    model.PermanentPinCode = (dReader[50] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[50]));
                    model.ShowPermanent_address = (dReader[51] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[51]));

                    model.Different_Address1 = (dReader[52] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[52]));
                    model.ShowPresent_address = (dReader[53] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[53]));
                    model.PresentHouse_No = (dReader[54] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[54]));
                    model.PresentStreetName1 = (dReader[55] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[55]));
                    model.PresentStreetName2 = (dReader[56] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[56]));
                    model.PresentStreetName3 = (dReader[57] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[57]));
                    model.Present_Attn_CO = (dReader[58] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[58]));
                    model.PresentCountryName = (dReader[59] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[59]));
                    model.PresentStateName = (dReader[60] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[60]));
                    model.PresentCityName = (dReader[61] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[61]));
                    model.PresentPinCode = (dReader[62] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[62]));

                    model.Different_Address2 = (dReader[63] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[63]));
                    model.Different_Address3 = (dReader[64] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[64]));
                    model.ShowAllEmployee = (dReader[65] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[65]));
                    model.CommunicationHouse_No = (dReader[66] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[66]));
                    model.CommunicationStreetName1 = (dReader[67] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[67]));
                    model.CommunicationStreetName2 = (dReader[68] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[68]));
                    model.CommunicationStreetName3 = (dReader[69] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[69]));
                    model.Communication_Attn_CO = (dReader[70] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[70]));
                    model.CommunicationCountryName = (dReader[71] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[71]));
                    model.CommunicationStateName = (dReader[72] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[72]));
                    model.CommunicationCityName = (dReader[73] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[73]));
                    model.CommunicationPinCode = (dReader[74] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[74]));

                    //4th tab

                    model.Bank_Acc_No = (dReader[75] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[75]));
                    model.Bank_Name = (dReader[76] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[76]));
                    model.Bank_Branch = (dReader[77] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[77]));
                    model.IFSC_Code = (dReader[78] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[78]));
                    model.PFApplicable = (dReader[79] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[79]));
                    model.ConsiderActual = (dReader[80] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[80]));
                    model.PF_Number = (dReader[81] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[81]));
                    model.TAN_Number = (dReader[82] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[82]));
                    model.ESIApplicable = (dReader[83] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[83]));
                    model.ESI_ConsiderActual = (dReader[84] == DBNull.Value ? Convert.ToBoolean(0) : Convert.ToBoolean(dReader[84]));
                    model.ESI_Number = (dReader[85] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[85]));
                    model.Member_Id = (dReader[86] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[86]));
                    model.EPF_DOJ = (dReader[87] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[87]));
                    model.EPF_DOE = (dReader[88] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[88]));
                    model.EPS_DOJ = (dReader[89] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[89]));
                    model.EPS_DOE = (dReader[90] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[90]));

                    //family and skill
                    model.Father_Name = (dReader[91] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[91]));
                    model.Mother_Name = (dReader[92] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[92]));
                    model.Spouse_Name = (dReader[93] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[93]));
                    model.Spouse_DOB = (dReader[94] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[94]));
                    model.No_of_Children = (dReader[95] == DBNull.Value ? Convert.ToInt32(0) : Convert.ToInt32(dReader[95]));
                    model.Anniversary_Date = (dReader[96] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[96]));
                    model.Education_Qualification = (dReader[97] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[97]));
                    model.Skills = (dReader[98] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[98]));
                    model.Experience_Years = (dReader[99] == DBNull.Value ? Convert.ToInt32(0) : Convert.ToInt32(dReader[99]));
                    model.Experience_Months = (dReader[100] == DBNull.Value ? Convert.ToInt32(0) : Convert.ToInt32(dReader[100]));
                    model.Document_Upload = (dReader[101] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[101]));
                    model.DocFileName = (dReader[102] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[102]));
                    model.DocFullpath = (dReader[103] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[103]));

                    model.Passport_Number = (dReader[104] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[104]));
                    model.Place_of_Issue = (dReader[105] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[105]));
                    model.Passport_Validity = (dReader[106] == DBNull.Value ? Convert.ToDateTime("01-Jan-1900 12:00:00 AM") : Convert.ToDateTime(dReader[106]));
                    model.Driving_License = (dReader[107] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[107]));
                    model.License_Issue_Authority = (dReader[108] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[108]));
                    model.Frequent_Flyer_No = (dReader[109] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[109]));
                    model.Flight_Preference = (dReader[110] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[110]));
                    model.Facebook_AC = (dReader[111] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[111]));
                    model.Linked_In = (dReader[112] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[112]));
                    model.Google_Plus = (dReader[113] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[113]));
                    model.GTalk = (dReader[114] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[114]));
                    model.Whatsapp = (dReader[115] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[115]));
                    model.Twitter_AC = (dReader[116] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[116]));
                    model.Others_1 = (dReader[117] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[117]));
                    model.Others_2 = (dReader[118] == DBNull.Value ? Convert.ToString(null) : Convert.ToString(dReader[118]));


               



                    if (model.Title_Name != "" && model.FirstName != "" && model.LastName != "" && model.MiddleName != "" && model.BirthDate != null &&
                       model.Gender_Name != "" && model.Department_Name != "" && model.Designation_Name != "" && model.CountryName != "" && model.StateName != "" &&
                       model.LocationName != "" && model.Employee_No != "" && model.Status_Name != "" && model.UserName != "" && model.Password != "" && model.Date_Of_Joining != null &&
                       model.CompanyName != "")
                    {
                      //  _logger.Info("l");
                        modellist.Add(model);
                    }     
               

                }
                dReader.Close();
                value = ErrorNull(modellist);

            }

            catch (Exception ex)
            {
               // _logger.Info("liiiiiiiiiiiiiiii");
                _logger.Error(ex.Message, ex);
                return null;
            }
            finally
            {

                oledbConn.Close();
            }

            return value;

        }

        
        [HttpGet]
        public  string Encrypt(string Password)
        {
          //  _logger.Info("m");
            EmployeeModel model = new EmployeeModel();
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(Password);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    Password = Convert.ToBase64String(ms.ToArray());
                }
            }
            return Password;
        }
        

        public List<String> ErrorNull(List<EmployeeModel> pList)
        {
           // _logger.Info("n");
            EmployeeModel model = new EmployeeModel();
            List<String> result = new List<String>();

            //string encryptPwd = Login.Controller.LoginController.Encrypt(pList.Password);
            //pList.Password = encryptPwd;
            //List<String> model = new List<String>();

            //List<EmployeeModel> iList = pList;
            var res = "";

            foreach (var i in pList)

            {

                //  _logger.Info("o");
                if (i.Title_Name == Convert.ToString("null"))
                {
                    res = " Title is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.FirstName == Convert.ToString("null"))
                {
                    res = " First Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.LastName == Convert.ToString("null"))
                {
                    res = " Last Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.MiddleName == Convert.ToString("null"))
                {
                    res = " Middle Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.BirthDate == Convert.ToDateTime("01-Jan-01 12:00:00 AM"))
                {
                    res = " Birth Date is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Gender_Name == Convert.ToString("null"))
                {
                    res = " Gender Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Department_Name == Convert.ToString("null"))
                {
                    res = " Department Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Designation_Name == Convert.ToString("null"))
                {
                    res = " Designation Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.CountryName == Convert.ToString("null"))
                {
                    res = " Country Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.StateName == Convert.ToString("null"))
                {
                    res = " State Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.LocationName == Convert.ToString("null"))
                {
                    res = " Location Name is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Employee_No == Convert.ToString("null"))
                {
                    res = " Employee Code is null for the Employee code " + i.Title_Name + " pls check and update file";
                    result.Add(res);
                }
                if (i.Status_Name == Convert.ToString("null"))
                {
                    res = " Status is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.UserName == Convert.ToString("null"))
                {
                    res = " Username is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Password == Convert.ToString("null"))
                {
                    res = " Password is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
                if (i.Date_Of_Joining == Convert.ToDateTime("01-Jan-01 12:00:00 AM"))
                {
                    res = " Date of Joining is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }
            }

            if (result.Count > 0)
            {
              //  _logger.Info("p");
                return result;
            }

            else
            {
               // _logger.Info("q");
                foreach (var i in pList)

                {
                 //   _logger.Info("r");
                    string encryptPwd = Login.Controller.LoginController.Encrypt(i.Password);
                    i.Password = encryptPwd;

                    
                }
                


                List<String> repositoryvalue;
                repositoryvalue = new List<string>();

                

                repositoryvalue = repository.ExcelUpload_Employee_AddEdit(pList);


                foreach (var i in repositoryvalue)
                {
                    // _logger.Info("s");

                    res = " File upload " + repositoryvalue.Count + " inserted successfully";
                    res = i.ToString();
                    result.Add(res);

                };

                return result;

                //repositoryvalue = repository.ExcelUpload_Employee_AddEdit(pList);

                //foreach (var i in repositoryvalue)
                //{
                //    res = i.ToString();
                //    result.Add(res);                 
                //}

                //return result;
            }

        }

        public List<Object> doSelect(string sql, string connString)
        {
           // _logger.Info("t");
            OleDbConnection oledbConn = new OleDbConnection(connString);
            OleDbCommand cmd = new OleDbCommand(sql, oledbConn);
            object[] oo;
            List<Object> res;
            res = new List<Object>();

            ////excelConnection.Open();
            OleDbDataReader dReader;
            dReader = cmd.ExecuteReader();
            while (dReader.Read())
            {
                oo = new Object[dReader.FieldCount];
                dReader.GetValues(oo);
                res.Add(oo);
            };
            dReader.Close();
            return res;
        }


        //[HttpPost]
        //public HttpResponseMessage Employee_AddEdit(EmployeeModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        int id = repository.ExcelUpload_Employee_AddEdit(model);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, id);
        //        return response;
        //    }
        //    else
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //    }
        //}


    }
}