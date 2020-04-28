<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>审核中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
      <el-table :data="applyList" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe>
        <el-table-column label="ID" type="index" width="55"></el-table-column>
        <el-table-column prop="writername" label="申请人"></el-table-column>
        <el-table-column prop="applytime" label="申请时间"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="background-color: #6dbfec;"
              @click="agreeApply(scope.row)"
            >通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="refuseApply(scope.row)"
            >驳回</el-button>
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
      applyList: [],
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
		getapplyList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/getList`,
        method: "get",
      }).then(res => {
        console.log(res);
				this.applyList = res
        this.total = res.length
        this.applyList.forEach(item => {
          item.applytime = this.util.formatDateTime(item.applytime)
        })
      })
    },
    agreeApply(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("applyId", item.applyid);
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/agree`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res)
        this.$message.success('申请已通过');
        this.getapplyList()
      });
    },
    refuseApply(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("applyId", item.applyid);
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/refuse`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res)
        this.$message.success('申请已驳回');
        this.getapplyList()
      });
    }
  },
  created() {
    this.getapplyList()
  }
}
</script>
<style lang="less" scoped>
.page{
	.mainbox{
    position: relative;
    background-color: #ffffff;
    margin-top: 20px;
		padding: 20px;
		min-height: 600px;
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

