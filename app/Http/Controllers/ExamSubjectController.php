<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ExamSubjectController extends Controller
{
    
      public function addExamSubject(Request $request)
      {
          $Id=$request['Id']==null ? 0: $request['Id'];
          $AcademicYearId=$request['AcademicYearId'];
          $CourseId=$request['CourseId'];
          $ExamNameId=$request['ExamNameId'];
          $Description=$request['Description'];
          $InstitutionId=$request['InstitutionId'];
          $data = DB::select('call examsubject_sp_insertupdate(?,?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$ExamNameId,$Description,$InstitutionId]);
          return $data;
      }
  
      public function SubjectDetailsList(Request $request)
      {
          
         
          $Id=$request['Id']==null ? 0: $request['Id'];
          $ExamSubjectId=$request['ExamSubjectId'];
          $SubjectId=$request['SubjectId'];
          $Total=$request['Total'];
          $Pass=$request['Pass'];
          $OrderBy=$request['OrderBy'];
      
          $InstitutionId=$request['InstitutionId'];
          $data = DB::select('call examsubjectchild_sp_insertupdate(?,?,?,?,?,?,?)',[$Id,$ExamSubjectId,$SubjectId,$Total,$Pass,$OrderBy,$InstitutionId]);
          return $data;
        
      }
      public function ExamSubjectsearch(Request $request)
      {
        $academicyearid= $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $subjectnameid= $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;
        $examnameid = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
        $InstitutionId=$request['InstitutionId'];
        $data = DB::select('call examsubjectsearchsp(?,?,?,?,?,?)',[$academicyearid,$courseid,$subjectnameid,$examnameid,$IsActive,$InstitutionId]);
        return $data;
    }
  
  
      public function viewExamSubject(Request $request)
      {
          $Id = $request['Id'];
          $data = DB::select('call examsubjectview(?)',[$Id]);
          return $data;
      }
      public function inactiveExamSubject(Request $request)  {
          $id = $request['Id'];
          $inactive = DB::table('examsubject')->where('id', $id)->update(['isactive'=>'0']);
          if($inactive == true)
          {
              return 1;
          }
          else
          {
             return 0;
          }
      }   
        
        public function activeExamSubject(Request $request)  {          
          $id = $request['Id'];
          $active = DB::table('examsubject')->where('id', $id)->update(['isactive'=>'1']);
          if($active == true)
          {
              return 1;
          }
          else
          {
             return 0;
          }
      } 
      public function ExamSubjectInnerTableList(Request $request)
      {
              $listdata = DB::select('call examsubject_innertablelist()'); 
               return $listdata;
  
      }
      public function CourseBasedSubjectList(request $request)
      {
          $AcademicYearId = $request['AcademicYearId'];
          $CourseId = $request['CourseId'];
          $InstitutionId = $request["InstitutionId"]!== null ? $request['InstitutionId'] : 1;
          $ListData = DB::select('call coursebasedsubjectsforexamsubject(?,?,?)',[$AcademicYearId,$CourseId, $InstitutionId]);
         
          return $ListData;
      }
      public function ExamName_DuplicateCheck(Request $request)
      {
        $Id=$request["Id"];
        $AcademicYearId = $request["AcademicYearId"];
        $CourseId = $request["CourseId"];
        $ExamNameId = $request["ExamNameId"];
        $InstitutionId=$request['InstitutionId'];
        
        $listdata = DB::select('call examsubject_duplicatecheck(?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$ExamNameId,$InstitutionId]); 
        return $listdata;
  
      }
      public function ViewExamSubjectChild(Request $request)
      {
          $ExamSubjectId = $request['ExamSubjectId'];
          $data = DB::select('call examsubjectchildview(?)',[$ExamSubjectId]);
          return $data;
      }
      public function ExamSubjectlist(Request $request)
      {
         $AcademicYearId=$request['AcademicYearId'];
         $CourseId=$request['CourseId'];
         $ExamNameId=$request['ExamId'];
         $InstitutionId=$request['InstitutionId'];
         $data = DB::select('call examsubjectchildlist(?,?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId,$InstitutionId]);
         return $data;
      }
}