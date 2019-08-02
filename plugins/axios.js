// 用解构的方法引入就不用引入element-ui了
import { Message } from 'element-ui'
// 使用axios的拦截器拦截页面所有请求错误，并弹出对应的提示
// 插件的第一个参数是nuxt对象
export default function({$axios}) {
    $axios.onError( err => {
        // 注意，直接打印err，是一个错误对象，在console里面看不到属性，在preview里面能看到，
        // 因此直接打印其response属性
        console.log(err.response)
        const { statusCode,message } = err.response.data
        if(statusCode === 400) {
            Message.warning({message})
        }
    })
    
}