<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class ManageEmployeeModel extends Model
{
    protected $table = 'ManageEmployee';    
    protected $fillable = ['Id','TitleId','EmployeeName','EmployeeNumber','EmployeePhoto','FatherName','MotherName','GenderId','DOB','DOJ','MasterQualification','EmployeeTypeId','Experience_Years','Experience_Months','DesignationId','SpecificationId','DepartmentId','MaritalStatusId','ReligionId','BloodGroupId','SSN_UID_No','Email','Mobile','LastOrganization','Designation','OthersQualification','YearOfPassedOut','CollegedUniv','Percentage','HouseNo','Town','LocationNameId','District','StateId','PinCode','CountryId','PAN_No','BankACCNo','PF_ACCNo','ESI_ACCNo','BankNameId','BranchNameId','DrivingLicenseNo','PassportNumber','IFSC_Code','AadharNo','MICR_No'];
}
