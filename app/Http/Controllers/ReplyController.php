<?php

namespace App\Http\Controllers;

use App\Model\Reply;
use Illuminate\Http\Request;
use App\Model\Question;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\ReplyResource;
use Symfony\Component\HttpKernel\EventListener\ResponseListener;
use App\Notifications\NewReplyNotification;
use App\Events\DeleteReplyEvent;
use App\Http\Requests\ReplyRequest;
use PHPUnit\Framework\Constraint\Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReplyController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('JWT', ['except' => ['index','show']]);
    }

    /** * Display a listing of the resource. * @return \Illuminate\Http\Response */
    public function index(Question $question)
    {
        return  ReplyResource::collection($question->replies); // return Reply::latest()->get();
    }

    /* Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response*/
    public function store(Question $question, ReplyRequest $request)
    {

    try {
        /* ==> EXAMPLE::
          $admin = User::find($request->email);
          $office = Office::create($request->all() + ['admin_id' => $admin->id]);
          (new UserService())->assignAdminToOffice($office);
        */

      //  $question = auth()->user()->question()->replies()->create($request->all());
            $reply = $question->replies()->create([//create($request->all());
                'user_id' => auth()->id(),
                'body' => $request->body,//test
            ]);
            $user = $question->user;
            if($reply->user_id!==$question->user_id) {
            //  $user->notify(new NewReplyNotification($reply));
            }
            return response(['Reply' => new ReplyResource($reply)], Response::HTTP_CREATED);

        } catch (ModelNotFoundException $ex) { // User not found
            abort(422, 'Invalid model - not found');
        } catch (Exception $ex) { // Anything that went wrong
            abort(500, 'Could not assign');
        }
    }

    /*  Display the specified resource.
     * @param  \App\Model\Reply  $reply
     * @return \Illuminate\Http\Response */
    public function show(Question $question, Reply $reply) {
        return new ReplyResource($reply);
    }

    /*  Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Reply  $reply
     * @return \Illuminate\Http\Response*/
    public function update(Question $question, Request $request, Reply $reply)
    {
        $reply->update($request->all());
        return response('Update', Response::HTTP_ACCEPTED);
    }

    /*** Remove the specified resource from storage.
     * @param  \App\Model\Reply  $reply
     * @return \Illuminate\Http\Response*/
    public function destroy(Question $question, Reply $reply)
    {
        $reply->delete();

        if (DIRECTORY_SEPARATOR == '/') { // unix, linux, mac
            broadcast(new DeleteReplyEvent($reply->id))->toOthers();
        }

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
