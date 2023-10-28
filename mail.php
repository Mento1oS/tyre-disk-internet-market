<?php
    $number = $_POST['number'];
    
    $to = 'avtokord73@mail.ru';
    $date = date ("d.m.Y");
    $time = date ("h:i");
    $from = 'avtokord73.ru';
    $subject = 'Form reply';
    
    $msg = "Number: $number";
    
    mail($to, $subject, $msg, "From: $from ");
?>