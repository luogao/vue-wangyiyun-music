<template>
	<div id="userlist">
		<h1>{{msg}}</h1>
		<div class="col-md-12">
			<div class="table-responsive">
				<table class="table table-bordered table-hover table-condensed">
					<thead>
						<tr class="active">
							<td>UserName</td>
							<td>NickNmae</td>
							<td>date</td>
							<td>role</td>
							<td>delete</td>
						</tr>
					</thead>
					<tbody v-for="user in users" class="table-striped">
						<tr class="info" v-bind:id='user._id'>
							<td>{{user.name}}</td>
							<td>{{user.nickName}}</td>
							<td>{{user.meta.updateAt | moment}}</td>
							<td>{{user.role}}</td>
							<td><button type="button" class="btn btn-danger" @click="deleteUser(user)">delete</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'userlist',
  data () {
    return {
      msg: 'this is userlist',
      apiUrl:'http://localhost:3011/user/userlist',
      users:[],
    }
  },
  created: function(){
  	var vm = this;
	vm.$http.get(this.apiUrl)
	.then((response) => {
		vm.users = response.data.data;//get recommends list
	})
	.catch(function(response) {
		console.log(response)
	})
  },
  methods:{
  	deleteUser : function(customer){
  		var vm = this
  		vm.$http.delete(this.apiUrl,{params: {_id : customer._id}})
		.then((response) => {
			if(response.data == 'success'){
				$('#'+customer._id).remove()
			}else{
				alert('something wrong !!!')
			}
		})
  	}
  },
  filters: {
	  moment: function (date) {
	    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
	  }
  }
}	
</script>