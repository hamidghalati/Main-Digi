<footer class="c-footer">

    <div class="row">
        <div class="col-6">
            <ul>
                <li>
                    <a href="">نحوه ثبت سفارش</a>
                </li>
                <li>
                    <a href="">رویه ارسال سفارش</a>
                </li>
                <li>
                    <a href="">شیوه های پرداخت</a>
                </li>
            </ul>
        </div>
        <div class="col-6">
            <ul>
                <li>
                    <a href="">پاسخ به پرسش های متداول</a>
                </li>
                <li>
                    <a href="">رویه بازگرداندن کالا</a>
                </li>
                <li>
                    <a href="">شرایط استفاده</a>
                </li>
                <li>
                    <a href="">حریم خصوصی</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="row">
            <h6 style="text-align: center;">با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید</h6>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="ایمیل" aria-label=""
                       aria-describedby="basic-addon1">

                <div class="input-group-prepend">
                    <button class="btn btn-success" type="button">ارسال</button>
                </div>
            </div>


    </div>

    <div class="row mojavez">
            <h5 style="text-align: center;">مجوزهای فروشگاه</h5>
            <div style="text-align: center;">
                <img src="{{url('files/images/enamad-full-star.png')}}" alt="">
                <img src="{{url('files/images/rezi.png')}}" alt="">
            </div>
    </div>

    <p>
        برای استفاده از مطالب {{ env('SHOP_NAME','') }}، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين
        وب‌سايت متعلق به {{ env('SHOP_NAME','') }} است.
    </p>

</footer>
