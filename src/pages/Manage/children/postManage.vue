<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>论坛管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
      <el-tabs v-model="TabType" type="card" @tab-click="Tabchange" style="margin-top: 10px;">
        <el-tab-pane label="交流分享" name="交流分享"></el-tab-pane>
        <el-tab-pane label="问题反馈" name="问题反馈"></el-tab-pane>
      </el-tabs>
      <div>
        <el-table
          :data="postList"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
        >
          <el-table-column label="ID" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column prop="posttitle" label="帖子标题" show-overflow-tooltip></el-table-column>
          <el-table-column prop="writername" label="创建者" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createtime" label="发帖时间" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="work" label="操作" width="180" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
              size="mini"
              type="primary"
              style="background-color: #6dbfec;"
              @click="lookPost(scope.row)"
            >查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletePost(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      TabType: "交流分享",
      all: null,
      postList: [],
      page: 0, // 当前页
      size: 9, // 每页条数
      total: 0
    };
  },
  methods: {
		// Tab切换
    Tabchange(tab, event){
			console.log(tab, event)
      this.TabType = tab.name
      this.getpostList()
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(`当前页: ${val}`);
      this.getpostList();
    },
    getpostList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/post/pagesApart`,
        method: "get",
        params: {
          page: this.page,
          size: this.size,
          postType: this.TabType
        }
      }).then(res => {
        this.postList = res.list;
        this.total = res.total;
        this.postList.forEach(item => {
          item.createtime = this.util.formatDateTime(item.createtime);
        });
      });
    },
    deletePost(item) {
      const formData = new FormData();
      formData.append("postId", item.postid);
      this.$request({
        url: `${process.env.VUE_APP_API}/post/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        this.$message.success("删除成功");
        this.getpostList();
      });
    },
    lookPost(item) {
      this.$request({
        url: `${process.env.VUE_APP_API}/post/getOne`,
        method: "get",
        params: {
          postId: item.postid
        }
      }).then(res => {
        this.$router.push({ path: "/common/postDetail", query: { info: JSON.stringify(res) } });
      });
    }
  },
  created() {
    this.getpostList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.page {
  .mainbox {
    position: relative;
    background-color: #ffffff;
    margin-top: 20px;
    padding: 20px;
    min-height: 600px;
    padding-bottom: 30px;
    border-radius: 10px;
    height: calc(100vh - 194px);
    box-sizing: border-box;
    /deep/.el-select {
      width: 30%;
    }
    /deep/.el-pagination {
      position: absolute;
      bottom: 5px;
      right: 10px;
      left: 10px;
    }
  }
}
</style>
