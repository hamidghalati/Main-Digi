<?php

namespace App\Channels;

use App\Ghasedak\GhasedakApi;
use Exception;
use Illuminate\Notifications\Notification;

class SmsChannel
{
    public function send($notifiable, Notification $notification)
    {
        $data = $notification->toSms($notifiable);
        $mobile_number=$data['mobile_number'];
        $message=$data['message'];

        $api = new GhasedakApi( env('SMS_API_KEY'));
        try {
            $api->SendSimple($mobile_number,$message,env('SMS_API_LINE'));
        }
        catch (Exception $exception)
        {
//SMS_API_KEY=f3bf6b8f7fd8a7ffeb737ee836337755dcb8d6c1c17db9f564f77a49482e7298
//SMS_API_LINE=10008566
        }

    }
}
