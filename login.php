<?php

include 'koneksi.php';

session_start();

if(isset($_POST['submit'])){
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = md5($_POST['password']);
   $captcha = $_POST['captcha'];
   $confirm_captcha = $_POST['code'];

   // Validasi captcha
   if($captcha !== $confirm_captcha) {
      $error[] = 'Kode Captcha tidak sesuai!';
   } else {
      $select = "SELECT * FROM user_form WHERE email = '$email' && password = '$pass'";
      $result = mysqli_query($conn, $select);

      if(mysqli_num_rows($result) > 0){
         $row = mysqli_fetch_array($result);

         if($row['user_type'] == 'admin'){
            $_SESSION['admin_name'] = $row['name'];
            header('location:admin.php');
         } elseif($row['user_type'] == 'user'){
            $_SESSION['user_name'] = $row['name'];
            header('location:user.php');
         }
      } else {
         $error[] = 'Email atau Password Salah!';
      }
   }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<style>
      input.captcha{
         pointer-events : none;
         letter-spacing: 12px;
         text-decoration: line-through; 
         color : red;
      }
   </style>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARYA.ID</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>
<body>
    <div class="container"> 
        <div class="login-left">
            <div class="login-header">
                <h1>Selamat Datang Di Website</h1>
               <h2>
               <?php
                    if(isset($error)){
                        foreach($error as $error){
                        echo '<span class="error-msg" style="background-color: red; color: white;">'.$error.'</span>';
                        };
                     };
                ?>
               </h2> 
                <p>silahkan login akun anda</p>
            </div>
            <form class="login-form" method="post" action="">
                <div class="login-form-content">
                    <div class="form-item">
                        <label for="email">EMAIL</label>
                        <input type="text" id="email" name="email" required placeholder="Masukan Email">
                    </div>
                    <div class="form-item">
                        <label for="password">PASSWORD</label>
                        <input type="password" id="password" name="password" required placeholder="Masukan Password">
                    </div>
                    <div class="form-item">
                        <label for="password">CAPTCHA</label>
                        <input type="text" name="captcha" class="captcha" value="<?php echo substr(uniqid(),5);?>">
                        <br><br>
                        <input type="text" name="code" required placeholder="enter your captha">
                    </div>
                    <div class="form-item">
                        <div class="checkbox">
                            <input type="checkbox" id="rememberMeCheckbox" checked>
                            <label for="rememberMeCheckbox" class="checkboxLabel">Ingat saya</label>
                        </div>
                    </div>
                    <button type="submit" name="submit">Sign in</button>
                    <a href="register.php">
                    <h3>Register</h3>
                    </a>
                </div>
                <div class="login-form-footer">
                    
                </div>
            </form>
        </div>
        <div class="login-right">
            <img src="foto/pra.png" alt="">
        </div>
    </div>
</body>
</html>