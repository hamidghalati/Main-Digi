<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendAnswer extends Mailable
{
    use Queueable, SerializesModels;

    public $question;
    public $answer;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($question,$answer)
    {
        $this->answer=$answer;
        $this->question=$question;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.send_answer')->subject('دریافت پاسخ - فروشگاه من');
    }
}
