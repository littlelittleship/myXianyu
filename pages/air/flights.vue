<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFiters :data="cacheFlightsData"
                    @setDataList="setDataList"/>
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <!-- 注意这个data是在这里定义的，fitem中props里面的data -->
                <div>
                    <FlightsItem
                    v-for="(item,index) in newData" :key="index"
                    :data="item"/>  

                    <!-- 分页功能 -->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagenum"
                        :page-sizes="[1, 2, 3, 4]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFiters from '@/components/air/flightsFilters'
import FlightsAside from '@/components/air/flightsAside'
export default {
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFiters,
        FlightsAside
    },
    data(){
        return {
            dataList:[],  //航班列表数据
            flightsData:{
                flights:'',
                info:'',
                options:''
            },    //航班总数据，用户传递，是个对象
            cacheFlightsData:{
                flights:'',
                info:'',
                options:''
            },   // 缓存一份总数据
            data:{},
            pagenum:1,
            pagesize:2,
            total:0,
            newData:[]       //用来显示分页
        }
    },
    methods:{
        getData(){
            this.$axios({
                url:'airs',
                params:this.$route.query   //注意写法：route
            }).then(res=>{
                console.log(res)
                this.dataList = res.data.flights
                this.flightsData = res.data
                this.cacheFlightsData = {...res.data}
                this.total = res.data.total
                this.showArr()
            })        
        },
        // 切换页面容量时触发
        handleSizeChange(value){
            this.pagesize = value
            this.showArr()
        },
        // 切换当前页面时触发
        handleCurrentChange(value){
            this.pagenum = value
            this.showArr()
        },

        // 显示数组的方法
        showArr(){
            this.newData = this.dataList.slice((this.pagenum-1)*this.pagesize,this.pagenum*this.pagesize)
        },
        // 设置新数组,arr时传过来的符合条件的新数组
        setDataList(arr){
            if(arr){
                this.pagenum = 1;
                this.dataList = arr
                this.total = arr.length
            }
            this.showArr()
        }
    },
    mounted() {
        this.getData()
        this.showArr()
    },
    watch: {           //watch能监听$route参数的变化，一旦变化，重新请求数据
        $route() {
            this.getData()
        }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>