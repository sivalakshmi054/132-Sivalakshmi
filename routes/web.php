<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Common URL

Route::get('session/loginget','LoginController@loginaccessSessionData');
Route::get('session/loginset','LoginController@login_storeSessionData');
Route::get('session/loginremove','LoginController@logindeleteSessionData');

Route::post('CommonLoginUserPermission','CommonController@CommonLogin_UserPermission');
//Login

Route::get('getmenulist','HomepageController@Commonmenulist');

Route::post('/getLogin_InsertUpdate','LoginController@Login_InsertUpdate');

// Route::get('/',['as'=>'/','uses'=>'LoginController@getlogin']);
// Route::post('/login',['as'=>'login','uses'=>'LoginController@postlogin']);
Route::post('/getChangepassword','LoginController@Changepassword');
Route::post('/getResetpassword','LoginController@Resetpassword');

Route::group(['middleware'=>['authen','roles']],function(){
   //Route::get('/logout',['as'=>'logout','uses'=>'LoginController@getlogout']);
    //Route::get('/Home',['as'=>'Home','uses'=>'HomepageController@gethomepage']);   
});

Route::get('/logout',['as'=>'logout','uses'=>'LoginController@getlogout']);


//Common URL
Route::get('/',['as'=>'/','uses'=>'LoginController@getlogin']);
Route::post('/login',['as'=>'login','uses'=>'LoginController@postlogin']);

Route::post('/getLoginaccess','LoginController@Loginaccess');
Route::post('/getChangepassword','LoginController@Changepassword');
Route::post('/getResetpassword','LoginController@Resetpassword');
Route::get('/Home',['as'=>'Home','uses'=>'HomepageController@gethomepage']);

Route::get('UnderConstruction', ['uses'=>'RedirectController@getdefault']);

//Route::resource('SystemRoleMapping','SystemRMController');
Route::post('employee-management/search', 'EmployeeManagementController@search')->name('employee-management.search');

Route::resource('Employee','EmpController');
Route::post('EmployeeList', 'EmpController@search')->name('Employee.search');
Route::get('Employee/destroy/{Id}', ['as' => 'Employee.destroy', 'uses' => 'EmpController@getDestroy']);

//Common Transaction
Route::post('/getCommonTransactionList','CommonTransactionController@CommonTransactionList');

Route::post('/getCommonTransactionLabelList','CommonTransactionController@CommonTransactionLabelList');


Route::post('/getCommonTransaction_NameList','CommonTransactionController@CommonTransaction_NameList');
//Button_CommonTransactionList
Route::post('/getButton_CommonTransactionList','CommonTransactionController@Button_CommonTransactionList');


// General Settings
//1.ID Settings
Route::post('/getAdd_IDSettings','IdSettingsController@addIdSettings');
Route::post('/getIdSettingsList','IdSettingsController@IdSettingsList');
Route::post('/getIdTypeList','IdSettingsController@IdTypeList');
//2.Email Template
Route::post('/getEmailTemplate','GeneralSettingsController@addMail');
Route::post('/getEmailSettingsList','GeneralSettingsController@Email_SettingsList');
//3.SMS
Route::post('/getsms','GeneralSettingsController@Addsms');
Route::post('/getsmsSettingsList','GeneralSettingsController@SMS_SettingsList');
//.Settings
Route::post('/getsettings','GeneralSettingsController@Addsettings');
Route::post('/getSettingsView','GeneralSettingsController@SettingsView');
// 4.Holiday
Route::get('/getHolidayCategoryList','GeneralSettingsController@HolidayCategoryList');
Route::post('/addHolidays','GeneralSettingsController@addHoliday');
Route::post('/getHolidayList','GeneralSettingsController@HolidaySearch');
Route::post('/getHolidayView','GeneralSettingsController@HolidayView');
Route::post('/inactiveHoliday','GeneralSettingsController@Holidayinactive');
Route::post('/activeHoliday','GeneralSettingsController@Holidayactive');
Route::post('/getHolidaySingleList','GeneralSettingsController@HolidayView');


Route::post('/AddCourseMaster','GeneralSettingsController@CourseAddEdit');
Route::post('/Course_View','GeneralSettingsController@CourseView');
//Leave policy
Route::post('/Addleavepolicy','GeneralSettingsController@addLeavePolicy');
Route::post('/getLeavePolicyList','GeneralSettingsController@LeavePolicySearch');
Route::post('/getLeavePolicyView','GeneralSettingsController@viewLeavePolicy');
Route::post('/inactiveLeavePolicy','GeneralSettingsController@LeavePolicyinactive');
Route::post('/activeLeavePolicy','GeneralSettingsController@LeavePolicyactive');
Route::post('/getLeavePolicySingleList','GeneralSettingsController@viewLeavePolicy');
//Route::post('/AddLocationMaster','GeneralSettingsController@LocationAddEdit');
//Route::post('/LocationMaster_View','GeneralSettingsController@LocationView');
//Route::post('/AddDepartmentMaster','GeneralSettingsController@DepartmentAddEdit');
//Route::post('/AddGradeMaster','GeneralSettingsController@GradeAddEdit');
Route::post('/AddLocationMaster','GeneralSettingsController@LocationAddEdit');
Route::post('/LocationMaster_View','GeneralSettingsController@LocationView');
Route::post('/DepartmentMaster_View','GeneralSettingsController@DepartmentView');
Route::post('/GradeMaster_View','GeneralSettingsController@GradeView');
Route::post('/AddDepartmentMaster','GeneralSettingsController@DepartmentAddEdit');
Route::post('/AddGradeMaster','GeneralSettingsController@GradeAddEdit');
Route::post('/AddCourseMaster','GeneralSettingsController@CourseAddEdit');
Route::post('/Course_View','GeneralSettingsController@CourseView');

Route::post('/AddGradeMarkMaster','GeneralSettingsController@GradeMarkSave');
Route::post('/AddGradePointsMaster','GeneralSettingsController@GradePointsSave');
Route::post('/AddGradeNameMaster','GeneralSettingsController@GradeNameSave');


//Logincontroller
//Manage Logins
Route::post('/getAddEditManageLogin','LoginController@AddEditManageLogin');
Route::post('/getSingleManageLoginlist','LoginController@Manageloginsinglelist');
Route::post('/getStudentNameautofill','LoginController@StudentNameautofill');
Route::post('/getEmployeeNameautofill','LoginController@EmployeeNameautofill');
Route::get('/getStudentNameDetails','CommonController@StudentNameDetails');
Route::get('/getUserNamePolicylist','LoginController@UserNamePolicylist');
Route::post('/getManageLoginsearch','LoginController@ManageLoginsearch');

Route::post('/getPasswordpolicyvalidations','LoginController@Passwordpolicyvalidations');
Route::post('/getManagelogin_view','LoginController@Managelogin_view');
Route::post('/getManageLogin_Resetpassword','LoginController@ManageLogin_Resetpassword');
Route::post('/getManageLogin_Inactive','LoginController@ManageLogin_Inactive');
Route::post('/getManageLogin_Active','LoginController@ManageLogin_Active');

//Session
Route::get('session/get','SessionController@accessSessionData');
Route::get('session/set','SessionController@storeSessionData');
Route::get('session/remove','SessionController@deleteSessionData');


//BankAccounts
Route::post('/getBankList','BankAccountsController@index');
Route::post('/addBank','BankAccountsController@addBank');
Route::post('/getBankView','BankAccountsController@viewBank');
Route::post('/inactiveBank','BankAccountsController@inactive');
Route::post('/activeBank','BankAccountsController@active');
Route::post('/getSingleList','BankAccountsController@list');
//Deposit Depositlist
Route::post('/getDepositindex','BankAccountsController@Depositindex');
Route::post('/getAddDeposit','BankAccountsController@AddDeposit');
Route::post('/getView_Depositlist','BankAccountsController@View_Depsitlist');
Route::post('/getDepositlist_inactive','BankAccountsController@Depsitlist_inactive');
Route::post('/getDepositlist_active','BankAccountsController@Depsitlist_active');
Route::post('/getDepsitlist','BankAccountsController@Depsitlist');
Route::post('/getSingledepositList','BankAccountsController@Depositlist');


//BankAccounts
Route::post('/getBankList','BankAccountsController@index');
Route::post('/addBank','BankAccountsController@addBank');
Route::post('/getBankView','BankAccountsController@viewBank');
Route::post('/inactiveBank','BankAccountsController@inactive');
Route::post('/activeBank','BankAccountsController@active');
Route::post('/getSingleList','BankAccountsController@list');
//Deposit Depositlist
Route::post('/getDepositindex','BankAccountsController@Depositindex');
Route::post('/getAddDeposit','BankAccountsController@AddDeposit');
Route::post('/getView_Depositlist','BankAccountsController@View_Depsitlist');
Route::post('/getDepositlist_inactive','BankAccountsController@Depsitlist_inactive');
Route::post('/getDepositlist_active','BankAccountsController@Depsitlist_active');
Route::post('/getDepsitlist','BankAccountsController@Depsitlist');
Route::post('/getSingledepositList','BankAccountsController@Depositlist');
//BankAccounts_NameList
Route::get('/getBankAccounts_NameList','BankAccountsController@BankAccounts_NameList');

//Transfer 
Route::post('/getTransferDetails_AddEdit','BankAccountsController@TransferDetails_AddEdit');
Route::post('/geTransferDetails_View','BankAccountsController@TransferDetails_View');
Route::post('/getTransferDetails_Listsearch','BankAccountsController@TransferDetails_Listsearch');
Route::post('/getTransferDetails_inactive','BankAccountsController@TransferDetails_inactive');
Route::post('/getTransferDetails_active','BankAccountsController@TransferDetails_active');

//BankAccountNumber_Duplicate
Route::post('/getBankAccountNumber_DuplicateChecking','BankAccountsController@BankAccountNumber_DuplicateChecking');
Route::post('/getBankName_DuplicateChecking','BankAccountsController@BankName_DuplicateChecking');

//Academic Year
Route::post('/getAcademicYearList','OrganiserController@AcademicYearsearch');
Route::post('/addAcademicYear','OrganiserController@addAcademic');
Route::post('/getAcademicYearView','OrganiserController@ViewAcademicYear');
Route::post('/inactiveAcademicYear','OrganiserController@Academicinactive');
Route::post('/activeAcademicYear','OrganiserController@Academicactive');
Route::post('/getAYSingleList','OrganiserController@ViewAcademicYear');

Route::post('/getAcademicDuplicateCheck','OrganiserController@AcademicYearDuplicateCheck');
Route::post('/getAcademicPeriodDuplicateCheck','OrganiserController@AcademicPeriodDuplicateCheck');
Route::post('/getAcademicDefaultCheck','OrganiserController@AcademicDefaultCheck');
Route::post('/UpdateDefaultYear','OrganiserController@UpdateDefaultYear');

// Route::post('/AddSubjectDetailsMaster','OrganiserController@SubjectDetailsList');
//Route::post('/getSubjectDetailsList','OrganiserController@StudentSubjectlist');
//Route::post('/getViewSubjectDetailsList','OrganiserController@ViewSubjectlist');

Route::get('/getmonthlist','CommonController@MonthList');


// // Manage Employee
// Route::post('/getManageEmployeeList','ManageEmployeeController@search');
// Route::post('/addManageEmployee','ManageEmployeeController@addEmployee');
// Route::post('/getEmployeeMasterView','ManageEmployeeController@list');
// Route::post('/inactiveEmployee','ManageEmployeeController@inactive');
// Route::post('/activeEmployee','ManageEmployeeController@active');
// Route::post('/getMESingleList','ManageEmployeeController@list');
// Route::post('/PhotoEmployee','ManageEmployeeController@upload');
Route::post('/getEmployeeExperienceDelete','ManageEmployeeController@EmployeeExperienceDelete');
// Route::get('storage/Images/{filename}', function ($filename)
// {
//     $path = storage_path('public' . $filename);
//     if (!File::exists($path)) {
//         abort(404);
//     }
//     $file = File::get($path);
//     $type = File::mimeType($path);
//     $response = Response::make($file, 200);
//     $response->header("Content-Type", $type);
//     return $response;
// });

// Manage Employee
Route::post('/getManageEmployeeList','ManageEmployeeController@search');
Route::post('/addManageEmployee','ManageEmployeeController@addEmployee');
Route::post('/getEmployeeMaster_View','ManageEmployeeController@list');
Route::post('/inactiveEmployee','ManageEmployeeController@inactive');
Route::post('/activeEmployee','ManageEmployeeController@active');
Route::post('/getMESingleList','ManageEmployeeController@list');
Route::post('/getWorkflowStatusemployee','ManageEmployeeController@WorkflowStatusemployee');
Route::post('/getEmployeeRelieve','ManageEmployeeController@EmployeeRelieve');

Route::post('/getCommonEmployee_List','ManageEmployeeController@CommonEmployee_List');
Route::post('/getRelieveSingleList','ManageEmployeeController@RelieveEmployee_SingleList');


Route::post('/addEmployee_EducationalDetails','ManageEmployeeController@AddEducationalDetails');
Route::post('/EducationalDetails_View','ManageEmployeeController@EducationalDetails_View');
Route::post('/EducationalDetailsDelete','ManageEmployeeController@EducationalDetails_Delete');
Route::post('/EmployeeDelete','ManageEmployeeController@Employee_Delete');


Route::post('/getaddEmployee_PreviousDetails','ManageEmployeeController@addEmployee_PreviousDetails');
Route::post('/getupdate_Enquirystatus','ManageEmployeeController@update_Enquirystatus');
Route::post('/getEmployee_PreviousDetailsView','ManageEmployeeController@EmployeePreviousExperience_View');


Route::post('/getReleiveEmployee_List','ManageEmployeeController@ReleiveEmployee_List');
Route::post('/getEmployee_ByName','ManageEmployeeController@Employee_ByName');
Route::get('/getRelEmployee_ByName','ManageEmployeeController@RelEmployee_ByName');


Route::post('/PhotoEmployee','ManageEmployeeController@upload');
Route::get('storage/Images/{filename}', function ($filename)
{
    $path = storage_path('public' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});

//ManageLeave  


//ManageLeave  
Route::post('/getManageLeavelist','ManageLeaveController@SearchLeave');
Route::post('/getManageLeavelist2','ManageLeaveController@SearchLeave');
Route::post('/getManageLeavelist3','ManageLeaveController@SearchLeave');
Route::post('/getAddManageLeave','ManageLeaveController@AddLeave');
Route::post('/getManageLeaveView','ManageLeaveController@ViewLeave');
Route::post('/inactiveManageLeave','ManageLeaveController@inactive');
Route::post('/activeManageLeave','ManageLeaveController@active');
Route::post('/getLeaveSingleList','ManageLeaveController@ViewLeave');
Route::get('/getEmployeeNameList','ManageLeaveController@EmployeeNameList');
Route::post('/getEmployeeList','ManageLeaveController@EmployeeList');

//Leave Request

Route::post('/getShowbalance','ManageLeaveController@Showbalance');
Route::post('/getLeaveWorkFlowChangeStatus','ManageLeaveController@LeaveWorkFlowChangeStatus');
Route::post('/getAddStatus_Audit','ManageLeaveController@AddStatus_Audit');
Route::post('/getLeavePolicy_LeaveType','ManageLeaveController@LeavePolicy_LeaveType');
Route::post('/getLeaveRequest_Holiday','ManageLeaveController@LeaveRequest_Holiday');


Route::post('/getLeaveRequest_AppConfigurationtable','ManageLeaveController@LeaveRequest_AppConfigurationtable');
Route::post('/getWorkFlow_Status','ManageLeaveController@WorkFlow_Status');
Route::post('/getupdate_LeaveApprovestatus','ManageLeaveController@update_LeaveApprovestatus');

// //Leave Request

// Route::post('/getShowbalance','ManageLeaveController@Showbalance');
// Route::post('/getLeaveWorkFlowChangeStatus','ManageLeaveController@LeaveWorkFlowChangeStatus');
// Route::post('/getAddStatus_Audit','ManageLeaveController@AddStatus_Audit');

//TransactionList
Route::post('/getWorkFlowTransactionList','CommonController@WorkFlowTransactionList');


//Dynamic Master//  
Route::get('/getMasterdropdown','MasterController@Masterdropdown');
Route::post('/getMastercolumnlist','MasterController@Mastercolumnlist');
Route::post('/getMastercolumnDetails','MasterController@MastercolumnDetails');
Route::post('/getMastercolumnView','MasterController@MastercolumnView');
Route::post('/getAddMastervalues','MasterController@SaveMasterColumns');
Route::post('/getInactiveMasters','MasterController@InactiveMasters');
Route::post('/getActiveMasters','MasterController@ActiveMasters');

// General Settings
//1.ID Settings
Route::post('/getAdd_IDSettings','GeneralSettingsController@addIdSettings');
Route::post('/getIdSettingsList','GeneralSettingsController@IdSettingsList');
Route::post('/getIdTypeList','GeneralSettingsController@IdTypeList');
//2.Email Template
Route::post('/getEmailTemplate','GeneralSettingsController@addMail');
//3.SMs
Route::post('/getsms','GeneralSettingsController@Addsms');
//.Settings
Route::post('/getsettings','GeneralSettingsController@Addsettings');
Route::post('/getSettingsView','GeneralSettingsController@SettingsView');
// 4.Holiday
Route::get('/getHolidayCategoryList','GeneralSettingsController@HolidayCategoryList');
Route::post('/addHolidays','GeneralSettingsController@addHoliday');
Route::post('/getHolidayList','GeneralSettingsController@HolidaySearch');
Route::post('/getHolidayView','GeneralSettingsController@HolidayView');
Route::post('/inactiveHoliday','GeneralSettingsController@Holidayinactive');
Route::post('/activeHoliday','GeneralSettingsController@Holidayactive');
Route::post('/getHolidaySingleList','GeneralSettingsController@HolidayView');


Route::post('/AddCourseMaster','GeneralSettingsController@CourseAddEdit');
Route::post('/Course_View','GeneralSettingsController@CourseView');
//Leave policy
Route::post('/Addleavepolicy','GeneralSettingsController@addLeavePolicy');
Route::post('/getLeavePolicyList','GeneralSettingsController@LeavePolicySearch');
Route::post('/getLeavePolicyView','GeneralSettingsController@viewLeavePolicy');
Route::post('/inactiveLeavePolicy','GeneralSettingsController@LeavePolicyinactive');
Route::post('/activeLeavePolicy','GeneralSettingsController@LeavePolicyactive');
Route::post('/getLeavePolicySingleList','GeneralSettingsController@viewLeavePolicy');
//Route::post('/AddLocationMaster','GeneralSettingsController@LocationAddEdit');
//Route::post('/LocationMaster_View','GeneralSettingsController@LocationView');
//Route::post('/AddDepartmentMaster','GeneralSettingsController@DepartmentAddEdit');
//Route::post('/AddGradeMaster','GeneralSettingsController@GradeAddEdit');
Route::post('/AddLocationMaster','GeneralSettingsController@LocationAddEdit');
Route::post('/LocationMaster_View','GeneralSettingsController@LocationView');
Route::post('/DepartmentMaster_View','GeneralSettingsController@DepartmentView');
Route::post('/GradeMaster_View','GeneralSettingsController@GradeView');
Route::post('/AddDepartmentMaster','GeneralSettingsController@DepartmentAddEdit');
Route::post('/AddGradeMaster','GeneralSettingsController@GradeAddEdit');
Route::post('/AddCourseMaster','GeneralSettingsController@CourseAddEdit');
Route::post('/Course_View','GeneralSettingsController@CourseView');

Route::post('/AddGradeMarkMaster','GeneralSettingsController@GradeMarkSave');
Route::post('/AddGradePointsMaster','GeneralSettingsController@GradePointsSave');
Route::post('/AddGradeNameMaster','GeneralSettingsController@GradeNameSave');



//Help Desk
Route::post('/getHelpDeskList','HelpDeskController@Studentlist');
Route::post('/getStudentDetailsView','HelpDeskController@viewHelpDeskdetails');
Route::post('/getStudentFeesList','HelpDeskController@StudentFeelist');
Route::post('/getStudentExamList','HelpDeskController@StudentExamlist');


//4.EmailConfiguartion
Route::post('/getAddEmailConfiguration','EmailConfigurationController@AddEmailConfiguration');
Route::get('/getSchoolList','EmailConfigurationController@SchoolList');
Route::post('/getSchoolEmailConfig','EmailConfigurationController@SchoolEmailConfigList');

//Import
//Route::post('/importExcel','MaatwebsiteController@importExcel');

//Employee Import
Route::post('/importEmployeeExcel','EmployeeUploadController@importEmployeeExcel');

//Template designer
Route::post('/addTemplateDesigner','TemplateDesignerController@Addtemplatedesigner');
Route::post('/getTemplateDesignerList','TemplateDesignerController@searchtemplatedesigner');
Route::post('/getTemplatedesignerView','TemplateDesignerController@viewtemplatedesigner');
Route::post('/activeTemplateDesigner','TemplateDesignerController@activetemplatedesigner');
Route::post('/inactiveTemplateDesigner','TemplateDesignerController@inactivetemplatedesigner');
Route::post('/singleTemplateDesigner','TemplateDesignerController@SingleTemplate');

//Help Desk
Route::post('/getHelpDeskList','HelpDeskController@Studentlist');
Route::post('/getStudentDetailsView','HelpDeskController@viewHelpDeskdetails');
Route::post('/getStudentFeesList','HelpDeskController@StudentFeelist');
Route::post('/getStudentExamList','HelpDeskController@StudentExamlist');

//Menu Personalize
Route::get('/getMenu_FirstLevel_List','MenuPersonalizeController@Menu_FirstLevel_List');
Route::post('/getMenu_SecondLevel_List','MenuPersonalizeController@Menu_SecondLevel_List');
Route::post('/getMenuPersonalizeAddedit','MenuPersonalizeController@Menu_PersonalizeAddEdit');

//Role Mapping
Route::post('/getUserRoleList','RoleMappingController@UserRoleList');
Route::post('/getAddUserRole','RoleMappingController@AddUserRole');
Route::post('/getAddUserRoleSystemRole','RoleMappingController@AddUserRoleSystemRole');
Route::post('/getApplication_View','RoleMappingController@Application_View');
Route::post('/getUserrole_SystemRole_View','RoleMappingController@Userrole_SystemRole_View');
Route::get('/getSystemRolelist','RoleMappingController@GetSystemRole');
Route::post('/getEmployeeList','RoleMappingController@EmployeeList');
Route::post('/getEmployeeDetails_View','RoleMappingController@EmployeeDetails_View');
Route::get('/getUserRoleDetailslist','RoleMappingController@GetUserRole');
Route::post('/getAddApplicationRoleMapping','RoleMappingController@AddApplicationRoleMapping');
Route::post('/getApplicationRoleMapping_SP_View','RoleMappingController@ApplicationRoleMapping_SP_View');
Route::post('/getApplicationRoleList_SP_View','RoleMappingController@ApplicationRoleList_SP_View');
Route::post('/getAddEmployeeMapping','RoleMappingController@ApplicationRoleList_SP_View');
Route::post('/getUserRoleListEmployee','RoleMappingController@UserRoleListEmployee');
Route::post('/getUserRole_DuplicateChecking','RoleMappingController@UserRole_DuplicateChecking');


//Workflow 
Route::get('/getWorkflowtransactionlist','WorkFlowController@Workflowtransactionlist');
Route::post('/getWorkflowtransaction_View','WorkFlowController@Workflowtransaction_View');
Route::post('/getAddWorkflowtransaction_Status','WorkFlowController@AddWorkflowtransaction_Status');
Route::post('/getWorkflowtransaction_Status_View','WorkFlowController@Workflowtransaction_Status_View');
Route::post('/getWorkflowtransaction_Status_ListAll','WorkFlowController@Workflowtransaction_Status_ListAll');
Route::post('/getWorkflow_DuplicateChecking','WorkFlowController@Workflow_DuplicateChecking');



//SchoolMaster
Route::post('/SchoolMastersAddEdit','SchoolMasterController@SchoolMasterAddEdit');
Route::post('/getSchoolMasterView','SchoolMasterController@AddSchoolMastersView');
Route::post('/SchoolLogo','SchoolMasterController@upload');
Route::get('storage/Documents/{filename}', function ($filename)
{
    
	$path = storage_path('public' . $filename);
    
	if (!File::exists($path)) {
        
		abort(404);
    
	}
    
	$file = File::get($path);
    
	$type = File::mimeType($path);
    
	$response = Response::make($file, 200);
    
	$response->header("Content-Type", $type);
    
	return $response;

});

//MediumList
//Common Controller
Route::post('/getWorkflow_InitialStatus','CommonController@Workflow_InitialStatus');

Route::post('/getEmployeeTypeList','CommonController@EmployeeTypeList');
Route::post('/getGenderList','CommonController@GenderList');
Route::post('/getDesignationList','CommonController@DesignationList');
Route::post('/getDepartmentList','CommonController@DepartmentList');
Route::post('/getSpecificationList','CommonController@SpecificationList');
Route::post('/getMaritalStatusList','CommonController@MaritalStatusList');
Route::post('/getQualificationList','CommonController@QualificationList');
Route::post('/getReligionList','CommonController@ReligionList');
Route::post('/getBloodGroupList','CommonController@BloodGroupList');
Route::post('/getStateList','CommonController@StateList');
Route::post('/getCountryList','CommonController@CountryList');
Route::post('/getLocationList','CommonController@LocationList');
Route::post('/getBankNameList','CommonController@BankList');
Route::post('/getBranchList','CommonController@BranchList');
Route::post('/getTitleList','CommonController@TitleList');
Route::get('/getStatusList','CommonController@StatusList');
Route::post('/getcommunitylist','CommonController@CommunityList');
Route::get('/getreferencetypelist','CommonController@ReferenceTypeList');
Route::post('/getmediumlist','CommonController@MediumList');
Route::get('/getAttendanceList','CommonController@AttendanceList');
Route::get('/getLeaveTypeList','CommonController@LeaveTypeList');
Route::post('/getcourselist','CommonController@CourseList');
Route::post('/getMotherTongueList','CommonController@MotherTongueList');
Route::post('/getSectionList','CommonController@SectionList');
Route::post('/getCourseBasedSectionList','CommonController@CourseBasedSectionList');
Route::post('/getDocumentTypeList','CommonController@DocumentTypeList');
Route::post('/getyearlist','CommonController@YearList');
Route::post('/getcastelist','CommonController@CasteList');
Route::get('/getauthorizednamelist','CommonController@authorizednamelist');
Route::get('/getCertificatelist','CommonController@Certificatelist');
Route::get('/getPaymentModeType_List','CommonController@PaymentModeType_List');
Route::get('/getTerms_List','CommonController@Terms_List');
Route::get('/getFeeType_List','CommonController@FeeType_List');
Route::post('/getExamNameList','CommonController@ExamNameList');
Route::post('/getsubjecttypelist','CommonController@SubjectTypeList');
Route::get('/getauthorizednamelist','CommonController@authorizednamelist');
Route::get('/getCertificatelist','CommonController@Certificatelist');
//Route::get('/getPaymentModeType_List','CommonController@PaymentModeType_List');
Route::get('/getTerms_List','CommonController@Terms_List');
// Route::get('/getFeeType_List','CommonController@FeeType_List');
Route::get('/getSeparatorList','CommonController@SeparatorList');
Route::get('/getCategoryList','CommonController@CategoryList');
Route::get('/getIDtypeList','CommonController@IdTypeList');
Route::get('/getTypeList','CommonController@TypeList');
Route::get('/getTransactionList','CommonController@TransactionList');
Route::get('/getWorkingList','CommonController@WorkingList');
Route::get('/getPeriodList','CommonController@PeriodList');
Route::get('/getStaffNamelist','CommonController@StaffNameList');
Route::get('/getPeriodTimeList','CommonController@PeriodTimeList');
Route::get('/getMakerTypeList','CommonController@VehicleMakerTypeList');
Route::get('/getGradeList','CommonController@GradeList');
Route::get('/getSessionList','CommonController@SessionList');
Route::get('/getContactTypeList','CommonController@ContactTypeList');

Route::get('/getLoginTypeDetails','CommonController@LoginTypeDetails');
Route::get('/getStudentNameDetails','CommonController@StudentNameDetails');
Route::post('/getCommonEmployeeList','CommonController@CommonEmployeeList');

Route::post('/getSubjectNamelist','CommonController@SubjectNamelist');
Route::post('/getSubjectsNamelist','CommonController@SubjectsNameList');

Route::get('/getWorkFlowstatusList','CommonController@WorkFlow_Status');
//RelieveReasonTypeList
Route::post('/getAcademicYearBasedCourse','CommonController@AcademicYearBasedCourseList');
Route::post('/CourseBasedSubject','CommonController@CourseBasedSubjectList');

Route::get('/getManageLogin_EmployeeNameList','CommonController@ManageLogin_EmployeeNameList');
Route::get('/getSchool_NameList','CommonController@School_NameList');
Route::post('/getStudentCategoryList','CommonController@StudentCategoryList');
Route::post('/getStaffNameList','CommonController@StaffNameList');


// Student menu
Route::post('/getStudentList','StudentDetailsController@list');
Route::post('/addStudent','StudentDetailsController@addStudent');
Route::post('/getStudentView','StudentDetailsController@listStudent');
Route::post('/inactiveStudent','StudentDetailsController@inactive');
Route::post('/activeStudent','StudentDetailsController@active');
Route::post('/getStudentSingleList','StudentDetailsController@listStudent');
Route::post('/deleteDocumentItem','StudentDetailsController@deleteDocument');
Route::post('/getStudentLoginView','StudentDetailsController@LoginStudent');
Route::post('/addStudentLogin','StudentDetailsController@LoginStudentAdd');
Route::post('/PhotoStudent','StudentDetailsController@upload');

Route::post('/addChildDetails','StudentDetailsController@addchildStudent');
Route::post('/StudentChildView','StudentDetailsController@StudentChildView');
Route::post('/getAdmissionNumberDuplicate','StudentDetailsController@AdmissionNumberDuplicate');
Route::post('/getstudentnamelist','StudentDetailsController@StudentNamelist');
Route::post('/getstudent_result','StudentController@StudentResult');

Route::get('storage/Images/{filename}', function ($filename)
{
    $path = storage_path('public' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});

// Student Enrollment
Route::post('/addStudentEnrollment','StudentDetailsController@StudentEnrollmentAdd');
Route::post('/UpdateEnrollment','StudentDetailsController@UpdateEnrollment');
Route::post('/getEnrollmentAutofill','StudentDetailsController@StudentEnrollmentfill');


// For Assign Language 
Route::post('/getAssignLanguageList','AssignRollNumberController@listLanguage');

Route::post('/addRollNumber','StudentDetailsController@EditLanguage');
Route::post('/addStudentRollNumber','AssignRollNumberController@StudentHistory');
Route::get('/getStudentHistoryList','AssignRollNumberController@LanguageList');
Route::post('/getLanguageList','AssignRollNumberController@LanguageList');

Route::post('/getList','StudentDetailsController@StudentList');
Route::post('/addStudentHistory','AssignRollNumberController@StudentHistoryadd');
Route::post('/RollNumberduplicatechecking','AssignRollNumberController@RollNo_Duplicate');



// Organiser Menu 
// Exam Tab
Route::post('/addExam','OrganiserController@addExam');
Route::post('/getExamList','OrganiserController@Examsearch');
Route::post('/getExamView','OrganiserController@viewExam');
Route::post('/inactiveExam','OrganiserController@inactiveExam');
Route::post('/activeExam','OrganiserController@activeExam');
Route::post('/getExamSingleList','OrganiserController@viewExam');
Route::post('/getExamDuplicateCheck','OrganiserController@ExamNameDuplicateCheck');
Route::post('/DeleteExamName','OrganiserController@ExamNameDelete');

//Course/Sec Tab

Route::post('/addCourseSection','CourseSectionController@addCourseSection');
Route::post('/getCourseSectionList','CourseSectionController@CourseSectionsearchList');
Route::post('/getCourseSectionView','CourseSectionController@ViewCourseSection');
Route::post('/inactiveCourseSection','CourseSectionController@inactiveCourseSection');
Route::post('/activeCourseSection','CourseSectionController@activeCourseSection');
Route::post('/getCourseSectionSingleList','CourseSectionController@ViewCourseSection');
Route::post('/getCourse_SearchList','CourseSectionController@CourseSection_searchList');
Route::post('/EditCourseSection','CourseSectionController@EditCourseSection');

//Grade List
Route::post('/addGrade','OrganiserController@addGrade');
Route::post('/getGradeList','OrganiserController@AddGradeList');
Route::post('/getGradeView','OrganiserController@AddGradeListView');
Route::post('/inactivegrade','OrganiserController@gradeinactive');
Route::post('/activegrade','OrganiserController@gradeactive');
Route::post('/getgradeSingleList','OrganiserController@AddGradeListView');
Route::post('/getGradeNameView','OrganiserController@GradeNameView');
Route::post('/getGradeMarkDuplicateCheck','OrganiserController@GradeMarkDuplicateCheck');

//Helpfullinks
Route::get('storage/Documents/{filename}', function ($filename)
{
    
	$path = storage_path('public' . $filename);
    
	if (!File::exists($path)) {
        
		abort(404);
    
	}
    
	$file = File::get($path);
    
	$type = File::mimeType($path);
    
	$response = Response::make($file, 200);
    
	$response->header("Content-Type", $type);
    
	return $response;

});




// Question Bank
Route::post('/addQuestionBank','QuestionBankController@addQuestionBank');
Route::post('/getQuestionBankList','QuestionBankController@listQuestionBank');
Route::post('/getQuestionBankView','QuestionBankController@viewQuestionBank');
Route::post('/inactiveQuestionBank','QuestionBankController@QuestionBankinactive');
Route::post('/activeQuestionBank','QuestionBankController@QuestionBankactive');
Route::post('/getQuestionBankSingleList','QuestionBankController@SingleQuestionBank');
Route::post('/getCourseBasedExamList','QuestionBankController@CourseBasedExamLists');
Route::get('/getSubjectList','QuestionBankController@SubjectList');
Route::post('/getQuestionSectionList','QuestionBankController@QuestionSectionList');
Route::post('/getPaperTypeList','QuestionBankController@PaperTypeList');
Route::post('/postQuestionPaperGeneration','QuestionBankController@QuestionPaperGeneration');
Route::post('/getQuestionPaperChildView','QuestionBankController@QuestionPaperChildView');
Route::post('/updateQuestionBankHindi','QuestionBankController@updateQuestionBankHindi');
Route::post('/getQuestionBank_PrintCheck','QuestionBankController@QuestionBank_PrintCheck');
Route::post('/getQuestionBank_GenerateCheck','QuestionBankController@QuestionBank_GenerateCheck');
Route::post('/getExamBasedSubjectList_Print','QuestionBankController@ExamBasedSubjectList_Print');

//QuestionPaper Upload
Route::post('/UploadQuestionPaper_Document','QuestionBankController@QPScan_Upload');
Route::post('/getQuestionPaper_PrintCheck','QuestionBankController@QuestionPaper_PrintCheck');
Route::post('/Update_filename','QuestionBankController@Update_filename');





// Generate Hall Ticket
Route::post('/GenerateHallTicketList','GenerateHallTicketController@GenerateHallTicketList');
Route::post('/GenerateHallTicket_AddEdit','GenerateHallTicketController@GenerateHall_AddEdit');
Route::post('/getHallTicketList','GenerateHallTicketController@getHallTicketList');
Route::post('/PrintHallTicket_HeaderData','GenerateHallTicketController@PrintHallTicket_HeaderData');
Route::post('/PrintHallTicket_ChildData','GenerateHallTicketController@PrintHallTicket_ChildData');
// Examination Marks
Route::post('/addExamwisemarkEntry','ExaminationMarksController@addExamwise');
// Route::get('/getExaminationList','ExaminationMarksController@listExaminationMarks');
Route::post('/getExaminationWiseMarkEntryList','ExaminationMarksController@listExamWise');
Route::post('/getExam_StudentList','ExaminationMarksController@Exam_StudentList');
Route::post('/getExamwiseMarkEntryList','ExaminationMarksController@ListExamWiseMarkEntry');
Route::post('/getExaminationList','ExaminationMarksController@listExam');
Route::post('/getExaminationListReport','ExaminationMarksController@listExamReport');
Route::get('/getStudentExamList','ExaminationMarksController@liststudent');
Route::post('/addExaminationMarks','ExaminationMarksController@addExamMark');
Route::post('/getExaminationViewList','ExaminationMarksController@ViewExam');
Route::get('/getCourseBasedExamList','ExaminationMarksController@CourseBasedExamList');
Route::post('/Exam_SubjectList','ExaminationMarksController@Exam_SubjectList');
Route::post('/Update_ExamWiseMarkEntry_Status','ExaminationMarksController@Update_ExamWiseMarkEntry_Status');
Route::post('/ListExamWiseMarkEntry_Submit','ExaminationMarksController@ListExamWiseMarkEntry_Submit');

// Examination Result
Route::post('/getExaminationResultList','ExaminationResult@listExaminationResult');
Route::post('/getExaminationResult','ExaminationResult@ExaminationResultlist');
//Examination Result
Route::post('getExaminationResultList','ExaminationResult@ExaminationResult_List');


Route::post('Duplicate_CourseSection','CourseSectionController@Duplicate_CourseSection');

Route::get('/getRolemapping_EmployeeList','RoleMappingController@Rolemapping_EmployeeList');

Route::post('getLogin_ResetPassword','LoginController@Login_ResetPassword');



Route::post('/getMenu_FirstLevelList_ById','MenuPersonalizeController@Menu_FirstLevel_List_ById');

Route::get('/getManageloginStaffNamelist','LoginController@ManageloginStaffNamelist');


// Paper Pattern
Route::get('/getQuestionSectionList','PaperPatternController@QuestionSectionList');
Route::post('/getAcademicYearCouExamSubDuplicate','PaperPatternController@AcademicYearCouExamSubDuplicate');
Route::post('/getPaperPatternList','PaperPatternController@listPaperPattern');
Route::post('/getPaperPatternchildlist','PaperPatternController@listchildPaperPattern');
Route::post('/getPaperPatternQuestionsView','PaperPatternController@childPaperPatternView');
Route::post('/addPaperPattern','PaperPatternController@addPaperPattern');
Route::post('/addPaperPatternchild','PaperPatternController@addPaperPatternchild');
Route::post('/getPaperPatternView','PaperPatternController@viewPaperPattern');
Route::post('/inactivePaperpattern','PaperPatternController@inactive');
Route::post('/activePaperpattern','PaperPatternController@active');
Route::post('/getPaperpatternSingleList','PaperPatternController@viewPaperPattern');
Route::post('/getPaperPatternDelete','PaperPatternController@PaperPatternDelete');
Route::post('/getExamBasedSubjectList','PaperPatternController@ExamBasedSubjectList');
Route::post('/getCourseBasedExamList','PaperPatternController@CourseBasedExamLists');


//ExaminationMarks Controller
Route::post('/getExaminationList','ExaminationMarksController@listExam');
Route::get('/getStudentExamList','ExaminationMarksController@liststudent');
Route::post('/addExaminationMarks','ExaminationMarksController@addExamMark');
Route::post('/getExaminationViewList','ExaminationMarksController@ViewExam');
Route::get('/getCourseBasedExamList','ExaminationMarksController@CourseBasedExamList');
Route::post('/addExamwisemarkEntry','ExaminationMarksController@addExamwise');
Route::post('/getExamCentre_List','ExaminationMarksController@ExamCentre_List');
Route::post('/getInstitution_List','ExaminationMarksController@Institution_List');


// Examwise MarkEntry
Route::post('/getExaminationWiseMarkEntryList','ExaminationMarksController@listExamWise');
Route::post('/getExam_StudentList','ExaminationMarksController@Exam_StudentList');
Route::post('/getExamwiseMarkEntryList','ExaminationMarksController@ListExamWiseMarkEntry');
Route::post('/getInstitution_Listcenter','ExaminationMarksController@Institution_List_center');

// Examination Result
Route::post('/getExaminationResultList','ExaminationResult@listExaminationResult');
Route::post('/getExaminationResult','ExaminationResult@ExaminationResultlist');
Route::post('getExaminationResultList','ExaminationResult@ExaminationResult_List');


// Subject Tab
Route::post('/addSubject','SubjectMasterController@addSubject');
Route::post('/getSubjectList','SubjectMasterController@Subjectsearch');
Route::post('/getSubjectView','SubjectMasterController@viewSubject');
Route::post('/inactiveSubject','SubjectMasterController@inactiveSubject');
Route::post('/activeSubject','SubjectMasterController@activeSubject');
Route::post('/getSubjectSingleList','SubjectMasterController@viewSubject');
Route::post('/getchildsubjectlist','SubjectMasterController@SubjectChildList');
Route::post('/getSubjectDuplicateCheck','SubjectMasterController@Subject_DuplicateCheck');
Route::post('/UpdateHasChild','SubjectMasterController@UpdateHasChild');
Route::post('/DeleteSubjectName','SubjectMasterController@SubjectNameDelete');


//Exam Subject Tab
Route::post('/addExamSubject','ExamSubjectController@addExamSubject');
Route::post('/getExamSubjectList','ExamSubjectController@ExamSubjectsearch');
Route::post('/getExamSubjectView','ExamSubjectController@viewExamSubject');
Route::post('/inactiveExamSubject','ExamSubjectController@inactiveExamSubject');
Route::post('/activeExamSubject','ExamSubjectController@activeExamSubject');
Route::post('/getExamSubjectSingleList','ExamSubjectController@viewExamSubject');
Route::post('/getExamSubjectInnerList','ExamSubjectController@ExamSubjectInnerTableList');
Route::post('/CourseBasedSubject','ExamSubjectController@CourseBasedSubjectList');
Route::post('/getExamNameDuplicateCheck','ExamSubjectController@ExamName_DuplicateCheck');
Route::post('/getViewSubjectDetailsList','ExamSubjectController@ViewExamSubjectChild');
Route::post('/getSubjectDetailsList','ExamSubjectController@ExamSubjectlist');
Route::post('/AddSubjectDetailsMaster','ExamSubjectController@SubjectDetailsList');


Route::post('/updateStudent_Enquirystatus','StudentDetailsController@update_Enquirystatus');
Route::post('/getStudentList','StudentDetailsController@list');
Route::post('/addStudent','StudentDetailsController@addStudent');
Route::post('/getStudentView','StudentDetailsController@listStudent');
Route::post('/inactiveStudent','StudentDetailsController@inactive');
Route::post('/activeStudent','StudentDetailsController@active');
Route::post('/getStudentSingleList','StudentDetailsController@listStudent');
Route::post('/deleteDocumentItem','StudentDetailsController@deleteDocument');
Route::post('/getStudentLoginView','StudentDetailsController@LoginStudent');
Route::post('/addStudentLogin','StudentDetailsController@LoginStudentAdd');
Route::post('/PhotoStudent','StudentDetailsController@upload');
Route::post('/addChildDetails','StudentDetailsController@addchildStudent');
Route::post('/StudentChildView','StudentDetailsController@StudentChildView');
Route::post('/getAdmissionNumberDuplicate','StudentDetailsController@AdmissionNumberDuplicate');
Route::post('/addStudentEnrollment','StudentDetailsController@StudentEnrollmentAdd');
Route::post('/UpdateEnrollment','StudentDetailsController@UpdateEnrollment');
Route::post('/getEnrollmentAutofill','StudentDetailsController@StudentEnrollmentfill');
Route::post('/addRollNumber','StudentDetailsController@EditLanguage');
Route::post('/getList','StudentDetailsController@StudentList');
Route::post('/addStudentLogin','StudentDetailsController@StudentLogin');
Route::post('/uploadDocument','StudentDetailsController@uploadDocument');
Route::post('/addDocumentDetails','StudentDetailsController@addDocumentDetails');
Route::post('/getDocumentDetails','StudentDetailsController@getDocumentDetails');
Route::post('/DocumentDetailsEditList','StudentDetailsController@DocumentDetails_EditList');



Route::post('/getAssignLanguageList','AssignRollNumberController@listLanguage');
Route::post('/addStudentRollNumber','AssignRollNumberController@StudentHistory');
Route::get('/getStudentHistoryList','AssignRollNumberController@LanguageList');
Route::post('/addStudentHistory','AssignRollNumberController@StudentHistoryadd');
Route::post('/RollNumberduplicatechecking','AssignRollNumberController@RollNo_Duplicate');

//Time Table Menu
Route::post('/addExamTimetable','ExamTimetableController@AddExamTimeTable');
Route::post('/addExamTimetableChild','ExamTimetableController@addExamTimetableChild');
Route::post('/getExamTimetableList','ExamTimetableController@ExamTimeTableSearch');
Route::post('/getExamTimetableView','ExamTimetableController@ExamTimeTableView');
Route::post('/getExamTimetableChild_View','ExamTimetableController@ExamTimetableChild_View');
Route::post('/inactiveExamTimetable','ExamTimetableController@ExamTimetableinactive');
Route::post('/activeExamTimetable','ExamTimetableController@ExamTimetableActive');
Route::post('/ExamTimetable','ExamTimetableController@ExamTimeTableView');
Route::post('/getExamTimeTableSearchlistChild','ExamTimetableController@ExamTimeTableSearchlistChild');
Route::post('/getExamTimeTableEdit','ExamTimetableController@EditExamTimeTable');
Route::post('/ExamTimeTableDuplicateCheck','ExamTimetableController@ExamTimeTableDuplicateCheck');

// Student Enrollment
Route::post('/listEnrollmentNumber','AssignEnrollmentNumberController@listEnrollmentNumber');
Route::post('/addStudentEnrollmentNumber','AssignEnrollmentNumberController@EnrollmentNoAddEdit');
Route::post('/EnrollmentNo_Duplicate','AssignEnrollmentNumberController@EnrollmentNo_Duplicate');


//Mob APP
Route::post('/ExamAttendance_Add','MobAppController@ExamAttendance_insert');
Route::post('/ExamCentre_List','MobAppController@ExamCentre_List');
Route::post('/Examnamebased_subjectList','MobAppController@Examnamebasedsubject_List');
Route::post('/HallTicketBased_StudentList','MobAppController@HallTicketBased_StudentList');
Route::post('/ExamInfo_List','MobAppController@ExamInfo_List');
Route::post('/ExamSubject_ByExamCenter','MobAppController@ExamSubject_ByExamCenter');

Route::post('/ExamtimeUpload_insert','MobAppController@Examtimming_insert');
Route::post('/countTotalStudent_List','MobAppController@countTotalStudent_List');
Route::post('/Examtimming_update','MobAppController@Examtimming_update');
Route::post('/AB_HandOverinsert','MobAppController@AB_HandOver_insert');
Route::post('/AB_HandOverUpdate','MobAppController@AB_HandOver_Update');
Route::post('/ExamAttendanceUpdate','MobAppController@ExamAttendance_Update');
Route::post('/AB_HandOverCount','MobAppController@AB_HandOverCount');

//Assign Exam Center
Route::post('/AssignExamCenter','ExamcenterAllocationController@ListExamCenter');
Route::post('/getCenterName','ExamcenterAllocationController@Examcentername');
Route::post('/addExamcenterAllocation','ExamcenterAllocationController@ExamCenterAddEdit');

//InstitutionMasterController
Route::post('/InstitutionMastersAddEdit','InstitutionMasterController@InstitutionMasterAddEdit');
Route::post('/getInstitutionMasterView','InstitutionMasterController@Institution_View');
Route::post('/getInstitutionlist','InstitutionMasterController@Institutionmaster_List');
Route::post('/inactiveInstitution','InstitutionMasterController@Institutioninactive');
Route::post('/activeInstition','InstitutionMasterController@InstitutionActive');
Route::post('/IntitutionLogo','InstitutionMasterController@upload');
Route::get('storage/Documents/{filename}', function ($filename)
{    
	$path = storage_path('public' . $filename);    
	if (!File::exists($path)) {        
		abort(404);    
	}    
	$file = File::get($path);    
	$type = File::mimeType($path);    
	$response = Response::make($file, 200);    
	$response->header("Content-Type", $type);    
	return $response;
});


// ANSWER BOOK QRCODE
Route::post('/ExamListBasedAcademicYear','AnswerBookQrCodeController@ExamList');
Route::post('/ABQrCode','AnswerBookQrCodeController@CountStudentforqrgeneration');
Route::post('/addAbQrcode','AnswerBookQrCodeController@addAbQrcode');
Route::post('/PrintListAbQrcode','AnswerBookQrCodeController@PrintAbQrcode');

//Upload 
Route::post('/QRCodeList','ABScanUploadController@QRCodeList');
Route::post('/addUploadPhoto','ABScanUploadController@addUploadPhoto');
Route::post('/ABQR_ClearPhotos','ABScanUploadController@ABQR_ClearPhotos');
Route::post('/ABQR_ScanUpload','ABScanUploadController@ABQR_ScanUpload');


//PaperEvaluation
Route::post('/getAnswerBook_list','PaperEvaluationController@AnswerBook_list');
Route::post('/getAnswerBookImages_list','PaperEvaluationController@AnswerBookImages_list');
Route::post('/addEvaluationMaster','PaperEvaluationController@EvaluationChild_InsertUpdate');
Route::post('/QuestionPaper_list','PaperEvaluationController@QuestionPaper_list');
Route::post('/QuestionPaper_Totallist','PaperEvaluationController@QuestionPaper_Totallist');
Route::post('/QuestionPaperChild_list','PaperEvaluationController@QuestionPaperChild_list');
Route::post('/QuestionPaper_section_list','PaperEvaluationController@QuestionPaper_section_list');
Route::post('/Evaluation_Summary','PaperEvaluationController@Evaluation_Summary');
Route::post('/Evaluation_view','PaperEvaluationController@Evaluation_view');
Route::post('/EvaluationMaster_View','PaperEvaluationController@EvaluationMaster_View');
Route::post('/getAnswerBook_EvaluationList','PaperEvaluationController@AnswerBook_EvaluationList');
Route::post('/getEvaluationAllocationcheck','PaperEvaluationController@EvaluationAllocationcheck');
Route::post('/getExamBasedSubjectList_Timetable','PaperEvaluationController@ExamBasedSubjectList_Timetable');
Route::post('/getEvaluation_Release_Allocate','PaperEvaluationController@Evaluation_Release_Allocate');

//EvaluationList
Route::post('/EvaluationMaster_Count','EvaluationController@EvaluationMaster_Count');
Route::post('/getEvaluation_list','EvaluationController@Evaluation_list');
Route::post('/Update_Evaluation_Status','EvaluationController@Update_Evaluation_Status');

//ExamAttendance Report
Route::post('/ExamAttendance_List','ExamAttendanceReportController@ExamAttendance_List');
Route::post('/ExamAttendance_View','ExamAttendanceReportController@ExamAttendance_View');
Route::post('/ExamCenterList','CommonController@ExamCenterList');

// Examination Result
// Route::post('/getExaminationResultList','ExaminationResultController@listExaminationResult');
// Route::post('/getExaminationResult','ExaminationResultController@ExaminationResultlist');
Route::post('/getExaminationResultList','ExaminationResultController@ExaminationResult_List');

Route::post('/PrintHallTicketList','PrintHallTicketController@Print_HallTicketList');
Route::post('/PrintHallTicketDetails','PrintHallTicketController@HallTicketDetails');
Route::post('/PrintHallTicketSubjectDetails','PrintHallTicketController@HallTicketubjectDetails');

// Mark Sheet
Route::post('/PrintMarksheetdetails','MarksheetController@MarksheetStudentDetails');
Route::post('/MarksheetStudentPrint','MarksheetController@MarksheetStudentPrint');
Route::post('/MarksheetStudentSubjectPrint','MarksheetController@PrintmarksheetStudentSubject');
Route::post('/Marksheetdetails','MarksheetController@Marksheetdetails');
Route::post('/Marksheetprintdetails','MarksheetController@Marksheetprintdata');

//StudentReport
Route::post('/StudentReportList','StudentReportsController@ListStudentReport');

// DashboardController
Route::post('/getattendancedashboard','DashboardController@AttendanceList');
Route::post('/getevaluationdashboard','DashboardController@EvaluationList');
Route::post('/getcenterwiseattendancedashboard','DashboardController@ExamcenterwiseList');
Route::post('/getEvaluation_RequestList','PaperEvaluationController@Evaluation_RequestList');


Route::post('/getEvaluation_Checker_List','DashboardController@Evaluation_Checker_List');
Route::post('/getExam_SubjectList_Attendance','ExamAttendanceReportController@Exam_SubjectList_Attendance');
Route::post('/getExam_StudentList_Attendance','ExamAttendanceReportController@Exam_StudentList_Attendance');
Route::post('/getExam_centerlist_Attendance','ExamAttendanceReportController@Exam_centerlist_Attendance');

Route::post('/getlistattendanceReport','ExaminationMarksController@listExamReport');
Route::post('/getevaluationliststudent','EvaluationMarkDetailsReportController@evaluationliststudent');

Route::post('/getevaluationliststudent_child','EvaluationMarkDetailsReportController@evaluationliststudent_child');
Route::post('/getstudentdd_List','EvaluationMarkDetailsReportController@studentdd_List');

Route::post('/getDashboard_graph','DashboardController@Dashboard_graph');
Route::post('/getevaluation_subjectgraph','DashboardController@evaluation_subjectgraph');
Route::post('/getattendance_detailedgraph','DashboardController@attendance_detailedgraph');
Route::post('/getmarks_detailedgraph','DashboardController@marks_detailedgraph');
Route::post('/getattendance_subjectgraph','DashboardController@attendance_subjectgraph');
Route::post('/getabchecker_list','DashboardController@abchecker_list');

Route::get('/getABFileData','PaperEvaluationController@getABFileData');




Route::get('/getEmployeelist_password','ManageEmployeeController@Employeelist_password');
Route::post('/getLoginHistory','LoginController@LoginHistory');
Route::post('/getPasswordHistory','LoginController@PasswordHistory');
Route::post('/getcollegeinstitutionlist','ManageEmployeeController@collegeinstitutionlist');
Route::post('/getlogin_institution','ManageEmployeeController@login_institution');
Route::post('/logininstitution_insert','ManageEmployeeController@logininstitution_insert');
Route::post('/Employeelist_passworddecrypt','ManageEmployeeController@Employeelist_passworddecrypt');

Route::post('/getinstitutionlist_admin','ManageEmployeeController@institutionlist');


//4.EmailConfiguartion
Route::post('/getAddEmailConfiguration','EmailConfigurationController@AddEmailConfiguration');
Route::get('/getSchoolList','EmailConfigurationController@SchoolList');
Route::post('/getSchoolEmailConfig','EmailConfigurationController@SchoolEmailConfigList');

Route::post('/getABFileData','PaperEvaluationController@getABFileData');
Route::post('/getevaluationsubmit_sentmail','EvaluationController@evaluationsubmit_sentmail');

Route::post('/getresetpassword_forget','LoginController@resetpassword_forget');
Route::post('/getEvaluation_count_by_subject','EvaluationController@Evaluation_count_by_subject');
Route::post('/subject_evaluator_rep','EvaluationController@subject_evaluator_reports');
Route::post('/subject_wise_rep','SubjectController@subject_wise_reports');
Route::post('/getevaluation_summary_report','DashboardController@evaluation_summary_report');

