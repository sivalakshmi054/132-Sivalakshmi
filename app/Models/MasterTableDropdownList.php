<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class MasterTableDropdownList extends Model
{
   // protected $table = 'CommonTableColumns';
    
    public $fillable = ['Id','Name ','IsActive ','FilterId'];
}

