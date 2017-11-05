<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class LoginController extends Controller
{
    public function create()
    {
        return view('login');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'login' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt(['login' => $request->login, 'password' => $request->password])) {
            return redirect()->intended(route('home'));
        }

        return back()->withInput()->withErrors(['general' => __('auth.failed')]);
    }

    public function destroy()
    {
        Auth::logout();

        return view('login');
    }
}
