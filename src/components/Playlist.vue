<template>
	<div id="playlist" class="col-md-12 plr0">
    <div class="playlist col-md-12 plr0">
      <img class="playlistCover img-responsive" v-bind:src="playlist_detail.cover" alt="">
      <div class="playlistInfo">
        <h3><span class="glyphicon glyphicon-tag redIcon"></span>{{playlist_detail.title}}</h3>
        <div style="display:flex;" class="mt15">
          <span><span class="glyphicon glyphicon-star redIcon"></span>{{playlist_detail.collection_count}}</span>
          <span style="margin-left:10px;">歌曲数:{{playlist_detail.song_count}}</span>
          <img class="addFavlist img-responsive" src="../assets/images/addFav.svg" alt="" v-on:click="addFavList()">
        </div>
        <div>
          <p v-bind:class="showMore ? ' ' : 'lessDisc'" v-html="playlist_detail.desc"></p>
          <span class="glyphicon glyphicon-menu-down pull-right" v-bind:class="showMore? 'showLessBtn' : 'showMoreBtn'" v-on:click="showMoreLess()"></span>
          <span class="glyphicon glyphicon-hand-right redIcon"></span><span class="p_c_tab" v-on:click="showComment()" v-text="commentShow? '查看歌曲列表':'查看用户评论'"></span>
        </div>
      </div>
    </div>
    <div class="col-md-12 plr0">
      <div class="songlist col-md-12 plr0" v-if="!commentShow">
        <table class="table table-hover ">
            <thead>
              <tr class="active">
                <th>操作</th>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>时长</th>
              </tr>
            </thead>
            <tbody v-for="(song, index) in playlist" align="center" class="table-striped songIdBox" v-bind:data-id="song.id" >
              <tr>
                <td>
                  <div class="isliked">
                    <span class="glyphicon glyphicon-heart " v-if="isLiked"></span>
                    <span class="glyphicon glyphicon-heart-empty" v-if="!isLiked" v-on:click="addFav(song)"></span>
                  </div>
                  <span v-bind:data-songindex="index" class="glyphicon glyphicon-play-circle playSongBtn" v-on:click="getSongId(song.id), presentCount(),setIndex(song.id)" aria-hidden="true"></span>
                </td> 
                <td>{{song.name}}</td>
                <td>{{song.artists[0].name}}</td>
                <td>{{song.duration |moment}}</td>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="col-md-12 plr0" v-if="commentShow">
        <v-comment></v-comment>
      </div>
    </div>
	</div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions, mapGetters} from 'vuex'
import vComment from './comment'

export default {
  name: 'playlist',
  data () {
    return {
      msg: 'this is playlist',
      apiUrl:'http://localhost:3011/playlist/',
      apiUrl1:'http://localhost:3011/song_list/',
      playlist_detail: [],
      artists:[],
      isLiked:false,
      addFavUrl:'http://localhost:3011/user/addFav/',
      saveMusic:'http://localhost:3011/musiclist/save/',
      showMore: false,
      lessDisc: 'lessDisc',
      commentShow: false,
    }
  },
  components:{
    'vComment': vComment,
  },
  computed: {
    ...mapGetters([
        'currentIndex',
        'playlistId',
        'playlist',
        'playlistName',
        'user'
      ])
  },
  methods:{
    ...mapActions([
      'getSongId',
    ]),
     addFav: function(music){
      let vm = this
      if(vm.user){
        let favMusic = {
          userId: vm.user._id,
          musicId: music.id,
          musicName: music.name
        }
        let singleMusic = {
          musicName: music.name,
          wyyId: music.id,
          score: music.score,
          artistName: music.artists[0].name,
          duration: music.duration,
          picUrl: music.album.picUrl,
          isLiked: true,
        }
        vm.$http.post(vm.addFavUrl+vm.user._id, favMusic)
          .then(
            vm.$http.post(vm.saveMusic, singleMusic)
          )
        }else{
          console.log("login please")
        }
     },
     addFavList: function(playlistName){
        let vm = this
        if(vm.user){
          let favList = {
            userId: vm.user._id,
            playlistId: vm.$route.params.playlistId,
            playlistName: vm.playlistName,
            playlistCover: vm.playlist_detail.cover,
          }
          vm.$http.post(vm.addFavUrl+vm.user._id, favList)
          //   .then(
          //     vm.$http.post(vm.saveMusic, singleMusic)
          // )
        }else{
          console.log("login please")
        }
        
     },
     getPlaylist: function(){
        let vm = this
        vm.$http.get(vm.apiUrl+vm.$route.params.playlistId)
          .then((response) => {
              vm.playlist_detail = response.data.data;
              this.$store.commit('setplaylistName',response.data.data.title)
          })
          .catch(function(response) {
              console.log(response)
          })
     },
     getSonglist: function(){
        let vm = this
        vm.$http.get(vm.apiUrl1+vm.$route.params.playlistId)
          .then((response) => {
              vm.songlist = response.data.data;
              this.$store.commit('setplaylist',response.data.data)
          })
          .catch(function(response) {
              console.log(response)
          })
     },
     showMoreLess: function(){
      let vm = this
      vm.showMore = ! vm.showMore
     },
     showComment: function(){
      let vm = this
      vm.commentShow = ! vm.commentShow
     },
     present: function(){
      var myAudio = document.getElementById('myAudio')
      var length = myAudio.currentTime/myAudio.duration*100;
      $('.basebar .progressbar').width(length+'%');//设置进度条长度
     },
     presentCount: function(){
      setInterval(this.present(),500)
     },
     setIndex: function(id){
      let songId = id;
      this.$store.commit('setcurrentIndex',songId)
     }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('mm:ss');
    }
  },
  
  created: function() {
    this.getPlaylist()
    this.getSonglist()
    this.$store.commit('setplayId',this.$route.params.playlistId)
  },
}	
</script>
<style scoped="scoped" lang="Sass">
  #playlist{
    text-align: left;
  }
  .isliked{
    display: inline-block;
    color:#f00;
  }
  .playlist{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(204,204,204,0.5)
  }
  .playlistCover{
    border-radius: 3px;
    width: 200px;
    height: 200px;
  }
  .playlistInfo{
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
  .moreDisc{
  }
  .lessDisc{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .showMoreBtn{
    cursor: pointer;
    transition: all 0.3s;
  }
  .showLessBtn{
    cursor: pointer;
    transform: rotate(-180deg);
    transition: all 0.3s;
  }
  thead{
    th{
      text-align: center;
    }
  }
  tbody{
    tr:hover{
      cursor: pointer;
    }
    td{
      width: 50px;
    }
  }
  .p_c_tab{
    padding-left: 10px;
    display: inline-block;
    text-align:center;
    cursor: pointer;
  }
  .addFavlist{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
</style>