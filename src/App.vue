<template v-cloak >
  <div id="app"  class="container plr0">
    <div class="col-md-12 header ">
      <div class="logo">
        <router-link :to="{ name: 'Recommend'}"><img src="../src/assets/images/m_logo.png" class="img-responsive" alt=""></router-link>
      </div>
      <v-search/>
      <div class="pull-right">
        <span v-if="!$store.state.isLogin">
          <router-link :to="{ name: 'Signup'}">注册</router-link>
          /
          <router-link :to="{ name: 'Login'}">登录</router-link>
        </span>
        <span class="userCover" v-else>
          <router-link :to="{ name: 'Userinfo', params: { userId: $store.state.user._id ? $store.state.user._id : 0 }}"></router-link>
        </span>
      </div>
    </div>
    <div class="col-md-3 leftSide plr0 ">
      <router-link :to="{ name: 'Recommend'}" class="leftLink" exact>发现音乐</router-link>
      <div class="col-md-12 plr0 userFavlist" v-if="$store.state.isLogin">
        <p v-for="(favlist,index) in $store.state.user.favPlayList" :key="index" :title="favlist.playlistName">
          <router-link :to="{ name: 'Playlist',params: { playlistId: favlist.playlistId }}" class="leftLink">{{favlist.playlistName}}</router-link>
        </p>
      </div>
      <div class="musicInfo">
        <div class="musicCover">
          <img class="img-responsive" v-bind:src="$store.state.albumPic ? $store.state.albumPic : '../static/images/disc.svg'">
        </div>
        <div class="musicDetail">
            <p>{{$store.state.musicName}}</p>
            <p>{{$store.state.musicArtist}}</p>
        </div>
      </div>
    </div>
    <div class="col-md-9 rightSide">
      <transition appear name="slide-fade" mode="out-in">
        <router-view ></router-view>
      </transition>
    </div>
    <div class="col-md-12 plr0">
      <v-song/>
    </div>
    <v-alert v-if="$store.state.canPlay"></v-alert>
  </div>
</template>

<script>
import vSong from "../src/components/Song";
import vSearch from "../src/components/searchMusic";
import { mapState, mapActions, mapGetters } from "vuex";
import vAlert from "../src/components/alert";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    vSong: vSong,
    vAlert: vAlert,
    vSearch: vSearch
  },
  methods: {
    ...mapActions(["islogin", "isAdmin", "logOut"])
  },
  created: function() {
    this.$store.commit("confirmLogin");
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="Sass">
body {
  color: #34495e;
}
#app {
  font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  height: 700px;
  width: 1000px;
}
a {
  color: #fff;
  cursor: pointer;
}
a:hover {
  text-decoration: none !important;
}
a:active {
  text-decoration: none !important;
}
a:focus {
  text-decoration: none !important;
  outline: none;
  outline-offset: none;
}
.plr0 {
  padding-right: 0;
  padding-left: 0;
}
.mt15 {
  margin-top: 15px;
}
.title {
  font-size: 24px;
  text-align: left;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  margin-top: 15px;
  margin-bottom: 15px;
}
.redIcon {
  color: #cc3333;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.header {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 60px;
  background: #cc3333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 60px;
    a {
      height: 60px;
      width: 100px;
      display: flex;
      align-items: center;
      margin-left: 15px;
    }
  }
  .userCover {
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50%;
    background-size: 40px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    a {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.rightSide {
  height: 560px;
  overflow: auto;
  margin-top: 20px;
}
.leftSide {
  background: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 560px;
  overflow: auto;
  border-right: 1px solid rgba(204, 204, 204, 0.5);
  margin: 20px 0 0 0;
  .router-link-active {
    border-right: 2px solid #cc3333;
    color: #cc3333 !important;
  }
  .leftLink {
    font-size: 14px;
    text-align: left;
    display: block;
    margin: 8px 5px;
    padding: 0 10px;
    color: #34495e;
  }
  .musicInfo {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-top: 1px solid rgba(204, 204, 204, 0.5);
    padding: 5px;
    .musicCover {
      img {
        border-radius: 3px;
        width: 60px;
        height: auto;
      }
    }
    .musicDetail {
      flex: 1;
      margin-left: 25px;
      p {
        text-align: left;
      }
    }
  }
  .userFavlist {
    flex: 1;
    overflow: auto;
    a {
      &:hover {
        color: #cc3333 !important;
      }
      overflow: hidden;
      display: block;
      height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
