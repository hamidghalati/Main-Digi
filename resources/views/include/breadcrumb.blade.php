<?php
use Hekmatinasser\Verta\Verta;
$v = new Verta();
?>

<div class="breadcrumb">
    <ul class="list-inline">
        <li>
            <a href="{{url('admin')}}">
                <span class="fa fa-home"></span>
                <span>پیشخوان</span>
                @if(isset($data))
                    <span class="fa fa-angle-left"></span>
                @endif
            </a>
        </li>
        @if(isset($data) && is_array($data))
            @foreach($data as $key=>$value)
                <li>
                    <a href="{{$value['url']}}">
                        <span>{{$value['title']}}</span>
                        @if($key!=(sizeof($data)-1)|| isset($_GET['trashed']))
                            <span class="fa fa-angle-left"></span>
                        @endif
                    </a>
                </li>
            @endforeach
        @endif

        @if(isset($_GET['trashed']))
            <li>
                <a>
                    <span>سطل زباله</span>

                </a>
            </li>
        @endif

        <li class="date_li">
            <span class="mdi mdi-calendar-clock fa-xl" aria-hidden="true"></span>
            <span>امروز</span>
            <span>{{$v->formatWord('l')}}</span>
            <span>{{replace_number($v->day)}}</span>
            <span>{{$v->formatWord('F ')}}</span>

            <span>{{replace_number($v->year)}}</span>
        </li>

    </ul>
</div>
