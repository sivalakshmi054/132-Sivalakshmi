<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class ExamcenterAllocationController extends Controller
{
    public function ListExamCenter(Request $request)
    {
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $MediumId=$request['MediumId'];
        $SectionId=$request['SectionId'];
        $ExamNameId=$request['ExamNameId'];
    
        $data = DB::select('call assignexam_centerlist(?,?,?,?,?,?)',
        [$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId,session('UserId')]);
        return $data;     
    }

    public function Examcentername(Request $request)
    {        
        $InstitutionId =$request['InstitutionId'];      
        $data = DB::table('examcenter_master')->select('id','center_name','isactive')->where('institutionid',$InstitutionId)->orderBy('center_name','asc')->get();
        return $data;

        // $data = DB::select('Call ExamCentername_List(?)',[$InstitutionId]);
        // return $data;     
    }

    public function ExamCenterAddEdit(Request $request)
    {       
         $Institution_Id=$request['Institution_Id'];
        $ExamCenter_Id=$request['ExamCenter_Id'];
         $studentId=$request['StudentId'];
         $AcademicYearId=$request['AcademicYearId'];
         $examId=$request['examId'];
 
         $Retid = DB::select('call assignexamcenter_addedit(?,?,?,?,?)',
         [$Institution_Id,$ExamCenter_Id,$studentId,$AcademicYearId,$examId]);
    }

  
}
