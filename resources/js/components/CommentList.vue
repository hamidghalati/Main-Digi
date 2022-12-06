<template>
    <div class="comment_box">
        <div class="row" style="padding-bottom: 30px;" v-if="comment_count>0">
            <h2>
                {{ product_title }}
                <span>|</span>
                <span>{{ replaceNumber(5) }}/{{ replaceNumber(avg) }}</span>
                <span>({{ replaceNumber(comment_count) }} نظر )</span>
            </h2>
        </div>

        <div class="row">

            <div class="col-md-6">
                <ul class="rating_ul avg_ul">
                    <li v-for="(item,key) in scoreItem">
                        <label>{{ item }}</label>
                        <div class="rating" v-bind:data-rate-digital="getLabel2(key)">
                            <div class="rating-value" v-bind:style="{width:getWidth2(key)+'%'}"></div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-md-6">
                <div class="comment_summary_note">
                    <span>شما هم می توانید نظر خود را در این بخش بیان نمایید.</span>
                    <p>
                        برای ثبت نظر، لازم است ابتدا وارد حساب کاربری خود شوید.اگر این محصول را قبلاً از فروشگاه ما خریداری کرده اید، نظر شما به عنوان مالک محصول ثبت خواهد شد
                    </p>
                    <a class="btn btn-primary" v-on:click="add_comment">افزودن نظر جدید</a>
                </div>
            </div>

        </div>

        <div class="feq_filter" v-if="comment_count>0 && getServerData=='ok'">
            <p>نظرات کاربران</p>
            <ul class="feq_filter_item" data-title="مرتب سازی بر اساس :">
                <li :class="[ordering==1 ? 'active' : '']" v-on:click="set_ordering(1)">نظر خریداران</li>
                <li :class="[ordering==2 ? 'active' : '']" v-on:click="set_ordering(2)">مفیدترین نظرات</li>
                <li :class="[ordering==3 ? 'active' : '']" v-on:click="set_ordering(3)">جدیدترین نظرات</li>
            </ul>
        </div>

        <div class="comment_div" v-for="(comment,key) in list.data">
            <div class="row">

                <div class="col-md-5">
                    <ul class="rating_ul">
                        <li v-for="(item,key2) in scoreItem">
                            <label for="">{{item}}</label>
                            <div class="rating" v-bind:data-rate-digital="getLabel(key,key2)">
                                <div class="rating-value" v-bind:style="{width: getWidth(key,key2)+'%'}"></div>
                            </div>
                        </li>
                    </ul>

                    <div class="message_purchased" v-if="comment.order_id>0">
                        <a>
                            <span class="fa fa-shopping-cart"></span>
                            خریدار محصول
                        </a>
                    </div>

                </div>

                <div class="col-md-7">
                    <div class="comment_header_box">
                        <span>{{ comment.title }}</span>
                        <p>
                            <span>توسط</span>
                            <span v-if="comment.get_user_info==null">ناشناس</span>
                            <span v-else>{{ comment.get_user_info.first_name+' '+comment.get_user_info.last_name  }}</span>
                            <span>در تاریخ</span>
                            {{ getDate(comment.time) }}
                        </p>
                    </div>

                    <div class="row">
                        <div class="col-md-6" v-if="comment.advantage.length>1">
                            <span class="evaluation_label">نقاط قوت</span>
                            <ul class="evaluation_ul advantage">
                                <li v-for="advantage in comment.advantage" v-if="advantage!=''">
                                    <span>{{advantage}}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-6" v-if="comment.advantage.length>1">
                            <span class="evaluation_label">نقاط ضعف</span>
                            <ul class="evaluation_ul disadvantage">
                                <li v-for="disadvantage in comment.disadvantage" v-if="disadvantage!=''">
                                    <span>{{disadvantage}}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div class="comment_text">{{ comment.content }}</div>

                    <div class="footer">
                        <div>
                            آیا این نظر برایتان مفید بود ؟
                            <span class="btn_like" v-on:click="like(key,comment.id)" v-bind:data-count="replaceNumber(comment.like)"><i class="mdi mdi-thumb-up-outline"></i></span>
                            <span class="btn_like dislike" v-on:click="dislike(key,comment.id)" v-bind:data-count="replaceNumber(comment.dislike)"><i class="mdi mdi-thumb-down-outline" style="padding-top: 6px;position: absolute;"></i></span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="col-12">
            <div class="row">
                <div class="paginate_div">
                    <pagination :data="list" @pagination-change-page="getList"></pagination>
                </div>
            </div>
        </div>

        <div v-if="comment_count==0 && getServerData=='ok'">
            <p style="text-align: center;padding-top: 30px;padding-bottom: 20px;color: red">تاکنون برای این محصول نظری ثبت نشده است</p>
        </div>

    </div>
</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "CommentList",
    props:['auth','product_id','product_title'],
    mixins:[myMixin],
    data(){
      return{
          list:{data:[]},
          comment_count:0,
          avg:0,
          avg_score:[],
          getServerData:'no',
          ordering:1,
          scoreItem:[
              'کیفیت ساخت :',
              'نوآوری :',
              'سهولت استفاده :',
              'ارزش خرید به نسبت قیمت :',
              'امکانات و قابلیت ها :',
              'سهولت طراحی و ظاهر :'
          ],
          scoreLabel:[
              'خیلی بد',
              'بد',
              'معمولی',
              'خوب',
              'عالی'
          ],
          monthName:[
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
          send:true
      }
    },
    mounted() {
        const app=this;
        $("#comments").click(function () {
            if (app.list.data.length==0)
            {
                app.getList();
            }
        });
    },
    methods:{
        getList:function (page=1) {
            $("#loading").show();
            const url=this.$siteUrl+"/site/getComment?page="+page+"&product_id="+this.product_id+"&orderBy="+this.ordering;
            this.axios.get(url).then(response=>{
                $("#loading").hide();
                this.list=response.data.comment;
                this.avg=response.data.avg;
                this.comment_count=response.data.comment_count;
                this.avg_score=response.data.avg_score;
                this.getServerData='ok';
            }).catch(reason => {
                $("#loading").hide();
            });
        },
        getLabel2:function (key) {
            let score=this.avg_score[key];
            if (score>=0 && score<0.5)
            {
                return 'خیلی بد';
            }
            else if (score>0.5 && score<=1)
            {
                return ' بد';
            }
            else if (score>1 && score<=2.5)
            {
                return ' معمولی';
            }
            else if (score>2.5 && score<3.2)
            {
                return ' خوب';
            }
            else if (score>=3.2 )
            {
                return ' عالی ';
            }

        },
        getWidth2:function (key) {
            let score=this.avg_score[key];
            score=score*25;
            return score;
        },
        getLabel:function (key,key2)
        {
            key2=key2+1;
            const a="score"+key2;
            if (this.list.data[key]['get_score'][a]!=undefined)
            {
                return this.scoreLabel[this.list.data[key]['get_score'][a]];
            }
            else {
                return 'معمولی';
            }
        },
        getWidth:function (key,key2) {
            key2=key2+1;
            const a="score"+key2;
            if (this.list.data[key]['get_score'][a]!=undefined)
            {
                return ((this.list.data[key]['get_score'][a])*25);
            }
            else {
                return 50;
            }
        },
        add_comment:function () {
            if (this.auth=='no')
            {
                window.location=this.$siteUrl+"/login";
            }
            else {
                window.location=this.$siteUrl+"/product/comment/"+this.product_id;
            }
        },
        getDate:function (time) {
          time*=1000;
          const date=new Date(time);
          const jalai=this.gregorian_to_jalali(date.getFullYear(),(date.getMonth()+1),date.getDate());
          const r=replaceNumber(jalai[2])+' '+this.monthName[(jalai[1]-1)]+' '+replaceNumber(jalai[0]);
          return r;
        },
        like:function (key,comment_id) {
            if (this.auth=="no")
            {

            }
            else {
                if (this.send)
                {
                    this.send=false;
                    const url=this.$siteUrl+"user/likeComment";
                    const formData=new FormData();
                    formData.append('comment_id',comment_id);
                    this.axios.post(url,formData).then(response=>{
                        this.send=true;
                        if (response.data=="add")
                        {
                            this.list.data[key].like=this.list.data[key].like+1;
                        }
                        else if (response.data=="remove")
                        {
                            this.list.data[key].like=this.list.data[key].like-1;
                        }
                    }).catch(reason => {
                        this.send=true;
                    });
                }

            }
        },
        dislike:function (key,comment_id) {
            if (this.auth=="no")
            {

            }
            else {
                if (this.send)
                {
                    this.send=false;
                    const url=this.$siteUrl+"user/dislikeComment";
                    const formData=new FormData();
                    formData.append('comment_id',comment_id);
                    this.axios.post(url,formData).then(response=>{
                        this.send=true;
                        if (response.data=="add")
                        {
                            this.list.data[key].dislike=this.list.data[key].dislike+1;
                        }
                        else if (response.data=="remove")
                        {
                            this.list.data[key].dislike=this.list.data[key].dislike-1;
                        }
                    }).catch(reason => {
                        this.send=true;
                    });
                }

            }
        },
        set_ordering:function (type) {
            this.ordering=type;
            this.getList(1);
        }


    }
}
</script>

<style scoped>

</style>
