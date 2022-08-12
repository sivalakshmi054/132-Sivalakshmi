<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'Employees';
    
    public $fillable = ['Id','EmployeeName','DOJ','SystemRoleId', 'Description','GenderId','RoleId'];
    
    public function SystemRole()
    {
        return $this->belongsTo('SchoolManagement\Models\SystemRole','SystemRoleId');
    } 
}
