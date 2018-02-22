<template>
	<div class="col-md-12 plr0">
		<h3 class="text-center" v-if="!$store.state.comments.length">暂无评论</h3>
		<div class="commentList col-md-12 plr0" v-else>
            <div v-for="(comment,index) in $store.state.comments" :key="index" class="commentItem col-md-12 plr0">
			  <h4>最近评论</h4>
              <span>{{comment.from.nickName}} :</span>
              <p>
              	{{comment.content}} 
              	<span class="dateTime pull-right">{{comment.meta.createAt | moment}}</span>
              </p>
              	<div v-for="(reply,index) in comment.reply" class="replyContent" :key="index">
              		<p><span>{{reply.from.nickName}}</span> 评论了 {{reply.to.nickName}}的留言 :</p>
              		<p>
              			{{reply.content}}
						<span class="dateTime pull-right">{{reply.meta.createAt | moment}}</span>
              		</p>
              	</div>
				<h4>添加回复</h4>
          		<textarea id='reply' class="form-control replyBox " name="comment" cols="30" rows="2" v-model='comment.empty'></textarea>
          		<a class="btn btn-default pull-right btn-sm openReply mt10" v-on:click="addComment(comment)">回复</a>
            </div>
         </div>
		<div class="form-group add-comment col-md-12 plr0">
			<h4>添加评论</h4>
			<textarea class="form-control" name="comment" id="comment" cols="30" rows="4" v-model='comment'></textarea>
			<button class="btn btn-default btn-sm pull-right mt10" v-on:click="addComment()">评论</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "v-comment",
  data() {
    return {
      comment: "",
      addCommentUrl: "http://localhost:3011/user/comment",
      userId: "",
      playlistId: "",
      reply: "",
      asd: ""
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: function() {
      this.ready();
    }
  },
  methods: {
    addComment: function(reply) {
      let vm = this;
      let localUser = localStorage.getItem("user");
      vm.userId = JSON.parse(localUser);
      if (reply) {
        if (reply.empty == undefined) {
          console.log("write something");
          return false;
        } else {
          let comment = {
            fromId: vm.userId,
            content: vm.comment,
            toId: reply.from._id,
            replyContent: reply.empty,
            commentId: reply._id
          };
          vm.$http
            .post(vm.addCommentUrl, comment)
            .then(vm.$store.commit("getPlaylistComment"));
          vm.comment = "";
          vm.userId = "";
        }
      } else {
        if (vm.comment == "") {
          console.log("write something");
          return false;
        } else {
          let comment = {
            content: vm.comment,
            from: vm.userId,
            playlistId: vm.$route.params.playlistId
          };
          vm.$http
            .post(vm.addCommentUrl, comment)
            .then(vm.$store.commit("getPlaylistComment"));
          vm.comment = "";
          vm.userId = "";
        }
      }
    },
    replyTo: function(comment) {
      console.log(comment);
    },
    ready: function() {
      let vm = this;
      vm.$store.commit("getPlaylistComment");
    }
  },
  mounted: function() {
    this.ready();
  },
  filters: {
    moment: function(date) {
      return moment(date).format("h:mm:ss a --YYYY / MM / DD ");
    }
  }
};
</script>


<style scoped="scoped" lang="Sass">
.mt10 {
  margin-top: 10px;
}
.commentList {
  .commentItem {
    margin-top: 10px;
    background: #fff;
    .replyContent {
      background: #ccc;
    }
  }
  .dateTime {
    font-size: 12px;
  }
  h4 {
    font-weight: 700;
  }
}
.add-comment {
  margin-top: 35px;
  h4 {
    font-weight: 700;
  }
}
</style>