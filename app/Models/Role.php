<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
      protected $table='roles';
      protected $fillable=['name'];
      protected $primarykey='id';
      public $timestamps=false;
    
    public function users()
    {
        return $this->hasMany('SchoolManagement\Models\User','role_id','id');
    }
}
