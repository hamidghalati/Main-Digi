<div class="dropdownt">
    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        گزینه ها
    </button>

    <?php
    $create_param='';
    $trash_param='';
    if (isset($querystring) && is_array($querystring))
        {
            $create_param='?'.$querystring['param'].'='.$querystring['value'];
            $trash_param='&'.$querystring['param'].'='.$querystring['value'];
        }
    ?>

    <div class="dropdown-menu text-right">
        <a href="{{url($route.'/create').$create_param}}" class="dropdown-item">
            <span class="fa fa-pencil text-success "></span>
            <span class="text-break "> افزودن {{$title}} جدید  </span>
        </a>
        <hr>
        <a href="{{url($route.'?trashed=true'). $trash_param}}" class="dropdown-item">
            <span class="fa fa-trash text-info"></span>
            <span class="text-break t"> سطل زباله
            <span class="badge badge-danger badge-pill text-left">{{replace_number($count)}}</span>
            </span>
        </a>
        <hr>
        <a class="dropdown-item off item_form" id="remove_item" msg="آیا از حذف گروه های {{ $title }} اطمینان دارید؟">
            <span class="fa fa-remove text-danger offcolor" id="remove_color"></span>
            <span class="text-break">حذف گروهی  {{$title}}   </span>
        </a>

        @if(isset($_GET['trashed']) && $_GET['trashed']==true )
        <hr>
        <a class="dropdown-item off item_form" id="restore_item" msg="آیا از بازیابی گروه های {{ $title }} اطمینان دارید؟">
            <span class="fa fa-refresh text-warning  offcolor" id="restore_color"></span>
            <span class="text-break">بازیابی گروهی  {{$title}}   </span>
        </a>
        @endif
    </div>
</div>
