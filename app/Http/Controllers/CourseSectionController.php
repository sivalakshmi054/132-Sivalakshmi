<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class CourseSectionController extends Controller
 {
    public function addCourseSection(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
       $CourseId = $request['CourseId'] !== null ? implode(',',$request['CourseId']) : null;
        $SectionId = $request['SectionId'] !== null ? implode(',',$request['SectionId']) : null;
    //    $request['Id']=0;
        $MId=$request['Id'];
        $CourseId=$CourseId;
        $SectionId=$SectionId;   
        $InstitutionId = $request['InstitutionId']; 
        
        
      $Retid = DB::select('call coursesection_addedit_sp(?,?,?,?,?)',[$MId,$AcademicYearId,$CourseId,$SectionId,$InstitutionId]);
      
    }

    public function CourseSectionsearchList(Request $request)
    {
        $id = $request['Id']!== 0 ? $request['Id'] : 0;
         $academicyearid= $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
         $courseid = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
         $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
         $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 1;   
        $ListData= DB::Select('call coursesection_sp_list(?,?,?,?,?)',[$id,$academicyearid,$courseid,$IsActive,$InstitutionId]);
        return $ListData;
    }
    
    public function CourseSection_searchList(Request $request)
        {
            $Id = $request['Id']!== 0 ? $request['Id'] : 0;
            $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
            $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
          
     
              $ListData= DB::Select('call coursesection_sp_section(?,?)',[$CourseId,$AcademicYearId]);
            return $ListData;
        }    

	public function ViewCourseSection(Request $request)
    {
        $id = $request['Id'];
   
    $ListData= DB::Select('call coursesection_sp_view(?)',[$id]);
    
        return $ListData;
    }
 
    public function inactiveCourseSection(Request $request)  {
       
        $CourseId = $request['CourseId'];
        $AcademicYearId = $request['AcademicYearId'];
          $InActiveData= DB::Select('call coursesection_inactive(?,?)',[$AcademicYearId,$CourseId]);
        return $InActiveData;
    }   
      
      public function activeCourseSection(Request $request)  {          
     
        $CourseId = $request['CourseId'];
        $AcademicYearId = $request['AcademicYearId'];
 
          $ActiveData= DB::Select('call coursesection_active(?,?)',[$AcademicYearId,$CourseId]);
        return $ActiveData;
    } 
   


    public function EditCourseSection(Request $request)
    {

        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $SectionId = $request['SectionId'];   
        $InstitutionId = $request['InstitutionId'];      
      $Retid = DB::select('call coursesectionedit(?,?,?,?)',[$AcademicYearId,$CourseId,$SectionId,$InstitutionId]);
      return $Retid;
    }


public function Duplicate_CourseSection(Request $request)
    {
        $Course_Id = $request['CourseId'] == "" ? "" : implode(',',$request['CourseId']);
        $Section_Id = $request['SectionId'] == "" ? "" : implode(',',$request['SectionId']);
        
          $Id=$request['Id'];
          $AcademicYearId = $request['AcademicYearId'];
          $CourseId = $Course_Id;
          $SectionId = $Section_Id;
          $InstitutionId = $request['InstitutionId']; 
          $retflat = DB::select('call coursesection_sp_duplicatechecking(?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,
          $SectionId,$InstitutionId]);
          return $retflat;
    
      
    }
 
}