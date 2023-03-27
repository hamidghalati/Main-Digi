<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Order;
use App\Question;
use App\User;
use App\UserRole;
use Hash;
use Illuminate\Http\Request;

class UsersController extends CustomController
{
    protected $model = 'User';
    protected $title = 'کاربر';
    protected $route_params = 'users';

    public function index(Request $request)
    {
        $roles = UserRole::get();
        $users = User::getData($request->all());
        $trash_count = User::onlyTrashed()->count();
        return view('admin.users.index', ['users' => $users, 'trash_count' => $trash_count, 'req' => $request, 'roles' => $roles]);

    }

    public function create()
    {
        $roles = UserRole::get();
        return view('admin.users.create', ['roles' => $roles]);
    }

    public function store(UserRequest $request)
    {
        $user = new User($request->all());
        if ($request->get('role') == "admin" || $request->get('role') == "user") {
            $user->role = $request->get('role');
        } else {
            $user->role = "user";
            $user->role_id = $request->get('role');
        }
        $user->password = Hash::make($request->get('password'));
        $user->saveOrFail();
        return redirect('admin/users')->with(['message' => 'ثبت  کاربر جدید با موفقیت انجام شد', 'header' => 'ثبت  کاربر', 'alerts' => 'success']);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        $roles = UserRole::pluck('name', 'id')->toArray();
        $roles = ['admin' => 'مدیر', 'user' => 'کاربر عادی'] + $roles;
        return view('admin.users.edit', ['roles' => $roles, 'user' => $user]);
    }

    public function update($id, UserRequest $request)
    {
        $data = $request->all();
        $user = User::findOrFail($id);
        if ($request->get('role') == "admin" || $request->get('role') == "user") {
            $data['role'] = $request->get('role');
        } else {
            $data['role'] = "user";
            $data['role_id'] = $request->get('role');
        }
        if (!empty($request->get('password'))) {
            $data['password'] = Hash::make($request->get('password'));
        } else {
            unset($data['password']);
        }

        $user->update($data);
        return redirect('admin/users')
            ->with(['message' => 'ویرایش کاربر با موفقیت انجام شد', 'header' => 'ویرایش کاربر', 'alerts' => 'info']);
    }

    public function show($id)
    {
        $user = User::with(['getRole', 'getAdditionalInfo'])->findOrFail($id);
        $orders = Order::where('user_id', $id)->orderBy('id', 'DESC')->limit(10)->get();
        $comments = Comment::with(['getProduct', 'getUserInfo', 'getScore'])
            ->whereHas('getScore')
            ->orderBy('id', 'DESc')
            ->where('user_id', $id)
            ->limit(10)
            ->get();
        $question=Question::where(['user_id'=>$id,'questions_id'=>0])
            ->limit(10)
            ->get();
        return view('admin.users.show',[
            'user'=>$user,
            'orders'=>$orders,
            'comments'=>$comments,
            'question'=>$question
        ]);
    }
}
