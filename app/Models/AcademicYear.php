<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    protected $table = 'academicyear';    
    protected $fillable = ['Id','AcademicYear','FromMonthId','FromYearId','ToMonthId','ToYearId','Description','Status'];
}
