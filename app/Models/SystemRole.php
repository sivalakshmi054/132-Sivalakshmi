<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class SystemRole extends Model
{
      protected $table = 'SystemRoles';    
      public $fillable = ['Id','SystemRollName','Description'];   
    
      public function SystemRoleMapping()
      {
          return $this->hasMany('SchoolManagement\Models\SystemRoleMapping','SystemRoleId');
      }
      public function Employee()
      {
          return $this->hasMany('SchoolManagement\Models\Employee','SystemRoleId');
      }
}
