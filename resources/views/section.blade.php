@extends('layouts.main')

@section('title')
    {{ config('app.name') . ' | ' . __('section.title', ['shorthand' => $section->shorthand]) }}
@endsection

@section('content')
    <div class="container">
        <p>
            <button class="btn btn-secondary pointed" data-toggle="modal" data-target="#create-thread-form">
                @lang('section.create-thread')
            </button>
        </p>

        <p>
            <div class="modal fade" id="create-thread-form" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">@lang('section.create-thread.dialog-title')</h5>
                        </div>
                        <div class="modal-body">
                            <form id="create-thread">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="name" name="name" placeholder="@lang('section.create-thread.name-placeholder')" required />
                                    <!-- <small class="form-text text-muted">@lang('section.create-thread.name-description') -->
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary">@lang('section.create-thread.close')</button>
                            <button class="btn btn-primary">@lang('section.create-thread.submit')</button>
                        </div>
                    </div>
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
