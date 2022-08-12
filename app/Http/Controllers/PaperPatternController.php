<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class PaperPatternController extends Controller
{
    // public function PaperTypeList()
    // {
    //     $data = DB::table('PaperTypeMaster')->select('Id','PaperType')->orderBy('Id','asc')->get();
    //     return $data;
    // }
    
    public function QuestionSectionList()
    {
        $data = DB::table('questionpapersectionmaster')->select('id','questionpapersection','isactive')->orderBy('questionpapersection','asc')->get();
        return $data;
    }
    public function AcademicYearCouExamSubDuplicate(Request $request)
    {

        $id = $request['Id']!== 0 ? $request['Id'] : 0;
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectId = $request['SubjectId']!== 0 ? $request['SubjectId'] : 0;       

        $ListData =DB::Select('call paperpattern_duplicatecheck(?,?,?,?,?,?)',[$id,$AcademicYearId,$CourseId,$MediumId,$ExamNameId,$SubjectId]);


        return $ListData;
    }
    public function listPaperPattern(Request $request)
    {
        $id = $request['Id']!== 0 ? $request['Id'] : 0;
        $academicyearid= $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $examnameid = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $subjectid = $request['SubjectId']!== 0 ? $request['SubjectId'] : 0;
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
        $ListData =DB::Select('call paperpattern_sp_list(?,?,?,?,?,?)',[$id,$academicyearid,$courseid,$examnameid,$subjectid,$IsActive]);
        return $ListData;
    }
    public function listchildPaperPattern(Request $request)
    {        
        $academicyearid= $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $examnameid = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $subjectid = $request['SubjectId']!== 0 ? $request['SubjectId'] : 0;   
        $mediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;        

        $ListData =DB::Select('call paperpatternchild_sp_list(?,?,?,?,?)',[$academicyearid,$courseid,$examnameid,$subjectid,$mediumId]);
        return $ListData;
    }

    public function CourseBasedExamList()
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ListData = DB::select('call academicyearcoursebasedexam(?,?)',[$AcademicYearId,$CourseId]);
        return $ListData;
    }
    public function CourseBasedExamLists(request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ListData = DB::select('call coursebasedexamname(?,?)',[$AcademicYearId,$CourseId]);
        
        return $ListData;
    }
  
    public function addPaperPattern(Request $request)
    {
        $Id=$request['Id'] ==null ? 0: $request['Id'];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $MediumId =$request['MediumId'];
        $ExamNameId = $request['ExamNameId'];
        $SubjectId= $request['SubjectId'];
        $data = DB::select('call paperpatteren_sp_insertupdate(?,?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$MediumId,$ExamNameId,$SubjectId]);
        return $data;
    }
		
    public function addPaperPatternchild(Request $request)
    {
        $Id=$request['Id'] ==null ? 0: $request['Id'];
        $paperpatterenId =$request['PaperPatternId'];
        $QuestionpaperSectionId= $request['QuestionpaperSectionId'];
        $NumberofQuestions =$request['NumberofQuestions'];
        $Answers=$request['Answers'];
        $Marks =$request['Marks'];
        $Remarks=$request['Remarks'];
        $data = DB::select('call paperpatterenchild_sp_insertupdate(?,?,?,?,?,?,?)',[$Id,$paperpatterenId,$QuestionpaperSectionId,$NumberofQuestions,$Answers,
        $Marks,$Remarks]);
        return $data;
    }
    public function viewPaperPattern(Request $request)
    {
        $Id = $request['Id'];
        $data = DB::select('call paperpatternview(?)',[$Id]);
        return $data;
    }
    public function childPaperPatternView(Request $request)
    {
        $PaperPatternId = $request['PaperPatternId'];
        $listdata = DB::select('call paperpatternchildview(?)',[$PaperPatternId]); 
        return $listdata;
    }
 
    public function ExamBasedSubjectList(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ExamNameId = $request['ExamNameId'];
        $ListData = DB::select('call subjectlistbasedexam(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
        return $ListData;
    }
    public function PaperPatternDelete(Request $request)  {
        $Id = $request['ChildId'];
        $listdata = DB::select('call paperpatterndelete(?)',[$Id]); 
        return $listdata;
       
    }  
    public function inactive(Request $request)  {
        $Id = $request['Id'];
        $listdata = DB::select('call paperpatterninactive(?)',[$Id]); 
        return $listdata;
    }   
      
      public function active(Request $request)  {          
        $Id = $request['Id'];
        $listdata = DB::select('call paperpatternactive(?)',[$Id]); 
        return $listdata;
      }
}
