<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class GenderDetail extends Model
{
   protected $table = 'GenderDetails';
    
   public $fillable = ['Id','Gender','Description'];
}
