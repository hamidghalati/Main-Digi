<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserRole extends Model
{
    use SoftDeletes;
    protected $table='user_roles';
    protected $fillable = ['name'];

    public static function getData($request)
    {
        $string='?';
        $UserRole=self::withCount('userrole')->orderBy('id','DESc');
        if (inTrashed($request)){
            $UserRole=$UserRole->onlyTrashed();
            $string=create_paginate_url($string,'trashed=true');
        }

        if (array_key_exists('string',$request)&& !empty($request['string']))
        {
            $UserRole=$UserRole->where('name','like','%'.$request['string'].'%');
            $string=create_paginate_url($string,'string='.$request['string']);
        }

        $UserRole= $UserRole->paginate(10);
        $UserRole->withPath($string);
        return $UserRole;

    }

    public function userrole(){
        return $this->hasMany(User::class,'role_id','id');
    }
}
