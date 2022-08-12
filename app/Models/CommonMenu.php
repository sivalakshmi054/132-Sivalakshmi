<?php

namespace SchoolManagement\Models;

use Illuminate\Database\Eloquent\Model;

class CommonMenu extends Model
{
    protected $table = 'CommonMenu';
    
    public $fillable = ['MenuId','MenuName','MenuLevel', 'MenuURL', 'ImageURL', 'ParentId', 'HasChild','DisplayOrder'];
}
