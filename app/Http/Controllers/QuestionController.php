<?php

namespace App\Http\Controllers;

use App\Model\Question;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\QuestionResource;
use App\Http\Requests\QuestionRequest;
use App\Http\Resources\QuestionTopicsResource;
class QuestionController extends Controller
{
    /** Create a new AuthController instance.  @return void  */
    public function __construct()
    {
        $this->middleware('JWT', ['except' => [ 'index', 'show' ]]);
    }

    /*** Display a listing of the resource.
     * @return \Illuminate\Http\Response */
    public function index(Request $request) {
        $perPage = $request->get( 'per-page', 10 ); //10
        return QuestionTopicsResource::collection( Question::latest()->paginate ( $perPage ) );
    }


    /** Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response  */
    public function store(QuestionRequest $request)
    {
        //$request['slug'] = str_slug($request->title);
        //Question::create($request->all());
        //return response('Created', Response::HTTP_CREATED);
       $question = auth()->user()->question()->create($request->all());
        return response(new QuestionResource($question), Response::HTTP_CREATED);
    }

    /**  Display the specified resource.
     * @param  \App\Model\Question  $question
     * @return \Illuminate\Http\Response */
    public function show(Question $question) {
        return new QuestionResource($question);
    }


    /** Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Question  $question
     * @return \Illuminate\Http\Response */
    public function update(Request $request, Question $question) {
        $question->update($request->all());
        return response('Update', Response::HTTP_ACCEPTED);
    }

    /**  Remove the specified resource from storage.
     * @param  \App\Model\Question  $question
     * @return \Illuminate\Http\Response */
    public function destroy(Question $question) {
        $question->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }





}
