<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class TableColumnResult extends Model
{
   
    public $fillable = ['Id','TableColumnItem ','DBColumnResult','IsActive ','ddlResult'];
}