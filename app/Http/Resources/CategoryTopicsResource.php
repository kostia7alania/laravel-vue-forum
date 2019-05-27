<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\Console\Question\Question;

class CategoryTopicsResource extends JsonResource
{
    /** * Transform the resource into an array. * * @param  \Illuminate\Http\Request  $request * @return array */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'id'   => $this->id,
            'path' => $this->path,
            'questions' => QuestionResource::collection($this->questions),
        ];
    }
}
