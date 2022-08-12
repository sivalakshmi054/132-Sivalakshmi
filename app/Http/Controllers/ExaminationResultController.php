<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ExaminationResultController extends Controller
{
  /*
    public function listExaminationResult(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;

       $ListData = DB::select('CALL ExamwiseMarks_SP_List(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId,$SubjectNameId]);
       return $ListData;
    }

    public function ExaminationResultlist(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;

       $ListData = DB::select('CALL SubjectMarkList(?,?)',[$CourseId,$ExamNameId]);
       return $ListData;
    }

    */
    public function ExaminationResult_List(Request $request)
    {
      
     
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;

       $ListData = DB::select('call examinationresultlist(?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId]);
       return $ListData;
    }

}
