@extends('layouts.main')

@section('title')
    {{ config('app.name') . ' | ' . __('section.title', ['shorthand' => $section->shorthand]) }}
@endsection

@section('content')
    <div class="container">
        <p>
            <button class="btn btn-secondary pointed" data-toggle="collapse" data-target="#create-thread-form">
                @lang('section.create-thread')
            </button>
        </p>

        <p>
            <div class="collapse" id="create-thread-form">
                <div class="card card-body">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" name="name" placeholder="@lang('section.create-thread.name-placeholder')" required />
                            <!-- <small class="form-text text-muted">@lang('section.create-thread.name-description') -->
                        </div>

                        <button class="btn btn-primary">@lang('section.create-thread.submit')</button>
                    </form>
                </div>
            </div>
        </p>

        <p>
            <ul class="list-group" id="threads">
                @foreach($section->threads as $thread)
                    <li class="list-group-item">
                        <a href="#">{{ $thread->name }}</a>
                    </li>
                @endforeach
            </ul>
        </p>
    </div>
@endsection
