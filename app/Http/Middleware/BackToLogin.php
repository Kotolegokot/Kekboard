<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class BackToLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && $request->segment(1) == 'login') {
            return redirect()->route('home');
        }

        if (Auth::guest() && $request->segment(1) != 'login') {
            return redirect()->route('login.create');
        }

        return $next($request);
    }
}
