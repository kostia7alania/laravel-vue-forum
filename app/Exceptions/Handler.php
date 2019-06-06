<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    /** * A list of the exception types that are not reported.  * @var array */
    protected $dontReport = [  ];
    /** A list of the inputs that are never flashed for validation exceptions. @var array */
    protected $dontFlash = [ 'password', 'password_confirmation', ];

    /**  Report or log an exception.  * @param  \Exception  $exception * @return void  */
    public function report(Exception $exception)  {  parent::report($exception);  }

    /** * Render an exception into an HTTP response.
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if($exception instanceof TokenBlacklistedException) {
            return response(['error' => 'Token can not be used, get new one'], Response::HTTP_BAD_REQUEST);
        } else if ($exception instanceof TokenInvalidException) {
            return response(['error' => 'Token is invalid'], Response::HTTP_BAD_REQUEST);
        }else if ($exception instanceof TokenExpiredException) {
            return response(['error' => 'Token is expired'], Response::HTTP_BAD_REQUEST);
        } else if ($exception instanceof JWTException) {
            return response(['error' => 'Token is not provided'], Response::HTTP_BAD_REQUEST);
        }/*else if ($exception instanceof ModelNotFoundException) {
            $exception = new NotFoundHttpException($exception->getMessage(), $exception);
        } */
        else if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'error' => 'Entry for '.str_replace('App\\', '', $exception->getModel()).' not found'], Response::HTTP_NOT_FOUND);
        } else if ($exception instanceof \Illuminate\Session\TokenMismatchException) {
            return response(['error' => 'Sorry, your session seems to have expired. Please try again.'], Response::HTTP_BAD_REQUEST);
        } else if ($exception instanceof CustomException) {
            return response(['error' => 'Sorry, your session seems to have expired. Please try again.'], Response::HTTP_BAD_REQUEST);
        }

        return parent::render($request, $exception);
    }
}
