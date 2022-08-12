<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class EvaluationMarkDetailsReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function evaluationliststudent(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;    
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;       
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $StudentId = $request['StudentId']!== 0 ? $request['StudentId'] : 0;
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $ListData = DB::select('call evaluationmark_detaillist(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId,$StudentId,$ExamCenterId,$InstitutionId]);
        return $ListData;        
    }
    
    public function listExamReport(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;    
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;       
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $StudentId = $request['StudentId']!== 0 ? $request['StudentId'] : 0;
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $ListData = DB::select('call examinationmarkslistreport_sp(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId,$StudentId,$ExamCenterId,$InstitutionId]);
        return $ListData;        
    }  public function evaluationliststudent_child(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;    
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;       
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $StudentId = $request['StudentId']!== 0 ? $request['StudentId'] : 0;
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $ListData = DB::select('call evaluation_marks_child(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId,$StudentId,$ExamCenterId,$InstitutionId]);
        return $ListData;        
    }

    public function studentdd_List(request $request)
   {
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0; 
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;        
        $ListData = DB::select('call studentdd_list(?,?)',[$InstitutionId,$AcademicYearId]);
        return $ListData;
   }
}