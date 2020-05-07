import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login/login'
import Register from '@/pages/Login/register'
//客户端
import Client from '@/pages/Client/index'
import Home from '../pages/Client/children/Home'
import Book from '../pages/Client/children/Book'
import News from '../pages/Client/children/News'
import Activity from '../pages/Client/children/Activity'
import Post from '../pages/Client/children/Post'
import Mine from '../pages/Client/children/Mine'
import Collent from '../pages/Client/children/Collent'

//管理端
import Manage from '@/pages/Manage/index'
import novelManage from '../pages/Manage/children/novelManage'
import tagManage from '../pages/Manage/children/tagManage'
import newsManage from '../pages/Manage/children/newsManage'
import activityManage from '../pages/Manage/children/activityManage'
import postManage from '../pages/Manage/children/postManage'
import applyManage from '../pages/Manage/children/applyManage'
//通用页面
import Common from '../pages/Common/index'
import BookDetail from '../pages/Common/children/bookDetail'
import EditBook from '../pages/Common/children/editBook'
import ChapterDetail from '../pages/Common/children/chapterDetail'
import NewsDetail from '../pages/Common/children/newsDetail'
import ActivityDetail from '../pages/Common/children/activityDetail'
import PostDetail from '../pages/Common/children/postDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
		},
		{
      path: '/register',
      name: 'Register',
      component: Register
		},
		//通用页面
		{
			path: '/common',
			component: Common,
			children: [
				{
					path:'bookDetail',
					component: BookDetail
				},
				{
					path:'editBook',
					component: EditBook
				},
				{
					path:'chapterDetail',
					component: ChapterDetail,
				},
				{
					path:'newsDetail',
					component: NewsDetail,
				},
				{
					path:'activityDetail',
					component: ActivityDetail,
				},
				{
					path:'postDetail',
					component: PostDetail,
				}
			]
		},
		//客户端
		{
			path: '/client',
			component: Client,
			children: [
				{
					path: '/',
					redirect:'Home'
				},
				{
					path:'home',
					component: Home,
				},
				{
					path:'book',
					component: Book,
				},
				{
					path:'news',
					component: News,
				},
				{
					path:'activity',
					component: Activity,
				},
				{
					path:'post',
					component: Post,
				},
				{
					path:'collent',
					component: Collent,
				},
				{
					path:'mine',
					component: Mine,
				}
			]
		},
		//管理端
    {
			path: '/manage',
			component: Manage,
			children: [
      {
        path: '/',
        redirect:'novelManage'
      },
      {
				path: 'novelManage',
				component: novelManage,
			}, 
			{
				path: 'tagManage', 
				component: tagManage,
			},
			{
				path: 'newsManage', 
				component: newsManage,
			},
			{
				path: 'activityManage', 
				component: activityManage,
			},
			{
				path: 'postManage', 
				component: postManage,
			},
			{
				path: 'applyManage', 
				component: applyManage,
			},]
		},
  ]
})
