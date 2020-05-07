<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
      <!-- 顶部操作栏 -->
      <el-button type="text" @click="addNews=true" style="float: right;margin-right: 15px;">
        <i class="iconfont icon-jiahao" style="font-size: 20px;color:#71be59"></i>
        <span style="margin-left: 5px;white-space: nowrap;width: 50px;color: #000000;">添加</span>
      </el-button>
      <!-- 添加试卷弹窗 -->
      <el-dialog title="新增通知" :visible.sync="addNews" width="50%" center>
        <el-form label-width="50px" :model="news" style="margin: 10px auto;">
          <el-form-item label="标题">
            <el-input v-model="news.newsTitle" placeholder="请输入标题"></el-input>
          </el-form-item>
					<el-form-item label="内容">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5}"
            placeholder="请输入内容"
            v-model="news.newsContent"
          ></el-input>
					</el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addNews = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 题库列表 -->
      <el-table
        :data="newsList"
        tooltip-effect="dark"
        style="width: 100%;height: 90%;"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="ID" type="index" width="55" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newstitle" label="通知标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="writer" label="创建者" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="work" label="操作" width="180" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="background-color: #6dbfec;"
              @click="lookNews(scope.row)"
            >查看</el-button>
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
      addNews: false,
      news: {
        newsTitle: "",
        newsContent: ""
      },
      newsList: [],
      page: 0, // 当前页数
			size: 9, // 每页条数
			total:0
    };
  },
  created() {
    this.getnewsList();
  },
  methods: {
    getnewsList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/news/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
				this.newsList = res.list;
				this.total = res.total
        this.newsList.forEach(item => {
          item.createtime = this.util.formatDateTime(item.createtime);
        });
      });
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("newsTitle", this.news.newsTitle);
      formData.append("newsContent", this.news.newsContent);
      formData.append("writer", "管理员");
      this.$request({
        url: `${process.env.VUE_APP_API}/news/insert`,
        method: "post",
        data: formData
      }).then(res => {
        this.addNews = false
        this.$message.success("新增成功");
        this.getnewsList();
        this.news={
          newsTitle: "",
          newsContent: ""
        }
      });
    },
    lookNews(item) {
      this.$request({
        url: `${process.env.VUE_APP_API}/news/getOne`,
        method: "get",
        params: {
          newsId: item.newsid
        }
      }).then(res => {
        this.$router.push({ path: "/common/newsDetail", query: { info: JSON.stringify(res[0]) } });
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getnewsList();
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'background-row';
        }
        return '';
      }
  }
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
    /deep/.el-table .background-row{
       background: rgba(103, 106, 129, 0.1);
    }
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
