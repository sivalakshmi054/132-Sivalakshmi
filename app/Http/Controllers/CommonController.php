<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CommonController extends Controller
{
    public function EmployeeTypeList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];    
        $data = DB::table('employeetypemaster')->select('id','employeetype','isactive')->where('institutionid',$InstitutionId)
        ->orderBy('employeetype','asc')->get();
        return $data;
    }
    public function GenderList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        

        $data = DB::table('gendermaster')->select('id','gender','isactive')->where('institutionid',$InstitutionId)->orderBy('gender','asc')->get();
        return $data;
    }
    
    public function TitleList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('titlemaster')->select('id','title','isactive')->where('institutionid',$InstitutionId)->orderBy('title','asc')->get();
        return $data;
    }

    public function DesignationList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('designationmaster')->select('id','designation','isactive')->where('institutionid',$InstitutionId)->orderBy('designation','asc')->get();
        return $data;
    }

    public function DepartmentList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('departmentmaster')->select('id','departmentname','isactive')->where('institutionid',$InstitutionId)->orderBy('departmentname','asc')->get();
        return $data;
    }
    public function SpecificationList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('specificationmaster')->select('id','specification','isactive')->where('institutionid',$InstitutionId)->orderBy('specification','asc')->get();
        return $data;
    }   

    public function MaritalStatusList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('maritalstatusmaster')->select('id','maritalstatus', 'isactive')->where('institutionid',$InstitutionId)->orderBy('maritalstatus','asc')->get();
        return $data;
    }
    public function QualificationList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('qualificationmaster')->select('id','qualification','isactive')->where('institutionid',$InstitutionId)->orderBy('qualification','asc')->get();
        return $data;
    }

    public function ReligionList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $data = DB::table('religionmaster')->select('id','religion','isactive')->where('institutionid',$InstitutionId)->orderBy('religion','asc')->get();
        return $data;
    }
    
    public function BloodGroupList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $data = DB::table('bloodgroupmaster')->select('id','bloodgroup','isactive')->where('institutionid',$InstitutionId)->orderBy('bloodgroup','asc')->get();
        return $data;
    }

    public function StateList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('statemaster')->select('id','statename','countryid','isactive')->where('institutionid',$InstitutionId)->orderBy('statename','asc')->get();
        return $data;
    }

    public function CountryList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('countrymaster')->select('id','countryname','isactive')->where('institutionid',$InstitutionId)->orderBy('countryname','asc')->get();
        return $data;
    }

    public function LocationList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('locationmaster')->select('id','locationname','stateid','isactive')->where('institutionid',$InstitutionId)->orderBy('locationname','asc')->get();
        return $data;
    }

    public function BankList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('bankmaster')->select('id','bankname','isactive')->where('institutionid',$InstitutionId)->orderBy('bankname','asc')->get();
        return $data;
    }

    public function BranchList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('branchmaster')->select('id','branchname','isactive')->where('institutionid',$InstitutionId)->orderBy('branchname','asc')->get();
        return $data;
    }

    public function StatusList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('statusmaster')->select('id','status','isactive')->where('institutionid',$InstitutionId)->orderBy('status','asc')->get();
        return $data;
    }
    public function MediumList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('mediummasters')->select('id','mediumname','isactive')->where('institutionid',$InstitutionId)->orderBy('mediumname','asc')->get();
        return $data;
    }

    public function CourseList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call common_courselist(?)',[$InstitutionId]);
        return $ListData;
    }

    public function ReferenceTypeList(Request $request)
    {
        $data = DB::table('referencetypemaster')->select('id','referencetype','isactive')->orderBy('referencetype','asc')->get();
        return $data;
    }

    public function CommunityList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $data = DB::table('communitymaster')->select('id','community','isactive')->where('institutionid',$InstitutionId)->orderBy('community','asc')->get();
        return $data;
    }

  public function AcademicYearList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call sp_academicyearmasterlist(?)',[$InstitutionId]);
        return $ListData;
    }

    public function SectionList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call common_sectionlist(?)',[$InstitutionId]);
        return $ListData;
    }
  public function CourseBasedSectionList(request $request)
    {
        // $data = DB::table('CourseSection')
        // ->leftJoin('SectionMaster as SM','CourseSection.SectionId', '=', 'SM.Id')
        // ->select('CourseSection.CourseId','CourseSection.SectionId','SM.SectionName','SM.Id')
        // ->orderBy('Id','asc')
        // ->get();
        $CourseId = $request['CourseId'];
        $AcademicYearId = $request['AcademicYearId'];
        $ListData = DB::select('call coursebasedsubjectlist(?,?)',[$AcademicYearId,$CourseId]);
        return $ListData;
    }

    public function PaymentModeList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('paymentmode')->select('id','paymentmode')->orderBy('id','asc')->get();
        return $data;
    }

    public function PaymentModeListfilter(request $request)
    {
        $Id = $request['PaymentModeId'];
        //dd($Id);
        $data = DB::table('paymentmode')->select('id','paymentmode'
        )
        ->where('paymentmode.id',$Id)
        ->orderBy('id','asc')
        ->get();
        return $data;
    }

    public function MotherTongueList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('mothertonguemaster')->select('id','mothertongue','isactive')->where('institutionid',$InstitutionId)->orderBy('mothertongue','asc')->get();
        return $data;
    }
    public function CasteList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('castemaster')->select('id','castename','isactive')->where('institutionid',$InstitutionId)->orderBy('castename','asc')->get();
        return $data;
    }
    public function DocumentTypeList(Request $request)
    {
        $InstitutionId =$request['InstitutionId'];
        $data = DB::table('documenttypemaster')->select('id','document')->where('institutionid',$InstitutionId)->orderBy('id','asc')->get();
        return $data;
    }
    

    public function YearList(Request $request)
    { 
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call sp_yearlist(?)',[$InstitutionId]);
        return $ListData;
    }

    public function authorizednamelist()
    {
        $data = DB::table('authorizedby')->select('id','name','isactive')->orderBy('name','asc')->get();
        return $data;
    }

    public function Certificatelist()
    {
        $data = DB::table('certificate')->select('id','certificatename','isactive')->orderBy('certificatename','asc')->get();
        return $data;
    }
   
    public function Terms_List()
    {
        
        $data = DB::table('termstype')->select('id','termname')->orderBy('id','asc')->get();
        return $data;
    }

    public function SubjectTypeList(request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call sp_subjectlistlist(?)',[$InstitutionId]);
        return $ListData;
    }
  
    public function SubjectNameList(request $request)
    {
        $InstitutionId =$request['InstitutionId'];    
        $data = DB::table('subjectmaster as sm')
        ->select('sm.id','sm.subjectname','sm.isactive')->where('institutionid',$InstitutionId)
        ->orderBy('sm.subjectname','asc')->get();
        return $data;
    }

   public function ExamNameList(request $request)
    {
        $InstitutionId =$request['InstitutionId'];        
        $ListData= DB::Select('call sp_examnamelist(?)',[$InstitutionId]);
        return $ListData;
    }


   public function SeparatorList()
    {        
        $data = DB::table('commonseparator')->select('id','separator')->orderBy('id','asc')->get();
        return $data;
    }

    public function CategoryList()
    {
        $data = DB::table('category')->select('Id','CategoryName')->orderBy('Id','asc')->get();
       
         return $data;    
    }
 
    
 public function IdTypeList()
    {
        
        
        $data = DB::table('idtype')->select('id','idtype','isactive')->orderBy('idtype','asc')->get();
        
        return $data;
    
 }
    
    
 public function TypeList()
     {
         
         
     $data = DB::table('typemaster')->select('id','type')->orderBy('id','asc')->get();
         
     return $data;
     
 }
 
     
 public function TransactionList()
     {
         
         
     $data = DB::table('transactionmaster')->select('id','transaction')->orderBy('id','asc')->get();
         
     return $data;
     
 }
 
public function GradeList()
    
{
        
	
	$data = DB::table('employeegrade')->select('id','gradename')->orderBy('id','asc')->get();
        
	
	return $data;
    
    
}

//Session List
public function SessionList()
{
    $data = DB::table('sessionmaster')->select('id','sessionname')->orderBy('id','asc')->get();
    return $data;
    
}
public function ContactTypeList()
{
    $data = DB::table('contacttypemaster')->select('id','contacttype')->orderBy('id','asc')->get();
    return $data;
}
    


public function SourceList()
{
    $data = DB::table('sourcemaster')->select('id','sourcename')->orderBy('id','asc')->get();
     return $data;
}
public function LoginTypeDetails()
{
    $data = DB::table('logintype_details')->select('id','name')->orderBy('id','asc')->get();
    return $data;
}

public function StudentNameDetails(request $request)
{
   $AcademicYearId = $request['AcademicYearId'];
   $CourseId = $request['CourseId'];
   // dd($AcademicYearId);
   $ListData = DB::select('call common_sp_studentdetailslist(?,?)',[$AcademicYearId,$CourseId]);
   return $ListData;

}
public function TemplateTypeList()
   {
      $data = DB::table('templatetypemaster')->select('id','type')->orderBy('id','asc')->get();
      return $data;
   }

   public function TemplateTagsList()
   {
      $data = DB::table('template_tagslist')->select('id','tagname')->orderBy('id','asc')->get();
      return $data;
   }
// public function EmployeeNameList()
// {
//  $data = DB::table('manageemployee')->select('Id','EmployeeName as Name')->orderBy('EmployeeName','asc')->get();
//  return $data;
// }

public function CommonEmployeeList(Request $request)
{
    $Id = $request['Id'];
    $DepartmentId = $request['DepartmentId'];
    $LocationNameId = $request['LocationNameId'];
    $DesignationId = $request['DesignationId'];
    
    $data = DB::select('call common_employeelist(?,?,?,?,?)',[$Id,$DepartmentId,
    $LocationNameId,$DesignationId
    ]);

    return $data;
}

public function RelieveReasonTypeList()
{
    $data = DB::table('relievereasontype')->select('id','name')->orderBy('id','asc')->get();
    return $data;
}
public function StaffNameList(Request $request)
{
    $data = DB::table('manageemployee')
    ->select('id','firstname','lastname','employeename as name','isactive', DB::raw('concat("(" , employeenumber, ")", " " ,"-", employeename) as employee'))
    ->whereraw(
        "(manageemployee.isactive = 1) and institutionid='$InstitutionId'"
    )
    ->orderBy('employeename','asc')->get();
    
    return $data;
}

public function WorkFlowTransactionList(Request $request)
{
    $Transaction=$request->Transaction;
    $ListData = DB::select('call workflow_sp_commontransaction(?)',[$Transaction]);   //Filtered list ->commontablecolummns table
    return $ListData;
}

public function PaymentTypeList()
{
    
    $data = DB::table('paymenttype')->select('id','paymenttype')->orderBy('id','paymenttype')->get();
    return $data;
}

public function Workflow_InitialStatus(Request $request)
{
    
    $Transaction = $request['Transaction'];
    
    $ListData = DB::select('call workflow_sp_initialstatus(?)',[$Transaction]);

    return $ListData;
   
}

public function WorkFlow_Status()
{
    
    $ListData = DB::select('call workflow_sp_status()');
    
    return $ListData;
}



public function SubjectsNameList(request $request)
{
    $InstitutionId =$request['InstitutionId'];        
    $ListData= DB::Select('call common_subjectnamelist(?)',[$InstitutionId]);
    return $ListData;
}

public function AcademicYearBasedCourseList(request $request)
{
    $AcademicYearId = $request['AcademicYearId'];
    $InstitutionId =$request['InstitutionId'];  
    $ListData = DB::select('call academicyear_basedcourselist(?,?)',[$AcademicYearId,$InstitutionId]);
    
    return $ListData;
}

public function CourseBasedSubjectList(request $request)
{
    $AcademicYearId = $request['AcademicYearId'];
    $CourseId = $request['CourseId'];
    $InstitutionId =$request['InstitutionId'];  
    $ListData = DB::select('call coursebasedsubjects(?,?,?)',[$AcademicYearId,$CourseId,$InstitutionId ]);
    
    return $ListData;
}
public function AcademicDefaultList(request $request)
{
   
    $ListData = DB::select('call academicdefault()');
    
    return $ListData;
}



 public function ManageLogin_EmployeeNameList()
    {
    //CONCAT('(',EM.EmployeeNumber,')','  -  ',EM.EmployeeName) FullNamelist
   // $comp = Component::select(DB::raw("CONCAT('name','id') AS display_name"),'id')->get()->pluck('display_name','id');
  // $data = DB::table('manageemployee')->select(DB::raw("CONCAT('EmployeeName','EmployeeNumber') AS Name"),'Id')->get()->pluck('Name','Id');
    $data = DB::select('call managelogins_employeelist()'); 
   
    return $data;
   }

   public function CommonLogin_UserPermission(request $request)
   {
       $LoginId = $request['LoginId'];
     
       $ListData = DB::select('call common_loginuser_permission(?)',[$LoginId]);
       
       return $ListData;
   }
   
   public function School_NameList()  
   {          
      $data = DB::table('institution')
      ->select('id','institutionname',
      DB::raw('concat(address1, ",",address2, ",",pincode) as address'))
      ->orderBy('id','asc')->get(); 
      return $data;
   } 
   
   public function StudentCategoryList(request $request)
   {
        $InstitutionId =$request['InstitutionId'];        
       $data = DB::table('categorymaster')->select('id','categoryname','isactive')->where('institutionid',$InstitutionId)->orderBy('categoryname','asc')->get();
       return $data;
   }
   public function ExamCenterList(request $request)
   {
        $InstitutionId =$request['InstitutionId'];        
        $ListData = DB::select('call examcenter_list(?)',[$InstitutionId]);
        return $ListData;
   }

}