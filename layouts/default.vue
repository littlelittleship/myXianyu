<template>
  <div>
    <!-- 头部组件 -->
    <Header/>
    <nuxt />
    <Footer/>

  </div>
</template>

<script>
import Header from "@/components/header.vue"
import Footer from "@/components/footer.vue"
export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
}
</script>

<style>
/*  注意这里是公共样式，不用加scope，scope是用来处理组件冲突的，公共样式不加，加了服务器gg  */
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
} 
*{
  margin:0;
  padding:0
}
ul,ol,li{
  list-style: none
}
a{
  text-decoration: none;
  color:inherit
}
em,i{
  font-style: normal
}
</style>
