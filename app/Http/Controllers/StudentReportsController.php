<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class StudentReportsController extends Controller
{
    public function ListStudentReport(Request $request)
    {
        $AcademicYearId = $request['AcademicYearId'];
        $CourseId = $request['CourseId'];
        $SectionId = $request['SectionId'];
      
        $listdata = DB::select('call studentreport_list(?,?,?)',
        [$AcademicYearId,$CourseId,$SectionId]); 
        return $listdata;
    }
    
}
