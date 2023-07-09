const express = require("express")
const router = express.Router()
//导入自动解析的中间件
const expressJoi = require("@escook/express-joi")
const {update_userinfo_schema , update_password_schema,update_avatar_schema} = require("../schema/user")
//导入路由处理模块
const userinfoHandler = require("../router_handler/userinfo")
//获取用户基本信息
router.get('/userinfo', userinfoHandler.getUserInfo)
//更新用户基本信息
router.post("/upuserinfo",expressJoi(update_userinfo_schema),userinfoHandler.upDataUserInfo)
//更新密码路由
router.post("/updatepwd",expressJoi(update_password_schema),userinfoHandler.updatePwd)
//更新头像
router.post("/update/avatar",expressJoi(update_avatar_schema),userinfoHandler.updateTittle)

module.exports = router