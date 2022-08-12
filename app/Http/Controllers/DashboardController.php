<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class DashboardController extends Controller
{

    public function AttendanceList(Request $request) {

        $data = DB::select('call get_attendance_list');
          
        return $data;        

    }
    public function ExamcenterwiseList(Request $request) {

        $data = DB::select('call get_attendace_centerwise');
          
        return $data;        

    }
    public function EvaluationList(Request $request) {

        $data = DB::select('call getevaluationlist');
          
        return $data;        

    }
    public function Evaluation_Checker_List(Request $request) {

        $data = DB::select('call getevaluation_evaluatorlist');
          
        return $data;        

    }
    public function Dashboard_graph(request $request) {
        $EvaluatorId = $request['EvaluatorId']!== 0 ? $request['EvaluatorId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $SubjectId = $request['SubjectId']!== 0 ? $request['SubjectId'] : 0;

     
        $users = DB::select('call  getevaluation_evaluatorlist_graph (?,?,?)',[$EvaluatorId,$ExamCenterId,$SubjectId]);
       return $users;
    } 
    public function evaluation_subjectgraph(request $request) {
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        

     
        $users = DB::select('call  getevaluatorlist_subjectgraph (?,?)',[$InstitutionId,$ExamCenterId]);
       return $users;
    } 
    public function marks_detailedgraph(request $request) {
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        

     
        $users = DB::select('call  getmarks_detailedgraph (?,?)',[$InstitutionId,$ExamCenterId]);
       return $users;
    } 
    public function attendance_subjectgraph(request $request) {
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        

     
        $users = DB::select('call  getattendance_subjectgraph (?,?)',[$InstitutionId,$ExamCenterId]);
       return $users;
    } 
    public function attendance_detailedgraph(request $request) {
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        

     
        $users = DB::select('call  getattendance_detailedgraph (?,?)',[$InstitutionId,$ExamCenterId]);
       return $users;
    } 

    public function abchecker_list(request $request) {
      
        $users = DB::select('call  abchecker_list ()');
       return $users;
    } 
    public function evaluation_summary_report(request $request) {
        if( empty( $request['studenDate'] ) ){
            $selectedTime = date('d-m-Y H:i:s');
            echo $selectedTime;
$endTime = strtotime("+330 minutes", strtotime($selectedTime));
$date= date('Y-m-d h:i:s', $endTime);
        }else{
            $date =  date( "Y-m-d H:i:s", strtotime( $request['studenDate'] ."+330 minutes" ) );
        }
        echo $date;
        $list = DB::select('call  evaluation_summary_report ()');
       return $list;
    } 
}