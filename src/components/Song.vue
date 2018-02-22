<template>
	<div class="col-md-12 plr0 musicPlayer">
    <div class="playBtn col-md-3 plr0">
      <img src="../assets/images/prev.svg" alt="" class="prevBtn">
      <img src="../assets/images/start.svg" alt="" class="startBtn" v-if="!$store.state.playIng" v-on:click="musicPlay()">
      <img src="../assets/images/pause.svg" alt="" class="startBtn" v-if="$store.state.playIng" v-on:click="musicPlay()">
      <img src="../assets/images/next.svg" alt="" class="nextBtn" v-on:click='nextSong()'>
    </div>
    <span class="basebar">
      <span class="progressbar"></span>
    </span>
    <div class="volumeControl">
      <img src="../assets/images/volume.svg" alt="">
      <span class="volumeBar">
        <span class="progressbar"></span>
      </span>
    </div>
    <div class="playlistNum">
      <img class="img-responsive" src="../assets/images/playlist.svg" alt="">
      <span>{{playlist.length}}</span>
    </div>

    <audio id="myAudio" autoplay="autoplay" controls="controls" v-bind:src="$store.state.music" class="hide" v-on:ended="nextSong()">
        您的浏览器不支持 audio 标签。
    </audio>
	</div>
</template>

<script>

import { mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-song',
  data () {
    return {
      msg: 'this is song',
      apiUrl:'http://localhost:3011/song/',
      music:null,
      albumPic:[],
      playIng: false,
    }
  },
  methods:{
    ...mapActions([
        'musicPlay',
        'nextSong'
      ])
  },
  computed: {
    ...mapGetters([
        'currentIndex',
        'playlistId',
        'playlist',
        'lyric',
      ])
  },
}	
</script>
<style lang='Sass'>
  .songImg{
    width: 100%;
    height: auto;
  }
  .musicPlayer{
    height: 60px;
    background: #ffffff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top: 1px solid rgba(204,204,204,0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .playBtn{
    cursor: pointer;
    display: flex;
    height: 60px;
    justify-content: space-around;
  }
  .prevBtn,.nextBtn{
    width: 20px;
  }
  .startBtn{
    width: 35px;
  }
  .basebar{
    display: block;
    border:none;
    width: 400px;
    height: 4px;
    border-radius: 2px;
    background-color: #cdd2d7;
    position: relative;
    align-self: center;
    cursor: pointer;
  }
  .basebar .progressbar{
    display: block;
    border:none;
    width: 0%;
    height: 4px;
    border-radius: 2px;
    background-color: #cc3333;
  }
  .volumeBar{
    display: block;
    border:none;
    width: 100px;
    height: 4px;
    border-radius: 2px;
    background-color: #cdd2d7;
    position: relative;
    align-self: center;
    cursor: pointer;
  }
  .volumeBar .progressbar{
    display: block;
    border:none;
    width: 0%;
    height: 4px;
    border-radius: 2px;
    background-color: #cc3333;
  }
  .volumeControl{
    display: flex;
    padding-right: 20px;
    padding-left: 20px;
    img{
      width: 20px;
      padding-right: 5px;
    }
  }
  .playlistNum{
    margin-right: 15px;
    display: flex;
    align-content: center;
    cursor: pointer;
    img{
      width: 20px;
      height: 20px;
    }
    span{
      text-align: center;
      align-self: center;
      background: rgba(204,204,204,0.5);
      border-radius: 6px;
      color: #999;
      height: 15px;
      font-size: 12px;
      padding: 4px;
      line-height: 8px;
      margin-left: 2px;
      font-weight: 600;
    }
  }
</style>