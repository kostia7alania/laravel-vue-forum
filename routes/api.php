<?php
use Illuminate\Http\Request;

//header('Access-Control-Allow-Origin: http://10.0.75.1:8080');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*//В МИДЛВАРЫ КАК НИТЬ ВОТКНУТЬ НАДО!;;;
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
*/


//Route::middleware('auth:api')->get('/user', function (Request $request) { return $request->user(); });

Route::apiResource('/question', 'QuestionController');
Route::apiResource('/category', 'CategoryController');
Route::get('/category/{category}/questions', 'CategoryController@getQuestionsByCategorySlug');
Route::apiResource('/question/{question}/reply', 'ReplyController');

Route::post('/like/{reply}', 'LikeController@likeIt');
Route::delete('/like/{reply}', 'LikeController@unlikeIt');

Route::post('/rate/{question}', 'RateController@rateIt');
Route::delete('/rate/{question}', 'RateController@unRateIt');

Route::post('notifications', 'NotificationController@index');
Route::post('markAsRead', 'NotificationController@markAsRead');

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

/*
Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found'], 404);
});
*/
