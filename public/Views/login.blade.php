<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="">
    <meta name="viewport" content="">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <title>Login</title>    
    {!!Html::style('css/bootstrap.min.css')!!}
    {!!Html::style('css/bootstrap-theme.css')!!}
    {!!Html::style('css/elegant-icons-style.css')!!}
    {!!Html::style('css/font-awesome.css')!!}
    {!!Html::style('css/style.css')!!}
    {!!Html::style('css/style-responsive.css')!!}
</head>
<body class="login-img3-body">
    <div class="container">
      <form class="login-form" action="{{ route('login') }}" method="post"> 
           {!! csrf_field() !!}
        <div class="login-wrap">
            <p class="login-img"><i class="icon_lock_alt"></i></p>
            <div class="input-group">
              <span class="input-group-addon"><i class="icon_profile"></i></span>
              <input type="text" name="username" class="form-control" placeholder="Username" autofocus>
            </div>
            <div class="input-group">
                <span class="input-group-addon"><i class="icon_key_alt"></i></span>
                <input type="password" name="password" class="form-control" placeholder="Password">
            </div>
            <label class="checkbox">
                <input type="checkbox" value="remember-me"> Remember me
                <span class="pull-right"> <a href="#"> Forgot Password?</a></span>
            </label>
            
            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
        </div>
      </form>   
    </div>
</body>
</html>