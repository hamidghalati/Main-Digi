<template>

    <transition name="data-box">
        <div class="vue_mobile_data_box" v-if="show_box">
            <div class="header">
                <span>نظرات کاربران</span>
                <a v-on:click="show_box=false">
                    <span>بازگشت</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>
            <div class="content" style="background: #F5F5F5!important;">

                <div class="feq_filter" v-if="comment_count>0 && getServerData=='ok'">
                    <div class="item_box box_header">
                        <span>نظر خود را ثبت کنید</span>
                        <a v-bind:href="$siteUrl+'/product/comment/'+this.product_id" class="add_link">
                            <span>افزودن نظر</span>
                            <span class="fa fa-plus"></span>
                        </a>
                    </div>
                   <span class="feq_filter_title">مرتب سازی بر اساس :</span>
                    <ul class="feq_filter_item" >
                        <li>
                            <input type="radio" value="1" v-model="ordering" name="sort" id="radio1" v-on:click="set_ordering(1)">
                            <label for="radio1">نظر خریداران</label>
                        </li>
                        <li>
                            <input type="radio" value="2"  v-model="ordering" name="sort" id="radio2" v-on:click="set_ordering(2)">
                            <label for="radio2">مفیدترین نظرات</label>
                        </li>
                        <li>
                            <input type="radio" value="3"  v-model="ordering" name="sort" id="radio3" v-on:click="set_ordering(3)">
                            <label for="radio3">جدیدترین نظرات</label>
                        </li>
                    </ul>
                </div>

                <div class="comment_div_mobile" v-for="(comment,key) in list.data">
                    <div class="row">
                        <div class="comment_header">
                            <div style="width: 86%;">
                                <span class="comment_title">{{ comment.title }}</span>
                                <p>
                                    <span>توسط</span>
                                    <span v-if="comment.get_user_info==null">ناشناس</span>
                                    <span
                                        v-else>{{ comment.get_user_info.first_name + ' ' + comment.get_user_info.last_name }}</span>
                                    <span>در تاریخ</span>
                                    {{ getDate(comment.time) }}
                                </p>
                            </div>
                            <div v-if="comment.order_id>0" class="title_buyer"> خریدار</div>
                        </div>
                        <div class="row">
                            <div class="col-12" v-if="comment.advantage.length>1">
                                <span class="evaluation_label">نقاط قوت</span>
                                <ul class="evaluation_ul advantage">
                                    <li v-for="advantage in comment.advantage" v-if="advantage!=''">
                                        <span>{{ advantage }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-12" v-if="comment.advantage.length>1">
                                <span class="evaluation_label">نقاط ضعف</span>
                                <ul class="evaluation_ul disadvantage">
                                    <li v-for="disadvantage in comment.disadvantage" v-if="disadvantage!=''">
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
                                <button class="btn_like" v-on:click="like(key,comment.id)"
                                        v-bind:data-count="replaceNumber(comment.like)">بلی
                                </button>
                                <button class="btn_like dislike" v-on:click="dislike(key,comment.id)"
                                        v-bind:data-count="replaceNumber(comment.dislike)">خیر
                                </button>
                            </div>
                        </div>

                    </div>
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
            getServerData: 'no',
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
            show_loading_box:false
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
        getList: function (page = 1) {
           this.show_loading_box=true;
            const url = this.$siteUrl + "/site/getComment?page=" + page + "&product_id=" + this.product_id + "&orderBy=" + this.ordering;
            this.axios.get(url).then(response => {
                this.show_loading_box=false;
                this.list = response.data.comment;
                this.avg = response.data.avg;
                this.comment_count = response.data.comment_count;
                this.avg_score = response.data.avg_score;
                this.getServerData = 'ok';
            }).catch(reason => {
                this.show_loading_box=false;
            });
        },
        set_ordering: function (type) {
            this.ordering = type;
            this.getList(1);
        }
    }
}
</script>

<style scoped>

</style>
