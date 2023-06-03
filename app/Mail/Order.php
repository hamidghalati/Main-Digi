<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Order extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $order_data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order,$order_data)
    {
        $this->order=$order;
        $this->order_data=$order_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject='جزییات سفارش - '.env('SHOP_NAME');
        return $this->view('mail.order')->subject($subject);

    }
}
