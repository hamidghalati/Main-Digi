<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use App\UserRole;
use Illuminate\Http\Request;

class UsersController extends CustomController
{
    protected $model='User';
    protected $title='کاربر';
    protected $route_params='users';

    public function index(Request $request)
    {
        $roles=UserRole::get();
        $users=User::getData($request->all());
        $trash_count=User::onlyTrashed()->count();
        return view('admin.users.index',['users'=>$users,'trash_count'=>$trash_count,'req'=>$request,'roles'=>$roles]);

    }
}
