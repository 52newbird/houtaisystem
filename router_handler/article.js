const db = require("../db/index")
//获取文章列表
exports.getArticleCates = (req, res) => {
    const sql = "select * from ev_article_cate where is_delete=0 order by id asc"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取文章列表成功",
            data: results
        })
    })
}
//新增文章列表
exports.addArticleCates = (req, res) => {
    const sql = "select * from ev_article_cate where name=? or alias=?"
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        //判断数据长度 查对错
        if (results.length === 2) return res.cc("name与alias都被占用,请更换后重试")
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc("name与alias都被占用,请更换后重试")
        if (results.length === 1 && results[0].name === req.body.name) return res.cc("name被占用,请更换后重试")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("alias被占用,请更换后重试")
        const sql = "insert into ev_article_cate set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("新增文章数据失败")
            res.cc("新增文章分类成功", 0)
        })
    })
}
//删除文章
exports.deleteCateById = (req, res) => {
    const sql = "update ev_article_cate set is_delete=1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("删除文章失败")
        res.cc("删除文章成功")
    })
}
//根据id查找文章
exports.getCatesById = (req, res) => {
    const sql = "select * from ev_article_cate where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取失败")
        res.send({
            status: 0,
            message: "获取文章列表成功",
            data: results
        })
    })
}
//根据id更新数据
exports.updateCatesById = (req, res) => {
    const sql = "select * from ev_article_cate where id<>? and (name=? or alias=?)"
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc("name与alias都被占用,请更换后重试")
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc("name与alias都被占用,请更换后重试")
        if (results.length === 1 && results[0].name === req.body.name) return res.cc("name被占用,请更换后重试")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("alias被占用,请更换后重试")
        const sql = 'update ev_article_cate set ? where id=?'
        db.query(sql,[req.body,req.body.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows!==1) return res.cc("更新文章是失败")
            res.send({
                status:0,
                message:"更新成功",
            })
        })
    })
}