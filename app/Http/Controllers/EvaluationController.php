<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Mail;
class EvaluationController extends Controller
{   
  
 
    
    public function Evaluation_InsertUpdate(Request $request)
    {
        $Id=$request['Id']==null ? 0: $request['Id'];
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $ExamId=$request['ExamId'];
        $SubjectId=$request['SubjectId'];
        $Evaluation_Status_Id=$request['Evaluation_Status_Id'];
        $data = DB::select('call evaluation_addedit(?,?,?,?,?,?,?)',[$Id,$InstitutionId,$AcademicYearId,$CourseId,$ExamId,$SubjectId,$Evaluation_Status_Id]);
        //return $data;

        $QuestionBankId = $data[0]->p_Id;
        
        foreach($request['EvaluationList'] as $item=>$EvaluationList)
        {
            $Id=$EvaluationList['Id'];
            $InstitutionId=$EvaluationList['InstitutionId'];
            $AcademicYearId=$EvaluationList['AcademicYearId'];
            $EvaluationMasterId=$EvaluationList['EvaluationMasterId'];
            $sectionId=$EvaluationList['sectionId'];
            $QuestionId=$EvaluationList['QuestionId'];
            $QuestionStatusId=$EvaluationList['QuestionStatusId'];
            $Marks=$EvaluationList['Marks'];
            $Remarks=$EvaluationList['Remarks'];
           
            
            $data = DB::select('call evaluationchild_sp_insertupdate(?,?,?,?,?,?,?,?,?)',[$Id,$$InstitutionId,$AcademicYearId,$EvaluationMasterId,$sectionId,$QuestionId,$QuestionStatusId,$Marks,$Remarks]);
        }
        return $data;	
    }

    public function Evaluation_list(Request $request)
    {
     
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $EvaluatedId=$request["EvaluatedId"];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];
        $Evaluation_Status_Id=$request["Evaluation_Status_Id"];
        
      
        $listdata = DB::select('call evaluation_list(?,?,?,?,?,?,?)',[$InstitutionId,$AcademicYearId,session('UserId'),$CourseId,$SubjectId,$ExamId,$Evaluation_Status_Id]); 
        return $listdata;
    }
   
    public function Update_Evaluation_Status(Request $request)  {
   
        $Id = $request['Id'];
        $Evaluation_Status_Id=$request["Evaluation_Status_Id"];
        $DeleteData = DB::update('call evaluation_status_update(?,?)',[$Id,$Evaluation_Status_Id]);
        $submit_headerData = DB::select('call evaluation_list_submit(?,?)',[$Id,$Evaluation_Status_Id]); 
        $submitData = DB::select('call evaluation_summary_submit(?)',[$Id]); 
       
        foreach($submit_headerData as $value)
        {    
            $to_name = $value->employeename;
            $to_email =  $value->email; 
            $refcode = $value->refcode ;
            $subjectname = $value->subjectname ;
            $title = "Ref. Code : " .$refcode. "Subject : " .$subjectname. "" ; 
        }
        $contentdiv = "";
        $contentdiv = '<html> 
        <table  cellpadding="0" padding-bottom="25px;" cellspacing="10%" st-table="emptydata" style="width: 100%;border:1px solid #ccc" st-safe-src="rowcollection" class="table table-striped table-bordered">
        <thead>
     
        <tr style="text-align: center">
                       
                        <th st-ratio="20" st-sort="totalquestion">
                                Sect. Name</th>
                        <th st-ratio="15" st-sort="ab_qrcode">
                                Ques No.</th>                              
                        <th st-ratio="20" st-sort="totalquestion">
                                Max. Marks</th>
                        <th st-ratio="15" st-sort="totalquestion_attempted">
                                Attempted Status</th>
                        <th st-ratio="15" st-sort="totalquestion_notattempted">
                                Marks Obtained</th>
                        
                    </tr>

        </thead>
        <tbody>                       
        </tbody>  ';
        foreach($submitData as $valuesubmit) 
        { 
            $contentdiv = $contentdiv.'<tr>
                                            <td>'.$valuesubmit->questionpapersection.' </td>
                                            <td>'.$valuesubmit->questionno.'</td> 
                                            <td>'.$valuesubmit->max_marks.' </td> 
                                            <td>'.$valuesubmit->question_status.' </td>  
                                            <td>'.$valuesubmit->marks.'</td>
                                        </tr> ';
                                 
        
        }
        $contentdiv = $contentdiv.'</tbody></table></html>';
        $data =   array('name'=>$to_name);
       

    Mail::send([], $data, function($message) use ($data,$contentdiv,$to_email){
      $message->setBody($contentdiv , 'text/html' );

      $message->to('yu_sindhu@yahoo.co.in')->subject('AB Status');
          $message->from(config('mail.username'),'AB Status');
      });
   
  echo "HTML Email Sent. Check your inbox.";
  return  $title;
    
  
  }
    public function EvaluationMaster_Count(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $InstitutionId = $request['InstitutionId'];
        $EvaluatedId = $request['EvaluatedId'];
        $CourseId=$request["CourseId"];
        $SubjectId=$request["SubjectId"];
        $ExamId=$request["ExamId"];

        $ViewData = DB::select(' call evaluationmater_count(?,?,?,?,?,?)',[$AcademicYearId,$InstitutionId,session('UserId'),$CourseId,$SubjectId,$ExamId,]);
        return $ViewData;
    }
    public function evaluationsubmit_sentmail(Request $request)
    {                             
        $to_name = 'sindhu';
        $to_email =  'yu_sindhu@yahoo.co.in';  
        $title = 'AB Status'; 
        // $name = $value->employeename;
        // $mail=$value->mail;
        $allocate_date='june10';
        $subjectname='ss';
        $evaluation_status='submitted';
        $refcode='refcode';
        $totalquestion_attempted='10';
        $totalquestion_notattempted='20' ;
        $content = 'hi';
        $data =   array('name'=>$to_name);
       

        Mail::send([], $data, function($message) use ($data,$content,$to_email){
          $message->setBody($content , 'text/html' );

          $message->to($to_email)->subject("hi");
              $message->from(config('mail.username'),'AB Status');
          });
       
      echo "HTML Email Sent. Check your inbox.";
      
    }

    public function Evaluation_count_by_subject(Request $request)
    {
        $SubjectId=$request["SubjectName"];
        $listdata = DB::select('call evaluation_count_by_subject(?)',[$SubjectId]); 
      //  print_r($listdata);exit;
        return view($listdata);
    }

    public function subject_evaluator_reports(){
        $ViewData = DB::select('call subject_evaluator_report()');
        return $ViewData;
    }
}