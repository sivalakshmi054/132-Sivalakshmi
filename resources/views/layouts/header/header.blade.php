<header class="header dark-bg">
    <div class="toggle-nav">
        <div class="icon-reorder tooltips" data-original-title="Toggle Navigation" data-placement="bottom"><i class="icon_menu"></i></div>
    </div>
    <a href="" class="logo"> <span class="">
                                <img alt="" src="/img/Greenfinch Logo.jpeg" style="height: 50px;width: 50px;padding-bottom: 10px;">
                            </span>OEMS</a>
    <div class="nav search-row" id="top_menu">

    </div>
    <div class="top-nav" style="width: 100px;margin:0 auto;height: 0px;padding-top: 10px;">
    <span class="profile-ava">
                                <img alt="" src="/img/mpnrclogo.jpeg" style="height: 50px;width: 50px;">
                            </span>
</div>
    <div class="top-nav notification-row">
        
        <ul class="nav pull-right top-menu">

            <!-- user login dropdown start-->
            <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="profile-ava">
                                <img alt="" src="/img/admin.jpg">
                            </span>
                            <span class="username">@foreach ($employeename as $l)
                                {{$l->employee_name}}
                                @endforeach</span>
                            <b class="caret"></b>
                        </a>
                <ul class="dropdown-menu extended logout">
                    <div class="log-arrow-up"></div>
                    <li class="eborder-top">
                         <a href="Home#/ChangePassword"><i class="icon_key_alt"></i>Change Password</a>
                        <a href="{{route('logout')}}"><i class="icon_key_alt"></i>Log Out</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</header>
