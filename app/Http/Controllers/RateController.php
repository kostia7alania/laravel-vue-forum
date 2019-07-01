<?php

namespace App\Http\Controllers;

use App\Model\Rate;
use App\Model\Question;
use Illuminate\Http\Request;

class RateController extends Controller
{
   /**  * Create a new AuthController instance. * @return void */
    public function __construct() {
        $this->middleware( 'JWT' );
    }


    public function rateIt(Question $question) {
        $question->rate()->create([
            //'user_id' => '1'//test
            'user_id' => auth()->id()
        ]);

    }
    public function unRateIt(Question $question) {
        // $reply->like()->where('user_id','1')->first()->delete();//test
        $question->rate()->where('user_id',auth()->id())->first()->delete();
    }

}



