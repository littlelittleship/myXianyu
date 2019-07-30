<template>
  <div class="index">
    <!-- 轮播图部分：interval间隔时间，ms， arrow是否有箭头，要改的地方只有中间带背景图的盒子 -->
    <!-- 静态时定义一个对象数组，从接口获取参数时，要改背景图的路径， -->
    <!-- 注意 $axios.defaults里面有所有的配置信息 -->
    <el-carousel :interval="4000" arrow="always">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <div class="banner-image"
        :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
        background-size:contain contain`"></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索部分 -->
    <!-- 这样写很难关联，tab和input已应该分开 -->
    <!-- <div class="search">
      <el-tabs type="border-card">
        <el-tab-pane label="攻略">
          <el-input placeholder="搜索城市" v-model="input" class="input-with-select" style="width:550px">
           <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="酒店">
          <el-input placeholder="请输入城市搜索酒店" v-model="input" class="input-with-select" style="width:550px">
           <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="机票">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select" style="width:550px">
           <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-tab-pane>
      </el-tabs>
    </div> -->

    <div class="banner-content">
      <div class="search-bar">
        <el-row type="flex" class="search-tab">
          <span v-for='(item,index) in options' :key="index"
          :class="{ active:index === currentOption }"
          @click="handleOption(index)">
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <el-row 
          type="flex" 
          align="middle" 
          class="search-input">
            <input 
              :placeholder="options[currentOption].placeholder" 
              v-model="searchValue"
              @keyup.enter="handleSearch"/>
                <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      banner:[],
      input:'',
      options: [      // 搜索框tab选项
        {
            name: "攻略", 
          placeholder: "搜索城市", 
          pageUrl: "/post?city="
        },
        {
            name: "酒店", 
            placeholder: "请输入城市搜索酒店", 
            pageUrl: "/hotel?city="},
        {
            name: "机票", 
            placeholder: "请输入出发地", 
            pageUrl: "/air"
        }
      ],
      searchValue: "",    // 搜索框的值
      currentOption: 0,   // 当前选中的选项 

      
    }
  },
  methods:{
    handleOption(index){
      this.currentOption = index;

    // 如果切换的机票tab，那么直接跳转到机票首页
      const item = this.options[index];
      if(item.name === "机票"){
        return this.$router.push(item.pageUrl);
      }
    },
    handleSearch(){
      const item = this.options[this.currentOption];
      // 跳转时候给对应的页面url加上搜索内容参数
      this.$router.push(item.pageUrl + this.searchValue);
    }
  },
  mounted() {
    this.$axios({
      url:'/scenics/banners'
    })
    .then( res =>{
      console.log(res)
      let { data } = res.data
      this.banner = data
    })
    .catch( error =>{
      console.log(error)
    })
  }
}
</script>

<style scoped lang='less'>
.index{
  position: relative;
  min-width: 1000px;
  margin:0 auto;
  /deep/ .el-carousel__container{
    height: 700px;
  }
  .banner-image{
    width:100%;
    height:100%
  }


  // .search{
  //   z-index:5;
  //   position: absolute;
  //   left:30%;
  //   top:20%;
  //   border-radius: 40px;
  //   opacity: 0.8;
  //   overflow: hidden;
  //   // border: 1px rgba(255,255,255,.7) solid;
  //   .input-with-select{
  //     background-color: rgba(255,255,255,.5)
  //   }
  // }

  .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}

</style>
