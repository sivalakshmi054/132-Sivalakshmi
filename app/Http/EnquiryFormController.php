<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use SchoolManagement\Models\EnquiryFormModel;


class EnquiryFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
            $ListData =
            DB::table('EnquiryFormMaster')
            ->leftJoin('GenderMaster as GM', 'EnquiryFormMaster.GenderId', '=', 'GM.Id')
            ->leftJoin('CommunityMaster as CM', 'EnquiryFormMaster.CommunityId', '=', 'CM.Id')
            ->leftJoin('SpecificationMaster as SM', 'EnquiryFormMaster.SpecificationId', '=', 'SM.Id')
            ->leftJoin('mediummasters as MM', 'EnquiryFormMaster.MediumId', '=', 'MM.Id')
            ->leftJoin('CourseMaster as C', 'EnquiryFormMaster.CourseId', '=', 'C.Id')
            ->leftJoin('ReferenceTypeMaster as RM', 'EnquiryFormMaster.ReferenceTypeId', '=', 'RM.Id')
            
            
     
            ->select('EnquiryFormMaster.Id','EnquiryFormMaster.Name','EnquiryFormMaster.ApplicationNumber','EnquiryFormMaster.SpecificationId','EnquiryFormMaster.MediumId','EnquiryFormMaster.GenderId','EnquiryFormMaster.EnquiryDate','GM.Gender','CM.Community','SM.Specification','MM.MediumName','C.Course','RM.ReferenceType','EnquiryFormMaster.Mobile','EnquiryFormMaster.IsActive')
            ->get();
            return $ListData;
        
    }
    public function list(Request $request)
    {
        //$id = $request['Id']!== 0 ? $request['Id'] : 0;
        $specificationid = $request['SpecificationId']!== 0 ? $request['SpecificationId'] : 0;
        $mediumid = $request['MediumId']!== 0 ? $request['MediumId'] : 0;
        $genderid = $request['GenderId']!== 0 ? $request['GenderId'] : 0;
        $datefrom = $request['EnquiryFromDate'] !== null ? date('Y-m-d', strtotime($request['EnquiryFromDate'])) : null;
        $dateto = $request['EnquiryToDate'] !== null ? date('Y-m-d', strtotime($request['EnquiryToDate'])) : null;
        $sname = $request['Name']!== null ? $request['Name'] : "";
        $ApplicationNumber = $request['ApplicationNumber']!== null ? $request['ApplicationNumber'] : "";
        $CourseId = $request['CourseId']!== 0 ? $request['CourseId'] : 0;
        $AcademicYearId = $request['AcademicYearId']!== 0 ? $request['AcademicYearId'] : 0;
       


        $ListData =
        DB::table('EnquiryFormMaster')
        ->leftJoin('GenderMaster as GM', 'EnquiryFormMaster.GenderId', '=', 'GM.Id')
        ->leftJoin('CommunityMaster as CM', 'EnquiryFormMaster.CommunityId', '=', 'CM.Id')
        ->leftJoin('SpecificationMaster as SM', 'EnquiryFormMaster.SpecificationId', '=', 'SM.Id')
        ->leftJoin('mediummasters as MM', 'EnquiryFormMaster.MediumId', '=', 'MM.Id')
        ->leftJoin('CourseMaster as C', 'EnquiryFormMaster.CourseId', '=', 'C.Id')
        ->leftJoin('ReferenceTypeMaster as RM', 'EnquiryFormMaster.ReferenceTypeId', '=', 'RM.Id') 
        ->leftJoin('StatusMaster as SS', 'EnquiryFormMaster.StatusId', '=', 'SS.Id') 
        ->leftJoin('AcademicYearMaster as AY', 'EnquiryFormMaster.AcademicYearId', '=', 'AY.Id') 




        ->select('EnquiryFormMaster.Id','EnquiryFormMaster.Name','EnquiryFormMaster.ApplicationNumber','EnquiryFormMaster.SpecificationId','EnquiryFormMaster.MediumId','EnquiryFormMaster.GenderId','EnquiryFormMaster.EnquiryDate','GM.Gender','CM.Community','SM.Specification','MM.MediumName','C.Course','RM.ReferenceType','EnquiryFormMaster.Mobile','EnquiryFormMaster.Result','EnquiryFormMaster.IsActive',
        'EnquiryFormMaster.StatusId',
        'SS.Status',
        'EnquiryFormMaster.AcademicYearId',
        'AY.AcademicYear')
        ->whereraw("
                 (EnquiryFormMaster.CourseId = '$CourseId' or ifnull('$CourseId',0)=0) and 
                 (EnquiryFormMaster.AcademicYearId = '$AcademicYearId' or ifnull('$AcademicYearId',0)=0) and 
                 (EnquiryFormMaster.MediumId = '$mediumid' or ifnull('$mediumid',0)=0) and 
                 (EnquiryFormMaster.GenderId = '$genderid' or ifnull('$genderid',0)=0) and
                 (EnquiryFormMaster.Name like concat('%','$sname','%') || ifnull('$sname','') || '%') and
                 (EnquiryFormMaster.ApplicationNumber like concat('%','$ApplicationNumber','%') || ifnull('$ApplicationNumber','') || '%') and
                 (EnquiryFormMaster.EnquiryDate >= '$datefrom' or ifnull('$datefrom',0)=0) and
                 (EnquiryFormMaster.EnquiryDate <= '$dateto' or ifnull('$dateto',0)=0) 
                 ")
        ->orderBy('Id','asc')
        ->get();
        return $ListData;
    }

    public function addEnquiry(Request $request)
    {
        
        $CommunityId=$request['CommunityId'] !== null ? $request['CommunityId'] : 0;
        $SpecificationId=$request['SpecificationId'] !== null ? $request['SpecificationId'] : 0;
        $ReferenceTypeId=$request['ReferenceTypeId'] !== null ? $request['ReferenceTypeId'] : 0;
        
        $enqdate=date('Y-m-d', strtotime($request['EnquiryDate'])); 
        $DOB=date('Y-m-d', strtotime($request['DOB'])); 

		$data = [
            'Id'=>$request['Id'],
            'ApplicationNumber'=>$request['ApplicationNumber'],
            'EnquiryDate'=>$enqdate,
            'Name'=>$request['Name'],
            'AcademicYearId'=>$request['AcademicYearId'],
            'DOB'=>$DOB,
            'Age'=>$request['Age'],
            'GenderId'=>$request['GenderId'],
            'CommunityId'=>$CommunityId,
            'FatherName'=>$request['FatherName'],
            'MotherName'=>$request['MotherName'],
            'MediumId'=>$request['MediumId'],
            'SpecificationId'=>$SpecificationId,
            'CourseId'=>$request['CourseId'],
            'LastCourse'=>$request['LastCourse'],
            'Mobile'=>$request['Mobile'],
            'AnotherContactNumber'=>$request['AnotherContactNumber'],
            'Email'=>$request['Email'],
            'Result'=>$request['Result'],
            'Address'=>$request['Address1'],
            'Address2'=>$request['Address2'],
            'CountryId'=>$request['CountryId'],
            'StateId'=>$request['StateId'],
            'CityId'=>$request['CityId'],
            'PinCode'=>$request['PinCode'],

            'ReferenceTypeId'=>$ReferenceTypeId,
            'Relation'=>$request['Relation'],
            'RelationType'=>$request['RelationType'],
            'Remarks'=>$request['Remarks'],
            'StatusId'=>$request['StatusId']
        ];
        
		if($request['Id']==0)
		{
        $insert = DB::table('EnquiryFormMaster')->insertGetId($data);
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
             $update = DB::table('EnquiryFormMaster')->where('Id', $request['Id'])->update($data);
            
                  return $request['Id'];
            
		 }
    }


    
    public function ViewEnquiry(Request $request)
    {
        $id = $request['Id'];
        $ListData =
        DB::table('EnquiryFormMaster')
        ->leftJoin('GenderMaster as GM', 'EnquiryFormMaster.GenderId', '=', 'GM.Id')
        ->leftJoin('CommunityMaster as CM', 'EnquiryFormMaster.CommunityId', '=', 'CM.Id')
        ->leftJoin('SpecificationMaster as SM', 'EnquiryFormMaster.SpecificationId', '=', 'SM.Id')
        ->leftJoin('MediumMasters as MM', 'EnquiryFormMaster.MediumId', '=', 'MM.Id')
        ->leftJoin('CourseMaster as C', 'EnquiryFormMaster.CourseId', '=', 'C.Id')
        ->leftJoin('ReferenceTypeMaster as RM', 'EnquiryFormMaster.ReferenceTypeId', '=', 'RM.Id')
        
        ->leftJoin('statemaster as S', 'EnquiryFormMaster.StateId', '=', 'S.Id')
        ->leftJoin('countrymaster as CMM', 'EnquiryFormMaster.CountryId', '=', 'CMM.Id')
        ->leftJoin('locationmaster as LM', 'EnquiryFormMaster.CityId', '=', 'LM.Id')
        ->leftJoin('AcademicYearMaster as AY', 'EnquiryFormMaster.AcademicYearId', '=', 'AY.Id')
        ->leftJoin('StatusMaster as SS', 'EnquiryFormMaster.StatusId', '=', 'SS.Id') 

 
        ->select('EnquiryFormMaster.Id',
        'EnquiryFormMaster.ApplicationNumber',
        'EnquiryFormMaster.EnquiryDate',

        'EnquiryFormMaster.Name',
        'EnquiryFormMaster.AcademicYearId','AY.AcademicYear',
        'EnquiryFormMaster.GenderId',
        'GM.Gender',
        'EnquiryFormMaster.DOB',
        'EnquiryFormMaster.Age',
        'EnquiryFormMaster.FatherName',
        'EnquiryFormMaster.MotherName',
        'EnquiryFormMaster.CommunityId','CM.Community',
        'EnquiryFormMaster.SpecificationId','SM.Specification',
        'EnquiryFormMaster.Address',
        'EnquiryFormMaster.Address2',
        'EnquiryFormMaster.PinCode',
        'EnquiryFormMaster.CountryId','CMM.CountryName',
        'EnquiryFormMaster.StateId','S.StateName',
        'EnquiryFormMaster.CityId','LM.LocationName',
        'EnquiryFormMaster.MediumId','MM.MediumName as Medium',
        'EnquiryFormMaster.CourseId','C.Course',
        'EnquiryFormMaster.LastCourse',
        'EnquiryFormMaster.Result','EnquiryFormMaster.Email',
        'EnquiryFormMaster.Mobile',
        'EnquiryFormMaster.AnotherContactNumber',
        'EnquiryFormMaster.ReferenceTypeId','RM.ReferenceType',
        'EnquiryFormMaster.Relation',
        'EnquiryFormMaster.RelationType',
        'EnquiryFormMaster.Remarks',
        'EnquiryFormMaster.IsActive',
        'EnquiryFormMaster.StatusId',
        'SS.Status')
        ->where('EnquiryFormMaster.Id',$id)
        ->get();
        return $ListData;
        
    }
   

    public function addSiblingDetails(Request $request)
    {
        
      

		$data = [
            'Id'=>$request['Id'],
            'EnquiryId'=>$request['EnquiryId'],
            'SiblingName'=>$request['SiblingName'],
            'SiblingCourseId'=>$request['SiblingCourseId'],
        
         
        ];
        
		if($request['Id']==0)
		{
        $insert = DB::table('SiblingDetails')->insertGetId($data);
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
             $update = DB::table('SiblingDetails')->where('Id', $request['Id'])->update($data);
            
                  return $request['Id'];
            
		 }
    }

    public function Siblinglist(Request $request)
    {
        $EnquiryId = $request['EnquiryId'];
        $data = DB::table('SiblingDetails as SD')
        ->Join('EnquiryFormMaster as EF', 'SD.EnquiryId', '=', 'EF.Id')
        ->leftJoin('CourseMaster as C', 'SD.SiblingCourseId', '=', 'C.Id')
 
        ->select(
        'SD.Id',
        'SD.EnquiryId',
        'SD.SiblingName',
        'SD.SiblingCourseId',
        'C.Course'

        )
        
       // ->Where('FP.StudentId', $StudentId)
        ->whereraw(
            "(SD.EnquiryId = '$EnquiryId' or ifnull('$EnquiryId',0)=0)"
        )
        
         ->get();
        return $data;
    }
    public function inactive(Request $request)  {
        $id = $request['Id'];
        $inactive = DB::table('EnquiryFormMaster')->where('Id', $id)->update(['IsActive'=>'0']);
        if($inactive == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }   
      
      public function active(Request $request)  {          
        $id = $request['Id'];
        $active = DB::table('EnquiryFormMaster')->where('Id', $id)->update(['IsActive'=>'1']);
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    } 


    public function ApplicationNo_Duplicate(Request $request)
    {
            $Id=$request["Id"];
            $ApplicationNumber = $request["ApplicationNumber"];
            $AcademicYearId = $request["AcademicYearId"];

            $listdata = DB::select('CALL ApplicationNumber_SP_Duplicatechecking(?,?,?)',[$Id,$ApplicationNumber,$AcademicYearId]); 
             return $listdata;

      

    }
    
}
