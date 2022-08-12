<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class AdvanceType extends Model
{
   protected $table = 'AdvanceTypes';
    
   public $fillable = ['Id','AdvanceType','Description'];
}
