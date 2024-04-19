// 阿里矢量图标库配置
let iconfontVersion = ['567566_pwc3oottzol'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;

let baseUrl = '';
let codeUrl = `${baseUrl}/code`
const env = import.meta.env
if (env.VITE_APP_ENV === 'development') {
    baseUrl = `https://mdajtest.szzt.com.cn`; // 开发环境地址
} else if (env.VITE_APP_ENV === 'production') {
    baseUrl = `https://gmqzsq.szgm.gov.cn:8093`; //生产环境地址
} else if (env.VITE_APP_ENV === 'test') {
    baseUrl = `https://mdajtest.szzt.com.cn`; //测试环境地址
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env
}
