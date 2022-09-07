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

Route::get('/','SiteController@index');

Auth::routes();
Route::get('/confirm','SiteController@confirm')->middleware('guest');
Route::post('ajax/resend','SiteController@resend')->middleware('guest');
Route::post('active_account','SiteController@active_account')->middleware('guest')->name('active_account');


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

    //province
    create_crud_route('province','ProvinceController');

    //city
    create_crud_route('city','CityController');




    //Item category
    Route::get('category/{id}/items','Admin\ItemController@items');
    Route::post('category/{id}/items','Admin\ItemController@add_items');
    Route::delete('category/items/{id}','Admin\ItemController@destroy');

    //Item product
    Route::get('products/{id}/items','Admin\ProductController@items');
    Route::post('products/{id}/items','Admin\ProductController@add_items');

    //filter
    Route::get('category/{id}/filters','Admin\FilterController@filters');
    Route::post('category/{id}/filters','Admin\FilterController@add_filters');
    Route::delete('category/filters/{id}','Admin\FilterController@destroy');

    //filter product
    Route::get('products/{id}/filters','Admin\ProductController@filters');
    Route::post('products/{id}/filters','Admin\ProductController@add_filters');

    //incredible offers
    Route::get('incredible-offers','Admin\AdminController@incredible_offers');
    Route::get('ajax/getWarranty','Admin\AdminController@getWarranty');
    Route::post('add_incredible_offers/{warranty_id}','Admin\AdminController@add_incredible_offers');
    Route::post('remove_incredible_offers/{warranty_id}','Admin\AdminController@remove_incredible_offers');

    //setting
   Route::match(['get','post'],'setting/send-order-price','Admin\SettingController@send_order_price');




});

Route::get('product/{product_id}/{product_url}','SiteController@show_product');
Route::get('product/{product_id}','SiteController@show_product');

//ajax
Route::post('site/change_color','SiteController@change_color');

Route::post('Cart','SiteController@add_cart');
Route::get('Cart','SiteController@show_cart');

Route::post('site/cart/remove_product','SiteController@remove_product');
Route::post('site/cart/change_product_cart','SiteController@change_product_cart');

Route::get('shipping','ShoppingController@shipping');
Route::get('shipping/getSendData/{city_id}','ShoppingController@getSendData');
//payment
Route::post('payment','ShoppingController@payment');





Route::prefix('user')->middleware(['auth'])->group(function (){
    Route::post('/addAddress','UserController@addAddress');
    Route::delete('/removeAddress/{address_id}','UserController@removeAddress');

});
