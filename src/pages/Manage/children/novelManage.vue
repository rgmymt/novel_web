<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>小说管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
			<span>标签：</span>
      <el-select v-model="tagName" filterable placeholder="请选择" @change="tagChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-table :data="novelList" tooltip-effect="dark" style="width: 100%;height: 90%;" stripe>
        <el-table-column label="ID" type="index" width="55"></el-table-column>
        <el-table-column prop="novelname" label="书名"></el-table-column>
        <el-table-column prop="writername" label="作者" width="120"></el-table-column>
				<el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
				<el-table-column prop="readdata" label="阅读量" width="80" align="center"></el-table-column>
				<el-table-column prop="likedata" label="点赞量" width="80" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="background-color: #6dbfec;"
              @click="lookDetail( scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteNovel(scope.row)"
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
      tagName: "",
      options: [],
      tagList: [],
      novelList: [],
      page: 1, // 当前页
			size: 10, // 每页条数
			total:0
    };
  },
  methods: {
 
    handleCurrentChange(val) {
      this.page = val;
      this.getnovelList();
		},
		gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.tagList = res;
        this.tagName = this.tagList[0].typename;
        this.getnovelList();
        this.tagList.forEach(item => {
          let obj = {
            text: item.typename,
            value: item.typename
          };
          this.options.push(obj);
        });
      });
		},
		tagChange() {
      this.novelList = [];
      this.getnovelList();
    },
    //获取小说列表
    getnovelList() {
			console.log(process.env.VUE_APP_API)
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/pagesByType`,
        method: "get",
        params: {
          typeName: this.tagName,
          page: this.page,
          size: this.size
        }
      }).then(res => {
				this.novelList = res.list
				this.total = res.total
        this.novelList.forEach(item => {
          item.createtime = this.util.formatDateTime(item.createtime)
        })
      })
    },
    lookDetail(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params:{
          novelId:item.novelid
        }
      }).then(res => {
        console.log(res);
        this.$router.push({path:'/common/bookDetail',query:{info:JSON.stringify(res)}})
      })
    },
    deleteNovel(item) {
      console.log(item);
      const formData = new FormData();
      formData.append("novelId", item.novelid);
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        this.$message.success("删除成功");
        this.getnovelList();
      });
    },
  },
  created() {
    this.gettagList()
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

