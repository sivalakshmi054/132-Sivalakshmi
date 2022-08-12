<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="shortcut icon" href="img/favicon.png">
    <title>Home - OEMS</title>
    {!!Html::style('css/bootstrap.min.css')!!} 
    {!!Html::style('css/bootstrap-datepicker.css')!!} 
    {!!Html::style('css/bootstrap-theme.css')!!}
    {!!Html::style('css/elegant-icons-style.css')!!} 
    {!!Html::style('css/font-awesome.min.css')!!} 
    {!!Html::style('assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css')!!}
    {!!Html::style('assets/fullcalendar/fullcalendar/fullcalendar.css')!!} 
    {!!Html::style('assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css')!!}
    {!!Html::style('css/owl.carousel.css')!!} 
    {!!Html::style('css/jquery-jvectormap-1.2.2.css')!!} 
    {!!Html::style('css/fullcalendar.css')!!}
    {!!Html::style('css/widgets.css')!!} 
    {!!Html::style('css/style.css')!!} 
    {!!Html::style('css/jquery-ui-1.10.4.min.css')!!}
    {!!Html::style('css/angular-ui.css')!!} 
    {!!Html::style('css/calnder.css')!!} 
    {!!Html::style('css/jquery.mCustomScrollbar.css')!!}
    {!!Html::style('css/ng-table.css')!!} 
    {!!Html::style('css/Site.css')!!} 
    {!!Html::style('css/line-icons.css')!!} 
    {!!Html::style('css/texteditor.css')!!}
    {!!Html::style('css/angucomplete-alt.css')!!}
    <!-- Dual List Box 
    {!!Html::style('css/prettify.min.css')!!} -->
    {!!Html::style('css/bootstrap-duallistbox.css')!!}




    <!--
{!!Html::style('css/bootstrap.css')!!} -->
    @yield('style')
</head>

<body ng-app="SchoolController">
    <section id="container" class="">
            
        {{--  @include('layouts.header.header') @include('layouts.sidebars.sidebar')  --}}
        <section id="main-content">
                <div ng-include="layouts.header.header"></div>
            <div class="wrapper">
                    <div ui-view></div>
            </div>
        </section>
    </section>

    <!-- javascripts  -->
    {!!Html::script('js/jquery.js')!!} 
    {!!Html::script('js/jquery-ui-1.10.4.min.js')!!}
     {!!Html::script('js/jquery-1.8.3.min.js')!!}
    {!!Html::script('js/jquery-ui-1.9.2.custom.min.js')!!}
     {!!Html::script('js/bootstrap.min.js')!!}
      {!!Html::script('js/jquery.scrollTo.min.js')!!}
    {!!Html::script('js/jquery.nicescroll.js')!!}
     {!!Html::script('assets/jquery-knob/js/jquery.knob.js')!!}
      <!-- {!!Html::script('js/jquery.sparkline.js')!!} -->
    <!-- {!!Html::script('assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js')!!}  -->
    {!!Html::script('js/owl.carousel.js')!!}
    {!!Html::script('js/fullcalendar.min.js')!!}
     {!!Html::script('assets/fullcalendar/fullcalendar/fullcalendar.js')!!} 
     {!!Html::script('js/calendar-custom.js')!!}
    {!!Html::script('js/jquery.rateit.min.js')!!}
     {!!Html::script('js/jquery.customSelect.min.js')!!} 
     {!!Html::script('assets/chart-master/Chart.js')!!}
    {!!Html::script('js/scripts.js')!!} 
    <!-- {!!Html::script('js/sparkline-chart.js')!!} -->
     <!-- {!!Html::script('js/easy-pie-chart.js')!!} -->
    {!!Html::script('js/jquery-jvectormap-1.2.2.min.js')!!}
     {!!Html::script('js/jquery-jvectormap-world-mill-en.js')!!} 
     {!!Html::script('js/xcharts.min.js')!!}
    {!!Html::script('js/jquery.autosize.min.js')!!} 
    {!!Html::script('js/jquery.placeholder.min.js')!!} 
    {!!Html::script('js/gdp-data.js')!!}
    {!!Html::script('js/morris.min.js')!!} 
    <!-- {!!Html::script('js/sparklines.js')!!}  -->
    <!-- {!!Html::script('js/charts.js')!!}  -->
    {!!Html::script('js/jquery.slimscroll.min.js')!!}
    <!--   {!!Html::script('js/bootstrap.min.js')!!} -->
    {!!Html::script('js/bootstrap-datepicker.js')!!}
    <!-- Dual List Box 
{!!Html::script('js/run_prettify.min.js')!!} --> 
    {!!Html::script('js/jquery.bootstrap-duallistbox.js')!!} 
    {!!Html::script('js/jquery.bootstrap-timepicker.js')!!}
    <!-- {!!Html::script('js/jquery.bootstrap-duallistbox.js')!!}  -->
     <!--Angular JS 
    {!!Html::script('js/angular.min.js')!!} -->
    {!!Html::script('js/angular.js')!!}
    {!!Html::script('js/angucomplete-alt.js')!!}
    {!!Html::script('js/smart-table.js')!!}
    {!!Html::script('js/daypilot-all.min.js')!!}
    {!!Html::script('js/daypilot.js')!!}
    {!!Html::script('js/pageselect.directive.js')!!}
    
    
  <!--  {!!Html::script('js/jquery.min.js')!!} Menu not working
    {!!Html::script('js/bootstrap.min.js')!!}
    {!!Html::script('js/angular-route.js')!!}-->

    @yield('script')

    <script>
        //knob
        /*$(function() {
            $(".knob").knob({
                'draw': function() {
                    $(this.i).val(this.cv + '%')
                }
            })
        });



        //custom select box

        $(function() {
            $('select.styled').customSelect();
        }); */


        $('.input-group.date').datepicker({
            format: "dd-M-yyyy",
            forceParse: false,
            autoclose: true,
            todayHighlight: true,
            toggleActive: true,
            todayBtn: true
        });
    </script>
</body>

</html>