<template>
  <div class="page">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="padding: 20px;background-color: #FFFFFF;margin-bottom: 40px;"
    >
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainbox">
      <el-button type="text" @click="addTag = true" style="float: right;margin-right: 60px;">
        <i class="iconfont icon-jiahao" style="font-size: 20px;color:#71be59"></i>
        <span style="margin-right: 5px;white-space: nowrap;width: 50px;color: #000000;">添加</span>
      </el-button>
      <div v-if="addTag" class="addLine">
        <div class="tag_input">
          <el-input v-model="tagName" placeholder="请输入标签名称"></el-input>
        </div>
        <div class="btn">
          <el-button size="mini" type="primary" style="background-color: #6dbfec;" @click="save">确定</el-button>
          <el-button
            size="mini"
            type="primary"
            style="background-color: #6dbfec;"
            @click="cancel"
          >取消</el-button>
        </div>
      </div>
      <el-table height="90%" :data="tagList" tooltip-effect="dark" style="width: 100%;" :row-class-name="tableRowClassName">
        <el-table-column label="ID" type="index" width="55"></el-table-column>
        <el-table-column prop="typename" label="标签名称"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        v-show="total!=0"
        background
        :page-size="8"
        @current-change="handleCurrentChange"
        layout="total, ->, prev, pager, next, jumper"
        :total="total"
        style="float: right;"
      ></el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      addTag: false,
      tagName: "",
      tagList: []
    };
  },
  created() {
    this.gettagList();
  },
  methods: {
    gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.tagList = res;
        this.tagList.forEach(item => {
          item.createtime = this.util.formatDateTime(item.createtime);
        });
      });
    },
    cancel() {
      this.addTag = false;
      this.tagName = "";
    },
    save() {
      if(this.tagName ===''){
        this.$message.error('请填写标签名称')
        return
      }
      const formData = new FormData();
      formData.append("typeName", this.tagName);
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/insert`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        if (res.type === "success") {
          this.$message.success("添加标签成功");
          this.gettagList();
          this.tagName = "";
          this.addTag = false;
          console.log(res);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    delect(item){
      console.log(item);
      const formData = new FormData();
      formData.append("typeId", item.typeid);
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        this.$message.success("标签已删除");
        this.gettagList();
      })
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
    min-height: 600px;
    background-color: #ffffff;
    margin-top: 20px;
    padding: 20px;
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
    /deep/.el-table .background-row{
       background: rgba(103, 106, 129, 0.1);
    }
    .addLine {
      display: flex;
      justify-content: space-between;
      height: 53px;
      //padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #ebeef5;
      .tag_input {
        width: 50%;
        padding: 6px 0;
        padding-left: 55px;
        /deep/.el-input {
          width: 50%;
        }
      }
      .btn {
        width: 180px;
        padding: 12px 0;
        text-align: center;
        /deep/.el-button {
          height: 28px;
        }
      }
    }
  }
}
</style>
