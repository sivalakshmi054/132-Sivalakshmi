<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ExaminationMarksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listExam(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;
        $PaperPatternId = $request['PaperPatternId']!== 0 ? $request['PaperPatternId'] : 0;
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $ListData = DB::select('call examinationmarkslist_sp(?,?,?,?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId,$SubjectNameId,$PaperPatternId,$ExamCenterId,$InstitutionId]);
        return $ListData;        
    }
    
    public function listExamReport(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;
        $PaperPatternId = $request['PaperPatternId']!== 0 ? $request['PaperPatternId'] : 0;
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

        $ListData = DB::select('call examinationmarkslistreport_sp(?,?,?,?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId,$SubjectNameId,$PaperPatternId,$ExamCenterId,$InstitutionId]);
        return $ListData;        
    }
    public function AcademicYearList_Exam(Request $request)
    {
         $AcademicYear = $request['AcademicYear']!== 0 ? $request['AcademicYear'] : 0;
         $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
         $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 1;       

        $ListData = DB::select('call academicyearlist(?,?,?)',[$AcademicYear,$IsActive,$InstitutionId]); 
        return $ListData;
    }

    public function CourseBasedExamList()
    {        
        $ListData = DB::select('call examlistbasedcourse()');
        return $ListData;
    }

    public function ExamBasedSubjectList(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ExamNameId = $request['ExamNameId'];
        $ListData = DB::select('call subjectlistbasedexam(?,?,?)',[$AcademicYearId,$ExamNameId,$CourseId]);
        return $ListData;
    }


    public function addExamMark(Request $request)
    {
       
        $Id=$request['Id'];
        $Institution_Id=$request['InstitutionId'];
        $StudentId=$request['StudentId'];
        $CourseId=$request['CourseId'];
        $AcademicYearId=$request['AcademicYearId'];
        $ExamId=$request['ExamNameId'];
        $MarksObtained=$request['MarksObtained'];
        $Attendance=$request['Attendance'];
        // $Attendance=$Attendance;
        $SubjectNameId=$request['SubjectNameId'];
        $submittedby=$request['submittedby'];
       
       
   
        $ListData = DB::select('call examinationmark_addedit(?,?,?,?,?,?,?,?,?,?)',[$Id,$Institution_Id,$StudentId,$AcademicYearId,$MarksObtained,$Attendance,$SubjectNameId,$CourseId,$ExamId,$submittedby]);
       
    }
   
    public function addExamwise(Request $request)
    {      
        $data = ['id'=>$request['Id'],'studentid'=>$request['StudentId'],'marksobtained'=>$request['MarksObtained']];
        if($request['StudentId']==0)
        {
            $update = DB::table('examinationmarks')->where('studentid', $request['StudentId'])->update($data);            
            return $request['StudentId'];            
		 }
    }
    
    public function listExamwise(Request $request)
    {
      
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      

       $ListData = DB::select('call examwisemarks_sp_list(?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId]);
       return $ListData;
    }

    public function Exam_StudentList(Request $request)
    {
      
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;      
        $ExamCenterId = $request['ExamCenterId']!== 0 ? $request['ExamCenterId'] : 0;
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;

       $ListData = DB::select('call exam_studentlist(?,?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$SectionId,$MediumId, $ExamNameId,$ExamCenterId,$InstitutionId]);
       return $ListData;
    }

    public function ListExamWiseMarkEntry(Request $request)
    {
      
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $MediumId = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $SectionId = $request['SectionId']!== 0 ? $request['SectionId'] : 0;
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
        $SubjectNameId = $request['SubjectNameId']!== 0 ? $request['SubjectNameId'] : 0;      

        $ListData = DB::select('call examwisemarks_sp_list(?,?,?,?,?,?)',[$AcademicYearId,$CourseId,$MediumId,$SectionId,$ExamNameId,$SubjectNameId]);
        return $ListData;
    }
    public function Exam_SubjectList(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $ExamNameId = $request['ExamNameId'];
        $PaperPatternId = $request['PaperPatternId']!== 0 ? $request['PaperPatternId'] : 0;
        
        $ListData = DB::select('call subjectlistbasedexam_exammarks(?,?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId,$PaperPatternId]);
        return $ListData;
    }

    public function ExamCentre_List(request $request)
    {
        $Institution_Id=$request['InstitutionId'];
        $ListData = DB::select('call examcenter_list (?)',[$Institution_Id]);
       
        return $ListData;
        
    }

    public function Institution_List(request $request)
    {
    
        $ListData = DB::select('call getinstitution_list ()');
       
        return $ListData;
        
    }
    public function Institution_List_center(request $request)
    {
        $CenterId = $request['CenterId']!== 0 ? $request['CenterId'] : 0;     
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;
        $ListData = DB::select('call getinstitution_list_center (?,?)',[$CenterId,$InstitutionId]);
       
        return $ListData;
        
    }
    public function ListExamWiseMarkEntry_Submit(Request $request)
    {
      
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;     
        $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;       
        $ExamNameId = $request['ExamNameId']!== 0 ? $request['ExamNameId'] : 0;
    

        $ListData = DB::select('call examinationmark_list_submit(?,?,?,?)',[$AcademicYearId,$InstitutionId,$CourseId,$ExamNameId]);
        return $ListData;
    }
    public function Update_ExamWiseMarkEntry_Status(Request $request)  {

        $Id = $request['Id'];
        
        $RetId = DB::update('call examinationmark_status_update(?)',[$Id]);
        return  $RetId ;
    }  
}
