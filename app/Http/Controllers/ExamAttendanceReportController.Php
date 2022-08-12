<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;


class ExamAttendanceReportController extends Controller
{
    
    public function ExamAttendance_List(Request $request)
    {
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];        
        $ExamCenterId=$request["ExamCenterId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
      
            $listdata = DB::select('call exam_attendance_list(?,?,?,?,?,?)',[$InstitutionId,$AcademicYearId,$ExamCenterId,$CourseId,$SubjectId,$ExamId]);
             return $listdata;

    }
    public function ExamAttendance_View(Request $request)
    {
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $ExamCenterId=$request["ExamCenterId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
      
        $ViewData = DB::select(' call exam_attendance_total(?,?,?,?,?,?)',[$InstitutionId,$AcademicYearId,$ExamCenterId,$CourseId,$SubjectId,$ExamId]);
        return $ViewData;
    }

    public function Exam_SubjectList_Attendance(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ExamNameId = $request['ExamNameId'];
    
        
        $ListData = DB::select('call subjectlistbasedexam_attendance(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
        return $ListData;
    }
    public function Exam_StudentList_Attendance(Request $request)
    {
      
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;        
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;     
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

       $ListData = DB::select('call exam_studentlist_attendance(?,?,?,?,?)',[$AcademicYearId,$CourseId, $ExamNameId,$ExamCenterId,$InstitutionId]);
       return $ListData;
    }
    public function Exam_centerlist_Attendance(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;        
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;     
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

       $ListData = DB::select('call exam_centerlist_attendance(?,?,?,?,?)',[$AcademicYearId,$CourseId, $ExamNameId,$ExamCenterId,$InstitutionId]);
       return $ListData;        
    }
}
