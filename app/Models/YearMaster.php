<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class YearMaster extends Model
{
    protected $table = 'Year';    
    protected $fillable = ['Id','Year'];
}
