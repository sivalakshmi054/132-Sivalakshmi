<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class OrganiserController extends Controller
{
     
    public function AcademicYearDuplicateCheck(Request $request)
    {
            $Id=$request["Id"];
            $AcademicYear = $request["AcademicYear"];
            $InstitutionId = $request["InstitutionId"];

            $listdata = DB::select('call academicyear_duplicatecheck(?,?,?)',[$Id,$AcademicYear,$InstitutionId]); 
             return $listdata;

    }

    public function AcademicPeriodDuplicateCheck(Request $request)
    {
            $Id=$request["Id"];
            $FromYearId = $request["FromYearId"];
            $ToYearId = $request["ToYearId"];
            $InstitutionId = $request["InstitutionId"];

            $listdata = DB::select('call academicperiod_duplicatecheck(?,?,?,?)',[$Id,$FromYearId,$ToYearId,$InstitutionId]); 
             return $listdata;

    }

    public function AcademicDefaultCheck(Request $request)
    {
        $Id=$request["Id"];
            $AcademicFlag=$request["IsDefault"];
            $InstitutionId = $request["InstitutionId"];

            $listdata = DB::select('call academicyear_defaultcheck(?,?,?)',[$Id,$AcademicFlag,$InstitutionId]); 
             return $listdata;

    }
    public function UpdateDefaultYear(Request $request)
    {
        $Id=$request["Id"];

            $listdata = DB::select('call academicyear_defaultyear_update(?)',[$Id]); 
             return $listdata;

    }

    public function addAcademic(Request $request)
    {

        // $Status=$request['Status'] !== null ? $request['Status'] : 0;
        // $data = [];            
        $Id=$request['Id']!== null ? $request['Id'] : 0;
        $AcademicYear=$request['AcademicYear'];
        $FromYearId=$request['FromYearId'] !== 0 ? $request['FromYearId'] : 0;
        $ToYearId=$request['ToYearId']!== 0 ? $request['ToYearId'] : 0;
        $Description=$request['Description'];
        $Status=$request['Status']!== 0 ? $request['Status'] : 0;
        $AcademicFlag= $request['IsDefault'] == true ? $request['IsDefault'] : 0;
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
     
        $ListData= DB::Select('call academic_addedit(?,?,?,?,?,?,?,?)',[$Id,$AcademicYear,$FromYearId,$ToYearId,$Description,$Status,$AcademicFlag,$InstitutionId]);
        return $ListData;
    }
    public function AcademicYearsearch(Request $request)
    {

         $AcademicYear = $request['AcademicYear']!== 0 ? $request['AcademicYear'] : 0;
         $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
         $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 1;       

        $ListData = DB::select('call academicyearlist(?,?,?)',[$AcademicYear,$IsActive,$InstitutionId]); 
        return $ListData;
    }
   
    public function Academicinactive(Request $request)  {
        $Id = $request['Id'];        
        $InActiveData= DB::Select('call academic_inactive(?)',[$Id]);
        return $InActiveData;
    }   

    public function Academicactive(Request $request)  {          
        $Id = $request['Id'];
        $InActiveData= DB::Select('call academic_active(?)',[$Id]);
        return $InActiveData;
    }
    public function ViewAcademicYear(Request $request)
    {
        $id = $request['Id'];   
        $ListData= DB::Select('call academic_view(?)',[$id]);        
        return $ListData;        
    }
    public function gradeinactive(Request $request)  {
        $Id = $request['Id'];        
        $InActiveData= DB::Select('call grade_inactive(?)',[$Id]);
        return $InActiveData;
    }   
      
      public function gradeactive(Request $request)  {          
        $Id = $request['Id'];        
        $InActiveData= DB::Select('call grade_active(?)',[$Id]);
        return $InActiveData;
    } 

    public function addGrade(Request $request)
    {
        $Id=$request['Id']!== null ? $request['Id'] : 0;
        $GradeName=$request['GradeName'];
        $GradePoint=$request['GradePoint'];
        $GradeCategory=$request['GradeCategory'];
        $MarksFrom=$request['MarksFrom'];
        $MarksUpto=$request['MarksUpto'];
        $Remarks= $request['Remarks'];
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
     
        $ListData= DB::Select('call grade_insertupdate(?,?,?,?,?,?,?,?)',[$Id,$GradeName,$GradePoint,$GradeCategory,$MarksFrom,$MarksUpto,$Remarks,$InstitutionId]);
        return $ListData;
    }

    public function AddGradeListView(Request $request)
    {
            $Id = $request["Id"];
            $listdata = DB::select('call grade_view(?)',[$Id]); 
             return $listdata;
    }
    public function AddGradeList(Request $request)
    {

        $GradeName = $request['GradeName']!== null ? $request['GradeName'] : "";
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
        $data = DB::select('call grade_list(?,?,?)',[$GradeName,$IsActive,$InstitutionId]);

        return $data;    

    }

    public function GradeNameView(Request $request)     
    {
        $Id=$request['Id'];        
        $GradeName=$request['GradeName'];    
        $MarksFrom=$request['MarksFrom']; 
        $MarksUpto=$request['MarksUpto']; 
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;  
        $data = DB::select('call grademarkswithname_duplicatechecking(?,?,?,?,?)',[$Id,$GradeName,$MarksFrom,$MarksUpto,$InstitutionId]);      
        return $data;
    }

    public function Examsearch(Request $request)
    {
        $ename = $request['ExamName1']!== "" ? $request['ExamName1'] : null;
        $ecode = $request['ExamCode1']!== "" ? $request['ExamCode1'] : null;
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;  
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;  
        $ListData =
        DB::select('call exam_list(?,?,?,?)',[$ename,$ecode,$IsActive,$InstitutionId]);      
        return $ListData;
    }
    public function ExamNameDelete(Request $request)
    {
            $ExamId=$request["ExamId"];      
            $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;  
            $listdata = DB::select('call admin_exam_sp_delete(?,?)',[$ExamId,$InstitutionId]); 
             return $listdata;

    }
    public function ExamNameDuplicateCheck(Request $request)
    {
            $Id=$request["Id"];
            $ExamName = $request["ExamName"];          
            $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
            $listdata = DB::select('call exam_duplicatecheck(?,?,?)',[$Id,$ExamName,$InstitutionId]); 
             return $listdata;

    }
    public function addExam(Request $request)
    {
      
        $Id=$request['Id']!== null ? $request['Id'] : 0;
        $ExamName=$request['ExamName'];
        $ExamCode=$request['ExamCode'];
        $Duration_Hour=$request['Duration_Hour'];
        $Duration_Minutes=$request['Duration_Minutes'];
        $Description=$request['Description'];
        $GradeT= $request['GradeT'];
        $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
     
        $ListData= DB::Select('call exam_insertupdate(?,?,?,?,?,?,?,?)',[$Id,$ExamName,$ExamCode,$Duration_Hour,$Duration_Minutes,$Description,$GradeT,$InstitutionId]);
        return $ListData;
    }

    public function viewExam(Request $request)
    {
        $id = $request['Id'];
        $ListData =DB::Select('call exam_view(?)',[$id]);
        return $ListData;
    }
    
    public function inactiveExam(Request $request)  {
        $id = $request['Id'];
        $ListData= DB::Select('call exam_inactive(?)',[$id]);
        return $ListData;
    }

    public function activeExam(Request $request)  {          
         $id = $request['Id'];
        $ListData= DB::Select('call exam_active(?)',[$id]);
        return $ListData;
    } 
}