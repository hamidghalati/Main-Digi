<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    protected $table='address';
    protected $fillable=['name','mobile','province_id','city_id','address','zip_code','user_id','lat','lng'];

    public function getProvince()
    {
        return $this->hasOne(ProvinceModel::class,'id','province_id')->withDefault(['name'=>''])->select(['id','name']);
    }

    public function getCity()
    {
        return $this->hasOne(CityModel::class,'id','city_id')->withDefault(['name'=>''])->select(['id','name']);
    }

    public static function addUserAddress($request)
    {
        $user_id=$request->user()->id;
        $id=$request->get('id','0');
        if ($id==0){
            $address=new Address($request->all());
            $address->user_id=$user_id;
            if ($address->save())
            {
                 $addressList=Address::with(['getProvince','getCity'])->where(['user_id'=>$user_id])->orderBy('id','Desc');

                 if ($request->get('paginate')=='ok')
                 {
                     $addressList=$addressList->paginate(10);
                 }
                 else{
                     $addressList=$addressList->get();
                 }
                 return $addressList;
            }
            else{
                return 'error';
            }
        }
        else{
            $address=Address::where(['id'=>$id,'user_id'=>$user_id])->first();
            if ($address)
            {
                $address->update($request->all());
                $addressList=Address::with(['getProvince','getCity'])->where(['user_id'=>$user_id])->orderBy('id','Desc');

                if ($request->get('paginate')=='ok')
                {
                    $addressList=$addressList->paginate(10);
                }
                else{
                    $addressList=$addressList->get();
                }
                return $addressList;
            }
            else{
                return 'error';
            }
        }


    }
}
