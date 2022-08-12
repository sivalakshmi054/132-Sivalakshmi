<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Settings.Organiser.ExamList');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        //dd($request->all());
        $EId=0;
        $ExamName = $request['ExamName'] !== null ? $request['ExamName'] : "";
        $ExamCode = $request['ExamCode'] !== null ? $request['ExamCode'] : "";
        
        $ListData = DB::select('call exammaster_sp_list(?,?,?)',[$EId, $ExamName,$ExamCode]); 
        // dd($EmpData);

        $FilterData = $request->only(['examname','examcode']);

        return view('Settings.Organiser.ExamList', ['listdata' => $ListData,'filterdata' => $FilterData])
                ->with('i', ($request->input('pagcve', 1) - 1) * 10);
    } 
    public function List($id)
    {
        $EId = $id !== 0 ? $id : 0; 
        $ExamName = '';
        $ExamCode = '';
        
        
        $ListData = DB::select('call exammaster_sp_list(?,?,?)',[$EId,$ExamName,$ExamCode]); 
        
        
        return view('Settings.Organiser.ExamList', ['ListData' => $ListData])
                ->with('i', (0));
    }
    
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
    public function store(Request $request)
    {
        // return $request->all();
        $request['Id']=0;
        $EId=$request['Id'];
        $ExamName=$request['ExamName'];
        $Duration=$request['Duration'];
        $ExamCode=$request['ExamCode'];
        $Description=$request['Description'];
        $GradeA1=$request['GradeA1'];
        $GradeA2=$request['GradeA2'];
        $GradeB1=$request['GradeB1'];
        $GradeB2=$request['GradeB2'];
        $GradeC1=$request['GradeC1'];
        $GradeC2=$request['GradeC2'];
        $GradeD=$request['GradeD'];
        $GradeE=$request['GradeE'];

        
    //    dd($Duration);
        $ExId=DB::select('call  exammaster_sp_insertupdate(?,?,?,?,?,?,?,?,?,?,?,?,?)',[$EId,$ExamName,$Duration,$ExamCode,$Description,$GradeA1,$GradeA2,$GradeB1,$GradeB2,$GradeC1,$GradeC2,$GradeD,$GradeE]); 
       
        
        $id=$ExId[0]->p_id;
        
        return redirect()->route('Exam.List',['id'=>$id]); 
    }

    public function show($id)    
    {
       // dd($id);   
        $viewdata = DB::select('call exammaster_sp_view(?)',[$id]);
        //dd($viewdata);
        return view('Settings.Organiser.Examshow',compact('viewdata'));
    }    
    
    public function edit($id)
    {    
        //dd($id);
        $editdata = DB::select('call exammaster_sp_view(?)',[$id]);
        // $name=$editdata[0]->Grade;
        // $GradeName = explode(',',$name);
         // dd($editdata[0]->Grade);  
        //  $editdata[0]->Grade= $GradeName; //dd($editdata[0]->Grade);  
        // dd($editdata); 
          return view('Settings.Organiser.ExamEdit',compact('editdata'));
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
        $EId=$id;
        $ExamName=$request['ExamName'];
        $Duration=$request['Duration'];
        $ExamCode=$request['ExamCode'];
        $Description=$request['Description'];
        $GradeA1=$request['GradeA1'];
        $GradeA2=$request['GradeA2'];
        $GradeB1=$request['GradeB1'];
        $GradeB2=$request['GradeB2'];
        $GradeC1=$request['GradeC1'];
        $GradeC2=$request['GradeC2'];
        $GradeD=$request['GradeD'];
        $GradeE=$request['GradeE'];
       
        DB::select('call  exammaster_sp_insertupdate(?,?,?,?,?,?,?,?,?,?,?,?,?)',[$EId,$ExamName,$Duration,$ExamCode,$Description,$GradeA1,$GradeA2,$GradeB1,$GradeB2,$GradeC1,$GradeC2,$GradeD,$GradeE]);
        return redirect()->route('Exam.List',['id'=>$id]); 
    }   
    public function active($id) {
        DB::select('call exammaster_sp_inactive(?)',[$id]);
        return redirect()->route('Exam.List',['id'=>0]);
        }
        
    public function inactive($id) {
        DB::select('call exammaster_sp_active(?)',[$id]);
        return redirect()->route('Exam.List',['id'=>0]);
    }
}


