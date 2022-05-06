const mysql = require('mysql')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'laor1220',
    database: 'test1'
});

// 连接
conn.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("连接成功！!");
    }
});


// 查询 conn.query()
// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;
conn.query(CREATE_SQL, err => {
    if (err) {
        throw err;
    }
    // 插入数据
    conn.query(INSERT_SQL, "hello,world", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        conn.query(SELECT_SQL, (err, results) => {
            console.log(JSON.stringify(results));
            conn.end(); // 若query语句有嵌套，则end需在此执行
        })
    });
});
