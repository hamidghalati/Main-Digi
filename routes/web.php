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

use App\Jobs\OrderStatistics;
use App\Mail\SendAnswer;
use App\Order;
use App\OrderData;
use App\Question;

Route::get('/', 'SiteController@index');

Auth::routes();

//password/confirm
Route::get('password/confirm','Auth\ForgotPasswordController@confirm')->middleware('guest');
Route::post('password/confirm','Auth\ForgotPasswordController@check_confirm_code')->middleware('guest');

//vue_login
Route::post('/vue_login', 'Auth\LoginController@vue_login')->middleware('guest');

Route::get('admin_login', 'Admin\AdminController@admin_login_form')->middleware('guest');;

Route::get('/confirm', 'SiteController@confirm')->middleware('guest');
Route::get('/confirmphone', 'SiteController@confirmphone')->middleware('auth');

//ajax/resend
Route::post('ajax/resend', 'SiteController@resend');

//ajax/resend_forget_password
Route::post('ajax/resend_forget_password', 'SiteController@resend_forget_password');

Route::post('active_account', 'SiteController@active_account')->middleware('guest')->name('active_account');
Route::post('changeMobileNumber', 'SiteController@changeMobileNumber')->middleware('auth');

Route::get('/home', 'HomeController@index')->name('home');

//admin
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', 'Admin\AdminController@index')->name('admin');


    Route::get('/panel', 'Admin\AdminController@author_panel')->name('author_panel');
    Route::get('/403', 'Admin\AdminController@error403')->name('error403');


    //elFinder used ckeditor
    Route::get('file_manager', 'Admin\AdminController@file_manager');

    //Category
    create_crud_route('category', 'CategoryController');

    //Brand
    create_crud_route('brands', 'BrandController');

    //UserRole
    create_crud_route('userRole', 'UserRoleController');
    Route::get('userRole/access/{role_id}', 'Admin\UserRoleController@access');
    Route::post('userRole/access/{role_id}', 'Admin\UserRoleController@add_access');


    //Users
    create_crud_route('users', 'UsersController', []);

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

    //commissions
    create_crud_route('commissions', 'CommissionController');

    //report/sale
    Route::get('report/sale','Admin\AdminController@sale_report');

    //shop/get_sale_report
    Route::get('shop/get_sale_report','Admin\AdminController@get_sale_report');

    //product/get_sale_report
    Route::get('product/get_sale_report','Admin\ProductController@get_sale_report');

    //stockroom
    create_crud_route('stockrooms', 'StockroomController', []);

    //page
    create_crud_route('pages', 'PageController');

    //stockroom/getProductWarranty
    Route::get('stockroom/getProductWarranty', 'Admin\StockroomController@getProductWarranty')->name('get_product_warranty');

    //stockroom/input
    Route::get('stockroom/input', 'Admin\StockroomController@input')->name('stockroom.input');;

    //stockroom/input/id
    Route::get('stockroom/input/{id}', 'Admin\StockroomController@show_input')->name('stockroom.show_input');;

    //stockroom/add_product
    Route::post('stockroom/add_product', 'Admin\StockroomController@add_product')->name('stockroom.add_product');;

    //stockroom/add/input
    Route::get('stockroom/add/input', 'Admin\StockroomController@add_input')->name('stockroom.add_input');


    //stockroom/getInventory
    Route::get('stockroom/getInventory', 'Admin\StockroomController@getInventory')->name('get_inventory');

    //stockroom/output
    Route::get('stockroom/output', 'Admin\StockroomController@output')->name('stockroom.output');;

    //stockroom/output/id
    Route::get('stockroom/output/{id}', 'Admin\StockroomController@show_output')->name('stockroom.show_output');;

    //stockroom/add_output
    Route::post('stockroom/add_output', 'Admin\StockroomController@add_product')->name('stockroom.add_product');;

    //stockroom/add/output
    Route::get('stockroom/add/output', 'Admin\StockroomController@add_output')->name('stockroom.add_output');

    //factor/id/input
    Route::get('factor/{id}/input','Admin\StockroomController@input_factor')->name('stockroom.input_factor');

    //factor/id/output
    Route::get('factor/{id}/output','Admin\StockroomController@output_factor')->name('stockroom.output_factor');

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
    create_crud_route('comments', 'CommentController', ['show', 'create', 'store', 'edit', 'update']);
    Route::post('comment/change_status', 'Admin\CommentController@change_status');

    //question
    create_crud_route('questions', 'QuestionController', ['show', 'create', 'store', 'edit', 'update']);
    Route::post('question/change_status', 'Admin\QuestionController@change_status');
    Route::post('question/addAnswer/{id}', 'Admin\QuestionController@addAnswer');


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

    //orders/return-product
    Route::post('orders/return-product','Admin\OrdersController@remove_return_product')->name('remove-return-product');


    //setting/send-order-price
    Route::match(['get', 'post'], 'setting/send-order-price', 'Admin\SettingController@send_order_price');

    //setting/shop
    Route::match(['get', 'post'], 'setting/shop', 'Admin\SettingController@shop');

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

    //orders/return-product
    Route::get('orders/return-product','Admin\OrdersController@return_product_list')->name('return-product-list');



    Route::get('orders/{order_id}', 'Admin\OrdersController@show');

    Route::post('order/change_status', 'Admin\OrdersController@change_status');

    //orders/submission/factor/id
    Route::get('orders/submission/factor/{submission_id}','Admin\OrdersController@submission_factor');

    //orders/return-product/id
    Route::get('orders/return-product/{id}','Admin\OrdersController@return_product')->name('return-product');
    Route::post('orders/return-product/{id}','Admin\OrdersController@add_return_product')->name('return-product');



    ///ReView
    Route::get('product/review/primary', 'Admin\ReviewController@primary');
    Route::post('product/review/primary', 'Admin\ReviewController@add_primary_content');
    create_crud_route('product/review', 'ReviewController');


});

//comments
Route::get('product/comment/{product_id}', 'SiteController@comment_form')->middleware('auth');
Route::post('product/comment/{product_id}', 'SiteController@add_comment')->middleware('auth');
Route::get('site/getComment', 'ApiController@getComment');

//site/share_product
Route::post('site/share_product','SiteController@share_product');

//show question
Route::get('site/get_question/{product_id}', 'SiteController@get_question');

Route::get('product/{product_id}/{product_url}', 'SiteController@show_product');
Route::get('product/{product_id}', 'SiteController@show_product');


//ajax
Route::post('site/change_color', 'SiteController@change_color');


Route::post('Cart', 'SiteController@add_cart');
Route::get('Cart', 'SiteController@show_cart');

Route::post('site/cart/remove_product', 'SiteController@remove_product');
Route::post('site/cart/change_product_cart', 'SiteController@change_product_cart');

//pages/id
Route::get('page/{page}','SiteController@page');


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

//show cart header
Route::get('site/CartProductData', 'SiteController@CartProductData');

Route::get('shipping', 'ShoppingController@shipping');
Route::get('shipping/getSendData/{city_id}', 'ShoppingController@getSendData');
//payment
Route::post('payment', 'ShoppingController@payment');
Route::get('order/payment', 'ShoppingController@order_payment');
Route::get('order/verify', 'ShoppingController@verify');
Route::post('site/check_gift_cart', 'ShoppingController@check_gift_cart');
Route::post('site/check_discount_code', 'ShoppingController@check_discount_code');


Route::prefix('user')->middleware(['auth'])->group(function () {

    //getFavoriteList
    Route::get('getFavoriteList', 'UserController@getFavoriteList');


    //add_favorite
    Route::post('add_favorite', 'UserController@add_favorite');

    //addQuestion
    Route::post('addQuestion', 'UserController@addQuestion');

    //getAddress
    Route::get('/getAddress', 'UserController@getAddress');

    //Address
    Route::post('/addAddress', 'UserController@addAddress');

    //like
    Route::post('/like', 'ApiController@like');
    Route::post('/dislike', 'ApiController@dislike');

    Route::delete('/removeAddress/{address_id}', 'UserController@removeAddress');

    //user panel
    Route::get('/profile/gift-cart', 'User\UserPanelController@gift_cart');
    Route::get('/profile/orders', 'User\UserPanelController@orders');
    Route::get('/profile/orders/{order_id}', 'User\UserPanelController@show_orders');
    //profile
    Route::get('profile', 'User\UserPanelController@profile');
    Route::get('profile/additional-info', 'User\UserPanelController@additional_info');
    Route::post('profile/additional-info', 'User\UserPanelController@save_additional_info');

    //profile/personal-info
    Route::get('profile/personal-info', 'User\UserPanelController@personal_info');

    //profile/address
    Route::get('profile/address', 'User\UserPanelController@address');

    //profile/address
    Route::get('profile/address', 'User\UserPanelController@address');

    //profile/favorite
    Route::get('profile/favorite', 'User\UserPanelController@favorite');

    //favorite/removeProductOfList
    Route::post('favorite/removeProductOfList', 'UserController@removeProductOfList');


});


Route::get('test', function () {
    $order_id=137;
    $order=Order::with(['getProductRow.getProduct','getOrderInfo','getAddress','getGiftCart'])
        ->where(['id'=>$order_id])->firstOrFail();

    $order_data=new OrderData($order->getOrderInfo,$order->getProductRow,$order->user_id,'yes');
    $order_data=$order_data->getData();

    Mail::to('hamid.sam86@gmail.com')->queue(new \App\Mail\Order($order,$order_data));
});

//Session::forget('cart_final_price');
//Session::forget('discount_value');
