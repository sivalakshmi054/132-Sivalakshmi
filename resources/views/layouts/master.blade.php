<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">

    <base href={{ url('/') }}/>
   
    <link rel="shortcut icon" href="/img/Greenfinch Logo.jpeg">
   
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
    {!!Html::style('css/bootstrap-duallistbox.css')!!}
    {!!Html::style('css/angucomplete-alt.css')!!}
    {!!Html::style('css/bootstrap-timepicker.css')!!}
    {!!Html::style('css/summernote.css')!!}
    {!!Html::style('css/bootstrap-multiselect.css')!!}

   
  
    @yield('style')
</head>

<body ng-app="OEMSController">
    <section id="container" class="">
            
        @include('layouts.header.header') @include('layouts.sidebars.sidebar')
        <section id="main-content">
               {{--  <div ng-include='layouts.header.header'></div>   --}}
            <div class="wrapper">
                    <div class="container">
                        <div ui-view></div>
                    </div>
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
  {!!Html::script('js/jszip.js')!!}
  {!!Html::script('js/xlsx.js')!!}
  {!!Html::script('js/FileSaver.js')!!}
  {!!Html::script('js/jquery.shorten.1.0.js')!!} 
  {!!Html::script('js/angular-sanitize.js')!!}
  {!!Html::script('js/jspdf.min.js')!!}
 {!!Html::script('js/jspdf.plugin.autotable.js')!!}
 
    
    <script src="Scripts/ckeditor/ckeditor.js"></script>
    <script src="Scripts/ng.ckeditor.js"></script>
    <script src="Scripts/app.js"></script>
    <script src="Scripts/controller.js"></script>
    <script src="js/Common.js"></script>



    @yield('script')

    <script>

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