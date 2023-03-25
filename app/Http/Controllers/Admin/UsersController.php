<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\User;
use App\UserRole;
use Hash;
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

    public function create(){
        $roles=UserRole::get();
        return view('admin.users.create',['roles'=>$roles]);
    }

    public function store(UserRequest $request){
        $user=new User($request->all());
        if ($request->get('role')=="admin" || $request->get('role')=="user"){
            $user->role=$request->get('role');
        }
        else{
            $user->role="user";
            $user->role_id=$request->get('role');
        }
        $user->password= Hash::make($request->get('password'));
        $user->saveOrFail();
        return redirect('admin/users')->with(['message'=>'ثبت  کاربر جدید با موفقیت انجام شد','header'=>'ثبت  کاربر','alerts'=>'success']);

    }
}
