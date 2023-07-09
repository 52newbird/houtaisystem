const express = require("express")
const app = express()
//导入并配置cors
const cors = require("cors")
app.use(cors())
const joi = require("joi")
//配置解析数据的中间件
app.use(express.urlencoded({ extended: false }))

//封装一个全局中间件 用来简化res.send 
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
//一定在路由配置之前配置解析token中间件
const expressJWT = require("express-jwt")
const config = require("./config")
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
const userRouter = require("./router/user")
const userinfoRouter = require("./router/userinfo")


app.use("/api", userRouter)
app.use("/my", userinfoRouter)

//定义错误级别中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    //身份认证导致的错误
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败")
    //未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log("本地服务启动成功 http://127.0.0.1:3007");
})