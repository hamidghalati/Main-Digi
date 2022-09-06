<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    protected $table='address';
    protected $fillable=['name','mobile','province_id','city_id','address','zip_code','user_id','lat','lng'];
}
