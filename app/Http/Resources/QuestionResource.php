<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //var_dump($this);die;
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            //'replies' => ReplyResource::collection($this->replies),
            'reply_count' => $this->replies->count(),
            'path' => $this->path,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => $this->user->name,
            'id' => $this->user_id,
            'category_id' => $this->category_id,

            'category'=>[
                'name'=>$this->category->name,
                'slug'=>$this->category->slug
            ],
          //  'category_slug' =>  new CategoryResource($this->category_id)
        ];
        //parent::toArray($request);
    }
}
