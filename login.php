<?php
session_start();

if(isset($_SESSION['user'])){
    header("Location: index.php");
    exit();
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if($_POST['username'] === "admin" && $_POST['password'] === "1234"){
        $_SESSION['user'] = "admin";
        header("Location: index.php");
        exit();
    }
    $error = "Wrong username or password";
}
?>

<form method="POST">
    <h2>Login</h2>
    <?php if(isset($error)) echo $error; ?>
    <input name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>