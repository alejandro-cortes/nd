<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
	protected $table = 'addresses';
	
	protected $fillable = ['alias','employee', 'street', 'neighborhood', 'city', 'state', 'zip'];
}
