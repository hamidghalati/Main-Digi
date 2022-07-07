<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('admin')->group(function (){
    Route::get('/','Admin\AdminController@index');

    //Category
    create_crud_route('category','CategoryController');

    //Brand
    create_crud_route('brands','BrandController');

    //Color
    create_crud_route('colors','ColorController');

    //Product
    create_crud_route('products','ProductController',true);

    //warranties
    create_crud_route('warranties','WarrantyController');

    //product_warranties
    create_crud_route('Product_warranties','ProductwarrantyController');

    //gallery
    Route::get('products/gallery/{id}','Admin\ProductController@gallery');
    Route::post('products/gallery_upload/{id}','Admin\ProductController@gallery_upload');
    Route::delete('products/gallery/{id}','Admin\ProductController@removeImageGallery');
    Route::post('products/change_images_status/{id}','Admin\ProductController@change_images_status');

    //slider
    create_crud_route('sliders','SliderController');






});


