<?php

namespace SchoolManagement\Http\Controllers;
use SchoolManagement\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Session;
use Auth;
use DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    
      use AuthenticatesUsers;
      protected $username = 'username';
      protected $redirectTo = '/Home';
      protected $guard = 'web';
        
   public function postlogin(Request $request)
    {
       
    //     // $auth = Auth::guard('web')->attempt(['username'=>$request->username,
    //     // 'password'=>$request->password,'active'=>1]);
       
    //     // if($auth)
    //     // {
    //     //     return redirect()->route('Home');
    //     // }

    //     //return redirect()->route('/');

    //     $UserName=$request['UserName'];
    //     //$Password=$request['Password'];
    
    //     $Listdata = DB::select('CALL Login_SP_CheckPassword(?)',[$UserName]);
    //     $d = array();

    //    // $UserId=0;
    //     foreach($Listdata as $d){
            
    //         if($d->Val==1)
    //         {

    //             $UserId = $d->Id;

    //             $request->session()->put('UserId', $UserId);

    //             //return $sesId;
    //             $value = session('UserId');
      
    //             //return view('PageDefault',['UserId'=>$value]);

    //        return redirect()->route('Home',['UserId'=>$value]);
    //         //compact(['UserId', 'value'])
    //         //return redirect()->route('Home',compact(['UserId','value']));

    //         }
          
           return redirect()->route('Home');
         
        // }

        //dd($d->Val);
    }

    public function Loginaccess(Request $request)
    {
     

        $UserName=$request['UserName'];
        $Password=$request['Password'];
       
        $Listdata = DB::select('call login_sp_checkpassword(?)',[$UserName]);
        
        return $Listdata;

        //$UserId=0;
        // foreach($Listdata as $d){
            
        //     if($d->Val==1)
        //     {

        //         $UserId = $d->Id;

        //        // $value = new array();
        //         $request->Session()->put('UserId', $UserId);
                
        //         $Sessionvalue = Session('UserId');


        //         //$newCompete = new \stdClass();

        //        // $newCompete->UserId = $value;

        //         array_push($Listdata, $Sessionvalue);

        //         return $Listdata;

        //         //$request->session()->forget('UserId');
               
        //         // dd($value);
               

        //     }
           
        //   }
  }


     //Session functionality

     public function loginaccessSessionData()
     {
        $value = session('UserId');
         //dd($ListData);
        // echo "loginaccessSessionData";
        return $value;

     }

     public function login_storeSessionData(Request $request){

        $request->session()->put('$User_Id');
        //return $request;
        echo "Data has been added to session";
     }
     public function login_deleteSessionData(Request $request){
        $request->session()->forget('$ListData');
        echo "Data has been removed from session.";
     }

    public function getlogin()
    {

      return view('login');
        
    }



    public function getlogout()
    {
       // Auth::guard('web')->logout();


       //  return redirect()->route('/');

       $Id= Session('UserId');


       $ListData = DB::select('call employee_sp_logout(?)',[$Id]);

       if($ListData!=0)
       {
           return redirect()->route('/');
       }

    }

        
    public function Changepassword(Request $request)
    {
        //$UserId=session()->getId('Id');
        //svar_dump($UserId);
       //$data = ['Id'=>session()->getId('Id'),'password'=>$request['password']];

        //$update = DB::table('users')->where('Id', session()->getId('Id'))->update($data);
       // return $request['Id'];
      // dd(session()->getId('Id'));
        //return session()->getId('Id');
        
        $Id=$request['Id'];
        $NewPassword=$request['NewPassword'];
        $OldPassword=$request['OldPassword'];
        $NewPassword=$request['confirmpassword'];
        $data = ['id'=>$request['Id'],'password'=>$request['NewPassword']];
        $update = DB::table('users')->where('id', $request['Id'])->update($data);
        

    }

    
 

    public function Resetpassword(Request $request)
    {
        $data = 
        [
        'referenceid'=>$request['ReferenceId'],
        'password'=>$request['Password']
        ];
        $update = DB::table('managelogins')->where('referenceid', $request['ReferenceId'])->update($data);
        return $request['ReferenceId'];

        // $data = ['Id'=>$request['Id'],'password'=>$request['password']];
        // $update = DB::table('users')->where('Id', $request['Id'])->update($data);
        // return $request['Id'];
        
    }

     public function Passwordpolicyvalidations(Request $request)
     {
        $Id = $request['Id']!== 0 ? $request['Id'] : 0;
       
        $ListData =
        DB::table('passwordpolicy')
         ->select('passwordpolicy.id',
        'passwordpolicy.minlength',
        'passwordpolicy.maxlength',
        'passwordpolicy.minonenumchar',
        'passwordpolicy.minonespecchar',
        'passwordpolicy.withoutchar',
        'passwordpolicy.allowusername')
        ->whereraw("
                 (passwordpolicy.id = '$Id' or ifnull('$Id',0)=0)            
                 ")
        ->get();
         return $ListData;
         }
      


    public function AddEditManageLogin(Request $request)
    {       
        $data = ['id'=>$request['Id'],'logintypeid'=>$request['LoginTypeId'],
        'referenceid'=>$request['ReferenceId'],
        'username'=>$request['UserName'],
        'password'=>$request['Password']];        
       
        if($request['Id']==0)
		{
        $insert = DB::table('managelogins')->insertGetId($data);
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
             $update = DB::table('managelogins')->where('id', $request['Id'])->update($data);
             return $request['Id'];
            
		 }
    }

    public function LoginTypeNameList(Request $request)
    {

    $data = DB::table('employeetypemaster')
    ->leftjoin('manageemployee as etm', 'managelogins.logintypeid', '=', 'etm.id')
    ->leftjoin('studentdetailsmaster as stm')
    ->select('employeetypemaster.id','manageemployee.employeename','manageemployee.isactive')
    ->get();
    return $data;
    }

    public function EmployeeNameautofill(Request $request)
    {
    $id = $request['Id'];
    $data = DB::table('manageemployee')
    ->select('manageemployee.id','manageemployee.employeename','manageemployee.isactive')
    ->where('manageemployee.id', $id)
    ->get();
    return $data;
    }

    public function StudentNameautofill(Request $request)
    {
    $id = $request['Id'];
    $data = DB::table('studentdetailsmaster')
    ->select('studentdetailsmaster.id','studentdetailsmaster.studentname','studentdetailsmaster.isactive')
    ->where('studentdetailsmaster.id', $id)
    ->get();
    return $data;
    }

    public function Manageloginsinglelist(Request $request)
    {
        //$Id = $request['Id'];
        // $ListData =
        // DB::table('ManageLogins')
       
        // ->leftJoin('employeetypemaster as ETM', 'ManageLogins.LoginTypeId', '=', 'ETM.Id')
        // ->leftJoin('studentdetailsmaster as STM', 'ManageLogins.ReferenceId', '=', 'STM.Id')
        // ->leftJoin('manageemployee as MEM', 'ManageLogins.ReferenceId', '=', 'MEM.Id')

        // ->select('ManageLogins.Id','ManageLogins.UserName','ManageLogins.Password','ETM.EmployeeType',
        // 'MEM.EmployeeName',
        // 'STM.StudentName',
        // 'ManageLogins.IsActive')
        // ->where('ManageLogins.Id', $id)
        // ->get();
        $Id = $request['Id'];
        $ListData = DB::select('call managelogin_sp_singlelist(?)',[$Id]);
        return $ListData;
    }

    public function UserNamePolicylist()
    {
        // $Id = $request['Id']!== 0 ? $request['Id'] : 0;
      
        $ListData =
         DB::table('usernamepolicy')
         ->join('commonseparator as un', 'usernamepolicy.username_separator', '=', 'un.id')
         ->join('commonseparator as uns', 'usernamepolicy.un_separator', '=', 'uns.id')
         ->join('commonseparator as uni', 'usernamepolicy.unincseparator', '=', 'uni.id')
         ->join('commonseparator as es', 'usernamepolicy.email_separator', '=', 'es.id')
         ->join('commonseparator as ems', 'usernamepolicy.em_separator', '=', 'ems.id')
         ->join('commonseparator as emi', 'usernamepolicy.emincseparator', '=', 'emi.id')
       ->select('usernamepolicy.id','usernamepolicy.username_char','usernamepolicy.username_firstnametype','usernamepolicy.username_separator',
       'usernamepolicy.username_lastchar','usernamepolicy.username_lastnametype','usernamepolicy.un_char','usernamepolicy.un_firstnametype',
       'usernamepolicy.un_separator','usernamepolicy.un_lastchar','usernamepolicy.un_lastnametype','usernamepolicy.unincseparator',
       'usernamepolicy.email_char',
       'usernamepolicy.email_firstnametype','usernamepolicy.email_separator','usernamepolicy.email_lastchar',
       'usernamepolicy.email_lastnametype','usernamepolicy.em_char',
       'usernamepolicy.em_firstnametype','usernamepolicy.em_separator',
       'usernamepolicy.em_lastchar','usernamepolicy.em_lastnametype',
       'usernamepolicy.emincseparator','un.separator','uns.separator',
       'uni.separator',
       'es.separator',
       'ems.separator',
       'emi.separator') 
        // ->whereraw("
        //          (usernamepolicy.Id = '$Id' or ifnull('$Id',0)=0)         
        //          ")
        ->get();
        return $ListData;
    }

    public function ManageLoginsearch(Request $request)
  
    {
      
      $LoginTypeId = $request['LoginTypeId']!== 0 ? $request['LoginTypeId'] : 0;
          $Name = $request['Name']!== 0 ? $request['Name'] : 0;    
          $IsActive = $request['IsActive']!== 0 ? $request['IsActive'] : 0;
          // $ListData =
          // DB::table('ManageLogins')
  
          // ->leftJoin('employeetypemaster as ETM', 'ManageLogins.LoginTypeId', '=', 'ETM.Id')
          // ->leftJoin('studentdetailsmaster as STM', 'ManageLogins.ReferenceId', '=', 'STM.Id')
          // ->leftJoin('manageemployee as MEM', 'ManageLogins.ReferenceId', '=', 'MEM.Id')
  
          // ->select('ManageLogins.Id','ManageLogins.UserName','ManageLogins.Password','ETM.EmployeeType',
          // 'MEM.EmployeeName','MEM.Mobile','ManageLogins.LoginTypeId','ManageLogins.ReferenceId',
          // 'ManageLogins.IsActive',
          // 'STM.StudentName')
          // ->whereraw("
          //          (ManageLogins.LoginTypeId = '$LoginTypeId' or ifnull('$LoginTypeId',0)=0) and                
          //          (ManageLogins.UserName like concat('%','$UserName','%') || ifnull('$UserName','') || '%')            
          //          ")
          // ->get();
          $ListData = DB::select('call managelogin_sp_list(?,?,?)',[$LoginTypeId,$Name,$IsActive]);
          
  return $ListData;
      
      
      }
    



    public function ManageLogin_Resetpassword(Request $request)
    {
        $data = ['id'=>$request['Id'],'password'=>$request['Password']];
        $update = DB::table('managelogins')->where('id', $request['Id'])->update($data);
        return $request['Id'];
    }

    public function ManageLogin_Inactive(Request $request)  {
        $id = $request['Id'];
        $inactive = DB::table('managelogins')->where('id', $id)->update(['isactive'=>'0']);
        if($inactive == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }   
      
      public function ManageLogin_Active(Request $request)  {          
        $id = $request['Id'];
        $active = DB::table('managelogins')->where('id', $id)->update(['isactive'=>'1']);
        if($active == true)
        {
            return 1;
        }
        else
        {
           return 0;
        }
    }


      public function Managelogin_view(Request $request)
       {
       
        $Id = $request['Id'];
        $ListData = DB::select('call managelogin_sp_singlelist(?)',[$Id]);
        return $ListData;
        }

        public function Login_InsertUpdate(Request $request)
        {

         $Id = $request['Id'];
         $UserName = $request['UserName'];
        // $Password = $request['Password'];
         $Password = base64_encode($request['Password']);
         $DeviceType = $request['DeviceType'];
         $Sys_TimeDifference = $request['Sys_TimeDifference'] !== null ? $request['Sys_TimeDifference'] : "";
         $Browser_Version = $request['Browser_Version'] !== null ? $request['Browser_Version'] : "";
         $Login_Country = $request['Login_Country'] !== null ? $request['Login_Country'] : "";
         $Login_City = $request['Login_City'] !== null ? $request['Login_City'] : "";
         $Login_IpAddress = $request['Login_IpAddress'] !== null ? $request['Login_IpAddress'] : "";
         $Login_Latitude = $request['Login_Latitude'] !== null ? $request['Login_Latitude'] : "";
         $Login_Longtitude = $request['Login_Longtitude'] !== null ? $request['Login_Longtitude'] : "";
         $ListData = DB::select('call employeelogin_sp_insertupdate(?,?,?,?,?,?,?,?,?,?,?)',[$Id,$UserName,$Password,
                            $DeviceType,$Sys_TimeDifference, $Browser_Version, $Login_Country, $Login_City , 
                            $Login_IpAddress, $Login_Latitude, $Login_Longtitude]);

        foreach($ListData as $d){
            
            if($d-> data > 0)
            {
                $data = $d->data;
                $UserId = $d->employeeid;
                $EmpName = $d->empname;                
                $request->Session()->put('UserId', $UserId);
                $request->Session()->put('EmpName', $EmpName);                
                $Sessionvalue = Session('UserId','EmpName');

                //array_push($ListData, $Sessionvalue);

                if($DeviceType=="Mob" and $data=="1")
                    return $ListData;
                else if($DeviceType=="Mob" and $data!="1")
                    return null;
                else
                    return $ListData;

                }          
            }
         } 

         public function Login_ResetPassword(Request $request)
         {
          
          $Id = $request['Id'];
        //   $NewPasssword = ($request['NewPasssword']);
        //   $OldPassword = ($request['OldPassword']);
        //   $confirmpassword = ($request['confirmpassword']);
          $NewPasssword = base64_encode($request['NewPasssword']);
          $OldPassword = base64_encode($request['OldPassword']);
          $confirmpassword = base64_encode($request['confirmpassword']);
          $ModifiedUser_Id =$request['ModifiedUser_Id'];
  
          $ListData = DB::select('call login_sp_changepassword(?,?,?,?,?)',[$Id,$NewPasssword,$OldPassword,$confirmpassword,$ModifiedUser_Id]);
          return $ListData;
          }
  

  
        public function ManageloginStaffNamelist()
         {
          $ListData = DB::select('call managelogins_addpageemployeelist()');
          return $ListData;
          }
          public function LoginHistory(Request $request)
          {
             
            $UserName = $request['UserName'];
           $Password = base64_encode($request['Password']);
          
           // $Password = ($request['Password']);
           $Data = DB::select('call employeeloginhistory(?,?)',[$UserName,$Password]);
        
           return $Data;
           } 
           public function PasswordHistory(Request $request)
           {
              
             $id = $request['id'];          
           
            $Data = DB::select('call getpasswordhistory(?)',[$id]);
         
            return $Data;
            }
            public function resetpassword_forget(Request $request)
            {                             
             $Resultlst= array();            
             $Emailid = $request['resetmailid'];   
               
             $viewData = DB::select('call login_sp_forgetpassword(?)',[$Emailid]);
            
             foreach($viewData as $value)
             {    
                 if($value->id > 0) 
                {      
                   
                        $id=$value->id;
                        $username = $value->username;
                        $password = base64_encode((Str::random(10)));  
                        $newpassword =  base64_decode($password);
                        $data = DB::select('call employeelist_password_update(?,?)',[$id,$password]);   
                            
                            $to_name = $value->username;
                            $to_email =  $request['resetmailid'];   
                            $title = 'Reset Password'; 
                            $content = "Your New Password is    :  "    .$newpassword. "" ;
                            $data = array('name'=>$to_name);
                            Mail::send([], $data, function($message) use ($content,$username,$Emailid,$password,$newpassword) {
                            $message->setBody($content, 'text/html');

                            $message->to($Emailid)->subject
                                ();
                                $message->from(config('mail.username'),'New Password');
                            });
                            $Resultlst[]= $value->id;
                          
                            return $Resultlst;     
                } 
                else{
                    
                    return $Resultlst; 
                }
                      
             }
            return $Resultlst;
             }
             

  
}
