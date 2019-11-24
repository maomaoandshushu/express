// 操作数据库基本步骤

const mysql = require('mysql');

exports.base=(sql,data,callback)=>{
    const connection = mysql.createConnection({
        host: '192.168.2.227',
        user: 'root',
        password: '123456',
        database: 'baby_test'
    });
    // 连接数据库
    connection.connect();
    //操作数据库,数据库操作也是异步的,所以不能通过返回值的方式
    connection.query(sql,data, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
    //关闭连接
    connection.end();
};