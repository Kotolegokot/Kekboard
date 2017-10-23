@extends('layouts.main')

@section('title')
    {{ config('app.name') : __('Sections') }}
@endsection

@section('content')
    <div class="container">
        <ul id="threads">
            @foreach($section->threads as $thread)
                <li>
                    <a href="#">{{ $thread->name }}</a>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
