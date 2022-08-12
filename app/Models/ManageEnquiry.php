<?php

namespace SchoolManagement;

use Illuminate\Database\Eloquent\Model;

class ManageEnquiry extends Model
{
    protected $table = 'ManageEnquiry';    
    protected $fillable = ['Id','Name','FatherName','Mobile','Qualification','Experience_Years','Experience_Months','Address','Description','StatusId','Date','GenderId','Email','DesignationId','SpecificationId'];
}
