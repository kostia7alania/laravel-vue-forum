<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\Console\Question\Question;

class CategoryQuestionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //dd($this);die;
        return [
            'slug' => $this->slug,
            'id'   => $this->id,
            'path' => $this->path,
            'body' => $this->body,
            'user'=>$this->user->name,
            'reply_count'=>$this->replies->count(),
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'category_id'=>$this->category_id,
            'title'=>$this->title
            //'questions' => QuestionResource::collection($this->questions),
        ];
    }
}
