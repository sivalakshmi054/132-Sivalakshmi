<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class PrintHallTicketController extends Controller
{
      public function Print_HallTicketList(Request $request)
      {
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $ExamNameId=$request['ExamNameId'];
      
          $data = DB::select('call printhallticket_list(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
          return $data;        
      }


      public function HallTicketDetails(Request $request)
      {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
          $ExamNameId = $request['ExamNameId'];


  
  
          $ListData = DB::select('call printhallticketlistbasedstudent(?,?,?)', [$AcademicYearId,$CourseId,$ExamNameId]);
          return $ListData;
      }
  
      public function HallTicketubjectDetails(Request $request)
      {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
          $ExamNameId = $request['ExamNameId'];
        //    $StudentId = $request['StudentId'];   
  
  
          $ListData = DB::select('call printhallticketbasedstudent(?,?,?)', [$AcademicYearId,$CourseId,$ExamNameId]);
          return $ListData;
      }
    
}