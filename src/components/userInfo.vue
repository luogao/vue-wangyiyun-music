<template>
	<div id="userlist">
		<div class="col-md-12 content">
			<div class="userInfo col-md-12">
				<div class="col-md-2">
					<img v-bind:src="AvatarUrl" class="img-responsive"/>
				</div>
				<div class="col-md-10">
					<div class="col-md-12">
						<h3 class="col-md-12 nameBox">
							{{user.nickName}}
							<img src="../assets/images/updateInfo.svg" class="updateBtn pull-right" v-on:click="updateUser()"/>
						</h3>
					</div>
					
				</div>
				<div class="favMusic col-md-12">
					<div class="col-md-12">
						<p class="title">您最喜欢的音乐</p>
					</div>
					<div class="col-md-12">
						<div class="col-md-12 " v-for="(fav,index) in user.favMusic" :key="index">
							<span class="glyphicon glyphicon-play-circle playSongBtn" v-on:click="getSongId(fav.musicId)" aria-hidden="true"></span>
				            <span>《{{fav.musicName}}》</span>
							<span class="glyphicon likeBtn glyphicon-heart " v-if="isLiked"></span>
							<span class="glyphicon likeBtn glyphicon-heart-empty" v-if="!isLiked"></span>
						</div>
					</div>
				</div>
				<div class="favlist col-md-12">
					<div class="col-md-12">
						<p class="title">您最喜欢的歌单</p>
					</div>
					<div class="col-md-12">
						<div class="col-md-4 playlistCover" v-for="(favList,index) in user.favPlayList" :key="index">
							<router-link :to="{ name: 'Playlist',params: { playlistId: favList.playlistId }}" class="toPlaylist center-block"> 
								<img v-bind:src="favList.playlistCover" class="img-responsive center-block playlistImg">
								<p class="toPlaylistText center-block">{{favList.playlistName}}</p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 controlBtn">
			<a v-if="$store.state.isLogin" v-on:click="loginOut()">	<img src="../assets/images/logoutIcon.svg" alt=""></a>
    		<router-link :to="{ name: 'Userlist'}" v-if="$store.state.isAdmin"><img src="../assets/images/uselistIcon.svg" alt=""></router-link>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "userInfo",
  data() {
    return {
      msg: "this is your information",
      apiUrl: "http://localhost:3011/user/userInfo/",
      isLiked: true,
      image: "",
      AvatarUrl: "../static/images/Avatar.svg",
			updateUrl: "http://localhost:3011/user/userInfo/updateInfo/"
    };
  },
  mounted: function() {
    var vm = this;
    vm.$http
      .get(vm.apiUrl + vm.$route.params.userId)
      .then(response => {
        vm.user = response.data.data; //get recommends list
      })
      .catch(function(response) {
        console.log(response);
      });
  },
  methods: {
		...mapActions(["getSongId", "logOut"]),
    playSong: function(songId) {
      let vm = this;
      vm.getSongId(songId);
    },
    loginOut: function() {
      this.logOut().then(this.$router.push({ path: "/recommend" }));
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = "";
    },
    updateUser: function() {
      this.$http
        .post(this.updateUrl + this.user._id)
        .then(response => {
          console.log("success");
        })
        .catch(response => {
          console.log(response);
        });
    },
    present: function() {
      var myAudio = document.getElementById("myAudio");
      var length = myAudio.currentTime / myAudio.duration * 100;
      $(".basebar .progressbar").width(length + "%"); //设置进度条长度
    },
    presentCount: function() {
      setInterval(this.present(), 500);
    },
    setIndex: function(id) {
      let songId = id;
      this.$store.commit("setcurrentIndex", songId);
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped="scoped" lang="Sass">
.content {
  .userInfo {
    .nameBox {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
    }
  }
  .favMusic {
    .likeBtn {
      color: red;
    }
    div {
      text-align: left;
    }
  }
}
.isliked {
  span {
    color: red;
  }
}
.tpPlaylist {
  width: 140px;
  display: block;
}
.playlistImg {
  display: block;
  border-radius: 3px;
  transition: 0.3s all;
}
.playlistImg:hover {
  transition: 0.3s all;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.toPlaylistText {
  width: 140px;
  text-align: left;
  text-indent: 2px;
  height: 40px;
  color: #34495e !important;
  word-wrap: break-word;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.controlBtn {
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  padding-top: 20px;
  img {
    width: 20px;
    height: 20px;
  }
}
.updateBtn {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>



