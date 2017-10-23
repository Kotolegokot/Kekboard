@extends('layouts.main')

@section('title')
    {{ config('app.name') }}
@endsection

@section('content')
    <div class="container">
        <ul id="sections">
            @foreach($sections as $section)
                <li>
                    <a href="#">
                        {{ $section->name }}
                    </a>

                    <span class="badge">
                        {{ $section->shorthand }}
                    </span>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
