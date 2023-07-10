const express = require("express")
const router = express.Router()
const articleHandle = require("../router_handler/articles")
//导入path和 multer
const multer = require("multer")
const path = require("path")
const uploads = multer({dest:path.join(__dirname,"../uploads")})
//导入自动验证规则
const expressJOI = require("@escook/express-joi")
//joi规则验证
const {add_article_schema} = require("../schema/article")
router.post("/add",uploads.single("cover_img"),expressJOI(add_article_schema),articleHandle.addArticles)
module.exports = router