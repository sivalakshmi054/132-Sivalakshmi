using HRMS.Masters.Models;
using HRMS.Leave.Models;
using HRMS.Repositories;
using HRMS.Repositories.Masters;
using HRMS.Repositories.Upload;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.IO;
using HRMS.Payroll.Model;
using HRMS.Skill.Models;
using HRMS.Payroll.Models;
using Microsoft.Win32;
using System.Threading.Tasks;
using System.Data;
using System.Data.OleDb;
using log4net;
using HRMS.Attendance.Models;

namespace HRMS.Upload.Controllers
{
    public class AttendanceUploadController : ApiController
    {
        static readonly IEmployeeAttendanceUploadRepository repository = new AttendanceUploadRepository();
        private readonly ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpPost]
        public List<String> AttachExcelFile()
        {
            // DataRow[] docfile = new DataRow();
            HttpResponseMessage result = null;
            string filePath = "";
            string returnPath = "";
            var docfiles = new List<String>();
            List<EmployeeAttendanceModel> doc = new List<EmployeeAttendanceModel>();
               try
            {
                if (_logger.IsInfoEnabled)
                    _logger.Info("Controller");
            string connString = "";
            DataTable DTB = new DataTable();
            //if (fileName != null)
            {
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {

                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        string extension = ConvertMimeTypeToExtension(postedFile.ContentType);
                        var fileid = "{" + System.Guid.NewGuid() + "}"; //Storage Name
                        returnPath = "Documents/" + fileid + extension;
                        filePath = System.Web.HttpContext.Current.Server.MapPath("~/" + returnPath);
                        postedFile.SaveAs(filePath);
                        docfiles.Add(returnPath);

                        //Connection String to Excel Workbook
                        if (extension.Trim() == ".xls")
                        {
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + filePath + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                            // docfiles = ConvertXSLXtoDataTable(filePath, connString);

                        }
                        else if (extension.Trim() == ".xlsx")
                        {
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
               catch (Exception ex)
               {
                   _logger.Error(ex.Message, ex);
                   return null;
               }
        }

        private static System.Collections.Concurrent.ConcurrentDictionary<string, string> MimeTypeToExtension = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();
        private static System.Collections.Concurrent.ConcurrentDictionary<string, string> ExtensionToMimeType = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();

        public static string ConvertMimeTypeToExtension(string mimeType)
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

        public static List<String> ConvertXSLXtoDataTable(string strFilePath, string connString)
        {
            List<String> value = new List<String>();
            // List<string> Exceldata = new List<string>();
            List<EmployeeAttendanceModel> modellist = new List<EmployeeAttendanceModel>();

            var localconnString = connString;
            OleDbConnection oledbConn = new OleDbConnection(connString);
            DataTable dt = new DataTable();
            var Exceldata = new List<string>();
            object[] oo;
            List<Object> res;
            res = new List<Object>();
            try
            {

                oledbConn.Open();
                dt = oledbConn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                if (dt == null)
                {
                    return null;
                }

                String[] excelSheets = new String[dt.Rows.Count];
                int t = 0;
                //excel data saves in temp file here.
                foreach (DataRow row in dt.Rows)
                {
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

                    //oo = new Object[dReader.FieldCount];
                    //dReader.GetValues(oo);
                    //res.Add(oo);
                    EmployeeAttendanceModel model = new EmployeeAttendanceModel();

                    model.Employee_No = (dReader[0] == DBNull.Value ? Convert.ToString("null") : Convert.ToString(dReader[0]));                   
                    model.FullName = Convert.ToString(dReader[1]); 
                    model.StartTime = (dReader[2] == DBNull.Value ? Convert.ToDateTime("12:00:00 AM").TimeOfDay: Convert.ToDateTime(dReader[2]).TimeOfDay);
                    model.EndTime = (dReader[3] == DBNull.Value ? Convert.ToDateTime("12:00:00 AM").TimeOfDay : Convert.ToDateTime(dReader[3]).TimeOfDay);
                    model.Attendance_Date = (dReader[4] == DBNull.Value ? Convert.ToDateTime("01-Jan-01 12:00:00 AM") : Convert.ToDateTime(dReader[4]));
                    //model.StartTime = (dReader[3] ==  DBNull.Value ? Convert.ToDateTime("12:00:00 AM") : Convert.ToDateTime(dReader[3]));
                    //model.EndTime = (dReader[4] == DBNull.Value ? Convert.ToDateTime("12:00:00 AM") : Convert.ToDateTime(dReader[4])); 
                    //model.EndTime = Convert.ToDateTime(dReader[3] == DBNull.Value ? Convert.ToDateTime("01-Jan-01 12:00:00 AM") : Convert.ToDateTime(dReader[3]));
                    //model.StartTime = (dReader[2] == DBNull.Value ? Convert.ToDateTime("01-Jan-01 12:00:00 AM") : Convert.ToDateTime(dReader[2]));
                    //model.EndTime = (dReader[3] == DBNull.Value ? Convert.ToDateTime("01-Jan-01 12:00:00 AM") : Convert.ToDateTime(dReader[3]));                


                    if (model.Employee_No != "" && model.Attendance_Date != null && model.StartTime != null && model.EndTime != null)
                    {

                        modellist.Add(model);
                    }


                }

                dReader.Close();
                value = ErrorNull(modellist);

            }

            catch
            {
            }
            finally
            {

                oledbConn.Close();
            }

            return value;

        }

        public static List<String> ErrorNull(List<EmployeeAttendanceModel> pList)
        {
            EmployeeAttendanceModel model = new EmployeeAttendanceModel();
            List<String> result = new List<String>();

            //List<EmployeeModel> iList = pList;
            var res = "";

            foreach (var i in pList)
            {

                if (i.Employee_No == Convert.ToString("null"))
                {
                    res = " Employee Code is null for the Employee code " + i.Employee_No + "   pls check and update file";
                    result.Add(res);
                }
                if (i.Attendance_Date == Convert.ToDateTime("01-Jan-01 12:00:00 AM"))
                {
                    res = " Attendance Date is null for the Employee code " + i.Employee_No + "  pls check and update file";
                    result.Add(res);
                }

                if (i.StartTime == Convert.ToDateTime("12:00:00 AM").TimeOfDay)
                {
                    res = " Start Time is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
               }

                if (i.EndTime == Convert.ToDateTime("12:00:00 AM").TimeOfDay)
               {
                    res = " End Time is null for the Employee code " + i.Employee_No + " pls check and update file";
                    result.Add(res);
                }

            }
            if (result.Count > 0)
            {
                return result;
            }
            else
            {
                int repositoryvalue = repository.AttendanceUpload_Employee_AddEdit(pList);

                if (repositoryvalue != 0)
                {
                    res = "File upload and " + repositoryvalue + " records inserted successfully";
                    result.Add(res);
                }
                return result;
            }


        }

        public static List<Object> doSelect(string sql, string connString)
        {

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