<template>
	<div class="myAlert">
		{{$store.state.canPlayMsg}}
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'
	export default {
		name: 'v-alert',
		data() {
			return{
			}
		},
		methods:{
			...mapActions([
		      'getSongId'
		    ]),
		},
		created: function(){
			
		},
	}
</script>


<style scoped="scoped" lang="Sass">
  .myAlert{
  	width: 100px;
  	height: 100px;
  	background: rgba(0,0,0,0.5);
  	border-radius: 6px;
  	box-shadow: 0 0 10px rgba(0,0,0,0.5);
    position: fixed;
    top: 40%;
    left: 49%;
    color: #fff;
    line-height: 100px;
    text-align: center;
    transition: all 0.5s;
  }
</style>