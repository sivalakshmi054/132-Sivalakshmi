<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class section extends Model
{
    protected $table = 'sectionmaster';    
    protected $fillable = ['Id','SectionName','ShortName','Description'];
}
