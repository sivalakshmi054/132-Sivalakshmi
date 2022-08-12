<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class MarksheetController extends Controller
{
      public function Marksheetdetails(Request $request)
      {
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $SectionId=$request['SectionId'];
          $ExamNameId=$request['ExamNameId'];
          // $AcademicYearId='15';
          // $CourseId='2';
          // $SectionId='0';
          // $ExamNameId='17';
      
          $data = DB::select('call marksheet_details(?,?,?,?)',[$AcademicYearId,$CourseId,$SectionId,$ExamNameId]);
          return $data;    
      }

      public function MarksheetStudentDetails(Request $request)
      {
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $ExamNameId=$request['ExamNameId'];
          // $AcademicYearId='15';
          // $CourseId='2';
          // $SectionId='0';
          // $ExamNameId='17';
      
          $data = DB::select('call printmarksheetstudent(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
          return $data;    
      }
      public function Marksheetprintdata(Request $request)
      {
          $StudentId=$request['StudentId'];
          // $CourseId=$request['CourseId'];
          // $SectionId=$request['SectionId'];
          // $ExamNameId=$request['ExamNameId'];
          // $AcademicYearId='15';
          // $CourseId='2';
          // $SectionId='0';
          // $ExamNameId='17';
      
          $data = DB::select('call marksheetprintdata(?)',[$StudentId]);
          return $data;    
      }
      public function MarksheetStudentPrint(Request $request)
      {
          $StudentId=$request['StudentId'];
          // $CourseId=$request['CourseId'];
          // $SectionId=$request['SectionId'];
          // $ExamNameId=$request['ExamNameId'];
          // $AcademicYearId='15';
          // $CourseId='2';
          // $SectionId='0';
          // $ExamNameId='17';
      
          $data = DB::select('call marksheetprintstudent(?)',[$StudentId]);
          return $data;    
      }
      public function PrintmarksheetStudentSubject(Request $request)
      {
          $StudentId=$request['StudentId'];
          // $CourseId=$request['CourseId'];
          // $SectionId=$request['SectionId'];
          // $ExamNameId=$request['ExamNameId'];
          // $AcademicYearId='15';
          // $CourseId='2';
          // $SectionId='0';
          // $ExamNameId='17';
      
          $data = DB::select('call printmarksheetstudentsubject(?)',[$StudentId]);
          return $data;    
      }
}