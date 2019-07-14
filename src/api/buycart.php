<?php
//接口功能：帮前端查询第几页的数据
$id = isset($_GET['id']) ? $_GET['id'] : ''; //页数，哪一页

var_dump($id);
// echo $page,$num;
include 'conn.php'; //连接数据库


//sql语句

$sql = "INSERT INTO cart(id,price,name,imgurl) SELECT id,price,name ,imgurl FROM list1 where id=$id";

//     INSERT INTO cart(id,price,name,imgurl) SELECT id,price,name ,imgurl FROM list1 where id=$id


//INSERT INTO  目标表 (字段1, 字段2, ...)  SELECT   字段1, 字段2, ...   FROM  来源表 

//SELECT * FROM goodslist ORDER BY price desc LIMIT 0,10;

//执行sql语句
$res = $conn->query($sql); //得到结果集

// var_dump($res);

//读取结果集的内容部分传给前端
// $content = $res->fetch_all(MYSQLI_ASSOC); //对象  [{},{},{}]

//将数据转成字符串传给前端
// echo json_encode($content,JSON_UNESCAPED_UNICODE);


//传给前端：先转成字符串
// echo json_encode($data, JSON_UNESCAPED_UNICODE);

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
