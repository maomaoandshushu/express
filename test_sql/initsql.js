// 把data.json文件中的数据拼接成insert语句

const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../', 'data.json'), 'utf8', (err, data) => {
    if (err) return;
  
    let list = JSON.parse(data);
    let arr = [];
    list.forEach((ele) => {
        let sql = `INSERT INTO book( name, author, category, description) 
        VALUES ( '${ele.name}', '${ele.author}', '${ele.category}', '${ele.desc}');`
        arr.push(sql);
    });    

    fs.writeFile(path.join(__dirname, 'data.sql'), arr.join('\n'), 'utf8', (err) => {
        console.log('写出完成!');
    });
});

