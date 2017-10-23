@extends('layouts.master')

@section('title')
    {{ config('app.name') . ' | ' . __('login.title') }}
@endsection

@section('content')
    <div class="container">
        <h1 class="text-center">
            {{ config('app.name') }}
        </h1>

        <form method="post" action="{{ route('login') }}">
            @if($errors->has('general'))
                <div class="alert alert-danger">
                    {{ $errors->first('general') }}
                </div>
            @endif

            {{ csrf_field() }}

            <div class="form-group">
                <input type="text" class="form-control" id="login" name="login" placeholder="@lang('login.login-placeholder')"
                    value="{{ old('login') }}" required autofocus />
                <small class="form-text text-muted">@lang('login.login-description')</small>
            </div>

            <div class="form-group">
                <input type="password" class="form-control" id="password" name="password" placeholder="@lang('login.password-placeholder')" required />
                <small class="form-text text-muted">@lang('login.password-description')</small>
            </div>

            <button type="submit" class="btn btn-primary">@lang('login.submit')</button>
        </form>
    </div>
@endsection
