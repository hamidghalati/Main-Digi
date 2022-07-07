<?php
namespace App\Http\Controllers\Admin;

use App\CategoriesModel;
use Barryvdh\Debugbar\Controllers\BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class CustomController extends BaseController
{
    use AuthorizesRequests,DispatchesJobs,ValidatesRequests;



    public function destroy($id)
    {
        $query_string=property_exists($this,'query_string')? '&'.$this->query_string:'';
        $model_name="App\\".$this->model;

        $row=$model_name::withTrashed()->findOrFail($id);
        if ($row->deleted_at==null){
            $row->delete();
            return redirect('admin/'.$this->route_params.'?trashed=true'.$query_string)
                ->with(['message'=>"  $this->title  به سطل زباله انتقال یافت.",'header'=>"حذف $this->title",'alerts'=>'warning']);

        }
        else{
            $row->forceDelete();
            return redirect('admin/'.$this->route_params.'?trashed=true'.$query_string)
                ->with(['message'=>" $this->title با موفقیت حذف گردید.",'header'=>"حذف $this->title",'alerts'=>'warning']);

        }


    }

    public function remove_item(Request $request){
        $query_string=property_exists($this,'query_string')? '&'.$this->query_string:'';

        $model_name="App\\".$this->model;
        $param_name=$this->route_params.'_id';
        $ids=$request->get($param_name,array());
        foreach ($ids as $key=>$value)
        {
            $row=$model_name::withTrashed()->where('id',$value)->firstOrFail();
            if ($row->deleted_at==null){
                $row->delete();
            }
            else{
                $row->forceDelete();

            }
        }
        return redirect('admin/'.$this->route_params.'?trashed=true'.$query_string)
            ->with(['message'=>" $this->title با موفقیت حذف گردید.",'header'=>"حذف $this->title",'alerts'=>'error']);

    }

    public function restore_item(Request $request){
        $query_string=property_exists($this,'query_string')? '&'.$this->query_string:'';

        $model_name="App\\".$this->model;
        $param_name=$this->route_params.'_id';
        $id=$request->get($param_name,array());
        foreach ($id as $key=>$value){
            $row=$model_name::withTrashed()->where('id',$value)->firstOrFail();
            $row->restore();
        }
        return redirect('admin/'.$this->route_params.'?trashed=true'.$query_string)
            ->with(['message'=>" $this->title با موفقیت بازیابی گردید.",'header'=>"بازیابی $this->title",'alerts'=>'success']);
    }

    public function restore($id){
        $query_string=property_exists($this,'query_string')? '&'.$this->query_string:'';

        $model_name="App\\".$this->model;
        $row=$model_name::withTrashed()->where('id',$id)->firstOrFail();
        $row->restore();
        return redirect('admin/'.$this->route_params.'?trashed=true'.$query_string)
            ->with(['message'=>" $this->title با موفقیت بازیابی گردید.",'header'=>"بازیابی $this->title",'alerts'=>'success']);

    }


}
