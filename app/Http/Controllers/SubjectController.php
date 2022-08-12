<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function index()
        {
            $Subjects = DB::select('call subjecttypelist()');
            $AcademicYears = DB::select('call academicyearlist()');
            $Courses = DB::select('call courselist()');
            //Sdd($Subjects);        
           return view('Settings.Organiser.SubjectList',compact('Subjects','AcademicYears','Courses'));
        }
    
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        //dd($request->all());
        $SId=0;
        $SubjectName = $request['SubjectName'] !== null ? $request['SubjectName'] : "";
        $SubjectTypeId = $request['SubjectTypeId']!== null ? $request['SubjectTypeId'] : "";

        $ListData = DB::select('call  subjectmaster_sp_list(?,?,?)',[  $SId,$SubjectName, $SubjectTypeId]); 
        //dd($ListData);
        $Subjects = DB::select('call subjecttypelist()');
        $AcademicYears = DB::select('call academicyearlist()');
        $Courses = DB::select('call courselist()');
        
        $FilterData = $request->only(['SubjectName','SubjectTypeId']);

        // dd($FilterData);
        return view('Settings.Organiser.SubjectList', ['ListData' =>$ListData ,'Subjects'=> $Subjects,'AcademicYears'=> $AcademicYears,'Courses'=>$Courses,'FilterData'=>$FilterData])
                ->with('i', ($request->input('pagcve', 1) - 1) * 10);
    }
    public function store(Request $request)
    {
       // return $request->all();
        $request['Id']=0;
        $SId=$request['Id'];
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $SubjectName=$request['SubjectName'];
        $SubjectTypeId=$request['SubjectTypeId'];
        $Description=$request['Description'];
       
        $StoreId=DB::select('call subjectmaster_sp_insertupdate(?,?,?,?,?,?)',[$SId,$AcademicYearId, $CourseId,$SubjectName,$SubjectTypeId,$Description]); 
        //dd($StoreId);
        $id= $StoreId[0]->p_id;
        
        return redirect()->route('Subject.List',['Id'=>$id]);  
    }
    public function List($id)
    {
        $SId = $id !== 0 ? $id : 0; 
        $SubjectName = "";
        $SubjectTypeId =null;
        $ListData = DB::select('call subjectmaster_sp_list(?,?,?)',[$SId,$SubjectName,$SubjectTypeId]); 
        $Subjects = DB::select('call subjecttypelist()');
        $AcademicYears = DB::select('call academicyearlist()');
        $Courses = DB::select('call courselist()');

        return view('Settings.Organiser.SubjectList', ['ListData' =>  $ListData,'Subjects'=> $Subjects,'AcademicYears'=> $AcademicYears,'Courses'=>$Courses])
                ->with('i', (0));
    }
    public function show($id)    
    {
       //dd($id);   
        $ViewData = DB::select('call subjectmaster_sp_view(?)',[$id]);
       // dd($ViewData);
        return view('Settings.Organiser.SubjectShow',compact('ViewData'));
    }    
    
    public function edit($id)
    {    
        //dd($id);
        $EditData = DB::select('call subjectmaster_sp_view(?)',[$id]);
        //dd($EditData);   
        $Subjects = DB::select('call subjecttypelist()');
        $AcademicYears = DB::select('call academicyearlist()');
        $Courses = DB::select('call courselist()');   
          return view('Settings.Organiser.SubjectEdit',compact('EditData','Subjects','AcademicYears','Courses'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {  
        $SId=$id;
        $AcademicYearId=$request['AcademicYearId'];
        $CourseId=$request['CourseId'];
        $SubjectName=$request['SubjectName'];
        $SubjectTypeId=$request['SubjectTypeId'];
        $Description=$request['Description'];
       
        DB::select('call subjectmaster_sp_insertupdate(?,?,?,?,?,?)',[$SId,$AcademicYearId, $CourseId,$SubjectName,$SubjectTypeId,$Description]);

        return redirect()->route('Subject.List',['id'=>$SId]); 
         
    }   
    public function active($id) {
        DB::select('call subjectmaster_sp_inactive(?)',[$id]);
        return redirect()->route('Subject.List',['id'=>0]);
        }
        
    public function inactive($id) {
        DB::select('call subjectmaster_sp_active(?)',[$id]);
        return redirect()->route('Subject.List',['id'=>0]);
    }
    public function subject_wise_reports(){
        ini_set('max_execution_time', 1200);
        $ViewData = DB::select('call subjectwise_status_allocation_report()');
        return $ViewData;
    }
}


