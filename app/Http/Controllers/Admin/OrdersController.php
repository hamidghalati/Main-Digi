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

        $order_data=new OrderData($order->getOrderInfo,$order->getProductRow,$order->user_id);
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

    public function submission(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),0,'DESC');
        return view('admin.orders.submission',[
           'label'=>'مدیریت مرسوله ها',
           'label_url'=>'submission',
           'submission'=>$submission,
            'req'=>$request
        ]);

    }

    public function submission_info($id)
    {
        $submission_info=OrderInfo::with('getOrder.getAddress')
            ->where('id',$id)
            ->has('getOrder')
            ->firstOrFail();
        $order_data=new OrderData($submission_info->getOrder->getOrderInfo,$submission_info->getOrder->getProductRow,$submission_info->getOrder->user_id);
        $order_data=$order_data->getData($id);
        return view('admin.orders.submission_info',['submission_info'=>$submission_info,'order_data'=>$order_data]);
    }

    public function submission_approved(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),1,'DESC');
        return view('admin.orders.submission',[
            'label'=>'مرسوله های تأیید شده',
            'label_url'=>'submission/approved',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }

    public function items_today(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),2,'DESC');
        return view('admin.orders.submission',[
            'label'=>'مرسوله های ارسالی امروز',
            'label_url'=>'submission/items/today',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }

    public function submission_ready(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),3,'DESC');
        return view('admin.orders.submission',[
            'label'=>'مرسوله های آماده ارسال',
            'label_url'=>'submission/ready',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }

    public function posting_send(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),4,'DESC');
        return view('admin.orders.submission',[
            'label'=>'  مرسوله های ارسال شده به پست',
            'label_url'=>'submission/posting/send',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }

    public function posting_receive(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),5,'DESC');
        return view('admin.orders.submission',[
            'label'=>'  مرسوله های آماده دریافت از پست',
            'label_url'=>'submission/posting/receive',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }

        public function delivered_shipping(Request $request)
    {
        $submission=OrderInfo::getData($request->all(),6,'DESC');
        return view('admin.orders.submission',[
            'label'=>'  مرسوله های تحویل داده شده',
            'label_url'=>'delivered/shipping',
            'submission'=>$submission,
            'req'=>$request
        ]);
    }
}
