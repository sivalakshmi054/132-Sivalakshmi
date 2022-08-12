<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AnswerBookQrCodeController extends Controller
{
    public function ExamList(Request $request)
    {

        //  $AcademicYear = $request['AcademicYear']!== 0 ? $request['AcademicYear'] : 0;
        //  $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
        //  $InstitutionId = $request['InstitutionId']!== 0 ? $request['InstitutionId'] : 1;       

        $ListData = DB::select('call examnamelist'); 
        return $ListData;
    }
    public function CountStudentforqrgeneration(Request $request)
    {

        $AcademicYearId=$request['AcademicYearId'];
        $ExamNameId=$request['ExamNameId'];
    
        $data = DB::select('call countanswerbook(?,?)',[$AcademicYearId,$ExamNameId]);
        return $data;   
    }

    public function PrintAbQrcode(Request $request)
    {

        $InstitutionId=$request['InstitutionId'];
        $AcademicYearId=$request['AcademicYearId']; 
        $ExamId=$request['ExamId'];
        // $QRCode=$request['QRCode'];
    
        $ListData= DB::Select('call listabqrcode(?,?,?)',[$InstitutionId,$AcademicYearId,$ExamId]);
        return $ListData;   
    }





    
    public function addAbQrcode(Request $request)
    {

        // $Status=$request['Status'] !== null ? $request['Status'] : 0;
        // $data = [];            
        $InstitutionId=$request['InstitutionId'];
        $AcademicYearId=$request['AcademicYearId']; 
        $ExamId=$request['ExamId'];
        $count=$request['count'];

     
        $ListData= DB::Select('call addabqrcode(?,?,?,?)',[$InstitutionId,$AcademicYearId,$ExamId,$count]);
        return $ListData;
    }
}