<?php namespace SchoolManagement\Http\Controllers;
use Illuminate\Http\Request;
use SchoolManagement\Http\Requests;
use DB;
use SchoolManagement\Models\AcademicYear;
class AcademicYearController extends Controller
{
    public function index()
    {
        $ListData = DB::table('academicyear')->leftjoin('month as fm', 'academicyear.frommonthid', '=', 'fm.id')
            ->leftjoin('year as fy', 'academicyear.fromyearid', '=', 'fy.id')
            ->leftjoin('month as tm', 'academicyear.tomonthid', '=', 'tm.id')
            ->leftjoin('year as ty', 'academicyear.toyearid', '=', 'ty.id')
            ->select('academicyear.id', 'academicyear.academicyear', 'academicyear.frommonthid', 'academicyear.fromyearid', 'academicyear.tomonthid', 'academicyear.toyearid', 'academicyear.description', 'academicyear.status', 'fm.monthname as frommonth', 'tm.monthname as tomonth', 'fy.year as fromyear', 'ty.year as toyear', 'academicyear.isactive')
            ->get();
        return $ListData;
    }
    public function addAcademic(Request $request)
    {
        $data = ['id' => $request['Id'], 'academicyear' => $request['AcademicYear'], 'frommonthid' => $request['FromMonthId'], 'fromyearid' => $request['FromYearId'], 'tomonthid' => $request['ToMonthId'], 'toyearid' => $request['ToYearId'], 'description' => $request['Description'], 'status' => $request['Status']];
        if ($request['Id'] == 0)
        {
            $insert = DB::table('academicyear')->insertGetId($data);
            if ($insert == true)
            {
                return $insert;
            }
            else
            {
                return 0;
            }
        }
        else
        {
            $update = DB::table('academicyear')->where('id', $request['Id'])->update($data);
            return $request['Id'];
        }
    }
    public function listall()
    {
        $ListData = db::table('academicyear')->leftjoin('month', 'academicyear.frommonthid', '=', 'month.id')
            ->leftjoin('month', 'academicyear.tomonthid', '=', 'month.id')
            ->leftjoin('year', 'academicyear.fromyearid', '=', 'year.id')
            ->leftjoin('year', 'academicyear.toyearid', '=', 'year.id')
            ->select('academicyear.id', 'academicyear.academicyear', 'academicyear.frommonthid', 'academicyear.fromyearid', 'academicyear.tomonthid', 'academicyear.toyearid', 'academicyear.description', 'academicyear.status', 'month.monthname frommonth', 'month.monthname tomonth', 'year.year fromyear', 'year.year toyear', 'academicyear.isactive')
            ->get();
        return $ListData;
    }
    public function list(Request $request)
    {
        $id = $request['Id'];
        $ListData = db::table('academicyear')->leftjoin('month as fm', 'academicyear.frommonthid', '=', 'fm.id')
            ->leftjoin('year as fy', 'academicyear.fromyearid', '=', 'fy.id')
            ->leftjoin('month as tm', 'academicyear.tomonthid', '=', 'tm.id')
            ->leftjoin('year as ty', 'academicyear.toyearid', '=', 'ty.id')
            ->select('academicyear.id', 'academicyear.academicyear', 'academicyear.frommonthid', 'academicyear.fromyearid', 'academicyear.tomonthid', 'academicyear.toyearid', 'academicyear.description', 'academicyear.status', 'fm.monthname as frommonth', 'tm.monthname as tomonth', 'fy.year as fromyear', 'ty.year as toyear', 'academicyear.isactive')
            ->where('academicyear.id', $id)->get();
        return $ListData;
    }
    public function MonthList()
    {
        $data = DB::table('month')->orderBy('aysequence', 'asc')
            ->get();
        return $data;
    }
    public function inactive(Request $request)
    {
        $id = $request['Id'];
        $inactive = DB::table('academicyear')->where('id', $id)->update(['isactive' => '0']);
        if ($inactive == true)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    public function active(Request $request)
    {
        $id = $request['Id'];
        $active = DB::table('academicyear')->where('id', $id)->update(['isactive' => '1']);
        if ($active == true)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
}

