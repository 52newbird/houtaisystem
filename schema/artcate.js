//导入定义验证规则的包
const joi = require("joi")

//定义分类名称 和 分类别名的 校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

//定义id 删除的id
const id = joi.number().integer().min(1).required()

//定义分类名称 和 分类别名的 校验规则
exports.add_cate_schema = {
    body:{
        name,
        alias
    }
}
//定义删除的id的规则
exports.del_id_schema = {
    params:{
        id
    }
}

//定义根据id查数值的规则

exports.find_cates_schema = {
    params:{
        id
    }
}
//定义根据id更新数据
exports.update_cates_schema = {
    body:{
        id,
        name,
        alias
    }
}

