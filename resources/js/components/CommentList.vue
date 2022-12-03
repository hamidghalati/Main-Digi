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

                <div class="col-md-7"></div>

            </div>
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
          ]
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
            const url=this.$siteUrl+"/site/getComment?page="+page+"&product_id="+this.product_id;
            this.axios.get(url).then(response=>{
                $("#loading").hide();
                this.list=response.data.comment;
                this.avg=response.data.avg;
                this.comment_count=response.data.comment_count;
                this.avg_score=response.data.avg_score;
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
        }


    }
}
</script>

<style scoped>

</style>
