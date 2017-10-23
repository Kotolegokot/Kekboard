<nav class="d-flex navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="{{ route('home') }}">
        <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
        {{ config('app.name') }}
    </a>
    <div class="ml-auto nav-item dropdown float-right">
        <span class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="cursor: pointer">
            {{ Auth::user()->name }}
        </span>
        <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
            <button type="button" form="settings" class="dropdown-item" style="cursor: pointer">{{ __('Settings') }}</button>
            <button type="button" form="quit" class="dropdown-item" style="cursor: pointer">{{ __('Quit') }}</button>
        </div>
    </div>

    <!-- Forms -->
    <form style="display: none" id="settings" action="#">
    </form>

    <form style="display: none" id="quit" method="post" action="{{ route('quit') }}">
        {{ method_field('delete') }}

        {{ csrf_field() }}
    </form>
</nav>

