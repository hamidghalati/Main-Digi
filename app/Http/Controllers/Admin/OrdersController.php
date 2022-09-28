<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderData;
use App\OrderInfo;
use DB;
use Illuminate\Http\Request;

class OrdersController extends CustomController
{
    protected $model='order';
    protected $title='سفارشات';
    protected $route_params='orders';

    public function index(Request $request)
    {
        $orders=Order::getData($request->all());
        $trash_count=Order::onlyTrashed()->count();
        return view('admin.orders.index',['orders'=>$orders,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function show($order_id)
    {
        $order=Order::with(['getProductRow','getOrderInfo','getAddress'])
            ->where(['id'=>$order_id])->firstOrFail();
        if ($order->order_read=='no'){
            $order->order_read='ok';
            $order->update();
        }

        $order_data=new OrderData($order->getOrderInfo,$order->getProductRow);
        $order_data=$order_data->getData();

        return view('admin.orders.show',['order'=>$order,'order_data'=>$order_data]);

    }

    public function change_status(Request $request)
    {
        $order_id=$request->get('order_id');
        $status=$request->get('status');
        $orderInfo=OrderInfo::where('id',$order_id)->first();
        if ($orderInfo)
        {
            DB::beginTransaction();
            $orderInfo->send_status=$status;
            try {
                $orderInfo->update();
                set_order_product_status($orderInfo,$status);
                DB::commit();
                return 'ok';
            }
            catch (\Exception $exception)
            {
                DB::rollBack();
                return 'error';

            }

        }
        else
        {
            return 'error';
        }
    }


}
