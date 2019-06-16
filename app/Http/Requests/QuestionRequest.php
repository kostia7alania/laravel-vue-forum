<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required|max:3000',
            'category_id'=>'required|exists:categories,id', //TEST --- is exist CATEGORY ID!!!!!!!!!!!!!!!!
            'slug'=>'required|unique:questions,slug'
        ];
    }

    protected function prepareForValidation() {
        //if ($this->has('slug'))
            $this->merge(['slug'=>str_slug($this->title)]);
    }
}
