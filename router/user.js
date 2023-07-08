const express = require("express")
const router = express.Router()

const useHandle = require("../router_handler/user")

//导入验证数据的中间件
const expressJoi = require("@escook/express-joi")
//导入验证规则对象
const {reg_login_schema} = require("../schema/user")
 
//用户注册
router.post("/reguser",expressJoi(reg_login_schema),useHandle.regUser)

//用户登录
router.post("/login",expressJoi(reg_login_schema),useHandle.login)

module.exports = router

// 导入安装@escook/express-joi 和  joi 
//新建文件夹schema 新建对应user的规则 
//router 先导入 @escook/express-joi 然后导入 刚才对应的规则 名称 然后在路由地址设置中间件 
//app.js需要定义错误中间件  同样需要引入joi
