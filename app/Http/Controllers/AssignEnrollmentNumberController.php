<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class AssignEnrollmentNumberController extends Controller
{
    public function listEnrollmentNumber(Request $request)
    {
        $mediumid = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;        
        $ExamId = $request['ExamId']!== 0 ? $request['ExamId'] : 0;
        $sname = $request['StudentName']!== null ? $request['StudentName'] : "";
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        
        $listdata = DB::select('call assignenrollmentnumber_list(?,?,?,?,?,?,?)',
        [$mediumid,$courseid,$SectionId,$ExamId,$sname,$AcademicYearId,session('UserId')]); 
        return $listdata;
    }


    public function EnrollmentNoAddEdit(Request $request)
    {       
         $StudentId=$request['StudentId'];
         $AcademicYearId=$request['AcademicYearId'];
         $ExamId=$request['ExamId'];
         $EnrollmentNumber=$request['EnrollmentNumber'];
 
         $Retid = DB::select('call assignenrollmentnumber_addedit(?,?,?,?)',[$StudentId,$AcademicYearId,$ExamId,$EnrollmentNumber]);
    }

    public function EnrollmentNo_Duplicate(Request $request)
    {
            $Id=$request["Id"];
            $EnrollmentNumber = $request["EnrollmentNumber"];

            $listdata = DB::select('call student_enrollmentnumber_sp_duplicatechecking(?,?)',[$Id,$EnrollmentNumber]); 
             return $listdata;

      

    }


  
}
