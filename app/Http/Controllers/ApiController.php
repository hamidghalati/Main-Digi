<?php

namespace App\Http\Controllers;

use App\CityModel;
use App\Comment;
use App\ProductWarranty;
use App\ProvinceModel;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function get_province()
    {
        $province = ProvinceModel::orderBy('id', 'Asc')->get();
        return $province;
    }

    public function get_city($province_id)
    {
        $city = CityModel::where('province_id', $province_id)->orderBy('id', 'Asc')->get();
        return $city;
    }

    public function getComment(Request $request)
    {
        $product_id = $request->get('product_id', 0);
        $orderBy = $request->get('orderBy', 1);
        $comments = Comment::getProductCommentList($product_id, $orderBy);
        return $comments;
    }

    public function likeComment(Request $request)
    {
        $comment_id = $request->get('comment_id');
        $result = Comment::addUserScore($comment_id, "like");
        return $result;
    }

    public function dislikeComment(Request $request)
    {
        $comment_id = $request->get('comment_id');
        $result = Comment::addUserScore($comment_id, "dislike");
        return $result;
    }

    public function getProductChartData($product_id)
    {
        return get_product_price_changed($product_id);
    }

    public function getWarranty(Request $request, $product_id)
    {
        $color_id=$request->get('color_id',0);
        return ProductWarranty::where(['product_id'=>$product_id,'color_id'=>$color_id])
            ->orderBy('price2','ASC')
            ->with('getSeller:id,brand_name')
            ->with('getWarranty')
            ->get();
    }

}
