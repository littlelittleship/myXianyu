<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="infoData" @setAllPrice="setAllPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside :data="infoData" :allPrice="allPrice"/>        
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    components:{
        OrderForm,
        OrderAside
    },
    data() {
        return {
            infoData:{
                insurances:[],
                seat_infos: {}
            },
            allPrice:{
                price:0,
                num :0
            }
        }
    },
    methods:{
        // 子传父的方法：在父组件引用中传入事件，时间在父组件中定义，在子组件中调用
        setAllPrice(price,num){
            this.allPrice.price = price
            this.allPrice.num = num
        }
    },
    mounted() {
        // 一般数组在父组件中获取，方便传值
        this.$axios({
            url:`/airs/${this.$route.query.id}`,
            params:{seat_xid:this.$route.query.seat_xid}
        }).then( res => {
            // console.log(res)
            this.infoData=res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>