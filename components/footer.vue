<template>
    <div class="footer">
        <div class="info">
            <el-row :gutter="20">
                <el-col :span="6">
                    <ul>
                        <li class="littleTitle">闲云旅游旅游网</li>
                        <li>上亿旅行者共同打造的“旅行神器”</li>
                        <li><span>60000</span>多个全球旅游目的地</li>
                        <li><span>769754</span>个细分目的地新玩法</li>
                        <li><span>7034899</span>次攻略下载</li>
                        <li><span>2345345</span>家驴友产品供应商</li>
                    </ul>
                </el-col>
                <el-col :span="5">
                    <ul>
                        <li class="littleTitle">关于我们</li>
                        <li>隐私政策 商标声明</li>
                        <li>服务协议 邮寄协议</li>
                        <li>商城平台服务协议</li>
                        <li>网络信息侵权同志指导</li>
                        <li>闲云旅游旅游网服务监督员</li>
                        <li>网站地图加入闲云旅游</li>
                    </ul>
                </el-col>
                <el-col :span="5">
                    <ul>
                        <li class="littleTitle">旅行服务</li>
                        <li>旅游攻略 酒店预订</li>
                        <li>旅游特价 国际租车</li>
                        <li>旅游问答 旅游保险</li>
                        <li>旅游指南 订火车票</li>
                        <li>旅游咨询 APP下载</li>
                    </ul>
                </el-col>
                <el-col :span="6">
                    <p>
                        <img src="http://157.122.54.189:9093/images/1556522965.png" alt="">
                    </p>
                    <p>关注我们</p> 
                </el-col>
            </el-row>
        </div>
        <div class="copyRight">
            <p>京ICP备08001421号 京公网安备110108007702 Copyright &copy; 2016-2019 博学谷 All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.footer{
    padding-top:30px;
    background-color: #333;
    color:white; 
    .info{
    width:1000px;
    margin:0 auto;
        ul{
            li{
                font-size: 12px;
                margin-bottom: 8px;
                span{
                    color:yellow
                }
            }
            .littleTitle{
                font-size: 16px;
                margin-bottom: 15px
            }
        }

        p{
            font-size: 14px;
            text-align: center;
            img{
                width: 140px;
                height:140px
            }
        }
    }
    .copyRight{
        width:1000px;
        margin:0 auto;
        margin-top:20px;
        padding:50px 0;
        border-top:1px solid white;
        text-align: center;
        font-size: 12px
    }
}


</style>
