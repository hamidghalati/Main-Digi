<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShareEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user_name;
    public $product;

    public function __construct($user_name,$product)
    {
        $this->user_name=$user_name;
        $this->product=$product;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.share-email')->subject('از طرف دوست شما');
    }
}
