<template>
    <div class="container">
        <table v-if="items.length > 0" class="table is-bordered">
	        <thead>
	        	<tr>
	        		<th>Nombre</th>
	        		<th>Mail</th>
	        		<th>Fecha de nacimiento</th>
	        		<th>Direcciones</th>
	        		<th>Opciones</th>
	        	</tr>
	        </thead>
        	<EmployeeItem v-for="(employees, index) in items" :employee="employees" :key="index" @clicked="onClickChild"></EmployeeItem>
        </table>
        
        <div class="row justify-content-md-center">
			<button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#myModal" v-on:click="resetForm">Agregar empleado</button>
		</div>
		
		
		<!-- Modal -->
		<div id="myModal" class="modal fade" role="dialog" >
			<div class="modal-dialog modal-lg" >
				<div class="modal-content">
					<div class="modal-header">
						<h4>{{ action }} Empleado</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<div class="container">
						
							<form  method="post" id="empForm" class="mb-2" v-on:submit="addEmployee">
						    	<label for="name">Nombre:</label>
						    	<input required class="form-control" type="text" placeholder="Nombre" name="name" minlength="5" v-model="employee[0].name">
						    	<br>
						    	<label for="mail">Mail:</label>
						    	<input required class="form-control" type="email" placeholder="Email" name="email" v-model="employee[0].email" >
						    	
						    	<br>
						    	<label for="birthday">Fecha de nacimiento:</label>
						    	<date-picker v-model="employee[0].birthday" :first-day-of-week="1" lang="es" format="dd/MM/yyyy"></date-picker>
						    	<input type="hidden" :value="employee[0].birthday | formatDateSave" name="birthday">
						    	<br><br>
						    	<!--addresses--> 
						    	
								<div  class="row">
									<div v-for="(address, index) in addresses" class="card mb-2 col-md-12">
										<div class="card-header">
											<span>Direcci&oacute;n {{index + 1}}</span> 
											<span class="float-right" v-if="index > 0" @click="removeAddress(index)">X</span>
										</div>
										<div >
											<AddressItem :index="index" :address="address"></AddressItem>
											
										</div>
									</div>
									<a @click="addAddress" class="text-primary"><b>+ Agregar dirección</b></a>
								</div>
								<button class="btn btn-primary">Guardar</button> 
						    </form>
							
						</div>
					</div>
				</div>
				<!-- Modal content-->
			</div>
		</div>
    </div>
    
    
</template>

<script>
    import EmployeeItem from './EmployeeItem'
    import AddressItem from './AddressItem'
    import DatePicker from 'vue2-datepicker'
    import VeeValidate from 'vee-validate';
    
    Vue.use(VeeValidate);
    
    export default {
        data () {
            return {
            	action: 'Agregar',
            }
        },
        components : {
        	'DatePicker': DatePicker,
            'AddressItem': AddressItem,
            'EmployeeItem': EmployeeItem 
        },
        created() {
        	this.$store.dispatch('getEmployees')
        },
        computed: {
            items(){
                return this.$store.getters.employees
            },
            addresses() {
            	return this.$store.getters.addresses
            },
            employee() {
            	return this.$store.getters.employee
            }
        },
        methods: {
        	addEmployee: function(event) { event.preventDefault()
        		let data = new FormData(document.getElementById('empForm'));
        		if(this.action == 'Agregar') {
        			this.$store.dispatch('addEmployee', data)
        		} if(this.action == 'Editar') {
        			this.$store.dispatch('updateEmployee', {id: this.$store.getters.employee[0].id, data: data})
        		}	
            },
            addAddress() {
            	this.$store.dispatch('addAddress')
            },
            removeAddress(id) {
        		this.$store.dispatch('removeAddress', id)
            },
            onClickChild (value) {
                this.action = value
              },
             resetForm() {
            	  this.$store.dispatch('reset')
              }
        }
    }
</script>