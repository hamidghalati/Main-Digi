<?php

namespace App\Jobs;

use App\Offers;
use App\ProductWarranty;
use http\Env\Request;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class IncredibleOffers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $row_id;

    public function __construct($id)
    {
        $this->row_id=$id;
    }


    public function handle()
    {
        $productWarranty=ProductWarranty::find($this->row_id);
        if ($productWarranty && $productWarranty->offers==1) {
            $time=time();
            if ($productWarranty->offers_first_date<=$time)
            {
                $offers=new Offers();
                $offers=$offers->remove($productWarranty);
            }


        }
    }
}
