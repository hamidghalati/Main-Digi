<template>
    <div class="question_box">

        <div v-if="save_question" class="alert alert-success">
            پرسش شما با موفقیت ثبت شد و بعد از تایید نمایش داده خواهد شد
        </div>

        <div class="feq_headline">
            پرسش و پاسخ
            <span>پرسش خود را در مورد محصول مطرح نمایید</span>
        </div>

        <div v-on:click="checkAuth()">
            <textarea v-model="Question" v-if="auth=='ok'"></textarea>
            <div v-else class="disabled_textarea_div"></div>

            <div class="question_bottom_div">
                <div>
                    <button v-on:click="add_question()" class="btn btn-secondary">ثبت پرسش</button>
                </div>

                <div class="agreement">
                    <span v-on:click="send_email=!send_email" :class="[send_email ? 'check_box active' : 'check_box']"></span>
                    <label for="">
                        اولین پاسخی که به پرسش من داده شد، از طریق ایمیل به من اطلاع دهید.
                        <br>
                         با انتخاب دکمه"ثبت پرسش"، <a href="">موافقت خود را با قوانین انتشار محتوا</a> در فروشگاه اعلام می کنم
                    </label>
                </div>
            </div>

        </div>


        <div class="feq_filter">
            <p> پرسش ها و پاسخ ها</p>
            <ul class="feq_filter_item" data-title="مرتب سازی بر اساس :">
                <li :class="[ordering=='new' ? 'active' : '']" v-on:click="set_ordering('new')">جدیدترین پرسش</li>
                <li :class="[ordering=='answer_count' ? 'active' : '']" v-on:click="set_ordering('answer_count')">بیشترین پاسخ به پرسش</li>
                <li :class="[ordering=='user' ? 'active' : '']" v-on:click="set_ordering('user')">پرسش های شما</li>
            </ul>
        </div>

        <ul class="feq_list" v-for="(row,key) in list.data" v-bind:key="key">
            <li>
                <div class="section">
                    <div class="feq_header">
                        <p>
                            پرسش
                            <span v-if="row.get_user.name==null">ناشناس</span>
                            <span v-else>{{ row.get_user.name}}</span>
                        </p>
                    </div>
                    <p v-html="row.questions"></p>

                    <div class="footer">
                        <span>{{ getDate(row.time) }}</span>
                        <a class="data_link" v-on:click="set_answer_id(row.id)">
                            به این پرسش پاسخ دهید
                        </a>
                    </div>

                </div>
            </li>

            <li class="answerFormItem" v-if="answer_id==row.id">
                <div class="section">
                    <div class="feq_header">
                        <p>
                            پاسخ
                        </p>
                    </div>

                    <div class="row">
                        <h5>به این سوال پاسخ دهید</h5>
                        <div v-if="save_answer" class="alert alert-success">
                            پاسخ شما با موفقیت ثبت شد و بعد از تایید نمایش داده خواهد شد
                        </div>

                        <textarea v-model="Question"></textarea>

                        <div class="question_bottom_div">
                            <div>
                                <button v-on:click="add_question(answer_id)" class="btn btn-secondary">ثبت پاسخ</button>
                            </div>

                            <div CLASS="agreement">
                                <label for="">
                                    با انتخاب دکمه"ثبت پاسخ"، <a href="">موافقت خود را با قوانین انتشار محتوا</a> در فروشگاه اعلام می کنم
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </li>

            <li v-for="(answer,key2) in row.get_answer" class="answer_li" v-bind:key="key2">
                <div class="section">
                    <div class="feq_header">
                        <p>
                            پاسخ
                            <span v-if="answer.get_user.name==null">ناشناس</span>
                            <span v-else>{{ answer.get_user.name}}</span>
                        </p>
                    </div>
                    <p v-html="answer.questions"></p>

                    <div class="footer">
                        <span>{{ getDate(answer.time) }}</span>
                        <div>
                            آیا این پاسخ برایتان مفید بود؟


                            <span class="btn_like" v-on:click="like(answer,answer.id,'questions')"
                                  v-bind:data-count="replaceNumber(answer.like)"><i
                                class="mdi mdi-thumb-up-outline"></i></span>
                            <span class="btn_like dislike" v-on:click="dislike(answer,answer.id,'questions')"
                                  v-bind:data-count="replaceNumber(answer.dislike)"><i
                                class="mdi mdi-thumb-down-outline"
                                style="padding-top: 6px;position: absolute;"></i></span>
                        </div>
                    </div>

                </div>
            </li>

        </ul>


        <div class="col-12">
            <div class="row">
                <div class="paginate_div">
                    <pagination :data="list" v-bind:showDisabled="true" icon="chevron" v-on:change-page="get_question"></pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import myMixin from "../myMixin";


export default {
    name: "QuestionList",
    props:['product_id','auth'],
    mixins:[myMixin],
    data(){
        return{
            Question:'',
            send_email:false,
            send:true,
            save_question:false,
            list:{data:[]},
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
            answer_id:0,
            save_answer:false,
            ordering:'new'
        }
    },
    mounted() {
        const app=this;
        $(document).on('click','#questions',function () {
            if (app.list.data.length==0)
            {
                app.get_question();
            }

        });
        this.get_question();
    },
    methods:{
        add_question:function (answer_id) {
            const question_id=answer_id==undefined ? 0 : answer_id;
            if (this.Question.trim()!="")
            {
                if (this.send)
                {
                    this.send=false;
                    $("#loading").show();
                    const url=this.$siteUrl+"user/addQuestion";
                    const formData=new FormData();
                    formData.append('product_id',this.product_id);
                    formData.append('questions',this.Question);
                    formData.append('send_email',this.send_email);
                    formData.append('questions_id',question_id);
                    this.axios.post(url,formData).then(response=>{
                        $("#loading").hide();
                        this.send=true;
                        if (response.data=='ok')
                        {
                            if (question_id>0){
                                this.save_answer=true;
                            }
                            else {
                                this.save_question=true;
                            }


                            this.Question='';
                        }

                    }).catch(error=>{
                        $("#loading").hide();
                        this.send=true;
                    });
                }
            }
        },
        get_question:function (page=1) {
            $("#loading").show();
            const url=this.$siteUrl+"site/get_question/"+this.product_id+"?page="+page+"&ordering="+this.ordering;
            this.axios.get(url).then(response=>{
                this.list=response.data;
                $("#loading").hide();
            }).catch(error=>{
                $("#loading").hide();
            });
        },
        set_answer_id:function (id) {
            if (this.auth=='no')
            {
                $("#login_box").modal('show');
            }
            else {
                this.answer_id=id;
            }
        },
        checkAuth:function () {
            if (this.auth=='no')
            {
                $("#login_box").modal('show');
            }
        },
        set_ordering:function (type) {
            this.ordering=type;
            this.answer_id=0;
            this.get_question(1);
        }
    }
}
</script>

<style scoped>

</style>
