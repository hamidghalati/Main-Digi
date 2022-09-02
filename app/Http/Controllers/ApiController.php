<?php

namespace App\Http\Controllers;

use App\CityModel;
use App\ProvinceModel;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function get_province()
    {
        $province=ProvinceModel::orderBy('id','Asc')->get();
        return $province;
    }
    public function get_city($province_id)
    {
        $city=CityModel::where('province_id',$province_id)->orderBy('id','Asc')->get();
        return $city;
    }
}
