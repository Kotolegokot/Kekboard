<nav id="header" class="d-flex navbar sticky-top navbar-dark">
    <a class="navbar-brand" href="{{ route('home') }}">
        <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
        {{ config('app.name') }}
    </a>

    <div class="dropdown">
        <span class="nav-link dropdown-toggle pointed" href="#" data-toggle="dropdown" style="color: white">
            {{ Auth::user()->name }}
        </span>
        <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
            <button type="submit" form="settings" class="dropdown-item pointed">@lang('header.settings')</button>
            <button type="submit" form="quit" class="dropdown-item pointed">@lang('header.quit')</button>
        </div>
    </div>

    <!-- Forms -->
    <form class="vanished" id="settings" action="#">
    </form>

    <form class="vanished" id="quit" method="post" action="{{ route('quit') }}">
        {{ method_field('delete') }}

        {{ csrf_field() }}
    </form>
</nav>

