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

        $api = new GhasedakApi('ab2f76f4702dfba647ceb09fab9e7470ec960b6a037bbb1cbef25d1465b6efb4');
        try {
            $api->SendSimple($mobile_number,$message,'10008566');
        }
        catch (Exception $exception)
        {
//SMS_API_KEY=ab2f76f4702dfba647ceb09fab9e7470ec960b6a037bbb1cbef25d1465b6efb4
//SMS_API_LINE=10008566
        }

    }
}
