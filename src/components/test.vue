<template>
	<div class="form-group">
		<select name="" id="" class="form-control" v-select> 
			<option value="1">1</option>
			<option value="1">1</option>
			<option value="1">1</option>
			<option value="1">1</option>
			<option value="1">1</option>
		</select>
	</div>
</template>
<script>
	// import mySelect from 'vue-select'
	export default {
		name:'test',
		data(){
			return{

			}
		},
		mounted: function(){
			console.log(1)
		},
		methods:{
		},
		components:{
		}

	}
	function initSelect(){
		alert(1)
	}
</script>
<style>
	
</style>