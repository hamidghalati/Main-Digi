<template>

    <transition name="data-box">
        <div class="vue_mobile_data_box" v-if="show_box">
            <div class="header">
                <span>نظرات کاربران</span>
                <a v-on:click="hide_transition_box()">
                    <span>بازگشت</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>
            <div class="content" v-on:scroll="checkScroll" style="background: #F5F5F5!important;">

                <div class="feq_filter">
                    <div class="item_box box_header">
                        <span>نظر خود را ثبت کنید</span>
                        <a v-bind:href="$siteUrl+'/product/comment/'+this.product_id" class="add_link">
                            <span>افزودن نظر</span>
                            <span class="fa fa-plus"></span>
                        </a>
                    </div>
                    <span class="feq_filter_title">مرتب سازی بر اساس :</span>
                    <ul class="feq_filter_item">
                        <li>
                            <input type="radio" value="1" v-model="ordering" name="sort" id="radio1"
                                   v-on:click="set_ordering(1)">
                            <label for="radio1">نظر خریداران</label>
                        </li>
                        <li>
                            <input type="radio" value="2" v-model="ordering" name="sort" id="radio2"
                                   v-on:click="set_ordering(2)">
                            <label for="radio2">مفیدترین نظرات</label>
                        </li>
                        <li>
                            <input type="radio" value="3" v-model="ordering" name="sort" id="radio3"
                                   v-on:click="set_ordering(3)">
                            <label for="radio3">جدیدترین نظرات</label>
                        </li>
                    </ul>
                </div>

                <div ref="comment_box">
                    <div class="comment_div_mobile" v-for="(comment,key) in list.data" v-bind:key="key">
                        <div class="row">
                            <div class="comment_header">
                                <div style="width: 86%;">
                                    <span class="comment_title">{{ comment.title }}</span>
                                    <p>
                                        <span>توسط</span>
                                        <span v-if="comment.get_user_info==null">ناشناس</span>
                                        <span
                                            v-else>{{
                                                comment.get_user_info.first_name + ' ' + comment.get_user_info.last_name
                                            }}</span>
                                        <span>در تاریخ</span>
                                        {{ getDate(comment.time) }}
                                    </p>
                                </div>
                                <div v-if="comment.order_id>0" class="title_buyer"> خریدار</div>
                            </div>
                            <div class="row">
                                <div class="col-12" v-if="comment.advantage.length>1">
                                    <span class="evaluation_label">نقاط قوت</span>
                                    <ul class="evaluation_ul advantage" >
                                        <li v-for="advantage in comment.advantage" v-if="advantage!=''"  v-bind:key="advantage.id">
                                            <span>{{ advantage }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-12" v-if="comment.advantage.length>1">
                                    <span class="evaluation_label">نقاط ضعف</span>
                                    <ul class="evaluation_ul disadvantage" >
                                        <li v-for="disadvantage in comment.disadvantage" v-if="disadvantage!=''" v-bind:key="disadvantage.id">
                                            <span>{{ disadvantage }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="comment_text">{{ comment.content }}</div>

                            <div class="footer">
                                <div>
                                    آیا این نظر برایتان مفید بود ؟
                                </div>
                                <div>
                                    <button class="btn_like" v-on:click="like(comment,comment.id,'comments','redirect')"
                                            v-bind:data-count="replaceNumber(comment.like)">بلی
                                    </button>
                                    <button class="btn_like dislike" v-on:click="dislike(comment,comment.id,'comments','redirect')"
                                            v-bind:data-count="replaceNumber(comment.dislike)">خیر
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div style="margin-bottom: 62px!important;"></div>


                </div>

                <div v-if="comment_count==0 && getServerData=='ok'">
                    <p style="text-align: center;padding-top: 30px;padding-bottom: 20px;color: red">تاکنون برای این
                        محصول نظری
                        ثبت نشده است</p>
                </div>


                <div id="loading2" v-if="show_loading_box">
                    <span class="loader"></span>
                </div>

            </div>
        </div>
    </transition>

</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "MobileThemeCommentList",
    props: ['product_id', 'product_title'],
    mixins: [myMixin],
    data() {
        return {
            show_box: false,
            list: {data: []},
            comment_count: 0,
            avg: 0,
            avg_score: [],
            getServerData: 'ok',
            ordering: 1,
            scoreItem: [
                'کیفیت ساخت :',
                'نوآوری :',
                'سهولت استفاده :',
                'ارزش خرید به نسبت قیمت :',
                'امکانات و قابلیت ها :',
                'سهولت طراحی و ظاهر :'
            ],
            scoreLabel: [
                'خیلی بد',
                'بد',
                'معمولی',
                'خوب',
                'عالی'
            ],
            monthName: [
                'فروردین',
                'اردیبهشت',
                'خرداد',
                'تیر',
                'مرداد',
                'شهریور',
                'مهر',
                'آبان',
                'آذر',
                'دی',
                'بهمن',
                'اسفند'
            ],
            send: true,
            show_loading_box: false,
            comment_list_height: 0,
            scroll_height: 0,
            send_request: true,
            page: 1,
            comment_list: {data: []}
        }
    },
    mounted() {
        const app = this;
        $(document).on('click', '#show_more_comment', function () {
            $('body').css('overflow-y', 'hidden');
            app.show_box = true;
            if (app.list.data.length == 0) {
                app.getList();
            }

        });
    },
    methods: {
        getList: function () {
            if (this.send_request) {
                this.send_request = false;
                this.show_loading_box = true;
                const app = this;
                const url = this.$siteUrl + "/site/getComment?page=" + this.page + "&product_id=" + this.product_id + "&orderBy=" + this.ordering;
                this.axios.get(url).then(response => {
                    this.show_loading_box = false;




                    response.data['comment'].data.forEach(function (item) {
                        app.list.data.push(item);
                    });
                    this.avg = response.data.avg;
                    this.comment_count = response.data.comment_count;
                    this.avg_score = response.data.avg_score;
                    this.send_request = true;

                    if (response.data['comment'].data.length == 0) {
                        this.getServerData = 'no';
                    }
                    if (response.data['comment'].data.length>2) {
                        app.list=response.data.comment;

                    }


                    this.$nextTick(function () {
                        const h = this.$refs.comment_box.clientHeight;
                        this.comment_list_height = h;
                    });

                }).catch(reason => {
                    this.show_loading_box = false;
                    this.send_request = true;
                });
            }


        },
        set_ordering: function (type) {
            this.ordering = type;
            // this.list= this.comment_list;
            this.send_request=true;
            this.getList();

        },
        checkScroll: function (event) {
            const h = event.target.scrollTop;
            if (this.show_box) {
                console.log(h+">"+this.comment_list_height+"-"+this.scroll_height)
                if (h > (this.comment_list_height / 3) && this.comment_list_height > 200 && h > this.scroll_height && this.getServerData == 'ok' && this.send_request) {
                    this.page = this.page + 1;
                    this.getList();
                }
                if (h > this.scroll_height) {
                    this.scroll_height = h;
                }
                 if(h< (this.comment_list_height)) {
                     // this.send_request=true;
                     this.getServerData = 'no'
                     this.scroll_height = h;
                     this.getList();
                 }
            }
        }
    }
}
</script>

<style scoped>

</style>
