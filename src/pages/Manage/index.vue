<template>
	<div class="manage">
		<el-container>
			<el-header style="background-color: #5c66a4;">
				<el-row style="float: left;">
					<el-col :span="1/2"> <img src="../../assets/icon/logo.png" style="margin: 10px auto;height:40px"></el-col>
					<el-col :span="4"> <span style="font-size: 25px;color: #FFFFFF;margin-left: 20px;line-height: 60px;white-space: nowrap;"><b>言悦文学</b></span></el-col>
				</el-row>
				<el-button type="text" @click="exit" style="float: right;margin-left: 15px;">
					<i class="iconfont icon-tuichu" style="font-size: 25px;line-height: 40px;color: #FFFFFF;"></i>
					<span style="color: #FFFFFF;font-size: 15px;margin-left: 5px;">退出</span>
				</el-button>
			</el-header>
			<el-container>
				<el-aside style="width: 140px;text-align: center;">
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" router >
						<el-menu-item index="/manage/novelManage">
							<i class="iconfont icon-shu" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">小说管理</div>
						</el-menu-item><br>
						<el-menu-item index="/manage/tagManage">
							<i class="iconfont icon-label" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">标签管理</div>
						</el-menu-item><br>
						<el-menu-item index="/manage/newsManage">
							<i class="iconfont icon-gonggao" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">通知公告</div>
						</el-menu-item><br>
						<el-menu-item index="/manage/activityManage">
							<i class="iconfont icon-huodongguanli" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">活动管理</div>
						</el-menu-item><br>
						<el-menu-item index="/manage/postManage">
							<i class="el-icon-chat-line-round" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">论坛管理</div>
						</el-menu-item><br>
						<el-menu-item index="/manage/applyManage">
							<i class="iconfont icon-shenhe" style="font-size: 35px;"></i>
							<div slot="title" style="line-height: 20px;">审核中心</div>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main style="background-color: #F1F1F1;">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		 methods: {
			exit(){
				this.$router.push({path:'/'})
			}
    },
	mounted() {
	
	}
	}
</script>
<style lang="less" scoped>
.manage{
	/deep/.el-container{
			margin: 0px;
			height: 100vh;
	}
}
</style>
<style>
	.el-menu-item,
	.el-submenu__title {
		height: auto !important;
		width: 140px;
		margin: 10px 0px;
	}
</style>
