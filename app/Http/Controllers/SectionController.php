<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Section;
use App;

class SectionController extends Controller
{
    public function index()
    {
        $sections = Section::all();

        return view('home', compact('sections'));
    }

    public function show(string $shorthand)
    {
        $section = Section::findByShorthand($shorthand);

        if (!$section) {
            App::abort(404);
        }

        return view('section', compact('section'));
    }
}
