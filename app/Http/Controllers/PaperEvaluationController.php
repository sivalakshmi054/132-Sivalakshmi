<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Contracts\Filesystem\Filesystem;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use Storage;
use Carbon\Carbon;

class PaperEvaluationController extends Controller
{   
  
  public function AnswerBook_EvaluationList(Request $request)
    {
     
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $EvaluatorId=$request["EvaluatedId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
       
        
      
        $listdata = DB::select('call answerbook_evaluationlist(?,?,?,?,?,?)',[$InstitutionId,$AcademicYearId,session('UserId'),$CourseId,$SubjectId,$ExamId]); 
       
        return $listdata;
    }
    public function AnswerBook_list(Request $request)
    {
     
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $EvaluatorId=$request["EvaluatedId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
        $EvaluationMaster_Id=$request['EvaluationMaster_Id'] == null ? 0: $request['EvaluationMaster_Id'];
        
      
        $listdata = DB::select('call answerbook_list(?,?,?,?,?,?,?)',[$InstitutionId,$AcademicYearId,session('UserId'),$CourseId,$SubjectId,$ExamId,$EvaluationMaster_Id]); 
       
        return $listdata;
    }
    public function QuestionPaper_list(Request $request)
    {
     
        $Id=$request["EvaluationMasterId"];        
      
        $listdata = DB::select('call questionpaper_list(?)',[$Id]); 
        return $listdata;
    }
    public function QuestionPaper_section_list(Request $request)
    {
     
        $Id=$request["EvaluationMasterId"];
  
      
        $listchilddata = DB::select('call questionpaper_section_list(?)',[$Id]); 
        return $listchilddata;


    }
    public function QuestionPaper_Totallist(Request $request)
    {
   
        $Id=$request["EvaluationMasterId"];
        $listchilddata = DB::select('call questionpaper_totallist(?)',[$Id]); 
        return $listchilddata;
      
    }
    public function QuestionPaperChild_list(Request $request)
    {
     
        $Id=$request["questionpaperid"];
        $SectionId=$request["questionpaper_sectionid"];
        $listchilddata = DB::select('call questionpaper_child_list(?,?)',[$Id,$SectionId]); 
        return $listchilddata;

    }
    public function AnswerBookImages_list(Request $request)
    {     
        $QRCode=$request["QRCode"];       
        $listdata = DB::select('call answerbookimages_list(?)',[$QRCode]); 
        return $listdata;
    }
    
    public function Evaluation_InsertUpdate(Request $request)
    {        
        $Id=$request['Id']==null ? 0: $request['Id'];
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $ExamId=$request['ExamId'];
        $SubjectId=$request['SubjectId'];
        $Evaluation_Status_Id=$request['Evaluation_Status_Id'];
         $data = DB::select('Call Evaluation_AddEdit(?,?,?,?,?,?,?)',[$Id,$InstitutionId,$AcademicYearId,$CourseId,$SubjectId,$ExamId,$Evaluation_Status_Id]);
        // //return $data;

        // $EvaluationMasterId = $data[0]->p_Id;
    }    
        public function EvaluationChild_InsertUpdate(Request $request)
    {
        foreach($request['EvaluationList'] as $item=>$EvaluationList)
        { 

            $Id=$EvaluationList['evaluationchildid']==null ? 0: $EvaluationList['evaluationchildid'];
            $InstitutionId=$EvaluationList['institution_id'];
            $AcademicYearId=$EvaluationList['academicyear_id'];
            $EvaluationMasterId=$EvaluationList['evaluationid'];       
            $sectionId=$EvaluationList['questionpapersectionid'];
            $QuestionId=$EvaluationList['questionno'];
            $QuestionStatusId=$EvaluationList['questionstatusid'];
            $Marks=$EvaluationList['marks'];
            $Remarks=$EvaluationList['remarks'];
            $pageno=$request['pageno'];
            
           
            
            $data = DB::select('call evaluationchild_sp_insertupdate(?,?,?,?,?,?,?,?,?,?)',[$Id,$InstitutionId,$AcademicYearId,$EvaluationMasterId,$sectionId,$QuestionId,$QuestionStatusId,$Marks,$Remarks,$pageno]);
        }
        return $data;	
    }

    public function Evaluation_list(Request $request)
    {
     
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
      
        $listdata = DB::select('call evaluation_list(?,?,?,?,?)',[$InstitutionId,$AcademicYearId,$CourseId,$SubjectId,$ExamId]); 
        return $listdata;
    }

    public function Evaluation_View(Request $request)
    {
        $Id = $request['Id'];
        $EvaluationMasterId=$request['EvaluationMasterId'];
        $SectionId = $request['SectionId'];
        $QuestionNo=$request['QuestionNo'];
        $ViewData = DB::select(' call evaluation_view(?,?,?,?)',[$Id,$EvaluationMasterId,$SectionId,$QuestionNo]);
        return $ViewData;
    }
    public function EvaluationMaster_View(Request $request)
    {
        $Id = $request['Id'];
        
        $ViewData = DB::select(' call evaluationmater_view(?)',[$Id]);
        return $ViewData;
    }
     public function Evaluation_Summary(Request $request)
    {
       
        $EvaluationMasterId=$request['EvaluationMasterId'];
        $ListData = DB::select(' call evaluation_summary(?)',[$EvaluationMasterId]);
        return $ListData;
    }
    
    public function EvaluationAllocationcheck(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $InstitutionId = $request['InstitutionId'];
        $EvaluatedId = $request['EvaluatedId'];

        $ViewData = DB::select(' call evaluationallocation_check(?,?,?)',[$AcademicYearId,$InstitutionId,session('UserId')]);
        return $ViewData;
    }
    public function Evaluation_RequestList(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $InstitutionId = $request['InstitutionId'];
        $EvaluatedId = $request['EvaluatedId'];

        $ViewData = DB::select(' call evaluation_requestlist(?,?,?)',[$AcademicYearId,$InstitutionId,session('UserId')]);
        return $ViewData;
    }
    public function ExamBasedSubjectList_Timetable(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ExamNameId = $request['ExamNameId'];
        $ListData = DB::select('call subjectlistbasedexam_timetable(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
        return $ListData;
    }

    public function Evaluation_Release_Allocate(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $InstitutionId = $request['InstitutionId'];
        $EvaluatedId = $request['EvaluatedId'];

        $ViewData = DB::select(' call evaluation_release_allocate(?,?,?)',[$AcademicYearId,$InstitutionId,session('UserId')]);
        return $ViewData;
    }
    public function getABFileData(Request $request){        
        $url = Storage::disk('s3')->temporaryUrl(
            $request['FileName'], Carbon::now()->addMinutes(2)
         );
        return $url;
    }

 
  
}