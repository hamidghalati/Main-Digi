<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




///////////////////////////////seller
/// seller/first_step_register
Route::middleware('cors')->group(function () {
    Route::post('seller/first_step_register','api\SellerController@first_step_register');
    Route::get('seller/get_province','ApiController@get_province');
    Route::get('seller/get_city/{province_id}','ApiController@get_city');
});

Route::get('get_province','ApiController@get_province');

Route::get('get_city/{province_id}','ApiController@get_city');

//chart
Route::get('getProductChartData/{product_id}','ApiController@getProductChartData');

//other price
Route::post('getWarranty/{product_id}','ApiController@getWarranty');
