const express = require("express")
const router = express.Router()
const articleCatesHandle = require("../router_handler/article")
//获取文章列表
router.get("/cates",articleCatesHandle.getArticleCates)
module.exports = router