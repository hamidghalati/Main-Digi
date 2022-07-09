<?php

if (Session::has('message'))

    toastr(Session::get('message'),Session::get('alerts'),Session::get('header'), ['timeOut' => 5000, 'positionClass'=> 'toast-bottom-right',]) ;
    $_SESSION = [];


