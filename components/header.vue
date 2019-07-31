<template>
    <div class="header">
        <el-row type="flex" justify="space-between" class="main">
            <!-- logo部分 -->
            <div class="logo">
                <nuxt-link to="/">
                    <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </nuxt-link>
            </div>

            <!-- 导航部分 -->
            <el-row type='flex' class="nav">
                <nuxt-link to='/'>首页</nuxt-link>
                <nuxt-link to='/post'>旅游攻略</nuxt-link>
                <nuxt-link to='/hotel'>酒店</nuxt-link>
                <nuxt-link to='/air'>国内机票</nuxt-link>
            </el-row>

            <!-- 登录部分 -->
            <div v-if="!this.$store.state.user.userInfo.token">
                <nuxt-link to='/user/login'>登录/注册</nuxt-link>
            </div>
            <div v-else>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
                        {{this.$store.state.user.userInfo.user.nickname}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="handLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$store.state)
       
    },
    methods:{
        handLoginOut() {
            this.$store.commit('user/clearUserInfo')
        }
    }

}
</script>

<style scoped lang='less'>
.header{
    height:60px;
    line-height: 60px;
    .main{
        height: 100%;
        width:1000px;
        margin: 0 auto;
        .logo{
            margin-top:9px;
            width:156px;
            a{
                display: block;
                img{
                    width: 100%;
                }
            }
        }

        .nav{
            margin:0 20px;
            flex:1;
            a{
                display:block;
                padding: 0 20px;
                &:hover{
                    color:blue;
                    border-bottom:5px solid blue;
                }
            }
            //nuxt会通过url匹配每一个标签的链接，如果匹配上，就自动添加类nuxt-link-exact-active，就是被点击了，添加这个类
            //而且类里面还能hover
            .nuxt-link-exact-active{
                background-color: blue;
                color:white;
                &:hover{
                    color:white;
                }

            }

        }

        .el-dropdown-link{
            img{
                width:36px;
                height:36;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px
            }
        }
    }
}


</style>
