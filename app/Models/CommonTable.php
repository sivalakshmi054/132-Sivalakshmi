<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class CommonTable extends Model
{
    protected $table = 'CommonTables';
    
    public $fillable = ['Id','DBTableName','UITableName', 'Active'];
}
