<?php

namespace App\Http\Middleware;

use App\User;
use Auth;
use Closure;
use DB;
use View;


class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::user()->role=='admin'){
            return $next($request);
        }
        else{
            $role_id=Auth::user()->role_id;
            $access=DB::table('role_accesses')->where('role_id',$role_id)->first();
            if ($role_id>0 && $access)
            {
                if ($request->route()->getName()=="error403")
                {
                    View::share('access',$access->access);
                    return $next($request);
                }
                else if ($request->route()->getName()=="admin")
                {
                    return redirect('/admin/panel');
                }
                else if ($request->route()->getName()=="author_panel")
                {
                    View::share('access',$access->access);
                    return $next($request);
                }
                else{
                    $AccessList=User::AccessList();
                    $checkUserAccess=checkUserAccess($access->access,$request->route()->getName(),$AccessList);
                    if ($checkUserAccess)
                    {
                        View::share('access',$access->access);
                        return $next($request);
                    }
                    else{
                        return redirect('/admin/403');
                    }
                }

            }
            else{
                return redirect('/');
            }

        }

    }
}
