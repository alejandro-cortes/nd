<template>
	<tr>
		<td>
	        {{ employee.name }}
	    </td>
	    <td>
	        {{ employee.email }}
	    </td>
	    <td>
	        {{ employee.birthday | formatDate }}
	    </td>
	    <td>
	        <a v-for="(address, index) in employee.address" :key="index"
	        	v-bind:href="'http://maps.google.com/?q='+address.street+', '+address.neighborhood+', '+address.city+', '+address.state" target="_bank">
	        	{{ address.alias }} &nbsp;
	        </a>
	    </td>
	    
	    <td class="is-narrow">
	    	<a class="btn btn-primary btn-xs" @click="editEmployee(employee.id)">Editar</a>
	        <a class="btn btn-danger btn-xs" @click="removeEmployee(employee.id)">Eliminar</a>
	    </td>
    </tr>
</template>

<script>
	
	
  export default {
    data() {
      return {
      };
    },
    props: {  employee: {
        type: Object
    } },
    methods: {
    	removeEmployee(id) {
    		if(confirm("¿Seguro que desea eliminar este empleado?"))
    			this.$store.dispatch('removeEmployee', id)
        },
        editEmployee(id) {
        	this.$store.dispatch('editEmployee', id)
        	this.$emit('clicked', 'Editar')
        	$('#myModal').modal()
        }
    }
  };
</script>