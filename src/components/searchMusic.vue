<template>
	<div class="searchBar">
		<input type="text" v-model='keyWords' class="searchInput" placeholder="搜索歌曲" @keyup='searchMusic()' @blur='endSearch()' @focus='searchMusic()'>
		<transition name="fade">
			<div class="resultBox" v-if='searching'>
				<div v-for="result in results" class="resultItem" v-on:click="getSongId(result.id)">
					{{result.name}}
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions, mapGetters} from 'vuex'
	export default {
		name: 'v-search',
		data() {
			return{
				results:'',
				keyWords:'',
				searching:false,
				type:'1',// 搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) *(type)*
				limit:'10',
				offset: '0',
			}
		},
		methods:{
			...mapActions([
		      'getSongId',
		    ]),
		    searchMusic: function(){
		    	let vm = this
		    	if(vm.keyWords != ''){
		    		vm.searching = true
					var data = 'keyWords=' + vm.keyWords + '&limit=' + vm.limit + '&type=' + vm.type + '&offset=' + vm.offset
					vm.$http.get('http://localhost:3011/music/searchResult?'+data)
						.then((response) => {
							vm.results = response.data.data.result.songs
						})
						.catch(()=>{
							console.log(response)
						})
					}else{
						vm.searching = false
						console.log('search thing')
					}
	    		
		    },
		    endSearch: function(){
		    	let vm = this
		    	vm.searching = false
		    }
		},
		created: function(){
			
		},
	}
</script>

<style>
	
	.searchBar{
		position: relative;
	}
	.searchInput{
	    height: 29px;
	    line-height: 29px!important;
	    font-size: 12px;
	    border-radius: 15px;
	    padding: 0 35px 0 17px;
	    border: 1px solid rgba(255,255,255,.5);
	    box-sizing: border-box;
	    -moz-transition: all .2s ease-in-out;
	    -webkit-transition: all .2s ease-in-out;
	    -ms-transition: all .2s ease-in-out;
	    -o-transition: all .2s ease-in-out;
	    transition: all .2s ease-in-out;
	    outline: none;
	    background: url('../assets/images/search.svg') no-repeat #fff;
	    background-size: contain;
	    border-color: #fff;
	    padding-left: 30px;
	}
	.resultBox{
		position: absolute;
	    left: 0;
	    top: 46px;
	    width: 100%;
	    background-color: #fff;
	    border-radius: 2px;
	    padding: 2px;
	    box-shadow: 0 2px 8px 1px rgba(0,0,0,.2);
	    z-index: 10;
	}
	.resultItem{
		padding: 5px;
		border-bottom: 1px solid rgba(204,204,204,0.5);
		cursor: pointer;
		text-align: left;
	}
</style>