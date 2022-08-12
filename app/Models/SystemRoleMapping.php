<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class SystemRoleMapping extends Model
{
    protected $table = 'SystemRolesMapping';    
    public $fillable = ['Id','UserRoleId','SystemRoleId'];
    
    public function UserRole()
    {
        return $this->belongsTo('SchoolManagement\Models\UserRole','UserRoleId');
    }
    
    public function SystemRole()
    {
        return $this->belongsTo('SchoolManagement\Models\SystemRole','SystemRoleId');
    } 
}
