import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Recommend from '@/components/Recommend'
import Playlist from '@/components/Playlist'
import vSong from '@/components/Song'
import Signup from '@/components/Signup'
import Userlist from '@/components/Userlist'
import Login from '@/components/Login'
import Userinfo from '@/components/userInfo'
import Test from '@/components/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    	path:'/',
    	name: 'Recommend',
	    component: Recommend
    },
    {
    	path:'/playlist/:playlistId',
    	name: 'Playlist',
	    component: Playlist
    },
    {
    	path:'/song/:songId',
    	name: 'Song',
	    component: vSong
    },
    {
      path:'/signup',
      name:'Signup',
      component: Signup
    },
    {
      path:'/userlist',
      name:'Userlist',
      component: Userlist
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/userInfo/:userId',
      name:'Userinfo',
      component: Userinfo
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    }
  ]
})
