@extends('layouts.master') @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div ng-app="myApp" ng-controller="myCtrl">
                <p>The name is <span ng-bind="firstName + ' ' + lastName"></span></p>
                
<div ng-app="">
  <p>Name: <input type="text" ng-model="name"></p>
  <p ng-bind="name"></p>
</div>
</div>
@endsection

@section('script')

<script src="Scripts/app.js"></script>

@endsection

