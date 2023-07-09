const express = require("express")
const router = express.Router()
const articleCatesHandle = require("../router_handler/article")
const expressJoi = require("@escook/express-joi")
const {add_cate_schema} = require("../schema/user")
//获取文章列表
router.get("/cates",articleCatesHandle.getArticleCates)
//增加文章列表
router.post("/addcates",expressJoi(add_cate_schema),articleCatesHandle.addArticleCates)
module.exports = router