<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
        <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
        {{ config('app.name') }}
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
        x
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
        <div class="navbar-nav mr-auto">
            <a class="nav-item nav-link {{ Request::segments() == [] ? 'active' : '' }}">{{ __('Home') }}</a>

            <span class="navbar-text mx-auto">
                /b/
            </span>
        </div>
        <div class="nav-item dropdown float-right">
            <span class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="cursor: pointer">
                username
            </span>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">{{ __('Profile') }}</a>
                <a class="dropdown-item" href="#">{{ __('Settings') }}</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">{{ __('Quit') }}</a>
            </div>
        </div>
    </div>
</nav>
