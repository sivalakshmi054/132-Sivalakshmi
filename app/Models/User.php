<?php

namespace SchoolManagement\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use Notifiable;
    
   protected $fillabe=[
        'name','username','email','password','active','role_id',
    ];
    
    protected $hidden=[
        'password','remember_token',
    ];
    
    public function role()
    {
        return $this->hasOne('SchoolManagement\Models\Role','id','role_id');
    }
    
    private function checkIfUserHasRole($need_role)
    {
        return (strtolower($need_role)==strtolower($this->role->name)) ? true : null;
    }
    
    public function hasRole($roles)
    {
        if(is_array($roles))
        {
            foreach($roles as $need_role)
            {
                if ($this->checkIfUserHasRole($need_role))
                {
                   return true; 
                }
            }
        }
        else
        {
            return $this->checkIfUserHasRole($roles);
        }
        return false;
    }
}
