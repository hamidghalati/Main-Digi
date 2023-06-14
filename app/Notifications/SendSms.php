<?php

namespace App\Notifications;

use App\Channels\SmsChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendSms extends Notification implements ShouldQueue
{
    use Queueable;

    protected $mobile_number;
    protected $message;

    public function __construct($mobile_number,$message)
    {
        $this->mobile_number=$mobile_number;
        $this->message=$message;
    }

    public function via($notifiable)
    {
        return [SmsChannel::class];
    }

    public function toSms($notifiable)
    {
        return[
            'mobile_number'=>$this->mobile_number,
            'message'=>$this->message
        ];
    }

    public function toArray($notifiable)
    {
        return [

        ];
    }
}
