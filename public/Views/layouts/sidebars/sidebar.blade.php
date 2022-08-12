<aside>
    <div id="sidebar" class="nav-collapse ">
        <ul class="sidebar-menu">
            @foreach ($MenuList as $Menu) @if (($Menu->MenuLevel == 1) && ($Menu->HasChild == 0))
            <li class="active">
                <a class="" href="{{$Menu->MenuURL}}">
                          <img src="{{$Menu->ImageURL}}" />
                          <span>{{$Menu->MenuName}}</span>
                      </a>
            </li>
            @else
            <li class="sub-menu">
                @if (($Menu->MenuLevel == 1) && ($Menu->HasChild == 1))
                <a href="javascript:;" class="">
                                    <img src="{{$Menu->ImageURL}}" />
                                    <span>{{$Menu->MenuName}}</span>
                                    <span class="menu-arrow arrow_carrot-right"></span>
                                </a>
                <ul class="sub">
                    @foreach ($MenuList as $Submenu) @if ($Submenu ->ParentId == $Menu->MenuId)
                    <li><a class="" ui-sref="{{$Submenu->MenuURL}}">{{$Submenu->MenuName}}</a></li>
                    @endif @endforeach
                </ul>
                @endif
            </li>
            @endif @endforeach
        </ul>
    </div>
</aside>
