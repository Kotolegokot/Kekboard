@extends('layouts.master')

@section('content')
    <div class="container">
        <h1 class="text-center">
            {{ config('app.name') }}
        </h1>

        <form method="post" action="/login">
            @if($errors->has('general'))
                <div class="alert alert-danger">
                    {{ $errors->first('general') }}
                </div>
            @endif

            {{ csrf_field() }}

            <div class="form-group">
                <input type="text" class="form-control" id="login" name="login" placeholder="{{ __('Login') }}"
                    value="{{ old('login') }}" required autofocus />
                <small class="form-text text-muted">{{ __('Keep your login in secret') }}</small>
            </div>

            <div class="form-group">
                <input type="password" class="form-control" id="password" name="password" placeholder="{{ __('Password') }}" required />
                <small class="form-text text-muted">{{ __('Don\'t share your password with anyone either') }}</small>
            </div>

            <button type="submit" class="btn btn-primary">{{ __('Login') }}</button>
        </form>
    </div>
@endsection
