<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;

use Illuminate\Support\Facades\DB;

// use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\PayloadFactory;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('JWT', ['except' => ['login','signup']]);
    }

    /**  Get a JWT via given credentials. @return \Illuminate\Http\JsonResponse  */
    public function login(Request $request) {
    /*
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    */
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if ( !$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) { // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

    //    $payload = JWTAuth::getPayload($token);


        // grab some user
 //   $user = User::first();
//    $token = JWTAuth::fromUser($user);

    /*
    $customClaims = ['sex' => 'bar', 'fuuckk' => 'bob'];
    $payload = PayloadFactory::make($customClaims);
    $token = JWTAuth::encode($payload);
    print_r($token);
    die;
    */
   //  return response()->json(); // all good so return the token
     return $this->respondWithToken($token);
    }


    public function signup(SignupRequest $request) {
        User::create($request->all());
        return $this->login($request);
    }

    /**  Get the authenticated User.  * @return \Illuminate\Http\JsonResponse  */
    public function me() {
        //return response()->json(auth()->user());
        $user = JWTAuth::user();
        if (count((array)$user) > 0) {
            return response()->json(['status' => 'success', 'user' => $user, 'id' => $user->id]);
        } else {
            return response()->json(['status' => 'fail'], 401);
        }
    }

    /**  Log the user out (Invalidate the token).  @return \Illuminate\Http\JsonResponse */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**  Refresh a token. @return \Illuminate\Http\JsonResponse  */
    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }

    /** Get the token array structure.  @param  string $token  * @return \Illuminate\Http\JsonResponse  */
    protected function respondWithToken($token) {
        //$payload = JWTFactory::sub(123)->aud('foo')->foo(['bar' => 'baz'])->make();
        /*

        $customClaims = ['foo' => 'bar', 'baz' => 'bob'];
        $payload = PayloadFactory::make($customClaims);
        print_r($payload);die;
        */
        return response()->json([
            //'token2'=>$token2,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->name,
            //'roles' =>auth()->user()->roles()->select('name')->get()
            'role' =>auth()->user()->role
        ]);
    }
}
