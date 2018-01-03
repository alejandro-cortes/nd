<template>
<div>
	<div class="row">
		<div class="form-group col-md-12">
			<label>Alias</label>
			<input type="text" required class="form-control" :name="'addresses['+index+'][alias]'" v-model="address.alias">
		</div>
	</div>
	<div class="row">
		<div class="form-group col-md-6">
			<label>Calle y n&uacute;mero</label> 
			<input type="text" required class="form-control" :name="'addresses['+index+'][street]'" v-model="address.street">
		</div>
		<div class="form-group col-md-6">
			<label>Colonia</label> 
			<input type="text" required class="form-control" :name="'addresses['+index+'][neighborhood]'" v-model="address.neighborhood">
		</div>
	</div>
	<div class="row">
		<div class="form-group col-md-4">
			<label>Ciudad</label> 
			<input type="text" required class="form-control" :name="'addresses['+index+'][city]'" v-model="address.city">

		</div>
		<div class="form-group col-md-4">
			<label>Estado</label> 
			<input type="text" class="form-control" :name="'addresses['+index+'][state]'" v-model="address.state">
		</div>
		
		<div class="form-group col-md-4">
			<label>C&oacute;digo postal</label> 
			<input type="text" class="form-control" :name="'addresses['+index+'][zip]'" minlength="3" v-model="address.zip">
		</div>
	</div>
	 
</div>
</template>

<script>
	
  export default {
    data() {
      return {
      };
    },
    props: {  index: {
        type: Number
    },
    address: {type: Object}},
  };
</script>