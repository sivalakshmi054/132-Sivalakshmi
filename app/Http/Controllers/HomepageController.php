<?php

namespace SchoolManagement\Http\Controllers;

use Illuminate\Http\Request;

class HomepageController extends Controller
{

   public function __construct()
   {
       $this->middleware('web');
   }

   public function gethomepage()
   {
       return view('layouts/master');
   }
}