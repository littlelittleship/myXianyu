<template>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="demo-registerForm">
        <el-form-item prop="username">
            <el-input type="text" placeholder="手机号码" v-model="registerForm.username" ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
            <el-input type="text" placeholder="验证码" v-model="registerForm.captcha" >
                 <el-button slot="append" @click='handleSendCaptcha' type="success">发送验证码</el-button>
            </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
            <el-input placeholder="你的名字" v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="registerForm.password" ></el-input>
        </el-form-item>
        <el-form-item prop="checkedPassword">
            <el-input placeholder="确认密码" v-model="registerForm.checkedPassword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%" @click="registerHandle">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        const validatePass = (rule,value,callback) =>{
            if(value === '') {
                callback(new Error('请再次输入密码'))
            }else if(value !== this.registerForm.password) {
                callback(new Error("两次输入的密码不一致"))
            } else {
                callback()
            }
        }
        return {
            
            registerForm: {
                username: '',
                captcha: '',
                nickname: '',
                password: '',
                checkedPassword: ''
            },
            rules:{
                username: [ { required: true, message: "用户名不能为空", trigger: "blur" } ],
                captcha: [ { required: true, message: "手机验证码不能为空", trigger: "blur" } ],
                nickname: [ { required: true, message: "昵称不能为空", trigger: "blur" } ],
                password: [ { required: true, message: "密码不能为空", trigger: "blur" } ],
                checkedPassword: [
                    { validator: validatePass, trigger: 'blur' }
                 ]
            }
        }
    },
    methods: {
        registerHandle() {
            this.$refs.registerForm.validate( valid=>{
                // 注意这种写法，结构，因为传递的参数不需要checkedPassword,props里面就是其余的对象
                const { checkedPassword ,...props} = this.registerForm
                this.$axios({
                    url:'/accounts/register',
                    method:'POST',
                    data:props
                }).then(res=>{
                    // console.log(res)
                    this.$store.commit('user/setUserInfo',res.data)
                    this.$router.push('/')
                })
            })
        },
        handleSendCaptcha() {
            if(!this.registerForm.username){
                this.$confirm('手机号码不能为空','提示',{
                    $confirmButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                })
                return
            }
            if(this.registerForm.username.length !== 11){
                this.$confirm('手机号码格式错误','提示',{
                    $confirmButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                })
                return
            }

            // 如果符合条件的话，调用接口
            this.$axios({
                url:'captchas',
                method:'POST',
                data:{
                    tel:this.registerForm.username
                }
            }).then( res=>{
                const {code} = res.data;
                this.$confirm(`模拟手机验证码为：${code}`,'提示',{
                    $confirmButtonText:'确定',
                    showCancelButton:false,
                    type:'warning'
                })
            })

            
        }
    }

}
</script>

<style scoped lang="less">
.demo-registerForm{
    margin-top:20px;
    padding:0 20px;
}

</style>
