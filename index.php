<?php
session_start();

if(isset($_POST['username']) && isset($_POST['password'])){
    if($_POST['username'] === "admin" && $_POST['password'] === "admin123"){
        $_SESSION['user'] = "admin";
        header("Location: index.php");
        exit();
    } else {
        $error = "Invalid login credentials";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<style>
body{
  font-family:Arial;
  background:#0f172a;
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
}
.box{
  background:white;
  padding:30px;
  border-radius:10px;
  width:300px;
}
input{
  width:100%;
  padding:10px;
  margin:10px 0;
}
button{
  width:100%;
  padding:10px;
  background:#3b82f6;
  color:white;
  border:none;
}
.error{color:red;}
</style>
</head>
<body>

<div class="box">
<h2>Login</h2>
<?php if(isset($error)) echo "<p class='error'>$error</p>"; ?>

<form method="POST">
<input type="text" name="username" placeholder="Username" required>
<input type="password" name="password" placeholder="Password" required>
<button type="submit">Login</button>
</form>
</div>

</body>
</html>