import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        employees: [],
        employee: [{name: '', email: '', birthday: ''}],
        addresses: [{ id:'0', alias:'', 
			          street: '',
			          neighborhood: '',
			          city: '',
			          state: '',
			          zip: ''}],
        
    },
    mutations: {
        GET_EMPLOYEES(state){
        	axios.get("/api/employee")
            .then(response => {
            	state.employees = response.data
            })
            .catch(e => {
            	alert(e)
            })
        },
        ADD_EMPLOYEE(state, emp){
        	axios.post("/api/employee", emp)
         	    .then(response => { 
         	    	state.employees.push(response.data[0])
         	    	$('#myModal').modal('hide');
         	    })
         	    .catch(e => {
         	      console.log(response.data)
         	    })
        },
        UPDATE_EMPLOYEE(state, emp){
        	let index = state.employees.findIndex(item => item.id === emp.id); 
        	axios.post("/api/employee/"+emp.id, emp.data)
         	    .then(response => { 
         	    	state.employees.splice(index, 1)
         	    	state.employees.push(response.data[0])
         	    	$('#myModal').modal('hide');
         	    })
         	    .catch(e => {
         	      alert(e)
         	    })
        },
        REMOVE_EMPLOYEE(state, employee){
        	let index = state.employees.findIndex(item => item.id === employee)
            axios.delete('/employee/'+employee)
                .then(response => {
                	
        	    })
        	    .catch(e => {
        	    	alert(e)
        	    })
        },
        EDIT_EMPLOYEE(state, id){
        	axios.get("/api/employee/"+id)
          	    .then(response => { state.employee = response.data
          	    	state.addresses = []
          	    	state.employee[0].address.forEach(function(element) {
          	    		state.addresses.push(element)
          	    	});	
          	    })
          	    .catch(e => {
          	    	alert(e)
          	    })
        },
        ADD_ADDRESS(state) {
        	state.addresses.push({id: state.addresses.lenght, alias:'', 
		          street: '',
		          neighborhood: '',
		          city: '',
		          state: '',
		          zip: '' })
        },
        REMOVE_ADDRESS(state, id){
        	let index = state.addresses.findIndex(item => item.id === id)
        	state.addresses.splice(index, 1)

        },
        RESET(state) {
        	state.employee = [{name: '', email: '', birthday: ''}]
            state.addresses = [{ id:'0', alias:'', 
    			          street: '',
    			          neighborhood: '',
    			          city: '',
    			          state: '',
    			          zip: ''}]
        }
    },
    actions: {
        getEmployees({commit}){
            commit('GET_EMPLOYEES')
        },
        addEmployee({commit}, emp){
            commit('ADD_EMPLOYEE', emp)
        },
        updateEmployee({commit}, emp){
            commit('UPDATE_EMPLOYEE', emp)
        },
        removeEmployee({commit}, emp){
            commit('REMOVE_EMPLOYEE', emp)
        },
        editEmployee({commit}, id){
            commit('EDIT_EMPLOYEE', id)
        },
        addAddress({commit}) {
        	commit('ADD_ADDRESS')
        },
        removeAddress({commit}, id){
            commit('REMOVE_ADDRESS', id)
        },
        reset({commit}){
            commit('RESET')
        },
    },
    getters: {
        employees: state => state.employees,
        employee: state => state.employee,
        addresses: state => state.addresses,
    }

})