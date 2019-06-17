<?php

namespace App\Http\Controllers;

use App\Model\Like;
use Illuminate\Http\Request;
use App\Model\Reply;
use App\Events\LikeEvent;

class LikeController extends Controller
{
    /**  * Create a new AuthController instance. * @return void */
    public function __construct() {
        $this->middleware( 'JWT' );
    }


    public function likeIt(Reply $reply) {
        $reply->like()->create([
            //'user_id' => '1'//test
            'user_id' => auth()->id()
        ]);

        if (DIRECTORY_SEPARATOR == '/') { // unix, linux, mac
            broadcast(new LikeEvent($reply->id,1))->toOthers();
        }
    }
    public function unLikeIt(Reply $reply) {
        // $reply->like()->where('user_id','1')->first()->delete();//test
        $reply->like()->where('user_id',auth()->id())->first()->delete();

        if (DIRECTORY_SEPARATOR == '/') { // unix, linux, mac
            broadcast(new LikeEvent($reply->id,0))->toOthers();
        }

    }
}
