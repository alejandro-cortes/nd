<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;
use App\Address;
use DB;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    	return response()->json(Employee::with('address')->get(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    	$req = $request->all();
    	
    	$validator = Validator::make($req, [
    			'name' => 'required|min:5',
    			'email' => 'required|email',
    			'birthday' => 'required|date',
    	]);
    	
    	if ($validator->fails()) {
    		return response()->json($validator->errors()->all(), 400);
    	}
    	
    	
    	DB::beginTransaction();
    	try {
    		$emp = Employee::create($req);
    		if(count($req["addresses"]) > 0) {
    			foreach ($req["addresses"] as $value) {
    				$value["employee"] = $emp->id;
    				Address::create($value);
    			}
    		}
    		DB::commit();
    		return response()->json(Employee::with('address')->where('id', $emp->id)->get(), 200);
    	} catch (Exception $e){
    		DB::rollback();
    		return response()->json($e, 400);
    	}
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    	return response()->json(Employee::with('address')->where('id', $id)->get(), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    	return response()->json(Employee::with('address')->where('id', $id)->get(), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    	$req = $request->all();
    	
    	$validator = Validator::make($req, [
    			'name' => 'required|min:5',
    			'email' => 'required|email',
    			'birthday' => 'required|date',
    	]);
    	
    	if ($validator->fails()) {
    		return response()->json($validator->errors()->all(), 400);
    	}
    	
    	
    	DB::beginTransaction();
    	try {
    		$emp = Employee::find($id);
    		$emp->name = $req['name'];
    		$emp->email = $req['email'];
    		$emp->birthday = $req['birthday'];
    		$emp->save();
    		
    		Address::where('employee', $id)->delete();
    		if(count($req["addresses"]) > 0) {
    			foreach ($req["addresses"] as $value) {
    				$value["employee"] = $emp->id;
    				Address::create($value);
    			}
    		}
    		
    		DB::commit();
    		return response()->json(Employee::with('address')->where('id', $emp->id)->get(), 200);
    	} catch (Exception $e){
    		DB::rollback();
    		return response()->json($e, 400);
    	}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    	$result = Employee::destroy($id);
    	return response()->json([], $result==1?200:400);
    }
}
