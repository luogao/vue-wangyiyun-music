<template>
	<div v-cloak id="login">
		<h1>{{msg}}</h1>
		<div class="col-md-12">
			<div class="col-md-6 col-md-offset-3">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="user name" v-model="name" >
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Password" v-model="password" >
				</div>
				<button class="btn btn-primary" v-on:click="loginPlz()">login</button>
				<div>
					<span>{{loginMsg}}</span>
					<router-link :to="{ name: 'Signup'}" v-if='plzSignin'>Signup</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      msg: 'welcome',
      login:'http://localhost:3011/user/login',
      name:'',
      password:'',
      loginMsg:'',
      plzSignin:false,
      _user:null,
    }
  },
  created: function(){

  },
  methods:{
  	loginPlz : function(){
  		var vm = this
  		let user = {
				name : vm.name,
				password : vm.password
			}
		vm.$http.post(vm.login,user)
		.then((response) => {
			if(response.data.data == 'user not exist !'){
				vm.loginMsg = response.data.data + 'please signup first'
				vm.plzSignin = true
			}else if(response.data.data == 'wrong password'){
				vm.loginMsg = response.data.data + " try again"
				return false
			}else{
				vm.loginMsg = response.data.data
				localStorage.setItem("user", JSON.stringify(response.data._user._id));

				setTimeout(function(){
					vm.$router.push({path: '/'})
				},1000)

			    vm.$store.commit('confirmLogin');
			}
		})
		.catch(function(response) {
			console.log(response)
		})
  	}
  },
  computed: {
  },
}	
</script>

<style>
	[v-cloak] {
	  display: none;
	}
</style>
