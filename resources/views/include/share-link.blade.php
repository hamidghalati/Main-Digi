<!-- Modal -->
<div class="modal fade" id="share_box" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">اشتراک گذاری</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>
                    با استفاده از روش های زیر می توانید این صفحه را با دوستان خود به اشتراک بگذارید
                </p>

                <ul>
                    <li>
                        <a href="http://telegram.me/share/url?url=<?= url('product/dkp-'.$product->id.'/'.$product->product_url)?>&ref=telegram">
                            <span class="mdi mdi-telegram"></span>
                        </a>
                    </li>
                    <li>
                        <a href="http://twitter.com/intent/tweet/?url=<?= url('product/dkp-'.$product->id.'/'.$product->product_url)?>">
                            <span class="mdi mdi-twitter"></span>
                        </a>
                    </li>
                    <li>
                        <a href="http://facebook.com/share/share.php?m2w&s=100&p[url]=<?= url('product/dkp-'.$product->id.'/'.$product->product_url)?>">
                            <span class="mdi mdi-facebook"></span>
                        </a>
                    </li>
                    <li>
                        <a href="http://wa.me?text=<?= url('product/dkp-'.$product->id.'/'.$product->product_url)?>">
                            <span class="mdi mdi-whatsapp"></span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span class="mdi mdi-email-outline"></span>
                        </a>
                    </li>
                    <li>
                        <button id="copy_btn" copy-data="{{ url('product/dkp-'.$product->id.'/'.$product->product_url) }}">کپی لینک</button>
                    </li>
                </ul>

                <div class="share_link_form">
                    <div class="email_form">
                        <input type="text" id="email" class="form-control">
                        <input type="hidden" id="share_product_id" value="{{ $product->id }}" >
                        <button id="send_email">ارسال</button>
                    </div>
                    <div>
                        <span class="has_error" id="share_link_error"></span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
