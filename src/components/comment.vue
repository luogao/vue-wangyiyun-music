<template>
	<div class="col-md-12 plr0">
		<div class="commentList col-md-12 plr0">
            <div v-for="(comment,index) in $store.state.comments" class="commentItem col-md-12 plr0">
              <span>{{comment.from.nickName}} :</span>
              <p>
              	{{comment.content}} 
              	<span class="dateTime pull-right">{{comment.meta.createAt | moment}}</span>
              </p>
              	<div v-for="reply in comment.reply" class="replyContent">
              		<p><span>{{reply.from.nickName}}</span> 评论了 {{reply.to.nickName}}的留言 :</p>
              		<p>
              			{{reply.content}}
						<span class="dateTime pull-right">{{reply.meta.createAt | moment}}</span>
              		</p>
              	</div>
          		<textarea id='reply' class="form-control replyBox " name="comment" cols="30" rows="2" v-model='comment.empty'></textarea>
          		<a class="btn btn-default pull-right openReply" v-on:click="addComment(comment)">reply</a>
            </div>
         </div>
		<div class="form-group ">
			<textarea class="form-control" name="comment" id="comment" cols="30" rows="10" v-model='comment'></textarea>
			<button class="btn btn-default pull-right" v-on:click="addComment()">评论</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapGetters} from 'vuex'
	import moment from 'moment'

	export default {
		name: 'v-comment',
		data() {
			return{
				comment:'',
				addCommentUrl: 'http://localhost:3011/user/comment',
				userId:'',
				playlistId:'',
				reply:'',
				asd:'',
			}
		},
		methods:{
			addComment: function(reply){
				let vm = this
					let localUser = localStorage.getItem("user")
					vm.userId = JSON.parse(localUser)
					if(reply){
						if (reply.empty == undefined) {
							console.log('write something')
							return false
						}else{
							let comment = {
								fromId: vm.userId,
								content: vm.comment,
								toId: reply.from._id,
								replyContent: reply.empty,
								commentId: reply._id
							}
							vm.$http.post(vm.addCommentUrl,comment)
								.then(
									vm.$store.commit('getPlaylistComment')
								)
								vm.comment='';
								vm.userId='';
						}
					}else{
						if(vm.comment == ''){
							console.log('write something')
							return false
						}else{
							let comment = {
								content: vm.comment,
								from: vm.userId,
								playlistId: vm.$route.params.playlistId
							}
							vm.$http.post(vm.addCommentUrl,comment)
								.then(
									vm.$store.commit('getPlaylistComment')
								)
								vm.comment='';
								vm.userId='';
						}
					}
			},
			replyTo: function(comment){
				console.log(comment)

			},
			ready: function(){
				let vm = this
				vm.$store.commit('getPlaylistComment')
			}
		},
		created: function(){
			this.ready()
		},
		filters: {
			  moment: function (date) {
			    return moment(date).format('h:mm:ss a --YYYY /\ MM /\ DD ');
			  }
		}
	}
	
</script>


<style scoped="scoped" lang="Sass">
  .commentList{
    .commentItem{
		margin-top: 10px;
    	background: #fff;
    	.replyContent{
    		background: #ccc;
    	}
    }
    .dateTime{
    	font-size: 12px;
    }
  }	
</style>