<?php

namespace SchoolManagement\Providers;

use Illuminate\Support\ServiceProvider;

use DB;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */

    public function boot()
    {
        view()->composer('layouts.sidebars.sidebar',function($view)
        {

           $UID= Session('UserId'); 
         
           $ListData = DB::select('CALL EmpMenu_SP_filter(?)',[$UID]);
           $EmployeeData = DB::select('CALL sp_loginpagename_view (?)',[$UID]);
//dd($EmployeeData);
           $view
           ->with('menulistview',$ListData)
           ->with('employeename',$EmployeeData);

        });

        view()->composer('layouts.header.header',function($view)
        {

           $UID= Session('UserId'); 
         
           $EmployeeData = DB::select('CALL sp_loginpagename_view (?)',[$UID]);
//dd($EmployeeData);
           $view
           ->with('employeename',$EmployeeData);

        });
     }

     

     /**
     * Register any application services.
     *
     * @return void
     */

    public function register()
    {
        //
    }


}
