<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="shortcut icon" href="/img/Greenfinch Logo.jpeg">
    <title>Login</title>
    <base href={{ url('/') }}/>
    
    {!!Html::style('css/bootsnav.css')!!} 
    {!!Html::style('css/overwrite.css')!!} 
    {!!Html::style('css/bootstrap-datepicker.css')!!} 
    {!!Html::style('css/bootstrap-theme.css')!!} 
    {!!Html::style('css/elegant-icons-style.css')!!} 
    {!!Html::style('css/font-awesome.min.css')!!} 
    {!!Html::style('css/owl.carousel.css')!!}  
    {!!Html::style('css/jquery-jvectormap-1.2.2.css')!!}  
    {!!Html::style('css/widgets.css')!!} 
    {!!Html::style('css/style.css')!!} 
    {!!Html::style('css/jquery-ui-1.10.4.min.css')!!}
    {!!Html::style('css/angular-ui.css')!!} 
    {!!Html::style('css/jquery.mCustomScrollbar.css')!!}

   
    <!-- <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/trix/0.9.2/trix.css"> -->
    @yield('style')
</head>

<body class="login-img3-body" ng-app="OEMSController"  ng-controller="LoginPageController">
  <style>
    /*------------------------------------------------------------------

    Main Style Stylesheet
    Project:        Vortex. |  StartUp Landing Page Template
    Version:        1.0
    Author:         Gnawi Themes
    Last change:    8/29/2016
    Primary use:    Landing,Startup and Showcase.

-------------------------------------------------------------------*/
/*-- Imports (only visible on scss file) --*/
@import "https://fonts.googleapis.com/css?family=Raleway:300,400,700";
/*========================================
          Base Style
========================================*/
body {
  font-family: 'Raleway', sans-serif;
  color: #496174;
  background: #fff;
  font-size: 14px;
  line-height: 24px; }

.section-padding {
  padding: 100px 0; }

.typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite; }

@keyframes blink {
  0% {
    opacity: 1; }
  50% {
    opacity: 0; }
  100% {
    opacity: 1; } }
@-webkit-keyframes blink {
  0% {
    opacity: 1; }
  50% {
    opacity: 0; }
  100% {
    opacity: 1; } }
/**
 * Simple fade transition,
 */
.mfp-fade.mfp-bg {
  opacity: 0;
  -webkit-transition: all 0.15s ease-out;
  transition: all 0.15s ease-out; }

.mfp-fade.mfp-bg.mfp-ready {
  opacity: 0.8; }

.mfp-fade.mfp-bg.mfp-removing {
  opacity: 0; }

.mfp-fade.mfp-wrap .mfp-content {
  opacity: 0;
  -webkit-transition: all 0.15s ease-out;
  transition: all 0.15s ease-out; }

.mfp-fade.mfp-wrap.mfp-ready .mfp-content {
  opacity: 1; }

.mfp-fade.mfp-wrap.mfp-removing .mfp-content {
  opacity: 0; }

/*-- Preloader --*/
.page-preloader {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #024da0;
  z-index: 100000; }

.spinner {
  position: relative;
  top: 35%;
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px; }

.spinner > div {
  background-color: #fff;
  height: 100%;
  width: 6px;
  display: inline-block;
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out; }

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s; }

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s; }

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s; }

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s; }

@-webkit-keyframes sk-stretchdelay {
  0%,
    40%,
    100% {
    -webkit-transform: scaleY(0.4); }
  20% {
    -webkit-transform: scaleY(1); } }
@keyframes sk-stretchdelay {
  0%,
    40%,
    100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4); }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1); } }
/*========================================
            Typography
========================================*/
/*-- Typo Style --*/
h1 {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 35px;
  color: #fff; }

h2 {
  font-size: 36px;
  letter-spacing: 0.08em; }

h3 {
  font-size: 32px;
  letter-spacing: 0.08em; }

h4 {
  font-size: 24px;
  letter-spacing: 0.08em; }

h5 {
  font-size: 18px;
  letter-spacing: 0.08em; }

h6 {
  font-size: 16px; }

p {
  font-size: 15px;
  letter-spacing: 0.08em;
  line-height: 24px; }

/*========================================
            Buttons Style
========================================*/
.btn-blue {
  background: #024da0;
  padding: 10px 28px;
  border: 2px solid #44c5ee;
  color: #fff;
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 0.08em;
  -webkit-transition: 0.5s all;
          transition: 0.5s all;
  box-shadow: 0px 0px 60px 0px rgba(68, 197, 238, 0.6);
  outline: none !important; }

.btn-blue:hover,
.btn-blue:focus,
.btn-blue:active {
  background: #fff;
  color: #496174; }

.btn-transparent {
  background: transparent;
  padding: 10px 28px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 0.08em;
  -webkit-transition: 0.5s all;
          transition: 0.5s all;
  outline: none !important; }

.btn-transparent:hover,
.btn-transparent:focus,
.btn-transparent:active {
  background: #fff;
  color: #496174; }

.btn-white {
  background: #fff;
  padding: 10px 28px;
  color: #496174;
  border: 2px solid #fff;
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 0.08em;
  -webkit-transition: 0.5s all;
          transition: 0.5s all;
  outline: none !important; }

.btn-white:hover,
.btn-white:focus,
.btn-white:active {
  background: transparent;
  color: #fff; }

/*-- Navbar Bug Fix --*/
@media (max-width: 1023px) {
  /* Navbar Responsive
  =================================*/
  nav.navbar.bootsnav .navbar-brand {
    display: inline-block;
    float: none !important;
    margin: 0 !important;
    padding: 3px 15px; }
    nav.navbar.bootsnav .navbar-brand img {
      width: 30px; }

  nav.navbar.bootsnav .navbar-header {
    float: none;
    display: block;
    text-align: center;
    padding-left: 30px;
    padding-right: 30px; }

  nav.navbar.bootsnav .navbar-toggle {
    display: inline-block;
    float: left;
    margin-right: -200px;
    margin-top: 10px; }

  nav.navbar.bootsnav .navbar-collapse {
    border: none;
    margin-bottom: 0; }

  nav.navbar.bootsnav.no-full .navbar-collapse {
    max-height: 350px;
    overflow-y: auto !important; }

  nav.navbar.bootsnav .navbar-collapse.collapse {
    display: none !important; }

  nav.navbar.bootsnav .navbar-collapse.collapse.in {
    display: block !important; }

  nav.navbar.bootsnav .navbar-nav {
    float: none !important;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0px -15px; }

  nav.navbar.bootsnav .navbar-nav > li {
    float: none; }

  nav.navbar.bootsnav li.dropdown a.dropdown-toggle:before {
    font-family: 'FontAwesome';
    content: "\f105";
    float: right;
    font-size: 16px;
    margin-left: 10px; }

  nav.navbar.bootsnav li.dropdown.on > a.dropdown-toggle:before {
    content: "\f107"; }

  nav.navbar.bootsnav .navbar-nav > li > a {
    display: block;
    width: 100%;
    border-bottom: solid 1px #e0e0e0;
    padding: 10px 0;
    border-top: solid 1px #e0e0e0;
    margin-bottom: -1px; }

  nav.navbar.bootsnav .navbar-nav > li:first-child > a {
    border-top: none; }

  nav.navbar.bootsnav ul.navbar-nav.navbar-left > li:last-child > ul.dropdown-menu {
    border-bottom: solid 1px #e0e0e0; }

  nav.navbar.bootsnav ul.nav li.dropdown li a.dropdown-toggle {
    float: none !important;
    position: relative;
    display: block;
    width: 100%; }

  nav.navbar.bootsnav ul.nav li.dropdown ul.dropdown-menu {
    width: 100%;
    position: relative !important;
    background-color: transparent;
    float: none;
    border: none;
    padding: 0 0 0 15px !important;
    margin: 0 0 -1px 0 !important;
    -o-box-shadow: 0px 0px 0px;
    box-shadow: 0px 0px 0px;
    -o-border-radius: 0px 0px 0px;
    border-radius: 0px 0px 0px; }

  nav.navbar.bootsnav ul.nav li.dropdown ul.dropdown-menu > li > a {
    display: block;
    width: 100%;
    border-bottom: solid 1px #e0e0e0;
    padding: 10px 0;
    color: #6f6f6f; }

  nav.navbar.bootsnav ul.nav ul.dropdown-menu li a:hover,
  nav.navbar.bootsnav ul.nav ul.dropdown-menu li a:focus {
    background-color: transparent; }

  nav.navbar.bootsnav ul.nav ul.dropdown-menu ul.dropdown-menu {
    float: none !important;
    left: 0;
    padding: 0 0 0 15px;
    position: relative;
    background: transparent;
    width: 100%; }

  nav.navbar.bootsnav ul.nav ul.dropdown-menu li.dropdown.on > ul.dropdown-menu {
    display: inline-block;
    margin-top: -10px; }

  nav.navbar.bootsnav li.dropdown ul.dropdown-menu li.dropdown > a.dropdown-toggle:after {
    display: none; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu .title {
    padding: 10px 15px 10px 0;
    line-height: 24px;
    text-transform: none;
    font-weight: 400;
    letter-spacing: 0px;
    margin-bottom: 0;
    cursor: pointer;
    border-bottom: solid 1px #e0e0e0;
    color: #6f6f6f; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu ul > li > a {
    display: block;
    width: 100%;
    border-bottom: solid 1px #e0e0e0;
    padding: 8px 0; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu .title:before {
    font-family: 'FontAwesome';
    content: "\f105";
    float: right;
    font-size: 16px;
    margin-left: 10px;
    position: relative;
    right: -15px; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu:last-child .title {
    border-bottom: none; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu.on:last-child .title {
    border-bottom: solid 1px #e0e0e0; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu:last-child ul.menu-col li:last-child a {
    border-bottom: none; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu.on .title:before {
    content: "\f107"; }

  nav.navbar.bootsnav .dropdown .megamenu-content .col-menu .content {
    padding: 0 0 0 15px; }

  nav.bootsnav.brand-center .navbar-collapse {
    display: block; }

  nav.bootsnav.brand-center ul.nav {
    margin-bottom: 0px !important; }

  nav.bootsnav.brand-center .navbar-collapse .col-half {
    width: 100%;
    float: none;
    display: block; }

  nav.bootsnav.brand-center .navbar-collapse .col-half.left {
    margin-bottom: 0; }

  nav.bootsnav .megamenu-content {
    padding: 0; }

  nav.bootsnav .megamenu-content .col-menu {
    padding-bottom: 0; }

  nav.bootsnav .megamenu-content .title {
    cursor: pointer;
    display: block;
    padding: 10px 15px;
    margin-bottom: 0;
    font-weight: normal; }

  nav.bootsnav .megamenu-content .content {
    display: none; }

  .attr-nav {
    position: absolute;
    right: 60px; }

  .attr-nav > ul {
    padding: 0;
    margin: 0 -15px -7px 0; }

  .attr-nav > ul > li > a {
    padding: 16px 15px 15px; }

  .attr-nav > ul > li.dropdown > a.dropdown-toggle:before {
    display: none; }

  .attr-nav > ul > li.dropdown ul.dropdown-menu {
    margin-top: 2px;
    margin-left: 55px;
    width: 250px;
    left: -250px;
    border-top: solid 5px; }

  .top-search .container {
    padding: 0 45px; } }
@media (max-width: 992px) {
  #home .container {
    text-align: center; }
    #home .container h1 {
      font-size: 36px; }
    #home .container h2 {
      font-size: 26px; }

  section .col-md-4 {
    margin-bottom: 40px; }

  #newsletter .form-container .form-inline .btn {
    position: relative;
    right: 143px; } }
@media (max-width: 767px) {
  #home .container {
    text-align: center; }
    #home .container h1 {
      font-size: 34px; }
    #home .container h2 {
      font-size: 24px; }

  #clients #owl-testimonials .item p {
    width: 100%; }

  #newsletter .form-container .form-inline .form-control {
    width: 80%; }
  #newsletter .form-container .form-inline .btn {
    position: relative;
    right: 40px;
    margin-top: 40px; }

  #contact .contact-info {
    position: relative !important;
    top: 0 !important;
    margin-top: 40px; } }
/*========================================
           Header
========================================*/
nav.navbar.bootsnav.navbar-fixed .navbar-brand {
  padding: 10px 15px; }
nav.navbar.bootsnav.navbar-fixed ul.nav > li > a {
  padding: 35px 15px; }
nav.navbar.bootsnav.navbar-fixed .button-holder {
  padding: 15px 0;
  margin-left: 40px; }

#home {
  position: relative;
  padding: 120px 0px 120px 0px;
  background: url(../img/banner.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; }
  #home .caption {
    padding: 60px 0; }
    #home .caption h2 {
      color: #fff; }
    #home .caption p {
      font-size: 18px;
      margin-top: 25px;
      color: #fff; }
    #home .caption .btn {
      margin-top: 25px; }
    #home .caption .btn-blue {
      margin-left: 15px; }
      #home .caption .btn-blue i {
        position: relative;
        top: 5px;
        margin-right: 10px; }
  #home .signup-form {
    background-color: #fff;
    padding: 45px;
    border-radius: 5px; }
    #home .signup-form input {
      border: 1px solid #eee;
      height: 38px;
      box-shadow: none !important; }
    #home .signup-form input:focus {
      border-color: #44c5ee; }
    #home .signup-form .form-control {
      font-size: 16px;
      padding: 10px 15px;
      color: #555;
      background-color: #fff;
      border-radius: 3px; }

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0; }

/*========================================
           Footer
========================================*/
footer {
  background: #024da0;
  color: #fff;
  padding: 40px 0; }
  footer hr {
    margin: 40px 0; }
  footer img {
    width: 50px; }
  footer ul {
    padding: 0; }
  footer li {
    display: inline-block; }
    footer li a {
      font-size: 20px;
      padding: 12px;
      color: #fff;
      -webkit-transition: 0.4s;
              transition: 0.4s; }
    footer li a:hover,
    footer li a:focus,
    footer li a:active {
      color: #496174; }

    </style>
    <div class="container">
      

    <!--======================================== 
           Preloader
    ========================================-->

    <div class="page-preloader">
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </div>

    <!--======================================== 
           Header
    ========================================-->

    <!--//** Navigation**//-->
<!-- 
    <nav class="navbar navbar-default navbar-fixed white no-background bootsnav navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="#brand">
                    <img src="img/logo.png" class="logo" alt="logo">
                </a>
            </div>
    </nav> -->
        </div>


    <!--//** Banner**//-->

    <section id="home">
        <div class="container">
            <div class="row">
            <h1 style="text-align:right">Welcome to OEMS</h1>
                <div class="col-md-6 caption">
                    <!-- <h1>Welcome To OEMS</h1> -->
                </div>

                <!-- Sign Up -->
                <div class="col-md-5 col-md-offset-1">
                
                    <form class="signup-form">
                        <h2 class="text-center">Login Now</h2>
                        <hr>
                        <div class="form-group">
                            <input type="text" class="form-control" ng-model="UserName" placeholder="User Name" required="required">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" ng-model="Password" placeholder="Password" required="required">
                        </div>
                        <label class="checkbox">
                        <!-- <input type="checkbox" value="remember-me"> Remember me -->
                        <span class="pull-right"> <a href="#" data-toggle="modal" data-target="#Modal">Forget Password</a></span>
                    </label>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-blue btn-block" ng-click="Login_AddEdit()">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
</div>
                    <div id="Modal" class="modal fade" role="dialog">
                        <div class="modal-dialog" style="width: 50%">
                            <div class="modal-content">
                            <div class="modal-header">    
                            <button type="button" class="close" data-dismiss="modal">&times;</button>                                
                                    <h4 class="modal-title">Forget Password</h4>
                            </div>
                              <div class="modal-body">
                                    <form class="form-horizontal" role="form" style="font-size:small">
                                    <table style="width: 100%" class="formControlGroup">
                                    <tr>
                                        <td width="15%">
                                            <label>E-Mail<font class='mandatory-field' style="color: red";>*</font></label>
                                        </td>
                                        <td width="15%">
                                        <input type="text" class="form-control" name="resetmailid" ng-model="resetmailid" ng-init="mailid=''" ng-maxlength="100" maxlength="100" placeholder=""></td>
                                            </tr>
                                            <tr>
                                        </tr>
                   
                    
                                     </table>
                                    </form>
                              </div>
                              <div class="modal-footer" style="text-align:center;">
                                <button type="button" class="btn  btn-save" title = "Click to Reset Password." ng-click="Resetpassword_Details()">Reset Password</button>
                                <button type="button" class="btn  btn-save" title = "Click to Close." data-dismiss="modal">Close</button>
                               
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
    </section>

    <!--======================================== 
           Footer
    ========================================-->
    <footer>
        <div class="container">
            <div class="row">
                <div class="footer-caption">
                    <h5 class="pull-left">OEMS, &copy;2017 All rights reserved</h5>
                    <ul class="liste-unstyled pull-right">
                        <li><a href="#facebook"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#twitter"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#linkedin"><i class="fa fa-linkedin"></i></a></li>
                        <li><a href="#instagram"><i class="fa fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <!-- javascripts  -->
    {!!Html::script('js/jquery.js')!!} 
    {!!Html::script('js/jquery-ui-1.10.4.min.js')!!} 
    {!!Html::script('js/jquery-1.8.3.min.js')!!}
    {!!Html::script('js/jquery-ui-1.9.2.custom.min.js')!!} 
    {!!Html::script('js/bootstrap.min.js')!!} 
    {!!Html::script('js/jquery.scrollTo.min.js')!!}
    {!!Html::script('js/jquery.nicescroll.js')!!} 
    {!!Html::script('assets/jquery-knob/js/jquery.knob.js')!!} 
    {!!Html::script('js/jquery.sparkline.js')!!}
    <!-- {!!Html::script('assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js')!!}  -->
    {!!Html::script('js/owl.carousel.js')!!}
    {!!Html::script('js/fullcalendar.min.js')!!} 
    {!!Html::script('assets/fullcalendar/fullcalendar/fullcalendar.js')!!} 
    {!!Html::script('js/calendar-custom.js')!!}
    {!!Html::script('js/jquery.rateit.min.js')!!} 
    {!!Html::script('js/jquery.customSelect.min.js')!!} 
    {!!Html::script('assets/chart-master/Chart.js')!!}
    {!!Html::script('js/scripts.js')!!} 
    <!-- {!!Html::script('js/sparkline-chart.js')!!}  -->
    <!-- {!!Html::script('js/easy-pie-chart.js')!!} -->
    {!!Html::script('js/jquery-jvectormap-1.2.2.min.js')!!} 
    {!!Html::script('js/jquery-jvectormap-world-mill-en.js')!!} 
    {!!Html::script('js/xcharts.min.js')!!}
    {!!Html::script('js/jquery.autosize.min.js')!!} 
    {!!Html::script('js/jquery.placeholder.min.js')!!} 
    {!!Html::script('js/gdp-data.js')!!}
    {!!Html::script('js/morris.min.js')!!} 
    {!!Html::script('js/sparklines.js')!!} 
    <!-- {!!Html::script('js/angucomplete-alt.js')!!} -->
    <!-- {!!Html::script('js/charts.js')!!}  -->
    {!!Html::script('js/jquery.slimscroll.min.js')!!}
    <!--   {!!Html::script('js/bootstrap.min.js')!!} -->
    {!!Html::script('js/bootstrap-datepicker.js')!!}
    <!-- Dual List Box 
{!!Html::script('js/run_prettify.min.js')!!} --> 
    {!!Html::script('js/jquery.bootstrap-duallistbox.js')!!} 
     <!--Angular JS 
    {!!Html::script('js/angular.min.js')!!} -->
    {!!Html::script('js/angular.js')!!}
    {!!Html::script('js/angular-ui-router.js')!!}
    {!!Html::script('js/angucomplete-alt.js')!!}
    {!!Html::script('js/smart-table.js')!!}
    {!!Html::script('js/daypilot-all.min.js')!!}
    {!!Html::script('js/daypilot.js')!!}
    {!!Html::script('js/bsDualListBox.js')!!}
    {!!Html::script('js/bootstrap-timepicker.js')!!}
    <!-- {!!Html::script('js/angular-trix.js')!!} -->
    {!!Html::script('js/democtrl.js')!!}
    {!!Html::script('js/moment.min.js')!!}

    {!!Html::script('js/angular-ui.js')!!}
    {!!Html::script('js/summernote.js')!!}
    {!!Html::script('js/ui-bootstrap-tpls.js')!!}
    {!!Html::script('js/ui-bootstrap.js')!!}
  
    
  {!!Html::script('js/bootstrap-multiselect.js')!!}
    <script src="Scripts/appLogin.js"></script>
    <script src="Scripts/controller.js"></script>
    <script src="js/Common.js"></script>


    @yield('script')
    </div>
</body>

</html>
<script>
  $(document).ready(function () {
    
    "use strict";
    // Preloader    
    $(window).load(function () { // makes sure the whole site is loaded
        $('.page-preloader spinner').fadeOut(); // will first fade out the loading animation
        $('.page-preloader').delay(350).fadeOut('slow');
        // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    })
    
});
  </script>