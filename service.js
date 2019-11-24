// 业务模块

const data=require('./data.json');
const fs=require('fs');
const path=require('path');
const db=require('./db.js')

// 自动生成图书的id
let maxBookCode=()=>{
    let arr=[];
    data.forEach(element => {
        arr.push(element.id);
    });
    return Math.max.apply(null,arr);
};

//渲染主页面
exports.showIndex=(req,res)=>{
    
    let sql='select * from book';
    let data=null;
    // 读取数据库
    db.base(sql,data,(results)=>{
        res.render('index',{list:results});
    });
    // res.render('index',{list:data});
};
//跳转到添加图书页面
exports.toAddBook=(req,res)=>{
    // 没有替换的数据，第二个参数就写空对象{}
    res.render('addBook',{});
};
//添加图书（提交表单）
exports.addBook=(req,res)=>{
    // 获取表单的数据
    let info=req.body;
    console.log(info);
    let book={};
    // book.id=maxBookCode()+1;
    for (let key in info) {
        book[key]=info[key];
    }
    let sql='insert into book set ?';
    db.base(sql,book,(results)=>{
        if (results.affectedRows==1){
            res.redirect('/list');
        }
    });
    
    // data.push(book); //此时只是在内存中,并没有写入文件
    // //把内存中的数据写入文件
    // //可以使用JSON.stringify(data,null,4)代表格式化json数据的时候，前面填充4个空格
    // fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
    //     if(err) return;
    //     //文件写入成功，则跳转到主页面
    //     res.redirect('/list');
    // });
};

// 跳转到修改图书页面
exports.toEditBook=(req,res)=>{
    let id=req.query.id;
    
    let sql='select * from book where id= ?';
    let data=[id];
    db.base(sql,data,(results)=>{
        // 得到的results是一个数组
        res.render('editBook',results[0]);
    });

    // let book={};
    // data.forEach((item)=>{
    //     if(item.id==id){
    //         book=item;
    //         // forEach中不能使用break和continue,用return代替
    //         return;
    //     }
    // });
    // res.render('editBook',book);
};
// 修改图书更新数据
exports.editBook=(req,res)=>{
    let info=req.body;
    let sql='update book set name=? ,author=?, category=?,description=? where id=?';
    let data=[info.name,info.author,info.category,info.description,info.id];

    db.base(sql,data,(results)=>{
        if(results.affectedRows==1){
            res.redirect('/list');
        }
    });
    // data.forEach((item)=>{
    //     if(item.id==info.id){
    //         for(let key in info){
    //             item[key]=info[key];
    //         }
    //         return;
    //     }
    // });
    // //把内存中的数据写入文件
    // fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
    //     if(err) return;
    //     res.redirect('/list');
    // });
};

exports.deleteBook=(req,res)=>{
    let id=req.query.id
    let sql='delete from book where id=?';
    let data=[id];
    db.base(sql,data,(results)=>{
        if(results.affectedRows==1){
            res.redirect('/list');
        }
    });
    // data.forEach((item,index)=>{
    //     if(item.id==id){
    //         // 删除数组的一项数据
    //         data.splice(index,1);
    //     }
    // });
    // fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err)=>{
    //     if(err) return;
    //     res.redirect('/list');
    // });
};