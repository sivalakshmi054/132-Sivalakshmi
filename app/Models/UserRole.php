<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
     protected $table = 'UserRoles';    
     protected $fillable = ['Id','UserRollName','Description','created_at','updated_at'];
    
     public function SystemRoleMapping()
     {
          return $this->hasMany('SchoolManagement\Models\SystemRoleMapping','UserRoleId');
     }
}
