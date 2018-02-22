import vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

vue.use(VueResource);
vue.use(Vuex)


const state = {
    commentUrl: 'http://localhost:3011/user/comment/',
    comments: [],
    playlistId: null,
    playlistCover: null,
    isLogin: false,
    isAdmin: false,
    songId: null,
    musicName: null,
    currentIndex: null,
    musicArtist: null,
    canPlayMsg: '歌曲加载失败',
    canPlay: false,
    playIng: false,
    songlistUrl: "http://localhost:3011/song_list/",
    playlist: [],
    playlistName: null,
    user: null,
    music: null,
    albumPic: null,
}
const getters = {
    currentIndex: function(state) {
        return state.currentIndex
    },
    playlistId: function(state) {
        return state.playlistId
    },
    playlist: function(state) {
        return state.playlist
    },
    playlistName: function(state) {
        return state.playlistName
    },
    user: function(state) {
        return state.user
    }
}
const mutations = {
    updateUser(state, newVal){
        state.user = newVal
    },
    setplayId: (state, playlistId) => {
        state.playlistId = playlistId
    },
    setplaylist: (state, playlist) => {
        state.playlist = playlist
    },
    setplaylistName: (state, playlistName) => {
        state.playlistName = playlistName
    },
    setcurrentIndex: (state, songId) => {
        state.playlist.forEach(function(e, i) {
            if (songId == e.id) {
                state.currentIndex = i;
            }
        })
    },
    getPlaylistComment: function(state) {
        vue.http.get(state.commentUrl + state.playlistId)
            .then((response) => {
                state.comments = response.data.data
            })
            .catch(function(response) {
                console.log(response)
            })
    },
    confirmLogin: function(state) {
        let localUser = localStorage.getItem("user")
        if (localUser) {
            var userId = JSON.parse(localUser)
            vue.http.get('http://localhost:3011/user/userInfo/' + userId)
                .then((response) => {
                    state.user = response.data.data
                })
                .catch(() => {
                    console.log("登录失败")
                })
            state.isLogin = true;
            if (state.user.role >= 10) {
                state.isAdmin = true;
            } else {
                state.isAdmin = false;
            }
        } else {
            state.isLogin = false;
            state.isAdmin = false
        }
    },
    "LOGOUT": function() {
        localStorage.removeItem("user");
        state.isLogin = false;
        state.isAdmin = false;
        state.user = '';
    },
    "GETSONGID": function(state, songId) {
        state.songId = songId
        vue.http.get('http://localhost:3011/song/' + state.songId)
            .then((response) => {
                state.music = `http://music.163.com/song/media/outer/url?id=${state.songId}.mp3`;
                state.albumPic = response.data.songs[0].album.picUrl;
                state.musicName = response.data.songs[0].name;
                state.musicArtist = response.data.songs[0].artists[0].name;
                var audio = new Audio(state.music);
                state.canPlay = true;
                audio.addEventListener("canplaythrough",
                    function() {
                        console.log(123)
                        state.playIng = true;
                    }, false);
                setTimeout(function() {
                    state.canPlay = false;
                }, 2000)
            })
            .catch(function(response) {
                console.log(response)
            })
    },
    "MUSICPLAY": function(state) {
        var myAudio = document.getElementById('myAudio')
        if (myAudio.paused) {
            myAudio.play();
            state.playIng = !state.playIng
        } else {
            myAudio.pause();
            state.playIng = !state.playIng
        }
    }
}

// action不用再去外面定义 可以直接写在构建参数里
const actions = {
    "logOut": function(store) {
        store.commit('LOGOUT')
    },
    "getSongId": function(store, songId) {
        store.commit('GETSONGID', songId)
    },
    "musicPlay": function(store) {
        store.commit('MUSICPLAY')
    },
    "nextSong": function(store) {
        state.currentIndex++;
        var nextSongId = state.playlist[state.currentIndex].id
        store.commit('GETSONGID', nextSongId)
    },
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})