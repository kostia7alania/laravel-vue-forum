<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'name'=>'required|max:255|unique:categories|regex:/^[a-z,а-я,\d]{1,999}.*[a-z,а-я,\d]{1,999}$/i' //^[a-z,а-я,\d]{1,999}.*[a-z,а-я,\d]{1,999}$
            //'name'=>'required|max:255|unique:categories'
        ];
    }

    public function messages() {
        return [
            'name.required' => 'Укажите имя категории',
            'name.unique' => 'Категория с таким именем уже существует!',
            'name.regex' => 'Имя категории не проходит валидацию. Необходимо минимум 2 буквы. ',
        ];
    }

}
