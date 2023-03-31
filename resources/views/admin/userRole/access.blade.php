@extends('layouts.admin.admin')
@section('content')
    @include('include.breadcrumb',['data'=>[
       ['title'=>'مدیریت نقش کاربری','url'=>url('admin/userRole')],
       ['title'=>'تعیین سطح دسترسی نقش کاربری ','url'=>url('admin/userRole/access/'.$role->id)]
       ]])
    <div class="panel">
        <div class="header"> تعیین سطح دسترسی :  {{ $role->name }} </div>
        @php $AccessList=\App\User::AccessList();  @endphp
        <div class="panel_content">
            @include('include.alert')
            <form action="" method="POST">
                @csrf
                <ul class="access">
                    @foreach($AccessList as $key=>$item)
                        <li class="item_group" style="margin-bottom: 20px">
                            <span>{{ $item['label'] }}</span>
                            <ul>
                                @foreach($item['access'] as $key2=>$value)
                                    <li>
                                        <div class="pretty p-icon p-tada">
                                            <input @if(CheckAccess($role_accesses,$key,$key2)) checked="checked" @endif  type="checkbox" name="access[{{$key}}][]" value="{{$key2}}" class="check_box" />
                                            <div class="state p-success-o">
                                                <i class="icon mdi mdi-check-all"></i>
                                                <label></label>
                                            </div>
                                        </div>
                                        {{ $value['label'] }}
                                    </li>
                                @endforeach
                            </ul>
                        </li>
                    @endforeach
                </ul>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success btn-lg "><i class="fa fa-check"></i>  ثبت اطلاعات</button>
                </div>
            </form>
        </div>
    </div>
@endsection
