<template>
    <nav id="header" class="d-flex navbar sticky-top navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <!-- <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
            {{ appName }}
        </a>

        <div id="menu" class="dropdown ml-auto">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="color: white">
                *username*
            </a>
            <div class="dropdown-menu dropdown-menu-right" style="left: initial; right: 0">
                <a href="#" class="dropdown-item">Settings</a>
                <a href="#" class="dropdown-item">Quit</a>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data: ''
    }
</script>
