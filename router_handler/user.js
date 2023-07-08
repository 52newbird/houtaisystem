//导入数据库操作
const db = require("../db/index")
//导入bcryptjs对密码进行加密
const bcryptjs = require("bcryptjs")

//导入生成token的包
const jwt = require("jsonwebtoken")
//导入全局配置文件
const config = require("../config")
exports.regUser = (req, res) => {
    const userinfo = req.body
    //简单验证
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc("用户名或密码不能为空")
    // }
    const str = "select * from ev_users where username=?"
    db.query(str, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc("用户名啦被占用请使用其他用户名")
        }
        //调用 对密码进行加密
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        //定义插入数据
        const sql = 'insert into ev_users set ?'
        const sqlobj = { username: userinfo.username, password: userinfo.password }
        db.query(sql, sqlobj, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc("注册用户失败,请稍后再试")
            }
            res.cc("注册成功", 0)
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sqlStr = "select * from ev_users where username=?"
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("登录失败!")
        // res.send("login OK")
        //判断密码是否正确
        const compareResult = bcryptjs.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc("登录失败")
        //接下来生成token  首先剔除用户密码头像等敏感信息
        const user = { ...results[0], password: "", user_pic: "" }
        //对用户信息进行加密 
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //   console.log(tokenStr);
        //调用res.send()将token响应给客户端
        res.send({
            status: 0,
            message: "登陆成功",
            token: 'Bearer ' + tokenStr
        })
    })
}