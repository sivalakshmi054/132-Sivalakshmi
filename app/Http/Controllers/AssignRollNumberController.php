<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class AssignRollNumberController extends Controller
{
    public function listLanguage(Request $request)
    {
        $mediumid = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $sname = $request['StudentName']!== null ? $request['StudentName'] : "";
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $employeeid = session('UserId');
        $ListData =
        db::table('studentdetailsmaster')
        ->leftjoin('gendermaster as gm', 'studentdetailsmaster.genderid', '=', 'gm.id')
        ->leftjoin('mediummasters as mm', 'studentdetailsmaster.mediumid', '=', 'mm.id')     
         ->leftjoin('studentchildtable as sct', 'studentdetailsmaster.id', '=', 'sct.studentid')
         ->leftjoin('languagemaster as lm','sct.firstlanguageid', '=', 'lm.id')
         ->leftjoin('languagemaster as lms','sct.secondlanguageid', '=', 'lms.id')
         ->leftjoin('academicyearmaster as aym', 'sct.academicyearid', '=', 'aym.id')
         ->leftjoin('coursemaster as cm', 'sct.courseid', '=', 'cm.id')
         ->leftjoin('sectionmaster as sm', 'sct.sectionid', '=', 'sm.id')
         ->join('employeeinstitution as eim', 'studentdetailsmaster.studentinstitutionid', '=', 'eim.collegeid')
        ->select(
            'studentdetailsmaster.id',
            'studentdetailsmaster.studentid',
            'studentdetailsmaster.studentname',
            'studentdetailsmaster.firstname',
            'studentdetailsmaster.lastname',
            'studentdetailsmaster.admissionnumber',
            'studentdetailsmaster.mediumid','mm.mediumname',
            'studentdetailsmaster.genderid','gm.gender',
            'studentdetailsmaster.fathername',
            'studentdetailsmaster.dob',
            'studentdetailsmaster.smobilenumber',
            'studentdetailsmaster.rollnumber',
            'aym.academicyear',
            'cm.course',
            'sm.sectionname',
            'sct.rollnumber',
            'studentdetailsmaster.isactive',
            'studentdetailsmaster.institutionid',
            'studentdetailsmaster.accountnumber',
            'lm.language',
            'lms.language as languagename',
            'sct.firstlanguageid',
            'sct.secondlanguageid',
            'studentdetailsmaster.studentinstitutionid' )
        ->whereraw("
                 (eim.employeeid = '$employeeid' )and 
                 (studentdetailsmaster.mediumid = '$mediumid' or ifnull('$mediumid',0)=0) and 
                 (sct.sectionid = '$SectionId' or ifnull('$SectionId',0)=0) and 
                 (sct.courseid = '$courseid' or ifnull('$courseid',0)=0) and 
                 (sct.academicyearid = '$AcademicYearId' or ifnull('$AcademicYearId',0)=0) and 
                 (studentdetailsmaster.studentname like concat('%','$sname','%') || ifnull('$sname','') || '%')
")
        ->get();
        return $ListData;
    }


    public function StudentHistoryadd(Request $request)
    {       
         $request['Id']=0;
         $MId=$request['Id'];
         $StudentId=$request['StudentId'];
         $AcademicYearId=$request['AcademicYearId'];
         $RollNumber=$request['RollNumber'];
         $FirstLanguageId=$request['FirstLanguage'];
         $SecondLanguageId=$request['SecondLanguage'];
        
         // dd($CourseId);
 
         $Retid = DB::select('call assignrollnumber_addedit(?,?,?,?,?,?)',[$MId,$StudentId,$AcademicYearId,$RollNumber,$FirstLanguageId,$SecondLanguageId]);

    }

    public function StudentHistory(Request $request)
    {
       
        $data = [
        'FirstLanguage'=>$request['FirstLanguage'],
        'SecondLanguage'=>$request['SecondLanguage'],
        'RollNumber'=>$request['RollNumber']];
        
	// dd($data);
		if($request['StudentId']>0)
		{
             $update = DB::table('studentdetailsmaster')->where('id', $request['StudentId'])->update($data);
            
                  return $request['Id'];
            
		 }
    }
    


    public function LanguageList()
    {
        $data = DB::table('languagemaster')->select('id','Language')->orderBy('language','asc')->get();
        return $data;
    }

 
    public function EditLanguage(Request $request)
    {
        $data = ['firstlanguage'=>$request['FirstLanguage'],'secondlanguage'=>$request['SecondLanguage'],'rollnumber'=>$request['RollNumber']];
        
		if($request['Id']>0)
	
		{
             $update = DB::table('studentdetailsmaster')->where('id', $request['Id'])->update($data);
            
                  return $request['Id'];
            
		 }
    }
    public function RollNo_Duplicate(Request $request)
    {
        $Id=$request["Id"];
        $RollNumber = $request["RollNumber"];

        $listdata = DB::select('call student_rollnumber_sp_duplicatechecking(?,?)',[$Id,$RollNumber]); 
            return $listdata;
    }


  
}
