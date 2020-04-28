<template>
  <div class="common">
    <el-container>
      <el-header style="background-color: #5c66a4;">
				<el-row style="float: left;">
					<el-col :span="1/2"> <img src="../../assets/icon/logo.png" style="margin: 10px auto;height:40px"></el-col>
					<el-col :span="4"> <span style="font-size: 25px;color: #FFFFFF;margin-left: 20px;line-height: 60px;white-space: nowrap;"><b>言悦文学</b></span></el-col>
				</el-row>
				<el-button type="text" @click="$router.go(-1)" style="float: right;margin-left: 15px;line-height:30px">
					<span style="color: #FFFFFF;font-size: 15px;">返回</span>
          <i class="el-icon-arrow-right el-icon--right" style="font-size: 15px;color: #FFFFFF;"></i>
				</el-button>
			</el-header>
      <router-view></router-view>
      <el-footer
        style="text-align: center;width: 100%;white-space: nowrap;color: #A7A7A7;font-size: 10px;line-height: 30px;"
      >
        <div>客服电话: 0371-77777 在线Q: 8888888</div>
        <div>言悦文学是一个集小说阅读和小说创作为一体的服务平台。</div>
        <div>地址: XXXXXXX</div>
        <div>www. yanyuewenxue. com 版权所有言悦文学 备案号粤ICP备10054973号-5</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.common{
  /deep/.el-container{
    margin: 0px;
    position: relative;
    height: calc(100vh - 80px);
    min-height: 600px;
    box-sizing: border-box;
}
}

</style>
<style>
.el-input__inner {
  border-radius: 0px;
  padding-left: 10px !important;
}
</style>
