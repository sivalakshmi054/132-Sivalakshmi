<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ExamTimetableController extends Controller
{


    public function AddExamTimeTable(Request $request)
    {
        // $ExamDate=date('Y-m-d', strtotime($request['ExaminationDate'])); 
        // // $StartTime=time('H:i:s', strtotime($request['StartTime'])); 
        // $StartTime=date('Y-m-d h:i', strtotime($request['StartTime']));
        // $EndTime=date('Y-m-d h:i', strtotime($request['EndTime']));

        $data = ['id'=>$request['Id'],
        'academicyearid'=>$request['AcademicYearId'],
        'courseid'=>$request['CourseId'],
        'examinationid'=>$request['ExaminationId']];
        // 'SubjectId'=>$request['SubjectId'],
        // 'ExaminationDate'=>$ExamDate,
        // // 'StartTime'=>$request['StartTime'],
        // 'StartTime'=>$StartTime,
        // 'EndTime'=> $EndTime,
        // 'Remarks'=>$request['Remarks']];
        
		if($request['Id']==0)
		{
        $insert = DB::table('examtimetable')->insertGetId($data);
		if($insert == true)
		{
			return $insert;
		}else
		{
			return 0;
		}
		}
		else
		{
             $update = DB::table('examtimetable')->where('id', $request['Id'])->update($data);
             return $request['Id'];
        }
    }
    public function addExamTimetableChild(Request $request)
    {
        $Id=$request['Id']==null ? 0: $request['Id'];
        $ExamDate = $request['ExamDate'] !== null ? date('Y-m-d', strtotime($request['ExamDate'])) : null;
// dd($Id);
        $data = [
        'id'=>$Id,
        'examtimetableid'=>$request['ExamTimeTableId'],
        'subjectid'=>$request['SubjectId'],
        'starttime'=>$request['StartTime'],
        //'StartTime'=>$request['StartTime'],
         'endtime'=> $request['EndTime'],
        'examdate'=>$ExamDate,
        'remarks'=>$request['Remarks']];
        // dd($data);
        if($request['Id']==0)
		{
            $insert = DB::table('examtimetablechild')->insertGetId($data);
            if($insert == true)
            {
                return $insert;
            }else
            {
                return 0;
            }
		}
		else
		{
             $update = DB::table('examtimetablechild')->where('id', $request['Id'])->update($data);
             return $request['Id'];
        }
  }
   public function ExamTimeTableSearch(Request $request)
    {
        //$id = $request['Id']!== 0 ? $request['Id'] : 0;
        $AcademicyearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $ExamId = $request['ExaminationId']!== 0 ? $request['ExaminationId'] : 0;
        $SubjectId = $request['SubjectId']!== 0 ? $request['SubjectId'] : 0;
        // $ExamDate = $request['ExamDate'] !== null ? date('Y-m-d', strtotime($request['ExamDate'])) : null;
        // $StartTime = $request['ExamStartTime'] !== null ? date('Y-m-d', strtotime($request['ExamStartTime'])) : null;
        // $EndTime = $request['ExamEndTime'] !== null ? date('Y-m-d', strtotime($request['ExamEndTime'])) : null;
      
       


        $ListData =
        DB::table('examtimetable')
        ->leftjoin('academicyearmaster as am', 'examtimetable.academicyearid', '=', 'am.id')
        ->leftjoin('coursemaster as cm', 'examtimetable.courseid', '=', 'cm.id')
        ->leftjoin('exammaster as em', 'examtimetable.examinationid', '=', 'em.id')
        //  ->leftjoin('subjectmaster as sm', 'examtimetable.subjectid', '=', 'sm.id')
        
        ->select('examtimetable.id',
        'examtimetable.academicyearid','am.academicyear',
        'examtimetable.courseid','cm.course',
        'examtimetable.examinationid','em.examname as examination',
        'examtimetable.isactive'
        // 'examtimetable.subjectid','sm.subjectname'
       )

        ->whereraw("
                 (examtimetable.academicyearid = '$AcademicyearId' or ifnull('$AcademicyearId',0)=0) and 
                 (examtimetable.courseid = '$CourseId' or ifnull('$CourseId',0)=0) and 
                 (examtimetable.examinationid = '$ExamId' or ifnull('$ExamId',0)=0)
              
                              
                 ")
        ->orderBy('em.examname','cm.course','asc')
        ->get();
        return $ListData;
    }
    public function ExamTimeTableSearchlistChild(Request $request)
    {
        $SubjectId = $request['SubjectId'];
        $ListData = DB::select('call examtimetableitemlist(?)',[$SubjectId]);
       return $ListData;
        }
    

    public function ExamTimeTableView(Request $request)
    {
        $id = $request['Id'];
        $ListData =
        DB::table('examtimetable')
        ->leftjoin('academicyearmaster as am', 'examtimetable.academicyearid', '=', 'am.id')
        ->leftjoin('coursemaster as cm', 'examtimetable.courseid', '=', 'cm.id')
        ->leftjoin('exammaster as em', 'examtimetable.examinationid', '=', 'em.id')

        // ->leftjoin('subject as sm', 'examtimetable.subjectid', '=', 'sm.id')
        ->select('examtimetable.id',
        'examtimetable.academicyearid','am.academicyear',
        'examtimetable.courseid','cm.course',
        'examtimetable.examinationid','em.examname as examination',
        // 'examtimetable.subjectid','sm.subjectname as subject',
        // 'examtimetable.examinationdate',
        // 'examtimetable.starttime',
        // 'examtimetable.endtime',
        // 'examtimetable.remarks',
        // 'examtimetable.remarks',
        'examtimetable.isactive')
        ->where('examtimetable.id',$id)
        ->get();
        return $ListData;
        
    }
    public function   ExamTimetableChild_View(Request $request)
    {
        $ExamTimeTableId = $request['ExamTimeTableId'];

        $data = DB::table('examtimetablechild as et')//child table name

        ->join('examtimetable as ex', 'et.examtimetableid', '=', 'ex.id')
        // ->leftjoin('examtimetable as ex','et.examtimetableid','=','ex.id')
        ->leftjoin('exammaster as em', 'ex.examinationid', '=', 'em.id')
        ->leftjoin('subjectmaster as sm', 'et.subjectid', '=', 'sm.id')
        ->select(
            'et.id as childid',
            'ex.examinationid',
            'et.subjectid as id',
            'et.examdate',
            'et.remarks',
            'sm.subjectname',
            'et.starttime',
            'et.endtime',
            'et.examtimetableid',
            'et.isactive'
            )
        
           
            ->where('et.examtimetableid',$ExamTimeTableId)
            
             ->get();
            // var_dump($data);
            return $data;
        }
    
    public function ExamTimetableinactive(Request $request)  {
        $id = $request['Id'];
        $inactive = DB::table('examtimetable')->where('id', $id)->update(['isactive'=>'0']);
        if($inactive == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }   
      
      public function ExamTimetableActive(Request $request)  {          
        $id = $request['Id'];
        $active = DB::table('examtimetable')->where('id', $id)->update(['isactive'=>'1']);
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    } 
    public function CourseBasedExamList()
   {

       $ListData = DB::select('call examinationlistbasedcourse()');
       return $ListData;
   }

   public function ExamBasedSubjectList(Request $request)
   {
       $CourseId = $request['CourseId'];
       $ExamNameId = $request['ExamNameId'];
       $ListData = DB::select('call subjectbasedexam(?,?)',[$ExamNameId,$CourseId]);
       return $ListData;
   }
     
   public function EditExamTimeTable(Request $request)
   {
    $AcademicYearId=$request['AcademicYearId'];
    $CourseId=$request['CourseId'];
    $ExamNameId=$request['ExamNameId'];
       $listdata = DB::select('call examtimetableedit(?,?,?)',[$AcademicYearId,$CourseId,$ExamNameId]); 
       return $listdata;
       
   }
   public function ExamTimeTableDuplicateCheck(Request $request)
   {
    $Id=$request['Id'];
    $AcademicYearId=$request['AcademicYearId'];
    $CourseId=$request['CourseId'];
    $ExamNameId=$request['ExamNameId'];
       $listdata = DB::select('call examtimetable_duplicatechecking(?,?,?,?)',[$Id,$AcademicYearId,$CourseId,$ExamNameId]); 
       return $listdata;
   }
}