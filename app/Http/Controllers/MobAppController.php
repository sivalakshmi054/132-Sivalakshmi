<?php namespace SchoolManagement\Http\Controllers;
use Illuminate\Http\Request;
use SchoolManagement\Http\Requests;
use DB;
use SchoolManagement\Models\AcademicYear;
class MobAppController extends Controller
{
    public function ExamAttendance_insert(Request $request)
    {
    
       $Institution_Id=$request['Institution_Id'];
       $ExamCentreId=$request['ExamCentreId'];
       $ExamId=$request['ExamId'];
       $StudentId=$request['StudentId'];
       $SubjectId=$request['SubjectId'];
       $HT_QRCode=$request['HT_QRCode'];
       $AB_QRCode=$request['AB_QRCode'];
       $InvigilatorId=$request['InvigilatorId'];
      
        $Data = DB::select('call examattendance_insert(?,?,?,?,?,?,?,?)',
          [$Institution_Id,$ExamCentreId,$ExamId,$StudentId,$SubjectId,$HT_QRCode,$AB_QRCode,$InvigilatorId]);
        foreach($Data as $Value)
        $returnmessage = "Saved Successfully";
        $success = True;      
         {
             $validcheck = $Value->val;          
         }
         if($validcheck==0)
         {
          $returnmessage = "Attendance already marked for this Student";
         }
          
         //if($validcheck==1)
         {
          
            return array(
               'success' => $success,               
               'message' => $returnmessage,
               'data' => $validcheck 
               
           );
          
         }
       


       }


       public function Examtimming_insert(Request $request)
       {
       
          $Institution_Id=$request['Institution_Id'];
          $CourseId=$request['CourseId'];
          $ExamCentreId=$request['ExamCentreId'];
          $StudentId=$request['StudentId'];
          $ExamId=$request['ExamId'];
          $SubjectId=$request['SubjectId'];
          $InvigilatorId=$request['InvigilatorId'];
          $EndDttime=$request['EndDttime'];
         
         
       $Data = DB::select('call examtimmingupload_insert(?,?,?,?,?,?,?,?)',
       [$Institution_Id,$CourseId,$ExamCentreId,$StudentId,$ExamId,$SubjectId,$InvigilatorId,$EndDttime]);
       foreach($Data as $Value)
       $returnmessage = "Saved Successfully";
       $success = True;
      
            {
                $validcheck = $Value->val;
             
            }
            if($validcheck==1)
            {
             
               return array(
                  'success' => $success,               
                  'message' => $returnmessage,
                  'data' => $validcheck 
                  
              );
             
            }
          
          }
          public function Examtimming_update(Request $request)
          {
          
             $Institution_Id=$request['Institution_Id'];
             $CourseId=$request['CourseId'];
             $ExamCentreId=$request['ExamCentreId'];
             $StudentId=$request['StudentId'];
             $ExamId=$request['ExamId'];
             $SubjectId=$request['SubjectId'];
             $InvigilatorId=$request['InvigilatorId'];
          
            
            
          $Data = DB::select('call examtimmingupload_update(?,?,?,?,?,?,?)',
          [$Institution_Id,$CourseId,$ExamCentreId,$StudentId,$ExamId,$SubjectId,$InvigilatorId]);
          foreach($Data as $Value)
          $returnmessage = "Saved Successfully";
          $success = True;
         
               {
                   $validcheck = $Value->val;
                
               }
               if($validcheck==1)
               {
                
                  return array(
                     'success' => $success,               
                     'message' => $returnmessage,
                     'data' => $validcheck 
                     
                 );
                
               }
             
             }
          public function ExamCentre_List(request $request)
          {
            $Institution_Id=$request['Institution_Id'];
              $ListData = DB::select('call examcentre_api (?)',[$Institution_Id]);
             
              return array(
                  'data'=>$ListData,
               'success' => 'true',
               'message' => 'ExamCenter List generated successfully'
                 
              );
          }
          public function Examnamebasedsubject_List(request $request)
          {
            $ExamId=$request['ExamId'];
            $IntitutionId=$request['IntitutionId'];
            $ExamcenterId=$request['ExamcenterId'];
              $ListData = DB::select('call examtimetablebasedsubject (?,?,?)',[$IntitutionId,$ExamId,$ExamcenterId]);
             
              return array(
                  'data'=>$ListData,
               'success' => 'true',
                
              );
            }
            
          public function ExamSubject_ByExamCenter(request $request)
          {
            $IntitutionId=$request['IntitutionId'];
            $ExamcenterId=$request['ExamcenterId'];
              $ListData = DB::select('call examsubject_sp_byexamcenter (?,?)',[$IntitutionId,$ExamcenterId]);
             
              return array(
                  'data'=>$ListData,
               'success' => 'true',
                
              );
            }
              public function HallTicketBased_StudentList(request $request)
          {
           
            $IntitutionId=$request['IntitutionId'];
            $ExamcentreId=$request['ExamcentreId'];
            $HT_QRCode=$request['HT_QRCode'];
              $ListData = DB::select('call hallticket_api (?,?,?)',[$IntitutionId,$ExamcentreId,$HT_QRCode]);
             
              return array(
                  'data'=>$ListData,
               'success' => 'true',
                
              );

          }
          public function ExamInfo_List(request $request)
          {
           
            $ExamcentreId=$request['ExamcentreId'];
              $ViewData = DB::select('call examdetails_api (?)',[$ExamcentreId]);
             
              return array(
                  'data'=>$ViewData,
               'success' => 'true',
                
              );
}
public function countTotalStudent_List(request $request)
{
    $ExamCentreId=$request['ExamCentreId'];
    $ExamId=$request['ExamId'];
    $SubjectId=$request['SubjectId'];
    $ListData = DB::select('call totalcount_api (?,?,?)',[$ExamCentreId,$ExamId,$SubjectId]);
   
    return array(
        'data'=>$ListData,
     'success' => 'true',
     
       
    );
}
public function AB_HandOver_insert(Request $request)
{

   $Institution_Id=$request['Institution_Id'];
   $ExamCentreId=$request['ExamCentreId'];
   $InvigilatorId=$request['InvigilatorId'];
   $subjectid=$request['subjectid'];
   $ExamId=$request['ExamId'];   
      
    $Data = DB::select('call abhandover_insert(?,?,?,?,?)',[$Institution_Id,$ExamCentreId,$InvigilatorId,$subjectid,$ExamId]);
    foreach($Data as $Value)
    $returnmessage = "Session started Successfully";
    $success = True;

     {
         $validcheck = $Value->val;
      
     }
     //if($validcheck==1)
     {
      
        return array(
           'success' => $success,               
           'message' => $returnmessage,
           'data' => $validcheck 
           
       );
      
     }
   


   }
   public function AB_HandOver_Update(Request $request)
   {

     $Institution_Id=$request['Institution_Id'];
     $ExamCentreId=$request['ExamCentreId'];
     $InvigilatorId=$request['InvigilatorId'];
     $subjectid=$request['subjectid'];
     $ExamId=$request['ExamId'];
     $HandedOverTo=$request['HandedOverTo'];
     $Remarks=$request['Remarks'];      
       
     $Data = DB::select('call abhandover_update(?,?,?,?,?,?,?)',[$Institution_Id,$ExamCentreId,$InvigilatorId,$subjectid,$ExamId,$HandedOverTo,$Remarks]);
  
     foreach($Data as $Value)
     {
         $InsertId = $Value->updatedstatus;
     }
    if ( $InsertId ==1 ){
        return array(
        'data'=>$Data,
        'success' => 'true',
        'message' => 'Handed over successfully'
        );
      
    }
    else {
      return array(
        'data'=>$Data,
        'success' => 'false',
        'message' => 'Handed over Failed'
      );
    }
  }
  public function ExamAttendance_Update(Request $request)
   {

     $Institution_Id=$request['Institution_Id'];
     $ExamCentreId=$request['ExamCentreId'];
     $InvigilatorId=$request['InvigilatorId'];
     $subjectid=$request['subjectid'];
     $ExamId=$request['ExamId'];
     $AB_QRCode=$request['AB_QRCode'];
      
       
     $Data = DB::select('call examattendance_update(?,?,?,?,?,?)',[$Institution_Id,$ExamCentreId,$InvigilatorId,$subjectid,$ExamId,$AB_QRCode]);
     foreach($Data as $Value)
     {
         $InsertId = $Value->updatedstatus;
     }
    if ( $InsertId ==1 ){
     return array(
     'data'=>$Data,
     'success' => 'true',
     'message' => 'Exam Attendance Updated successfully'

   );
  
 }
 else {
   return array(
     'data'=>$Data,
     'success' => 'false',
     'message' => 'Exam Attendance Update Failed'

   );
 }

  }
  public function AB_HandOverCount(Request $request)
  { 
    $ExamCentreId=$request['ExamCentreId'];
    $ExamId=$request['ExamId'];
    $SubjectId=$request['SubjectId'];
    $Data = DB::select('call abcollected_uncollectedcount(?,?,?)',[$ExamCentreId,$ExamId,$SubjectId]);
    return array(
      'data'=>$Data,
      'success' => 'true',
      'message' => 'AB Hand over Count'  
     
  );

 }

}