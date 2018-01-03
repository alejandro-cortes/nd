<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
	protected $table = 'employees';
	
	protected $fillable = ['name', 'email', 'birthday'];
	
	public function address() {
		return $this->hasMany('App\Address', 'employee', 'id');
	}
}
