<aside>
    <div id="sidebar" class="nav-collapse" style="overflow: auto!important; outline: none!important;">
<ul class="sidebar-menu" id="accordion">
    {!! csrf_field() !!}
        @foreach ($menulistview as $Menu) @if (($Menu->menulevel == 1) && ($Menu->haschild == 0))
            <li class="active">
                <a class="" ui-sref="{{$Menu->menuurl}}">
                          <img src="{{$Menu->imageurl}}" />
                          <span>{{$Menu->menuname}}</span>
                      </a>
            </li>
            @else
            <li class="sub-menu">
                @if (($Menu->menulevel == 1) && ($Menu->haschild == 1))
                <a href="javascript:;" class="">
                                    <img src="{{$Menu->imageurl}}" />
                                    <span>{{$Menu->menuname}}</span>
                                    <span class="menu-arrow arrow_carrot-right"></span>
                                </a>
                <ul class="sub">
                    @foreach ($menulistview as $Submenu) @if ($Submenu ->parentid == $Menu->menuid)
                    <li><a class="" ui-sref="{{$Submenu->menuurl}}"><span>{{$Submenu->menuname}}<span></a></li>
                    @endif @endforeach
                </ul>
                @endif
            </li>
            @endif @endforeach
           
        </ul>

    </div>
    <div class="topbar-item">
		                <div class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
		                    <span class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">@foreach ($employeename as $l)
			 {{$l->employee_name}}
			 @endforeach</span>
		                    <span class="symbol symbol-lg-35 symbol-25 symbol-light-success">
		                        <span class="symbol-label font-size-h5 font-weight-bold">
									 @foreach ($employeename as $l)
			 {{ucfirst(substr($l->employee_name, 0, 1))}}
			 @endforeach</span>
		                    </span>
		                </div>
		            </div>
</aside>

<script>
  $( function() {
    $( "#accordion" ).accordion();
  } );
  </script>

{{--  <script src="Scripts/app.js"></script>
<script src="Scripts/controller.js"></script>  --}}