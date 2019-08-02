<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            style="cursor:pointer"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 ,用来处理用户不选择下拉列表，直接输入数据，我们就给默认下拉列表第一个值-->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                v-model='form.departCity'
                @select="handleDepartSelect"
                :trigger-on-focus="false"             
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                v-model="form.destCity"
                @select="handleDestSelect"
                :trigger-on-focus="false" 
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                v-model="form.departDate"
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            form: {
                departCity:'',
                departCode:'',
                destCity:'',
                destCode:'',
                departDate:''
            },
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$confirm("目前暂时不支持往返，请选择单程票","提示",{
                    confirmButton:"确定",
                    showCancelButton:false,
                    type:'warninig'
                })
            }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        async queryDepartSearch(value, cb){
            // 上面添加了:trigger-on-focus="false" 这个属性，就不用判断是否为空字符时展开列表
            // 还要判断用户不选择下拉列表的情况，默认选择第一个选项
            
            // const arr = await this.querySearchAsync(value)
            // if(arr.length > 0){
            //     // 不在下拉列表中选择，则默认选择第一项
            //     this.form.departCity = arr[0].value;
            //     this.form.departCode = arr[0].sort;
            // }
            // cb(arr)

            // 不调用方法，自己写
            // 如果没有输入，返回一个空数组
            if(!value){
                cb([])
                return
            }
            this.$axios({
                url:'/airs/city',
                params:{name:value}
            }).then( res=>{
                const {data} = res.data
                if(data.length === 0){
                    // this.$alert("123","提示",{type:"warning"})
                    cb([])
                    return
                }
                // 给数组添加一个value属性
                const newData = []
                data.forEach( item =>{
                    item.value = item.name.replace("市",'')
                    newData.push(item)
                })

                // 设置第一项为默认项
                this.form.departCity = newData[0].value
                this.form.departCode = newData[0].sort

                cb(newData)
            })

        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        async queryDestSearch(value, cb){
            const arr = await this.querySearchAsync(value)
            if(arr.length > 0){
                // 不在下拉列表中选择，则默认选择第一项
                this.form.destCity = arr[0].value;
                this.form.destCode = arr[0].sort;
            }
            cb(arr)
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCity = item.value
            this.form.departCode = item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 确认选择日期时触发
        handleDate(value){
           this.form.departDate = moment(value).format("YYYY-MM-DD")
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            const { departCity,departCode,destCity,destCode} = this.form
            this.form.departCity = destCity;
            this.form.departCode = destCode;
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){
           console.log(this.form)

           if(!this.form.departCity){
                this.$alert("出发城市不能为空","提示",{type:"warning"})
                return 
            }
            if(!this.form.destCity){
                this.$alert("到达城市不能为空","提示",{type:"warning"})
                return 
            }
            if(!this.form.departDate){
                this.$alert("出发时间不能为空","提示",{type:"warning"})
                return 
            }
            
            // 都满足跳转,拼接字符串的跳转方法
            this.$router.push({
                path:'/air/flights',
                query:this.form
            })
        },

        // 查询城市接口方法,返回promise
        // queryString是查询关键字
        querySearchAsync(queryString){
            return new Promise( (resolve,reject) => {
                // 如果是空字符串，返回空数组，resolve是成功时的回调
                if(!queryString){
                    return resolve([])
                }

                this.$axios({
                    url:`/airs/city`,
                    params:{name:queryString}
                }).then( res=>{
                    // console.log(res,"123")
                    // if(res.data.data.length === 0){
                    //     this.$alert("请输入正确城市名","提示",{
                    //         type:"warning"
                    //     })
                    //     return false
                    // }
                    const {data} = res.data
                    // 下拉列表要有value字段，现在data里面没有
                    // 添加value属性并去掉name中的“市”
                    const arr = data.map(v=>{
                        return {
                            ...v,
                            value:v.name.replace('市',"")
                        }
                    })
                    // 这个东西可以理解为将数据传递给下一级
                    // 让querySearchAsync这个函数返回的是一个数组
                    resolve(arr)
                })
            })
        }
        
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
