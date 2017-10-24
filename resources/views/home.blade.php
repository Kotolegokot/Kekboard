@extends('layouts.main')

@section('title')
    {{ config('app.name') }}
@endsection

@section('content')
    <div class="app container">
        <div class="list-group" id="sections">
            @foreach($sections as $section)
                <a class="list-group-item list-group-item-action" href="{{ route('section', ['shorthand' => $section->shorthand]) }}">
                    {{ $section->name }} <span class="badge badge-info">{{ $section->shorthand }}</span>
                </a>
            @endforeach
        </div>
    </div>
@endsection
