<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;


class InstitutionMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function InstitutionMasterAddEdit(Request $request)
    {
        $Id=$request['Id'];
        $institutionName=$request['InstitutionName'];
        $institutionPrintName=$request['InstitutionPrintName'];
        $Address1=$request['Address1'];
        $Address2=$request['Address2'];
        $CountryId=$request['CountryId'];
        $StateId=$request['StateId'];
        $CityId=$request['CityId'];
        $Pincode=$request['Pincode'];
        $ContactNumber=$request['ContactNumber'];
        $MobileNumber=$request['MobileNumber'];
        $FaxNumber=$request['FaxNumber'];
        $Email=$request['Email'];
        $Website=$request['Website'];
        $SchoolLogo=$request['SchoolLogo'];
        $PhotoName=$request['PhotoName'];
        $photoFullPath=$request['PhotoFullPath'];
        $created_at=Session('UserId');
        $updated_at=Session('UserId');
        $FromMonthId=$request['FromMonthId'];
        $ToMonthId=$request['ToMonthId'];
        $data = DB::select('call institutionmaster_sp_addedit(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [$Id,$institutionName,$institutionPrintName,$Address1,$Address2,$CountryId,$StateId,$CityId,$Pincode,$ContactNumber,
        $MobileNumber,$FaxNumber,$Email,$Website,$SchoolLogo,$PhotoName,$photoFullPath,$created_at,$updated_at,$FromMonthId,$ToMonthId]);
        return $data;
    }
    public function Institutionmaster_List(Request $request)
    {
            $listdata = DB::select('call institution_list()'); 
             return $listdata;

    }
    public function Institution_View(Request $request)
    {
        $Id = $request['Id'];
        $ViewData = DB::select(' call intitution_view_sp(?)',[$Id]);
        return $ViewData;
    }

    public function upload(Request $request)
    {
       
        if($request->hasFile('file'))
        {
            $imageFileType = strtolower(pathinfo($request->file('file'),PATHINFO_EXTENSION));
            //dd($imageFileType);
            $storagePath  = public_path('Uploads\\');
            $filename = $request->file('file') ->store('/Images');        
            //To split filename and file directory
           
            $var = preg_split("#/#", $filename); 
            $filenameExt = $var[1];
            $filedata = ['DirectoryPath'=>$storagePath,
             //'Filepath'=>$var[1]."/".$var[2],
             'Filepath'=>"Images/".$var[1],
            'Filename'=>$filenameExt
        ];
        return $filedata;
        }
         
        return 0;
    }    
    public function Institutioninactive(Request $request)  {

        $Id = $request['Id'];
        $DeleteData = DB::update('call institution_inactive(?)',[$Id]);
        return  $DeleteData ;
    }   
      
      public function InstitutionActive(Request $request)  {        

        $Id = $request['Id'];
        $DeleteData = DB::update('call institution_sp_active(?)',[$Id]);
        return  $DeleteData ;
    } 
}
