<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class GenerateHallTicketController extends Controller
{
      public function GenerateHallTicketList(Request $request)
      {
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $MediumId=$request['MediumId'];
          $SectionId=$request['SectionId'];
          $ExamNameId=$request['ExamNameId'];
      
          $data = DB::select('call generatehallticket_list(?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId]);
          return $data;        
      }


      public function GenerateHall_AddEdit(Request $request)
      {
          
        $Id=$request['Id'];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $ExamNameId=$request['ExamNameId'];
        $StudentId=$request['StudentId'];
      
        $data = DB::select('call generatehallticket_addedit(?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$ExamNameId,$StudentId]);
        return $data;
        
      }
      public function getHallTicketList(Request $request)
      {
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $MediumId=$request['MediumId'];
          $SectionId=$request['SectionId'];
          $ExamNameId=$request['ExamNameId'];
      
          $data = DB::select('call generated_sp_hallticket_list(?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId]);
          return $data;        
      }
      
      public function PrintHallTicket_HeaderData(Request $request)
      {
          $HallTicketId=$request['HallTicketId'];
      
          $data = DB::select('call printhallticket_getheaderdata(?)',[$HallTicketId]);
          return $data;        
      }
      public function PrintHallTicket_ChildData(Request $request)
      {
          $HallTicketId=$request['HallTicketId'];
      
          $data = DB::select('call printhallticket_getchilddata(?)',[$HallTicketId]);
          return $data;        
      }
    
}