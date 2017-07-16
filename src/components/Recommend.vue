<template>
	<div id="recommend" class="col-md-12 plr0">
		<div class="col-md-12 plr0">
			<p class="title">热门精选</p>
		</div>
		<div class="col-md-12 plr0 mt15">
			<div v-for="recommend in recommends" class="col-md-4 playlistCover" v-if="isDj">
				<router-link :to="{ name: 'Playlist',params: { playlistId: recommend.id }}" class="toPlaylist center-block"> 
					<img v-bind:src="recommend.cover" class="img-responsive center-block playlistImg">
					<p class="toPlaylistText center-block">{{recommend.title}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'recommend',
  data () {
    return {
      msg: 'this is recommend',
      apiUrl:'http://localhost:3011/recommendList',
      recommends: {},
      isDj:true,
      nickName:'',
    }
  },
  
  created: function(){
  	var vm = this;
	vm.$http.get(this.apiUrl)
	.then((response) => {
		for (var i = response.data.data.length - 1; i >= 0; i--) {
			var thisHref = response.data.data[i].href;
			if(thisHref.charAt(21) == 'd'){
				response.data.data.splice(i,1); //删除下标为i的元素
			}
		}
		vm.recommends = response.data.data;//get recommends list
		return;
	})
	.catch(function(response) {
		console.log(response)
	})
  },
}	
</script>

<style scoped="scoped" lang="Sass">
	.tpPlaylist{
		width: 140px;
		display: block;
	}
	.playlistImg{
		display: block;
		border-radius: 3px;
		transition: 0.3s all;
	}
	.playlistImg:hover {
		transition: 0.3s all;
		box-shadow: 0 5px 10px rgba(0,0,0,.3);
	}
	.toPlaylistText{
		width: 140px;
		text-align: left;
		text-indent: 2px;
		height: 40px;
		color: #34495e !important;
	    word-wrap: break-word;
	    margin-top: 10px;
	    overflow : hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
</style>