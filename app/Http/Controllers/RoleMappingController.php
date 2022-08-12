<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class RoleMappingController extends Controller
{
    public function UserRoleList(Request $request)
    {
        $Id = $request['Id']!== 0 ? $request['Id'] : 0;
        $UserRollName = $request['UserRollName']!== null ? $request['UserRollName'] : "";    
        $ListData =
        DB::table('userroles')
          ->select('userroles.id','userroles.userrollname')
        ->whereraw("
        (userroles.userrollname like concat('%','$UserRollName','%') || ifnull('$UserRollName','') || '%')            
                 ")
        ->get();
        return $ListData;
    }
    public function UserRoleListEmployee(Request $request)
    {
        $Id = $request['Id']!== 0 ? $request['Id'] : 0;
        $UserRollName = $request['UserRollName']!== null ? $request['UserRollName'] : "";    
        $ListData =
        DB::table('userroles')
          ->select('userroles.id','userroles.userrollname')
        ->whereraw("
        (userroles.userrollname like concat('%','$UserRollName','%') || ifnull('$UserRollName','') || '%')            
                 ")
        ->get();
        return $ListData;
    }
    
    public function AddUserRole(Request $request)
    {       
        $data = ['id'=>$request['Id'],'userrollname'=>$request['UserRollName'],'modifieduser_id'=>1];        
       
        if($request['Id']==0)
        {
        $insert = DB::table('userroles')->insertGetId($data);
        if($insert == true)
        {
            return $insert;
        }
        else
        {
            return 0;
        }
        }
        else
        {
           // $ViewData= DB::table('userroles')->select('userroles.Id','userroles.UserRollName')->where('Id',$request['Id'])->get();
            //dd($ViewData);
             $update = DB::table('userroles')->where('id', $request['Id'])->update($data);
             return $request['Id'];
        }
    }
    
    public function Application_View(Request $request)
    {
        $id = $request['Id'];
        $ViewData= DB::table('userroles')
        ->select('userroles.id','userroles.userrollname')
        ->where('id',$id)->get();
        //dd($ViewData);
        return $ViewData;
    }


    public function GetSystemRole()
    {
        $data = DB::table('systemroles')->select('id','systemrollname')->orderBy('id','asc')->get();
        return $data;
    }

    public function AddUserRoleSystemRole(Request $request)
    {    
        $ViewData= DB::table('userrole_systemrole_mapping as us')
        ->select('systemrole_id')
        ->where('userrole_id',$request['UserRole_Id'])
        ->get();

        $arrayTemp = [];
        $i = 0;

        foreach($ViewData as $data) 
        {
            foreach ($data as $key => $val) 
            {
                $arrayTemp[$i] = $val;
                $i++;
            }
        }

        $delete = array_diff($arrayTemp, $request['SystemRole_Id']); //deleted entry
        $insert = array_diff($request['SystemRole_Id'], $arrayTemp); //inserted entry

        //dd($delete);
       if(count($delete) != 0)
       {
            foreach ($delete as $del)
            {
                $deleteData = DB::table('userrole_systemrole_mapping')->where('userrole_id', $request['UserRole_Id'])->where('systemrole_id', $del)->delete();
                // $listData = DB::table('userrole_systemrole_mapping')->where('UserRole_Id', $request['UserRole_Id'])->where('SystemRole_Id', $del)->first();

                // if(!$listData)
                // {
                //     //Nothing bla! bla!
                // }
                // else
                // {
                //     $deleteData = DB::table('userrole_systemrole_mapping')->where('UserRole_Id', $request['UserRole_Id'])->where('SystemRole_Id', $del)->delete();                        
                //     //echo $deleteData;
                // }
            }
        }

       if(count($insert) != 0)
       {
            foreach ($insert as $ins)
            {
                $listData = DB::table('userrole_systemrole_mapping')->where('userrole_id', $request['UserRole_Id'])->where('systemrole_id', $ins)->first();

                if(!$listData)
                {      
                    $data = ['id'=> 0,'userrole_id'=>$request['UserRole_Id'],'systemrole_id'=>$ins,'modifieduser_id'=>1];
                    $insertData = DB::table('userrole_systemrole_mapping')->insertGetId($data);
                    //echo $insertData; 
                }
               
            }
       }   

       $arrayTemp = "";
       $insert = "";
       $delete = "";
       return 0;
    }


    public function Userrole_SystemRole_View(Request $request)
    {
        $id = $request['Id'];
        
        $ViewData= DB::table('userrole_systemrole_mapping')
        ->leftjoin('userroles as ur','userrole_systemrole_mapping.userrole_id','=','ur.id')
        ->leftjoin('systemroles as sr','userrole_systemrole_mapping.systemrole_id','=','sr.id')
        ->select('userrole_systemrole_mapping.id','ur.userrollname','sr.systemrollname',
        'userrole_systemrole_mapping.userrole_id','userrole_systemrole_mapping.systemrole_id')
        ->where('userrole_systemrole_mapping.userrole_id',$id)->get();
        //dd($ViewData);
        return $ViewData;
    }

    public function EmployeeList(Request $request)
    {
        $Id = $request['Id']!== 0 ? $request['Id'] : 0;
        $EmployeeName = $request['EmployeeName']!== null ? $request['EmployeeName'] : ""; 
        $EmployeeNumber = $request['EmployeeNumber']!== null ? $request['EmployeeNumber'] : "";
        $DepartmentId = $request['DepartmentId']!== 0 ? $request['DepartmentId'] : 0;
        $data = DB::select('call rolemappingemployeelist_sp(?,?,?,?)',[$Id,$EmployeeName,$EmployeeNumber,$DepartmentId]);
        return $data;
    }

       
    public function EmployeeDetails_View(Request $request)
    {
        $id = $request['Id'];
        $ViewData= DB::table('manageemployee')
        ->leftjoin('departmentmaster as d', 'manageemployee.departmentid', '=', 'd.id')
        ->leftjoin('designationmaster as dm', 'manageemployee.designationid', '=', 'dm.id')
       /// ->leftjoin('managelogins as ml', 'manageemployee.id', '=', 'ml.referenceid')
        
        //)->where('manageemployee.id',$id and 'ml.username' !="null" and 'ml.password' !="null")->get();
        
        // where
        //    ml.username !="null" and password !="null" and
           
           
        ->select('manageemployee.id','manageemployee.employeename','manageemployee.employeenumber'
        ,'manageemployee.departmentid','d.departmentname','manageemployee.designationid','dm.designation'
        )->where('manageemployee.id',$id)->get();
        return $ViewData;
    }

    public function GetUserRole()
    {
        $data = DB::table('userroles')->select('id','userrollname')->orderBy('id','asc')->get();
        return $data;
    }

    public function AddApplicationRoleMapping(Request $request)
    {      

        $ApplicationData = DB::table('rollmapping as us')
        ->select('applicationroleid')
        ->where('userid',$request['Id'])
        ->get();

        $arrayTemp=[];
        $i = 0;

        foreach($ApplicationData as $data) 
        {
            foreach ($data as $key => $val) 
            {
                $arrayTemp[$i] = $val;
                $i++;
            }
        }


        $delete = array_diff($arrayTemp, $request['ApplicationRoleId']); //deleted entry
        $insert = array_diff($request['ApplicationRoleId'], $arrayTemp); //inserted entry
      

      if(count($delete) != 0)
       {
            foreach ($delete as $del)
            {
                $deleteData = DB::table('rollmapping')->where('userid', $request['UserId'])->where('applicationroleid', $del)->delete();
            }
       }

       if(count($insert) != 0)
       {
            foreach ($insert as $ins)
            {
                $listData = DB::table('rollmapping')->where('userid', $request['UserId'])->where('applicationroleid', $ins)->first();

                if(!$listData)
                {      
                    $data = ['id'=> 0,'userid'=>$request['UserId'],'applicationroleid'=>$ins,'modifieduser_id'=>1];
                    $insertData = DB::table('rollmapping')->insertGetId($data);
                }
               
            }
       } 

    }

    public function ApplicationRoleMapping_SP_View(Request $request)
    {
        $Id = $request['Id'];
        $ViewData= DB::table('rollmapping')
        ->leftjoin('manageemployee as ur','rollmapping.userid','=','ur.id')
        ->leftjoin('userroles as sr','rollmapping.applicationroleid','=','sr.id')
        //->leftjoin('managelogins as ml', 'ur.id', '=', 'ml.referenceid')
        
        //)->where('manageemployee.id',$id and 'ml.username' !="null" and 'ml.password' !="null")->get();
        
        ->select('rollmapping.id','sr.userrollname','rollmapping.userid',
        'rollmapping.applicationroleid')
        ->where('rollmapping.userid',$Id)->get();
        return $ViewData;
    }

    public function ApplicationRoleList_SP_View(Request $request)
    {
        $Id = $request['Id'];
        $ViewData= DB::table('userroles')
       
        ->select('userroles.id','userroles.userrollname')
        ->where('userroles.id',$Id)->get();
        return $ViewData;
    }

    public function AddEmployeeMapping(Request $request)
    {      

        $EmployeeData = DB::table('rollmapping as us')
         ->select('userid')
         ->where('applicationroleid',$request['Id'])
         ->get();

        $arrayTemp=[];
        $i = 0;

        foreach($EmployeeData as $data) 
        {
            foreach ($data as $key => $val) 
            {
                $arrayTemp[$i] = $val;
                $i++;
            }
        }


        $delete = array_diff($arrayTemp, $request['UserId']); //deleted entry
        $insert = array_diff($request['UserId'], $arrayTemp); //inserted entry
      

      if(count($delete) != 0)
       {
            foreach ($delete as $del)
            {
                $deleteData = DB::table('rollmapping')->where('applicationroleid', $request['ApplicationRoleId'])->where('userid', $del)->delete();
            }
       }

       if(count($insert) != 0)
       {
            foreach ($insert as $ins)
            {
                $listData = DB::table('rollmapping')->where('applicationroleid', $request['ApplicationRoleId'])->where('userid', $ins)->first();

                if(!$listData)
                {      
                    $data = ['id'=> 0,'userid'=>$request['UserId'],'applicationroleid'=>$ins,'modifieduser_id'=>1];
                    $insertData = DB::table('rollmapping')->insertGetId($data);
                }
               
            }
       } 

    }

    public function UserRole_DuplicateChecking(Request $request)
    {
            $Id=$request["Id"];
            $UserRollName = $request["UserRollName"];
           
           
            $listdata = DB::select('call userrole_duplicatecheck(?,?)',[$Id,$UserRollName]); 

            //dd($listdata);
            return $listdata;

    }






}
