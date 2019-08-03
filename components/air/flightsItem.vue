<template>
    <div class="flight-item">
        <div @click="showRecommend=!showRecommend">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{data.airline_name}} </span> {{data.MU5316}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name}} {{data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{rankTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                            <span>{{data.dst_airport_name}} {{data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
                </el-col>
            </el-row>
        </div>
        <!-- 注意控制显示隐藏的是上面的div -->
        <transition name = 'fade'>
        <div class="flight-recommend" v-show="showRecommend">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
                    v-for="(item,index) in data.seat_infos" :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.group_name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showRecommend:false
        }
    },
    props: {  
        // 数据
        data: {
            type: Object,
            // 默认是空数组
            default: {}
            
        }
    },
    computed:{
        // 计算时间间隔
        rankTime(){
            let startTimeArr = this.data.dep_time.split(':')
            let endTimeArr = this.data.arr_time.split(':')
            let starttime = startTimeArr[0] * 60 +  +startTimeArr[1]
            let endtime = endTimeArr[0] * 60 +  +endTimeArr[1]

            let dis = endtime - starttime
            if(dis < 0){
                dis = endtime - starttime + 60 * 24
            }

            return `${Math.floor(dis/60)}时${dis%60}分`
        }
    },
    methods:{
       
    }
}
</script>

<style scoped lang="less">
// 动画效果
    .fade-enter {
      opacity: 0;
    }
    .fade-enter-active {
      transition: opacity 2s;
    }
    .fade-leave-to {
      opacity: 0;
    }
    .fade-leave-active {
      transition: opacity 1s;
    }
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>