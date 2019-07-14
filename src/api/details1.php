<?php
$id = isset($_GET['id']) ? $_GET['id'] : '5'; //页数，哪一页

include 'conn.php'; //连接数据库


$sql = "INSERT INTO cart(id,price,name,imgurl) SELECT id,price,name ,imgurl FROM list1 where id=$id";

//执行sql语句
$res = $conn->query($sql); //得到结果集

// $res = $conn->query($sql); //得到结果集

// var_dump($res);



//读取结果集的内容部分传给前端
// $content = $res->fetch_all(MYSQLI_ASSOC); //对象  [{},{},{}]
// var_dump($content);

//将数据转成字符串传给前端
// echo json_encode($content, JSON_UNESCAPED_UNICODE);
 //关闭连接
 $res->close();//关闭结果集
 $conn->close();//关闭数据库
