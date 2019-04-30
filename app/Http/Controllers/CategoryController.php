<?php
namespace App\Http\Controllers;

use App\Model\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTopicsResource;
use App\Http\Resources\CategoryQuestionsResource;
use App\Http\Requests\CategoryRequest;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;

class CategoryController extends Controller {

    public function __construct() { // Create a new AuthController instance. @return void
        $this->middleware('JWT', ['except' => ['index','show','getQuestionsByCategorySlug']]);
    }

    public function index() {   // Display a listing of the resource.  @return \Illuminate\Http\Response
        //return CategoryResource(category::paginate(1));
        return CategoryResource::collection( category::latest()->get() );
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
       // Category::create($request->all());
        $category = new Category;
        $category->name=$request->name;
        $category->slug = str_slug($request->name);
        $category->save();
        return response(new CategoryResource($category), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category) {
    //return \App\Model\Category::all();

        /*  return Category::latest()->get();
        $users =$category->questions();
        dd($users);
        dd (DB::table('questions')
            ->leftJoin('categories', 'categories.id', '=', 'questions.category_id')
            ->select('questions.title','categories.name')
            ->get());
            die;*/
    //    dd(DB::table('questions')->first());
        return new CategoryTopicsResource($category);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category) {
    //return $request->all();
        $category -> update (
            [
                'name' => $request->name,
                'slug' => str_slug($request->name)
            ]
        );
    return response(new CategoryResource($category), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     * @param  \App\Model\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category) {
        $category->delete();
        return response(null. Response::HTTP_NO_CONTENT);
    }

    public function getQuestionsByCategorySlug(Category $category) {

        return  CategoryQuestionsResource::collection($category->questions);

        //return CategoryTopicsResource::collection( category::latest()->get()->where('id','=','1') );
    }


}
