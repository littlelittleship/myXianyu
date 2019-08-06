<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" 
                v-for="(item,index) in users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码" v-model="item.id" class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}万`" 
                    border @change="handleInsurances(item.id)">
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <input type="hidden" :value="allPrice">
    </div>
</template>

<script>
export default {
    props:{
        // 注意固定写法
        data:{
            type:Object,
            default:{}
        }
    },
    data() {
        return {
            users:[
                {username:'', id:''},               
            ],
            insurances:[],          // 是否保险
            contactName:'',         // 联系人
            contactPhone:'',        // 联系电话
            invoice:false ,         //发票，默认false
            captcha:''       //验证码：000000
        }
    },
    methods: {
        // 添加乘机人
        // 先定义一个数组，里面有一个对象，然后在里面push，splice，在上面遍历user就能实现添加移除
        handleAddUsers(){
            this.users.push({username:'',id:''})    
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            
        },

        // 提交订单
        handleSubmit(){
            const data = {
                users:this.users,
                insurances:this.insurances,
                contactName:this.contactName,
                contactPhone:this.contactPhone,
                invoice:this.invoice,
                captcha:this.captcha,
                seat_xid:this.data.seat_infos.seat_xid,
                air:this.data.id
            }
            console.log(data)
            // 判断表单是否通过
            let valid = true
            this.users.forEach( v=>{
                // 因为这是一个函数，不能直接return，需要定义一个开关变量，然后在外面return
                if(!v.username || !v.id){
                    valid = false
                    this.$alert("用户名或身份证号为空","提示",{type:'warning'})
                }
            })
            if(!valid){
                return
            }
            if(!this.contactName){
                valid = false
                this.$alert("联系人信息不能为空","提示",{type:'warning'})
            }
            this.$axios({
                url:'/airorders',
                method:'POST',
                data,
                //显示403 表示没有权限，要加请求头token
                headers:{
                    Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res=>{
                console.log(res)
            })
        },

        // 保险的change事件,有则移除，没有则添加
        handleInsurances(id){
            if(this.insurances.indexOf(id) ===-1){
                this.insurances.push(id)
            }else{
                const index = this.insurances.indexOf(id)
                this.insurances.splice(index,1)
            }
        },

        // 发送验证码
        handleSendCaptcha(){
            if(!this.contactPhone){
                this.$confirm("手机号不能为空","提示",{
                    confirmButtonText:"确定",
                    showCancelButton:'false',
                    type:'warning'
                })
                return
            }
            if(this.contactPhone.length !== 3){
                this.$confirm("手机号格式不对","提示",{
                    confirmButtonText:"确定",
                    showCancelButton:false,
                    type:'warning'
                })
                return
            }
            this.$axios({
                url:'/captchas',
                // 注意请求的时候没有s
                method:'POST',
                data:{
                    tel:this.contactPhone
                },
            }).then(res=>{
                // console.log(res)
                const { code } = res.data;
                this.$confirm(`验证码是:${code}`,"提示",{
                    confirmButtonText:"确定",
                    showCancelButton:false,
                    type:'warning'
                })
            })
        }
    },

    computed:{
        // 没有引用的话函数不会执行
        allPrice(){
            let price = 0
            let len = this.users.length
            price += this.data.seat_infos.org_settle_price * len;
            this.insurances.forEach(v=>{
                price += this.data.insurances[v-1].price * len
            })
            price += this.data.airport_tax_audlet * len;
            this.$emit('setAllPrice',price,this.users.length)
            return price
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>