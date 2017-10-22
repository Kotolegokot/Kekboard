<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
        <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
        {{ config('app.name') }}
    </a>

    <button class="navbar-toggler" type="button" data-toggle="cllapse" data-target="navbar-content">
        <span class="navbar-toggle-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar-content">
        <div class="navbar-nav mr-auto">
            <a class="nav-item nav-link {{ Request::segments() == [] ? 'active' : '' }}">{{ __('Home') }}</a>

            <span class="navbar-text mx-auto">
                /b/
            </span>
        </div>
        <a class="nav-item nav-link {{ Request::segments() == [] ? 'active' : '' }}">{{ __('Settings') }}</a>
        <a class="nav-item nav-link {{ Request::segments() == [] ? 'active' : '' }}">{{ __('Quit') }}</a>
    </div>
</nav>
