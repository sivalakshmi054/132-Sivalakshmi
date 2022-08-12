<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class QuestionBankController extends Controller
{
  
    public function QuestionSectionList(Request $request)
    {
        $InstitutionId=$request['InstitutionId'];
        //$data = DB::table('QuestionPaperSectionMaster')->select('Id','QuestionPaperSection', 'IsActive')->where('InstitutionId',$InstitutionId)->orderBy('Id','asc')->get();
        $data = DB::table('questionpapersectionmaster')->select('id','questionpapersection', 'isactive')->where('institutionid',$InstitutionId)->orderBy('id','asc')->get();
        return $data;
    }

    public function PaperTypeList(Request $request)
    {
        $InstitutionId=$request['InstitutionId'];

        $data = DB::table('papertypemaster')->select('id','papertype')
        ->where('institutionid',$InstitutionId)
        ->orderBy('id','asc')->get();
        return $data;
    }
    public function CourseBasedExamList()
    {
        $data = DB::table('questionbank')->select('id','courseid','examnameid')->orderBy('id','asc')->get();
        return $data;
    }
    
    public function CourseBasedExamLists(request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ListData = DB::select('call coursebasedexamname(?,?)',[$AcademicYearId,$CourseId]);
        
        return $ListData;
    }

    public function listQuestionBank(Request $request)
    {
        $AcademicYearId=$request['QBAcademicYearId'];
        $CourseId=$request['QBCourseId'];
        $examnameid=$request['QBExamNameId'];
        $papertypeid = $request['PaperTypeId'];
        $QBSubjectId = $request['QBSubjectId'];
        $IsActive = $request['IsActive'];
         $data = DB::select('call questionbanklist(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$papertypeid,$QBSubjectId,$IsActive]);
         return $data;
    }

    public function addQuestionBank(Request $request)
    {      
        $Id=$request['Id']==null ? 0: $request['Id'];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $MediumId=$request['MediumId'];
        $ExamNameId=$request['ExamNameId'];
        $SubjectId=$request['SubjectId'];
        $PaperTypeId=$request['PaperTypeId'];
        $InstitutionId=$request['InstitutionId'];
        
        $data = DB::select('call questionbank_sp_insertupdate(?,?,?,?,?,?,?,?,?)',[$Id,$InstitutionId,$AcademicYearId,$CourseId,$MediumId,$ExamNameId,$SubjectId,$PaperTypeId,session('UserId')]);

        $QuestionBankId = $data[0]->p_id;

        foreach($request['QuestionsList'] as $item=>$QuestionsList)
        {
            $QuestionpaperSectionId=$QuestionsList['QuestionpaperSectionId'];
            $Questions=$QuestionsList['Questions'];
            $QuestionNo=$QuestionsList['QuestionNo'];
            
            $data = DB::select('call questionbankchild_sp_insertupdate(?,?,?,?,?)',[$QuestionBankId,$QuestionpaperSectionId,$Questions,$QuestionNo,session('UserId')]);
        }
        return $data;		
    }
    public function updateQuestionBankHindi(Request $request)
    {
        $QuestionBankId=$request['Id'];
        foreach($request['QuestionsList'] as $item=>$QuestionsList)
        {
            $QuestionpaperSectionId=$QuestionsList['QuestionpaperSectionId'];
            $Questions=$QuestionsList['Questions'];
            $QuestionNo=$QuestionsList['QuestionNo'];
            
            $data = DB::select('call questionbankchildhindi_sp_insertupdate(?,?,?,?,?)',[$QuestionBankId,$QuestionpaperSectionId,$Questions,$QuestionNo,session('UserId')]);
        }
        return $data;		
    }
    public function viewQuestionBank(Request $request)
    {
        $Id = $request['Id'];
        $data = DB::select('call questionbankview(?)',[$Id]);

        $childdata = DB::select('call questionbankchildview(?)',[$Id]);
        return array(
            'question'=>$data,
			'child' => $childdata
        );
    }

    public function SingleQuestionBank(Request $request)
    {
        $Id = $request['Id'];
        
        $data = DB::select('call questionbanksingleview(?)',[$Id]);
        return $data;        
     }

     public function QuestionBankinactive(Request $request)  {
        $Id = $request['Id'];
        $data = DB::select('call questionbankinactive(?)',[$Id]);
        return $data;
      }   
      
      public function QuestionBankactive(Request $request)  {          
        $Id = $request['Id'];
        $data = DB::select('call questionbankactive(?)',[$Id]);
        return $data;
      } 

      public function QuestionPaperGeneration(Request $request)
      {            
        $AcademicYearId=$request['QBAcademicYearId'];
        $CourseId=$request['QBCourseId'];
        $examnameid=$request['QBExamNameId'];
        $papertypeid = $request['PaperTypeId'];
        $QBSubjectId = $request['QBSubjectId'];

        $data = DB::select('call questionpaper_sp_insertupdate(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$QBSubjectId,$papertypeid,session('UserId')]);
        return $data;          
       }
       public function QuestionPaperChildView(Request $request)
       {
           $AcademicYearId=$request['QBAcademicYearId'];
           $CourseId=$request['QBCourseId'];
           $examnameid=$request['QBExamNameId'];
           $papertypeid = $request['PaperTypeId'];
           $QBSubjectId = $request['QBSubjectId'];
           
            $data = DB::select('call questionpaperchildview(?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$QBSubjectId,$papertypeid]);
            return $data;
       }
       
       public function QuestionBank_GenerateCheck(Request $request)
       {
        $AcademicYearId=$request['QBAcademicYearId'];
        $CourseId=$request['QBCourseId'];
        $examnameid=$request['QBExamNameId'];
        $papertypeid = $request['PaperTypeId'];
        $QBSubjectId = $request['QBSubjectId'];
        $IsActive = $request['IsActive'];

           
           $data = DB::select('call checktime_qp_generate(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$papertypeid,$QBSubjectId,$IsActive]);
           return $data;        
        }
        public function QuestionBank_PrintCheck(Request $request)
        {
            
            $AcademicYearId=$request['QBAcademicYearId'];
            $CourseId=$request['QBCourseId'];
            $examnameid=$request['QBExamNameId'];
            $papertypeid = $request['PaperTypeId'];
            $QBSubjectId = $request['QBSubjectId'];
            $IsActive = $request['IsActive'];

            
            $data = DB::select('call checktime_qp_print(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$papertypeid,$QBSubjectId,$IsActive]);
            return $data;        
         }

         public function QuestionPaper_PrintCheck(Request $request)
         {
             
             $AcademicYearId=$request['QBAcademicYearId'];
             $CourseId=$request['QBCourseId'];
             $examnameid=$request['QBExamNameId'];
             $papertypeid = $request['PaperTypeId'];
             $QBSubjectId = $request['QBSubjectId'];
             $IsActive = $request['IsActive'];
 
             
             $data = DB::select('call check_qp_print(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$examnameid,$papertypeid,$QBSubjectId,$IsActive]);
             return $data;        
          }
         public function ExamBasedSubjectList_Print(Request $request)
         {
             $AcademicYearId = $request['AcademicYearId'];
             $CourseId = $request['CourseId'];
             $ExamNameId = $request['ExamNameId'];
             $ListData = DB::select('call subjectlistbasedexam_print(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]);
             return $ListData;
         }
         public function QPScan_Upload(Request $request)
         {
         //$Id=$request['id']; 
    
         if($request->hasFile('file'))
         {
    
             $imageFileType = strtolower(pathinfo($request->file('file'),PATHINFO_EXTENSION));
             
             $storagePath = public_path('Uploads\\');
         
             $filename = $request->file('file') ->store('/Images\Question Paper');
             //To split filename and file directory
             $var = preg_split("#/#", $filename);
         
             $filenameExt = $var[1];
             
             $data =  DB::select('call questionpaper_filepath_insertupdate(?,?,?)',[$filenameExt, $storagePath.$filenameExt,session('UserId')]);
             
             $success = True;
             return array(
                 'success' => $success,
                 'message' => "Uploaded Successfully",
                 'data' => $data
          
             );
             
          }
         
             
         }

         public function Update_filename(Request $request)
         {
             $Id = $request['Id'];
             $File_Name = $request['File_Name']; 
             
             $data = DB::select('call update_sp_filepath(?,?)',[$Id,$File_Name]);
             return $data;        
          }
}
