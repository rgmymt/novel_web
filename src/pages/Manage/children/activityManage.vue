<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
      <el-table :data="activityList" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe>
        <el-table-column label="ID" type="index" width="55"></el-table-column>
        <el-table-column prop="acttitle" label="活动名称"></el-table-column>
        <el-table-column prop="organizer" label="组织者" width="120"></el-table-column>
				<el-table-column prop="location" label="活动地点" width="180" align="center"></el-table-column>
				<el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="background-color: #6dbfec;"
              @click="lookActivity(scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteActivity(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="total!=0"
        background
        :page-size="size"
        @current-change="handleCurrentChange"
        layout="total, ->, prev, pager, next, jumper"
				:total="total"
        style="float: right;"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityList: [],
      page: 1, // 当前页
			size: 10, // 每页条数
			total:0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getactivityList();
      console.log(`当前页: ${val}`);
		},
		getactivityList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        this.activityList=res.list
        this.total = res.total
        this.activityList.forEach(item => {
          item.createtime = this.util.formatDateTime(item.createtime)
        })
      });
    },
    deleteActivity(item) {
      const formData = new FormData();
      formData.append("actId", item.actid);
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res)
        this.$message.success('删除成功');
        this.activityList = []
        this.getactivityList()
      });
    },
    lookActivity(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/getOne`,
        method: "get",
        params:{
          actId:item.actid
        }
      }).then(res => {
        this.$router.push({path:'/common/activityDetail',query:{info:JSON.stringify(res[0])}})
      })
    },
  },
  created() {
    this.getactivityList()
  }
}
</script>
<style lang="less" scoped>
.page{
	.mainbox{
    position: relative;
    background-color: #ffffff;
    margin-top: 20px;
    min-height: 600px;
    padding: 20px;
    padding-bottom: 30px;
		border-radius: 10px;
		height: calc(100vh - 194px);
		box-sizing: border-box;
		/deep/.el-select{
			width: 30%;
		}
		/deep/.el-pagination{
			position: absolute;
			bottom: 5px;
			right: 10px;
			left: 10px;
		}
	}
}
</style>

