// 路由模块
const express=require('express');
const router=express.Router();
const service=require('./service.js')

//路由处理--------------把路由绑定到了业务方法上

//渲染主页
router.get('/list',service.showIndex);
// 跳转到添加图书的页面
router.get('/toAddBook',service.toAddBook);
// 添加图书，提交表单
router.post('/addBook',service.addBook);

// 跳转到修改图书页面
router.get('/toEditBook',service.toEditBook);
// 修改图书后提交
router.post('/editBook',service.editBook);


//删除图书
router.get('/deleteBook',service.deleteBook);

//此处需要导出
module.exports=router;