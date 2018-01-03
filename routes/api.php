<?php


Route::group(['prefix' => 'api'], function() {
	Route::resource('/employee', 'EmployeeController');
	Route::post('/employee/{id}', 'EmployeeController@update');
});