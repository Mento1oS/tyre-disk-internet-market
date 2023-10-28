<?php
    $number = $_POST['number'];
    $params = $_POST['description'];
    $price = $_POST['price'];

    $to = 'avtokord73@mail.ru';
    $date = date ("d.m.Y");
    $time = date ("h:i");
    $from = $to;
    $subject = 'Order:';
    
    $msg = "  Products: $params
      Price: $price,
      Number: $number";
    
    mail($to, $subject, $msg, "From: $from ");
?>