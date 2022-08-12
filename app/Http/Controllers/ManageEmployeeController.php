<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;

use SchoolManagement\Http\Requests;
use DB;
use SchoolManagement\Models\ManageEmployeeModel;

class ManageEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $ListData =
        DB::table('manageemployee')
        ->leftjoin('titlemaster as tm', 'manageemployee.titleid', '=', 'tm.id')
        ->leftjoin('gendermaster as gm', 'manageemployee.genderid', '=', 'gm.id')
        ->leftjoin('employeetypemaster as et', 'manageemployee.employeetypeid', '=', 'et.id')
        ->leftjoin('designationmaster as dm', 'manageemployee.designationid', '=', 'dm.id')
        ->leftjoin('specificationmaster as sm', 'manageemployee.specificationid', '=', 'sm.id')
        ->leftjoin('maritalstatusmaster as ms', 'manageemployee.maritalstatusid', '=', 'ms.id')
        ->leftjoin('religionmaster as rm', 'manageemployee.religionid', '=', 'rm.id')
        ->leftjoin('departmentmaster as d', 'manageemployee.departmentid', '=', 'd.id')
        ->leftjoin('bloodgroupmaster as bg', 'manageemployee.bloodgroupid', '=', 'bg.id')
        ->leftjoin('statemaster as s', 'manageemployee.stateid', '=', 's.id')
        ->leftjoin('countrymaster as cm', 'manageemployee.countryid', '=', 'cm.id')
        ->leftjoin('bankmaster as bm', 'manageemployee.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as b', 'manageemployee.branchnameid', '=', 'b.id')
        // ->leftjoin('locationmaster as lm', 'manageemployee.locationnameid', '=', 'lm.id')        

        ->select('manageemployee.id','manageemployee.titleid','tm.title','manageemployee.emp_employeenumber','manageemployee.firstname','manageemployee.lastname','manageemployee.employeename','manageemployee.employeenumber','manageemployee.employeephoto','manageemployee.photoname','manageemployee.photofullpath',
        'manageemployee.fathername','manageemployee.mothername',
         'manageemployee.genderid','gm.gender','manageemployee.dob','manageemployee.doj','manageemployee.employeetypeid','et.employeetype','manageemployee.experience_years','manageemployee.experience_months','manageemployee.designationid','dm.designation','manageemployee.specificationid','sm.specification','manageemployee.departmentid','d.departmentname','manageemployee.maritalstatusid','ms.maritalstatus','manageemployee.religionid','rm.religion','manageemployee.bloodgroupid','bg.bloodgroup','manageemployee.ssn_uid_no','manageemployee.email','manageemployee.mobile','manageemployee.lastorganization','manageemployee.othersdesignation','manageemployee.othersqualification','manageemployee.yearofpassedout','manageemployee.collegeduniv','manageemployee.percentage','manageemployee.houseno','manageemployee.town','manageemployee.district','manageemployee.stateid','s.statename','manageemployee.pincode','manageemployee.countryid','cm.countryname','manageemployee.pan_no','manageemployee.bankaccno','manageemployee.pf_accno','manageemployee.esi_accno','manageemployee.banknameid','bm.bankname','manageemployee.branchnameid','b.branchname','manageemployee.drivinglicenseno','manageemployee.passportnumber','manageemployee.ifsc_code','manageemployee.aadharno','manageemployee.micr_no','manageemployee.isactive')
         
        ->get();
        return $ListData;
    }


    public function search(Request $request)
     {
        $Id=$request['Id']!== 0 ? $request['Id'] : 0;
        $DepartmentId = $request['DepartmentId']!== 0 ? $request['DepartmentId'] : 0;
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;

        $ListData =
        DB::table('manageemployee')
        ->leftjoin('titlemaster as tm', 'manageemployee.titleid', '=', 'tm.id')
        ->leftjoin('gendermaster as gm', 'manageemployee.genderid', '=', 'gm.id')
        ->leftjoin('employeetypemaster as et', 'manageemployee.employeetypeid', '=', 'et.id')
        ->leftjoin('designationmaster as dm', 'manageemployee.designationid', '=', 'dm.id')
        ->leftjoin('specificationmaster as sm', 'manageemployee.specificationid', '=', 'sm.id')
        ->leftjoin('maritalstatusmaster as ms', 'manageemployee.maritalstatusid', '=', 'ms.id')
        ->leftjoin('religionmaster as rm', 'manageemployee.religionid', '=', 'rm.id')
        ->leftjoin('departmentmaster as d', 'manageemployee.departmentid', '=', 'd.id')
        ->leftjoin('bloodgroupmaster as bg', 'manageemployee.bloodgroupid', '=', 'bg.id')
        ->leftjoin('statemaster as s', 'manageemployee.stateid', '=', 's.id')
        ->leftjoin('countrymaster as cm', 'manageemployee.countryid', '=', 'cm.id')
        ->leftjoin('bankmaster as bm', 'manageemployee.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as b', 'manageemployee.branchnameid', '=', 'b.id')
        ->leftjoin('qualificationmaster as qm', 'manageemployee.qualificationid', '=', 'qm.id')

        ->select('manageemployee.id','manageemployee.titleid','tm.title',
        'manageemployee.firstname','manageemployee.lastname','manageemployee.employeename','manageemployee.emp_employeenumber',
        'manageemployee.employeenumber','manageemployee.employeephoto','manageemployee.photoname','manageemployee.photofullpath',
        'manageemployee.fathername','manageemployee.mothername',
         'manageemployee.genderid','gm.gender','manageemployee.dob','manageemployee.doj',
         'manageemployee.employeetypeid','et.employeetype','manageemployee.experience_years',
         'manageemployee.experience_months','manageemployee.designationid','dm.designation',
         'manageemployee.specificationid','sm.specification','manageemployee.departmentid',
         'd.departmentname','manageemployee.maritalstatusid','ms.maritalstatus','manageemployee.religionid',
         'rm.religion','manageemployee.bloodgroupid','bg.bloodgroup','manageemployee.ssn_uid_no',
         'manageemployee.email','manageemployee.mobile','manageemployee.lastorganization',
         'manageemployee.othersdesignation','manageemployee.othersqualification',
         'manageemployee.yearofpassedout','manageemployee.collegeduniv','manageemployee.percentage',
         'manageemployee.houseno','manageemployee.town','manageemployee.district','manageemployee.stateid',
         's.statename','manageemployee.pincode','manageemployee.countryid','cm.countryname','manageemployee.pan_no',
         'manageemployee.bankaccno','manageemployee.pf_accno','manageemployee.esi_accno','manageemployee.banknameid',
         'bm.bankname','manageemployee.branchnameid','b.branchname','manageemployee.drivinglicenseno',
         'manageemployee.passportnumber','manageemployee.ifsc_code','manageemployee.aadharno','manageemployee.qualificationid',
         'qm.qualification','manageemployee.micr_no','manageemployee.isactive','manageemployee.resignationdate')
         ->whereraw("
         (manageemployee.id = '$Id' or ifnull('$Id',0)=0) and
         (manageemployee.departmentid = '$DepartmentId' or ifnull('$DepartmentId',0)=0) and
         (manageemployee.isactive = '$IsActive' or ifnull('$IsActive',-1)=-1) 
         ")
        ->get();
        return $ListData;
     }


    public function addEmployee(Request $request)
    {
        $dob=date('Y-m-d', strtotime($request['DOB']));
        $doj=date('Y-m-d', strtotime($request['DOJ']));

        $LastWorkingDay=date('Y-m-d', strtotime($request['LastWorkingDay']));
        $PaymentDate=date('Y-m-d', strtotime($request['PaymentDate']));

        $GradeId=$request['GradeId'] !== null ? $request['GradeId'] : 0;

        $EmployeeName=$request['FirstName']." ".$request['LastName'];

        $data = ['id'=>$request['Id'],'titleid'=>$request['TitleId'],
        'emp_employeenumber'=>$request['Emp_EmployeeNumber'],
        'firstname'=>$request['FirstName'],'lastname'=>$request['LastName'],'employeename'=>$EmployeeName,'employeenumber'=>$request['EmployeeNumber'],'employeephoto'=>$request['EmployeePhoto'],'photoname'=>$request['PhotoName'],'photofullpath'=>$request['PhotoFullPath'],'fathername'=>$request['FatherName'],'MotherName'=>$request['MotherName'],'genderid'=>$request['GenderId'],'dob'=>$dob,'doj'=>$doj,'employeetypeid'=>$request['EmployeeTypeId'],'experience_years'=>$request['Experience_Years'],'experience_months'=>$request['Experience_Months'],'designationid'=>$request['DesignationId'],'specificationid'=>$request['SpecificationId'],'departmentid'=>$request['DepartmentId'],
        'gradeid'=>$GradeId,
        'maritalstatusid'=>$request['MaritalStatusId'],
        'qualificationid'=>$request['QualificationId'],
        'reporting_to'=>$request['Reporting_To'],
        'relieveresontypeid'=>$request['RelieveResonTypeId'],
        'resignationdate'=>$request['ResignationDate'],
        'noitceperiod'=>$request['NoitcePeriod'],
        'leavingreason'=>$request['LeavingReason'],
        'lastworkingday'=>$request['LastWorkingDay'],
        'paymentdate'=>$request['PaymentDate'],
        'remarks'=>$request['Remarks'],
        'fb_ac'=>$request['FB_AC'],
        'linked_in'=>$request['Linked_In'],
        'googleplus'=>$request['Googleplus'],
        'gtalk'=>$request['GTalk'],
        'whatsapp'=>$request['Whatsapp'],
        'twitter'=>$request['Twitter'],
        'others1'=>$request['Others1'],
        'others2'=>$request['Others2'],
        'address1'=>$request['Address1'],
        'address2'=>$request['Address2'],
        'collegeinstitutionid'=>$request['collegeinstitution'],
        'institution_id'=>$request['institution'],
        'religionid'=>$request['ReligionId'],'bloodgroupid'=>$request['BloodGroupId'],'ssn_uid_no'=>$request['SSN_UID_No'],'email'=>$request['Email'],'mobile'=>$request['Mobile'],'lastorganization'=>$request['LastOrganization'],'othersdesignation'=>$request['OthersDesignation'],'othersqualification'=>$request['OthersQualification'],'yearofpassedout'=>$request['YearOfPassedOut'],'collegeduniv'=>$request['CollegedUniv'],'percentage'=>$request['Percentage'],'houseno'=>$request['HouseNo'],'town'=>$request['Town'],'locationnameid'=>$request['LocationNameId'],'district'=>$request['District'],'stateid'=>$request['StateId'],'pincode'=>$request['PinCode'],'countryid'=>$request['CountryId'],'pan_no'=>$request['PAN_No'],'bankaccno'=>$request['BankACCNo'],'pf_accno'=>$request['PF_ACCNo'],'esi_accno'=>$request['ESI_ACCNo'],'banknameid'=>$request['BankNameId'],'branchnameid'=>$request['BranchNameId'],'drivinglicenseno'=>$request['DrivingLicenseNo'],'ifsc_code'=>$request['IFSC_Code'],'passportnumber'=>$request['PassportNumber'],'aadharno'=>$request['AadharNo'],'micr_no'=>$request['MICR_No']];
		
		if($request['Id']==0)
		{
           
            $data['UserName']=$request['Emp_EmployeeNumber'];
            $data['Password']= base64_encode($request['Emp_EmployeeNumber']);
        
          $insert = DB::table('manageemployee')->insertGetId($data);
          
                if($insert == true)
                    {
                        return $insert;
                    }else
                    {
                        return 0;
                    }
            }
            else
            {
                
            $data['UserName']=$request['Emp_EmployeeNumber'];
            $data['Password']=base64_encode($request['Emp_EmployeeNumber']);
        
                 $update = DB::table('manageemployee')->where('id', $request['Id'])->update($data);
                
                      return $request['Id'];
                
            }
        
    }

       

      
    public function addEmployee_PreviousDetails(Request $request)
     {
      
        $StartDate = $request['StartDate'] !== null ? date('Y-m-d', strtotime($request['StartDate'])) : null;
        $EndDate = $request['EndDate'] !== null ? date('Y-m-d', strtotime($request['EndDate'])) : null;
        //$EndDate=date('Y-m-d', strtotime($request['EndDate']));

        $data = ['id'=>$request['Id'],
        'employeeid'=>$request['EmployeeId'],
        'companyname'=>$request['CompanyName'],
        'companyaddress'=>$request['CompanyAddress'],
        'startdate'=>$StartDate,
        'enddate'=>$EndDate,
        'skills_utilized'=>$request['Skills_Utilized'],
        'primaryresponsibility'=>$request['PrimaryResponsibility']];
		
		// return $data;
        
		 if($request['Id']==0)
		{
        $insert = DB::table('employee_previousexperience')->insertGetId($data);
			if($insert == true)
				{
					return $insert;
				}else
				{
					return 0;
				}
		}
		else
		{
          $update = DB::table('employee_previousexperience')->where('id', $request['Id'])->update($data);
          return $request['Id'];
            
		 } 
      }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function listall()
     {
        $ListData =
        DB::table('manageemployee')
        ->leftjoin('titlemaster as tm', 'manageemployee.titleid', '=', 'tm.id')
        ->leftjoin('gendermaster as gm', 'manageemployee.genderid', '=', 'gm.id')
        ->leftjoin('employeetypemaster as et', 'manageemployee.employeetypeid', '=', 'et.id')
        ->leftjoin('designationmaster as dm', 'manageemployee.designationid', '=', 'dm.id')
        ->leftjoin('departmentmaster as d', 'manageemployee.departmentid', '=', 'd.id')
        ->leftjoin('specificationmaster as sm', 'manageemployee.specificationid', '=', 'sm.id')
        ->leftjoin('maritalstatusmaster as ms', 'manageemployee.maritalstatusid', '=', 'ms.id')
        ->leftjoin('religionmaster as rm', 'manageemployee.religionid', '=', 'rm.id')
        ->leftjoin('bloodgroupmaster as bg', 'manageemployee.bloodgroupid', '=', 'bg.id')
        ->leftjoin('statemaster as s', 'manageemployee.stateid', '=', 's.id')
        ->leftjoin('countrymaster as cm', 'manageemployee.countryid', '=', 'cm.id')
        ->leftjoin('bankmaster as bm', 'manageemployee.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as b', 'manageemployee.branchnameid', '=', 'b.id')
        ->leftjoin('locationmaster as lm', 'manageemployee.locationnameid', '=', 'lm.id') 
 

        ->select('manageemployee.id','manageemployee.titleid','tm.title as title','manageemployee.emp_employeenumber','manageemployee.firstname','manageemployee.lastname','manageemployee.employeename','manageemployee.employeenumber','manageemployee.employeephoto','manageemployee.photoname','manageemployee.photofullpath',
        'manageemployee.fathername','manageemployee.mothername',
         'manageemployee.genderid','gm.gender','manageemployee.dob','manageemployee.doj','manageemployee.employeetypeid','et.employeetype','manageemployee.experience_years','manageemployee.experience_months','manageemployee.designationid','dm.designation','manageemployee.specificationid','sm.specification','manageemployee.departmentid','d.departmentname','manageemployee.maritalstatusid','ms.maritalstatus','manageemployee.religionid','rm.religion','manageemployee.bloodgroupid','bg.bloodgroup','manageemployee.ssn_uid_no','manageemployee.email','manageemployee.mobile','manageemployee.lastorganization','manageemployee.othersdesignation','manageemployee.othersqualification','manageemployee.yearofpassedout','manageemployee.collegeduniv','manageemployee.percentage','manageemployee.houseno','manageemployee.town','manageemployee.locationnameid','lm.locationname','manageemployee.district','manageemployee.stateid','s.statename','manageemployee.pincode','manageemployee.countryid','cm.countryname','manageemployee.pan_no','manageemployee.bankaccno','manageemployee.pf_accno','manageemployee.esi_accno','manageemployee.banknameid','bm.bankname','manageemployee.branchnameid','b.branchname','manageemployee.drivinglicenseno','manageemployee.passportnumber','manageemployee.ifsc_code','manageemployee.aadharno','manageemployee.micr_no','manageemployee.isactive')
        ->get();
        return $ListData;
    }

    public function upload(Request $request)
    {
        if($request->hasFile('file'))
        {
            $imageFileType = strtolower(pathinfo($request->file('file'),PATHINFO_EXTENSION));
            //dd($imageFileType);
            $storagePath  = public_path('Uploads\\');
            $filename = $request->file('file') ->store('/Images');               
            //To split filename and file directory
            
            $var = preg_split("#/#", $filename); 
            
            $filenameExt = $var[1];
            $filedata = ['DirectoryPath'=>$storagePath,
            'Filepath'=>"Images/".$var[1],
            'Filename'=>$filenameExt
        ];
        return $filedata;
        }
         
        return 0;
    }


    public function list(Request $request)
    {
        $id = $request['Id'];
        $ListData =
        DB::table('manageemployee')
        ->leftjoin('titlemaster as tm', 'manageemployee.titleid', '=', 'tm.id')
        ->leftjoin('gendermaster as gm', 'manageemployee.genderid', '=', 'gm.id')
        ->leftjoin('employeetypemaster as et', 'manageemployee.employeetypeid', '=', 'et.id')
        ->leftjoin('designationmaster as dm', 'manageemployee.designationid', '=', 'dm.id')
        ->leftjoin('departmentmaster as d', 'manageemployee.departmentid', '=', 'd.id')
        ->leftjoin('specificationmaster as sm', 'manageemployee.specificationid', '=', 'sm.id')
        ->leftjoin('maritalstatusmaster as ms', 'manageemployee.maritalstatusid', '=', 'ms.id')
        ->leftjoin('religionmaster as rm', 'manageemployee.religionid', '=', 'rm.id')
        ->leftjoin('bloodgroupmaster as bg', 'manageemployee.bloodgroupid', '=', 'bg.id')
        ->leftjoin('statemaster as s', 'manageemployee.stateid', '=', 's.id')
        ->leftjoin('countrymaster as cm', 'manageemployee.countryid', '=', 'cm.id')
        ->leftjoin('bankmaster as bm', 'manageemployee.banknameid', '=', 'bm.id')
        ->leftjoin('branchmaster as b', 'manageemployee.branchnameid', '=', 'b.id')
        ->leftjoin('locationmaster as lm', 'manageemployee.locationnameid', '=', 'lm.id') 
        ->leftjoin('employeegrade as eg', 'manageemployee.gradeid', '=', 'eg.id') 
        ->leftjoin('qualificationmaster as qm', 'manageemployee.qualificationid', '=', 'qm.id')
        ->leftjoin('manageemployee as edm', 'manageemployee.reporting_to', '=', 'edm.id') 
        ->leftjoin('studentinstitution as cim', 'manageemployee.collegeinstitutionid', '=', 'cim.id') 
        ->select('manageemployee.id',
        'manageemployee.emp_employeenumber',
        'manageemployee.titleid','tm.title','manageemployee.firstname',
        'manageemployee.lastname','manageemployee.employeename',
        'manageemployee.employeenumber','manageemployee.employeephoto',
        'manageemployee.photoname','manageemployee.photofullpath',
        'manageemployee.fathername','manageemployee.mothername',
         'manageemployee.genderid','gm.gender','manageemployee.dob',
         'manageemployee.doj','manageemployee.collegeinstitutionid','cim.institutionname',
         'manageemployee.employeetypeid','et.employeetype','manageemployee.experience_years',
         'manageemployee.experience_months','manageemployee.designationid','dm.designation',
         'manageemployee.specificationid','sm.specification','manageemployee.departmentid',
         'd.departmentname','manageemployee.maritalstatusid','ms.maritalstatus',
         'manageemployee.religionid','rm.religion','manageemployee.bloodgroupid',
         'bg.bloodgroup','manageemployee.ssn_uid_no','manageemployee.email',
         'manageemployee.mobile','manageemployee.lastorganization',
         'manageemployee.othersdesignation',
         'qm.qualification','manageemployee.qualificationid',
         'manageemployee.relieveresontypeid',
         'manageemployee.resignationdate',
         'manageemployee.noitceperiod',
         'manageemployee.leavingreason',
         'manageemployee.lastworkingday',
         'manageemployee.paymentdate',
         'manageemployee.remarks',
         'manageemployee.fb_ac',
         'manageemployee.linked_in',
         'manageemployee.googleplus',
         'manageemployee.gtalk',
         'manageemployee.whatsapp',
         'manageemployee.twitter',
        'manageemployee.others1',
        'manageemployee.others2',
        'manageemployee.address1',
        'manageemployee.address2',
         'manageemployee.yearofpassedout','manageemployee.collegeduniv',
         'manageemployee.percentage','manageemployee.houseno','manageemployee.town',
         'manageemployee.locationnameid','lm.locationname','manageemployee.district',
         'manageemployee.stateid','s.statename','manageemployee.pincode','manageemployee.countryid',
         'cm.countryname','manageemployee.pan_no','manageemployee.bankaccno','manageemployee.pf_accno',
         'manageemployee.esi_accno','manageemployee.banknameid','bm.bankname','manageemployee.branchnameid',
         'b.branchname','manageemployee.drivinglicenseno','manageemployee.passportnumber','manageemployee.ifsc_code',
         'manageemployee.aadharno','manageemployee.micr_no','manageemployee.isactive','manageemployee.gradeid','eg.gradename',
         'edm.id as empid', DB::raw('concat("(" , edm.employeenumber, ")", " " ,"-", edm.employeename) as employee'),
         'manageemployee.resignationdate'
         )
        ->where('manageemployee.id', $id)
        ->get();
       // dd($ListData);
        return $ListData;
    }

    public function EmployeePreviousExperience_View(Request $request)
    {
       // dd($request);
       $Id = $request['Id'];
       //dd($id);
       $StartDate = $request['StartDate'] !== null ? date('Y-m-d', strtotime($request['StartDate'])) : null;
       $EndDate = $request['EndDate'] !== null ? date('Y-m-d', strtotime($request['EndDate'])) : null;
       $ListData =
       DB::table('employee_previousexperience as epe' )
       ->leftjoin('manageemployee as em', 'epe.employeeid', '=', 'em.id')
      
       ->select('em.id',
       'epe.id as childid',
       'epe.employeeid',
       'epe.companyname',
       'epe.companyaddress',
       'epe.startdate',
       'epe.enddate',
       'epe.skills_utilized',
       'epe.primaryresponsibility',
       'epe.isactive')
       ->where('epe.employeeid',$Id)
     
       ->get();
    //    dd($ListData);
       return $ListData;
    }
      
    public function update_Enquirystatus(Request $request)  
    {         

        $Id = $request['Id'];
        $StatusId =$request['StatusId'];
        //dd($StatusId);
        $active = DB::table('manageenquiry')->where('id', $Id)->update(['statusid'=> $StatusId]);
        
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
     } 



      public function inactive(Request $request)  {
        $id = $request['Id'];
        $inactive = DB::table('manageemployee')->where('id', $id)->update(['isactive'=>'0']);
        if($inactive == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
       }   
      
    public function active(Request $request)  {          
        $id = $request['Id'];
        $active = DB::table('manageemployee')->where('id', $id)->update(['isactive'=>'1']);
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
     } 

    public function WorkflowStatusemployee(Request $request)  
    {     
        $EnquiryNumber = $request['EnquiryNumber']!== null ? $request['EnquiryNumber'] : "";
        $CandidateName = $request['CandidateName']!== null ? $request['CandidateName'] : "";     
        $PositionAppliedId = $request['PositionAppliedId']!== 0 ? $request['PositionAppliedId'] : 0;
        $QualificationId = $request['QualificationId']!== 0 ? $request['QualificationId'] : 0;
        $EmployeeCategoryId = $request['EmployeeCategoryId']!== 0 ? $request['EmployeeCategoryId'] : 0;
        $GenderId = $request['GenderId']!== 0 ? $request['GenderId'] : 0;
        $SpecificationId = $request['SpecificationId']!== 0 ? $request['SpecificationId'] : 0;
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
     
        $ListData =
        DB::table('manageenquiry')

        ->leftjoin('gendermaster as gm', 'manageenquiry.genderid', '=', 'gm.id')
        ->leftjoin('qualificationmaster as qm', 'manageenquiry.qualificationid', '=', 'qm.id')
        ->leftjoin('designationmaster as dm', 'manageenquiry.positionappliedid', '=', 'dm.id')
        ->leftjoin('specificationmaster as sp', 'manageenquiry.specificationid', '=', 'sp.id')
        ->leftjoin('statusmaster as sm', 'manageenquiry.statusid', '=', 'sm.id')
        ->leftjoin('idtype as it', 'manageenquiry.employeecategoryid', '=', 'it.id')
        ->leftjoin('titlemaster as tm', 'manageenquiry.titleid', '=', 'tm.id')
        ->leftjoin('maritalstatusmaster as ms', 'manageenquiry.maritalstatusid', '=', 'ms.id')
        ->leftjoin('statemaster as s', 'manageenquiry.stateid', '=', 's.id')
        ->leftjoin('countrymaster as cm', 'manageenquiry.countryid', '=', 'cm.id')
        ->leftjoin('locationmaster as lm', 'manageenquiry.locationid', '=', 'lm.id')
        
        ->leftjoin('referencetypemaster as rt', 'manageenquiry.referencetypeid', '=', 'rt.id')
        
       
        ->select('manageenquiry.id',
        'manageenquiry.enquirynumber',
        'manageenquiry.enquirydate',
        'manageenquiry.titleid','tm.title',
        'manageenquiry.candidatephoto','manageenquiry.photoname',
        'manageenquiry.photofullpath',
        'manageenquiry.firstname',
        'manageenquiry.middlename',
        'manageenquiry.lastname',
        'manageenquiry.candidatename',
        'manageenquiry.age',
       
        'manageenquiry.dob',
        'manageenquiry.genderid','gm.gender',
        'manageenquiry.maritalstatusid','ms.maritalstatus',
        'manageenquiry.fathername',
        'manageenquiry.mothername',
        'manageenquiry.doj',
        'manageenquiry.email',
        'manageenquiry.contactnumber',
        'manageenquiry.alternatecontactnumber',
        'manageenquiry.whatsappnumber',
        'manageenquiry.qualificationid','qm.qualification',
        'manageenquiry.positionappliedid','dm.designation as positionapplied',
        'manageenquiry.specificationid','sp.specification',

        'manageenquiry.totexperience_years',
        'manageenquiry.totexperience_months',
        'manageenquiry.relaventexp_years',
        'manageenquiry.relavantexp_months',
        'manageenquiry.address1',
        'manageenquiry.address2',

        'manageenquiry.stateid','s.statename',
        'manageenquiry.locationid','lm.locationname','manageenquiry.countryid','cm.countryname',
        'manageenquiry.pincode',

        'manageenquiry.statusid', 'sm.status',
        'manageenquiry.referencetypeid','rt.referencetype',
        'manageenquiry.referencename',
        'manageenquiry.reference_contactno',
        'manageenquiry.physicallychallenged',
        'manageenquiry.phy_chalengedtype',
        'manageenquiry.remarks',
        'manageenquiry.employeecategoryid','it.idtype as employeecategory',
        'manageenquiry.isactive')
        ->whereraw("(manageenquiry.positionappliedid = '$PositionAppliedId' or ifnull('$PositionAppliedId',0)=0) and
        (manageenquiry.qualificationid = '$QualificationId' or ifnull('$QualificationId',0)=0) and
        (manageenquiry.genderid = '$GenderId' or ifnull('$GenderId',0)=0) and
        (manageenquiry.specificationid = '$SpecificationId' or ifnull('$SpecificationId',0)=0) and
        (manageenquiry.isactive = '$IsActive' or ifnull('$IsActive',-1)=-1) and
        (manageenquiry.candidatename like concat ('%','$CandidateName','%')||ifnull('$CandidateName','')||'%')and
        (manageenquiry.enquirynumber = '$EnquiryNumber' or ifnull('$EnquiryNumber',0)=0)
        ")
        ->get();
        return $ListData;
    } 
    public function EmployeeExperienceDelete(Request $request)  {
        $Id = $request['ChildId'];
        $listdata = DB::select('call employeeexperiencedelete(?)',[$Id]); 
        return $listdata;
     
       
    }  
    public function EmployeeRelieve(Request $request)  
    {     
        $Id=$request['Id'];
        $ResignationDate=date('Y-m-d', strtotime($request['ResignationDate']));
        $RelieveResonTypeId=$request['RelieveResonTypeId'];
        $LeavingReason=$request['LeavingReason'];
        $NoitcePeriod=$request['NoitcePeriod'];
        $LastWorkingDay=date('Y-m-d', strtotime($request['LastWorkingDay']));
        $Remarks=$request['Remarks'];
        $PaymentDate=date('Y-m-d', strtotime($request['PaymentDate']));

        $data=DB::select('call employee_sp_releive(?,?,?,?,?,?,?,?)',[$Id,$ResignationDate,$RelieveResonTypeId,$LeavingReason,$NoitcePeriod,$LastWorkingDay,$Remarks,$PaymentDate]); 
        
        return $data;
        // $data = ['Id'=>$Id,'RelieveResonTypeId'=>$request['RelieveResonTypeId'],'ResignationDate'=>$ResignationDate,
        // 'LastWorkingDay'=>$LastWorkingDay,'PaymentDate'=>$PaymentDate,'NoitcePeriod'=>$request['NoitcePeriod'],
        // 'LeavingReason'=>$request['LeavingReason'],'Remarks'=>$request['Remarks'],'IsActive'=>'0'];

        // $relieve = DB::table('manageemployee')->where('Id', $Id)->update($data);
        // if($relieve == true)
        // {
        //     return 1;
        // }
        // else
        // {
        //    return 0;
        // }

       } 

       public function ReleiveEmployee_List(Request $request)  {
        
        $Period_From = $request['PeriodFrom'] !== null ? date('Y-m-d', strtotime($request['PeriodFrom'])) : null;
        $Period_To = $request['PeriodTo'] !== null ? date('Y-m-d', strtotime($request['PeriodTo'])) : null;
        

        $EmployeeName = $request['EmployeeName'];
        $DepartmentId = $request['DepartmentId'];
        $Reason_Leaving_Type = $request['Reason_Leaving_Type'];
        $PeriodFrom = $Period_From;
        $PeriodTo = $Period_To;

        $listdata = DB::select('call relieveemployee_list(?,?,?,?,?)',[$EmployeeName,$DepartmentId,$Reason_Leaving_Type,$PeriodFrom,$PeriodTo]); 
        return $listdata;
     
       
       }  

       public function RelieveEmployee_SingleList(Request $request)  {
        

        $Id = $request['Id'];
        

        $listdata = DB::select('call relieveemployee_singlelist(?)',[$Id]); 
        return $listdata;
     
       
       }  
       

       public function CommonEmployee_List(Request $request) 
        {
       
        $Id = $request['Id'];
        $DepartmentId = $request['DepartmentId'];
        $LocationNameId = $request['LocationNameId'];
        $DesignationId = $request['DesignationId'];
       

        $listdata = DB::select('call commonemployeedetails(?,?,?,?)',[$Id,$DepartmentId,$LocationNameId,$DesignationId]); 
        return $listdata;
     
       
       }  
       public function RelEmployee_ByName(Request $request) 
       {
      
       $listdata = DB::select('call releiveemployee_byname()'); 
       return $listdata;
    
      
      } 
      public function Employee_ByName(Request $request) 
      {
      $Id=$request['Id'];
      $listdata = DB::select('call empname_selection_list(?)',[$Id]); 
      return $listdata;
   
     
     } 
     public function AddEducationalDetails(Request $request) 
     {
        $EducationId=$request['Emp_Education_Id'] !== null ? $request['Emp_Education_Id']: 0;
        $EmployeeId=$request['EmployeeId'];
        $QualificationId=$request['QualificationId'];
        $YearOfPassedOut=$request['YearOfPassedOut'];
        $CollegedUnivercity=$request['CollegedUnivercity'];
        $Percentage=$request['Percentage'];


        $listdata = DB::select('call employee_educationaldetails_sp_insertupdate(?,?,?,?,?,?)',[$EducationId,$EmployeeId,$QualificationId,$YearOfPassedOut,$CollegedUnivercity,$Percentage]); 
        return $listdata;
    
    
    } 
    public function EducationalDetails_View(Request $request) 
    {
    $Id=$request['Id'];
    $listdata = DB::select('call hr_manageemployee_educationaldetails_view(?)',[$Id]); 
    return $listdata;
   } 
   public function EducationalDetails_Delete(Request $request) 
   {
   $Id=$request['Id'];
   $Deletedata = DB::select('call hr_manageemployee_educationaldetails_delete(?)',[$Id]); 
   return $Deletedata;
  } 

  public function Employee_Delete(Request $request) 
  {
  $Id=$request['EmployeeId'];
  $Deletedata = DB::select('call hr_manageemployee_delete(?)',[$Id]); 
  return $Deletedata;
 } 

 public function Employeelist_password(Request $request) 
 {

 $data = DB::select('call employeelist_password()'); 
 $value = array();
 foreach($data as $value)
 {
  
     $id=$value->id;
     $password=base64_encode($value->password);  
     
     $data = DB::select('call employeelist_password_update(?,?)',[$id,$password]);
 }
} 
public function Employeelist_passworddecrypt(Request $request) 
{

$id=$request['id'];
$data = DB::select('call employeelist_decryptpassword(?)',[$id]);
foreach($data as $value)
{
$password=base64_decode($value->password);  
return $password;
}
} 
public function collegeinstitutionlist(Request $request)
{
   
  $loginid = $request['loginid'];          

 $Data = DB::select('call getcollegeinstitutionlist()');

 return $Data;
 }
 public function institutionlist(Request $request)
 {
    
   $loginid = $request['loginid'];          
 
  $Data = DB::select('call getinstitutionlist_admin()');
 
  return $Data;
  }
 
 public function login_institution(Request $request)
 {
    
   $loginid = $request['loginid'];       
 
  $Data = DB::select('call getlogin_institution(?)',[$loginid]);

  return $Data;
  }
  public function logininstitution_insert(Request $request)
  {
     
    $employeeid = $request['employeeid'];
    $institutionid = $request['institutionid'];
    $collegeid = $request['collegeinstitutionid'];          
  
   $Data = DB::select('call employeeinstitution_insert(?,?,?)',[$employeeid,$institutionid,$collegeid]);

 
   return $Data;
   }

  
}
