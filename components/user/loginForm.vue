<template>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
            <el-input type="text" placeholder="用户名/手机" v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <p class="forget">忘记密码</p>
        <el-form-item>
            <el-button type="primary" style="width:100%" @click="loginHandle">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required:true,message:'用户名不能为空',trigger:"blur"}
                ],
                password: [
                    { required:true,message:'密码不能为空',trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        loginHandle(){
            // console.log(this.loginForm)
            this.$refs.loginForm.validate( valid => {
                if(valid) {
                    // 提交登录接口
                    this.$axios({
                        url:'/accounts/login',
                        method: 'POST',
                        data: this.loginForm
                    })
                    .then( res=>{
                        // console.log(res)
                        // 将参数保存到store中
                        this.$store.commit("user/setUserInfo",res.data)
                        this.$router.push('/')
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.demo-ruleForm{
    margin-top:20px;
    padding:0 20px;

    .forget{
        color:#409eff;
        font-size: 12px;
        float: right;
        margin-bottom: 10px
    }
}
</style>
