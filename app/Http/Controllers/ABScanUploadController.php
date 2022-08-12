<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class ABScanUploadController extends Controller
{   
  
    public function QRCodeList(Request $request)
    {
        $InstitutionId=$request["InstitutionId"];
        $AcademicYearId=$request["AcademicYearId"];
        $QRCode=$request["QRCode"];
        $listdata = DB::select('call qrcode_list(?,?,?)',[$InstitutionId,$AcademicYearId,$QRCode]); 
        return $listdata;
    }
    
    public function ABQR_ClearPhotos(Request $request)
    {
        $storagePath = public_path('Uploads\\');

        $InstitutionId=$request["InstitutionId"];
        $QRCode=$request["QRCode"];
        if (\File::isDirectory($storagePath.'/Images/AnswerBook/'.$QRCode))
        {
            foreach (new \DirectoryIterator($storagePath.'/Images/AnswerBook/'.$QRCode.'/') as $fileInfo) {
                if(!$fileInfo->isDot()) {
                    unlink($fileInfo->getPathname());
                }
            }
        }

        DB::select('call ab_scan_cleardetails(?, ?)',[$InstitutionId, $QRCode]); 
    }

    public function ABQR_ScanUpload(Request $request)
    {
        $storagePath = public_path('Uploads\\');

        $InstitutionId=$request["InstitutionId"];
        $QRCode=$request["QRCode"];
        $seq=$request["QRSequence"];
        $files = $request['fileToUpload'];
        $filename = $files ->store('/Images/'.$QRCode);    

        $filenameExt = $filename;
        
        DB::select('call ab_scanupload_addedit(?, ?, ?, ?, ?, ?)',[$InstitutionId, $QRCode, $filenameExt, $storagePath.$filenameExt,$seq+1,session('UserId')]); 
                
        return $files;
    }
    public function addUploadPhoto(Request $request)
    {
        $data =array();

        $count = count($request['fileToUpload']);
        $storagePath = public_path('Uploads\\');

        $InstitutionId=$request["InstitutionId"];
        $QRCode=$request["QRCode"];
        //if(!Storage::exists($storagePath.'/Images/'.$QRCode.'/'))
        if (\File::isDirectory($storagePath.'/Images/AnswerBook/'.$QRCode))
        {
            foreach (new \DirectoryIterator($storagePath.'/Images/AnswerBook/'.$QRCode.'/') as $fileInfo) {
                if(!$fileInfo->isDot()) {
                    unlink($fileInfo->getPathname());
                }
            }
        }

        DB::select('call ab_scan_cleardetails(?, ?)',[$InstitutionId, $QRCode]); 


        for ($i = 0; $i < $count; $i++) 
        {   
            $files = $request['fileToUpload'][$i];
            $filename = $files ->store('/Images/AnswerBook/'.$QRCode);       
             
            //$var = preg_split("#/#/#", $filename);
        
            $filenameExt = $filename;
            // $filedata = ['DirectoryPath'=>$storagePath,
            // // 'Filepath'=>$var[1]."/".$var[2],
            // 'Filepath'=>"Images/".$QRCode.'/'.$var[1],
            // 'Filename'=>$filenameExt
            // ];
            array_push($data, $filename);
            
            $InstitutionId=$request["InstitutionId"];
            $QRCode=$request["QRCode"];
            DB::select('call ab_scanupload_addedit(?, ?, ?, ?, ?, ?)',[$InstitutionId, $QRCode, $filenameExt, $storagePath.$filenameExt,$i+1,session('UserId')]); 
                
        }
        return $files;
    }
}
