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

Route::get('/', 'SiteController@index');

Auth::routes();
Route::get('/confirm', 'SiteController@confirm')->middleware('guest');
Route::post('ajax/resend', 'SiteController@resend')->middleware('guest');
Route::post('active_account', 'SiteController@active_account')->middleware('guest')->name('active_account');


Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('admin')->group(function () {
    Route::get('/', 'Admin\AdminController@index');

    //elFinder used ckeditor
    Route::get('file_manager','Admin\AdminController@file_manager');

    //Category
    create_crud_route('category', 'CategoryController');

    //Brand
    create_crud_route('brands', 'BrandController');

    //Color
    create_crud_route('colors', 'ColorController');

    //Product
    create_crud_route('products', 'ProductController', []);

    //warranties
    create_crud_route('warranties', 'WarrantyController');

    //product_warranties
    create_crud_route('Product_warranties', 'ProductwarrantyController');

    //discount_code
    create_crud_route('discount', 'DiscountController');


    //gallery
    Route::get('products/gallery/{id}', 'Admin\ProductController@gallery');
    Route::post('products/gallery_upload/{id}', 'Admin\ProductController@gallery_upload');
    Route::delete('products/gallery/{id}', 'Admin\ProductController@removeImageGallery');
    Route::post('products/change_images_status/{id}', 'Admin\ProductController@change_images_status');

    //slider
    create_crud_route('sliders', 'SliderController');

    //province
    create_crud_route('province', 'ProvinceController');

    //city
    create_crud_route('city', 'CityController');

    //comment
    create_crud_route('comments', 'CommentController',['show','create','store','edit','update']);
    Route::post('comment/change_status','Admin\CommentController@change_status');


    //Item category
    Route::get('category/{id}/items', 'Admin\ItemController@items');
    Route::post('category/{id}/items', 'Admin\ItemController@add_items');
    Route::delete('category/items/{id}', 'Admin\ItemController@destroy');

    //Item product
    Route::get('products/{id}/items', 'Admin\ProductController@items');
    Route::post('products/{id}/items', 'Admin\ProductController@add_items');

    //filter
    Route::get('category/{id}/filters', 'Admin\FilterController@filters');
    Route::post('category/{id}/filters', 'Admin\FilterController@add_filters');
    Route::delete('category/filters/{id}', 'Admin\FilterController@destroy');

    //filter product
    Route::get('products/{id}/filters', 'Admin\ProductController@filters');
    Route::post('products/{id}/filters', 'Admin\ProductController@add_filters');

    //incredible offers
    Route::get('incredible-offers', 'Admin\AdminController@incredible_offers');
    Route::get('ajax/getWarranty', 'Admin\AdminController@getWarranty');
    Route::post('add_incredible_offers/{warranty_id}', 'Admin\AdminController@add_incredible_offers');
    Route::post('remove_incredible_offers/{warranty_id}', 'Admin\AdminController@remove_incredible_offers');

    //setting
    Route::match(['get', 'post'], 'setting/send-order-price', 'Admin\SettingController@send_order_price');

    //orders

    create_crud_route('orders', 'OrdersController');

    Route::get('orders', 'Admin\OrdersController@index');
    Route::get('orders/submission', 'Admin\OrdersController@submission');
    Route::get('orders/submission/approved', 'Admin\OrdersController@submission_approved');
    Route::get('orders/submission/items/today', 'Admin\OrdersController@items_today');
    Route::get('orders/submission/ready', 'Admin\OrdersController@submission_ready');
    Route::get('orders/submission/posting/send', 'Admin\OrdersController@posting_send');
    Route::get('orders/submission/posting/receive', 'Admin\OrdersController@posting_receive');
    Route::get('orders/delivered/shipping', 'Admin\OrdersController@delivered_shipping');

    Route::get('orders/submission/{submission_id}', 'Admin\OrdersController@submission_info');

    Route::get('orders/{order_id}', 'Admin\OrdersController@show');

    Route::post('order/change_status', 'Admin\OrdersController@change_status');


    ///ReView
    Route::get('product/review/primary', 'Admin\ReviewController@primary');
    Route::post('product/review/primary', 'Admin\ReviewController@add_primary_content');
    create_crud_route('product/review', 'ReviewController');


});

//comments
Route::get('product/comment/{product_id}','SiteController@comment_form')->middleware('auth');
Route::post('product/comment/{product_id}','SiteController@add_comment')->middleware('auth');
Route::get('site/getComment','ApiController@getComment');


Route::get('product/{product_id}/{product_url}', 'SiteController@show_product');
Route::get('product/{product_id}', 'SiteController@show_product');


//ajax
Route::post('site/change_color', 'SiteController@change_color');

Route::post('Cart', 'SiteController@add_cart');
Route::get('Cart', 'SiteController@show_cart');

Route::post('site/cart/remove_product', 'SiteController@remove_product');
Route::post('site/cart/change_product_cart', 'SiteController@change_product_cart');



//main
Route::get('main/{cat_url}', 'SiteController@show_child_cat_list');

//search
Route::get('search/{cat_url}', 'SiteController@cat_product');
Route::get('getProduct/search/{cat_url}', 'SiteController@get_cat_product');

//Brand
Route::get('brands/{brand_name}', 'SiteController@brand_product');
Route::get('getProduct/brands/{brand_name}', 'SiteController@get_brand_product');

//compare_Brand
Route::get('compare/{product_id1}', 'SiteController@compare');
Route::get('compare/{product_id1}/{product_id2}', 'SiteController@compare');
Route::get('compare/{product_id1}/{product_id2}/{product_id3}', 'SiteController@compare');
Route::get('compare/{product_id1}/{product_id2}/{product_id3}/{product_id4}', 'SiteController@compare');

//compare-brand-list
Route::post('get_compare_products', 'SiteController@get_compare_products');
Route::post('/site/getCatBrand', 'SiteController@getCatBrand');

//chart
Route::get('site/getProductChartData/{product_id}', 'SiteController@getProductChartData');

Route::get('shipping', 'ShoppingController@shipping');
Route::get('shipping/getSendData/{city_id}', 'ShoppingController@getSendData');
//payment
Route::post('payment', 'ShoppingController@payment');
Route::get('order/payment', 'ShoppingController@order_payment');
Route::get('order/verify', 'ShoppingController@verify');
Route::post('site/check_gift_cart', 'ShoppingController@check_gift_cart');
Route::post('site/check_discount_code', 'ShoppingController@check_discount_code');




Route::prefix('user')->middleware(['auth'])->group(function () {
    //Address
    Route::post('/addAddress', 'UserController@addAddress');

    //like
    Route::post('/likeComment','ApiController@likeComment');
    Route::post('/dislikeComment','ApiController@dislikeComment');

    Route::delete('/removeAddress/{address_id}', 'UserController@removeAddress');

    //user panel
    Route::get('/profile/gift-cart', 'User\UserPanelController@gift_cart');
    Route::get('/profile/orders', 'User\UserPanelController@orders');
    Route::get('/profile/orders/{order_id}', 'User\UserPanelController@show_orders');



});


Route::get('test', function () {
//    $time=time();
//    $discounts=\App\DiscountCode::where('code','takhfif-samsung')->where('expire_time','>=',$time)->get();
//    if ($discounts)
//    {
//        return \App\DiscountCode::check($discounts);
//    }
//
    Session::forget('cart_final_price');
    Session::forget('discount_value');
    Session::forget('gift_value');
});

//Session::forget('cart_final_price');
//Session::forget('discount_value');
