<?php



include 'conn.php'; //连接数据库

//写sql语句查询数据
$sql = 'SELECT * FROM cart'; //字符串
//执行sql语句
$res = $conn->query($sql); //得到一个结果集

//得到结果集里面的内容部分
$content = $res->fetch_all(MYSQLI_ASSOC); //[{},{},{}]

//  var_dump($content);

//把数据传给前端:把数据先转成字符串再传给前端
 echo json_encode($content,JSON_UNESCAPED_UNICODE);//防止中文转义

//关闭连接
$res->close(); //关闭结果集
$conn->close();//关闭数据库
