<template>
    <div class="question_box">

        <div v-if="save_question" class="alert alert-success">
            پرسش شما با موفقیت ثبت شد و بعد از تایید نمایش داده خواهد شد
        </div>

        <div class="feq_headline">
            پرسش و پاسخ
            <span>پرسش خود را در مورد محصول مطرح نمایید</span>
        </div>

        <div>
            <textarea v-model="Question"></textarea>

            <div class="question_bottom_div">
                <div>
                    <button v-on:click="add_question()" class="btn btn-secondary">ثبت پرسش</button>
                </div>

                <div CLASS="agreement">
                    <span v-on:click="send_email=!send_email" :class="[send_email ? 'check_box active' : 'check_box']"></span>
                    <label for="">
                        اولین پاسخی که به پرسش من داده شد، از طریق ایمیل به من اطلاع دهید.
                        <br>
                         با انتخاب دکمه"ثبت پرسش"، <a href="">موافقت خود را با قوانین انتشار محتوا</a> در فروشگاه اعلام می کنم
                    </label>
                </div>
            </div>

        </div>

        <ul class="feq_list" v-for="(row,key) in QuestionList.data" :key="row.id">
            <li>
                <div class="section">
                    <div class="feq_header">
                        <p>
                            پرسش
                            <span v-if="row.get_user.name==''">ناشناس</span>
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

        </ul>

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
            QuestionList:{data:[]},
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
            save_answer:false
        }
    },
    mounted() {
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
                    formData.append('question_id',question_id);
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
            const url=this.$siteUrl+"site/get_question/"+this.product_id+"?page="+page;
            this.axios.get(url).then(response=>{
                this.QuestionList=response.data;
            });
        },
        set_answer_id:function (id) {
            this.answer_id=id;
        }
    }
}
</script>

<style scoped>

</style>
