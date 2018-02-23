<template>
	<div id="signup">
		<h1>{{msg}}</h1>
		<div class="col-md-12">
			<div class="col-md-6 col-md-offset-3">
				<div class="form-group">
					<input type="text" class="form-control" required="required" placeholder="user name" v-model="name" name="user[name]">
				</div>
				<div class="form-group">
					<input type="text" class="form-control" required="required" placeholder="nick name" v-model="nickName" name="user[nickName]">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" required="required" placeholder="Password" v-model="password" name="user[password]">
				</div>
				<button class="btn btn-primary" v-on:click="signupPlz()">signup</button>
				<p v-show="repeatName">用户已存在 请登录 或重新输入</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      msg: '登录',
      signup:'http://localhost:3011/user/signup',
      name:'',
      password:'',
      repeatName:false,
      nickName:'',
    }
  },
  methods:{
  	signupPlz : function(){
  		var vm = this
  		if(vm.name == '' || vm.password =='' || vm.nickName == ''){
  			return false;
  		}
  		let user = {
				name: vm.name,
				nickName: vm.nickName,
				password: vm.password,
			}
		vm.$http.post(vm.signup,user)
		.then((response) => {
			if(response.data == 'repeat'){
				vm.repeatName = true
			}else if (response.data == 'success'){
				vm.repeatName = false
				vm.$router.push({path: '/recommend'})
			}
		})
		.catch(function(response) {
			console.log(response)
		})
  	}
  }
}	
</script>