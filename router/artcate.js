const express = require("express")
const router = express.Router()
const articleCatesHandle = require("../router_handler/article")
const expressJoi = require("@escook/express-joi")
const { add_cate_schema, del_id_schema ,find_cates_schema} = require("../schema/artcate")
//获取文章列表
router.get("/cates", articleCatesHandle.getArticleCates)
//增加文章列表
router.post('/addcates', expressJoi(add_cate_schema), articleCatesHandle.addArticleCates)
//根据id删除文章分类的路由
router.get('/deletecate/:id',expressJoi(del_id_schema), articleCatesHandle.deleteCateById)
//根据id查找文章
router.get("/cates/:id",expressJoi(find_cates_schema),articleCatesHandle.getCatesById)
module.exports = router