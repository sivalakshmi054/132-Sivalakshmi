<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class MonthMaster extends Model
{
    protected $table = 'Month';    
    protected $fillable = ['Id','MonthSequence','AYSequence','MonthDays','MonthName','ShortName'];
}
