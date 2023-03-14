<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\UserRole;
use Illuminate\Http\Request;

class UserRoleController extends CustomController
{
    protected $model='UserRole';
    protected $title='نقش کاربری';
    protected $route_params='userRole';

    public function index(Request $request)
    {
        $userRole=UserRole::getData($request->all());
        $trash_count=UserRole::onlyTrashed()->count();
        return view('admin.userRole.index',['userRole'=>$userRole,'trash_count'=>$trash_count,'req'=>$request]);

    }

    public function create()
    {
        return view('admin.userRole.create');
    }

    public function store(Request $request)
    {
        $this->validate($request,['name'=>'required|unique:user_roles'],[],['name'=>'نام نقش کاربری']);
        $userRole=new UserRole($request->all());
        $userRole->saveOrFail();
        return redirect('admin/userRole')->with(['message'=>'ثبت نقش کاربری با موفقیت انجام شد','header'=>'ثبت نقش کاربری','alerts'=>'success']);
    }

    public function edit($id)
    {
        $userRole=UserRole::findOrFail($id);
        return view('admin.userRole.edit',['userRole'=>$userRole]);
    }

    public function update($id,Request $request)
    {
        $this->validate($request,['name'=>'required|unique:user_roles'],[],['name'=>'نام نقش کاربری']);
        $userRole=UserRole::findOrFail($id);
        $userRole->update($request->all());
        return redirect('admin/userRole')
            ->with(['message'=>'ویرایش نقش کاربری با موفقیت انجام شد','header'=>'ویرایش نقش کاربری','alerts'=>'info']);

    }
}
