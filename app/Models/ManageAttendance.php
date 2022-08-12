<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class ManageAttendance extends Model
{
    protected $table = 'ManageAttendance';    
    protected $fillable = ['Id','Name','EmpId','AcademicYearId','GenderId','DepartmentId','DesignationId','Mobile','AttendanceId','AttendanceDateId','LeaveTypeId','Remarks'];
}
