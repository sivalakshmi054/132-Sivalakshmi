<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class SubjectMasterController extends Controller
{   
   
    
    public function addSubject(Request $request)
    {
      
        $Id=$request['Id'] ==null ? 0: $request['Id'];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $SubjectName=$request['SubjectName'];
        $SubjectTypeId=$request['SubjectTypeId'];
        $SubjectParentId=$request['SubjectParentId'];
        $Remarks=$request['Remarks'];
        $HasChild=$request['HasChild'];
        $InstitutionId=$request['InstitutionId']; 
        $data = DB::select('call subject_sp_insertupdate(?,?,?,?,?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$SubjectName,$SubjectTypeId,$SubjectParentId,$Remarks,$HasChild,$InstitutionId]);
        return $data;
    }
    
    
    
    
    public function Subjectsearch(Request $request)
    {
      
        $Id= $request['Id']!== 0 ? $request['Id'] : 0;            
        $AcademicYearId= $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;            
        $CourseId= $request['CourseId']!== 0 ? $request['CourseId'] : 0;        
        $sname = $request['SubjectName1']!== null ? $request['SubjectName1'] :0;            
        $subjecttypeid = $request['SubjectTypeId']!== 0 ? $request['SubjectTypeId'] : 0;        
        $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
        $InstitutionId=$request['InstitutionId']; 
       
        $listdata = DB::select('call subjectlistfilter_sp(?,?,?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$sname,$subjecttypeid,$IsActive,$InstitutionId]); 
        return $listdata;      
  }
  
  public function SubjectNameDelete(Request $request)
    {
        $SubjectNameId=$request["SubjectNameId"];
        $listdata = DB::select('call admin_subject_sp_delete(?)',[$SubjectNameId]); 
            return $listdata;

    }
  
    public function viewSubject(Request $request)
    {
        $Id = $request['Id'];
        $listdata = DB::select('call subjectlistview_sp(?)',[$Id]); 
        return $listdata;
        
    }
    public function inactiveSubject(Request $request)  {
        $id = $request['Id'];
        $listdata = DB::select('call subject_sp_inactive(?)',[$id]); 
        return $listdata;
    }   
      
      public function activeSubject(Request $request)  {          
        $id = $request['Id'];
        $listdata = DB::select('call subject_sp_active(?)',[$id]); 
        return $listdata;
    } 
    
    
    public function SubjectChildList(Request $request)
    {
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $InstitutionId=$request['InstitutionId'];
    
        $data = DB::select('call mainsubjectslist_sp(?,?,?)',[$AcademicYearId,$CourseId,$InstitutionId]);
        return $data;
       
    }
    public function Subject_DuplicateCheck(Request $request)
    {
            $Id=$request["Id"];
            $AcademicYearId = $request["AcademicYearId"];
            $CourseId = $request["CourseId"];
            $SubjectName = $request["SubjectName"];
            $InstitutionId=$request['InstitutionId'];
            $listdata = DB::select('call subject_duplicatecheck(?,?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$SubjectName,$InstitutionId]); 
             return $listdata;
    
    }
    public function UpdateHasChild(Request $request)
    {
        $Id = $request['SubjectParentId'];
        $AcademicyearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $InstitutionId=$request['InstitutionId'];
        $listdata = DB::select('call updatehaschild(?,?,?,?)',[$Id,$AcademicyearId,$CourseId, $InstitutionId]); 
        return $listdata;
        
    }
}
