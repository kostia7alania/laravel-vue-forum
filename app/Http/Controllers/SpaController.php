<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;

class SpaController extends Controller
{
    public function index()
    {
        return view('index');
    }
}
