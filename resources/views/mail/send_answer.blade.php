<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{direction: rtl;}
        .box{width: 95%;margin: auto;direction: rtl;text-align: right;font-size: 16px;font-family: Tahoma}
        .answer_box{width: 95%;margin: auto;border: 1px dashed gray;padding: 15px}
    </style>
</head>
<body>

<div class="box">
    <h5>
        <span>{{ $question->getUserInfo->first_name.' '.$question->getUserInfo->last_name }}</span>
        <span> برای پرسش شما پاسخی ارسال شد</span>
    </h5>


    <div class="answer_box">
        {!!  $answer->questions !!}
    </div>
    <p>پرسش شما</p>
    <div>
        {!! $question->questions !!}
    </div>

    <br>
    <br>


    <a href="{{ url('product/dkp-'.$question->getProduct->id.'/'.$question->getProduct->product_url) }}">
{{--        {{ url('product/dkp-'.$question->getProduct->id.'/'.$question->getProduct->product_url) }}--}}
        لینک محصول
    </a>
</div>

</body>
</html>
