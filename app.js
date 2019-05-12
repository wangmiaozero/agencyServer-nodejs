const express =require('express')
const app = express();
const axios = require('axios')
/* app.get('/',(req,res)=>{
    res.send('请求成功!')
}) */
app.get('/api/proxy',(req,res)=>{
    let menu = encodeURI('沙拉')//"%E6%B2%99%E6%8B%89" 转换编码
    axios.get(`https://apis.juhe.cn/cook/query.php?menu=${menu}&key=fd075da6f7c344cbbb8948ce659312ff&dtype=json`)
    .then(result=>{
        res.send({msg:result.data})
    })
})
//注册中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
//挂载静态资源
app.use(express.static('./index'))
// 把 node_modules 文件夹，托管为静态资源目录
app.use('/node_modules', express.static('./node_modules'))
const port = 8080;
const ip = '127.0.0.1'
app.listen(port,`${ip}`,()=>{
    console.log(`Express server runing at http://${ip}:${port}`)
})

