<template>
  <div class="detailPage">
    <div v-if="!editChapter" class="main_mod">
      <div class="img">
        <img class="img" src="../../../assets/noface.png" />
      </div>
      <div class="more">
        <div class="title">{{info.novelname}}</div>
        <div class="author">作者：{{info.writername}}</div>
        <!-- <div class="content">{{item.content}}</div> -->
        <div class="tag">
          <span>标签：</span>
          <el-tag size="small">{{ info.typename }}</el-tag>
        </div>
      </div>
    </div>
    <div v-if="!editChapter" class="bottom_mod">
      <el-divider>目录</el-divider>
      <div class="addChapter" @click="editChapter=true">
        <i class="el-icon-circle-plus-outline">添加新章节</i>
      </div>
      <div class="chapter_line">
        <div class="index">章节</div>
        <div class="title">标题</div>
      </div>
      <div
        class="chapter_line"
        style=" cursor: pointer;"
        v-for="(item ,index) in chapterList"
        :key="index"
        @click="startRead(item)"
      >
        <div class="index">{{index+1}}</div>
        <div class="title">{{item.chaptername}}</div>
      </div>
      <div class="none-notice" v-if="chapterList.length===0">暂无章节</div>
    </div>
    <div class="main_mod" v-if="editChapter">
      <el-form ref="form" :model="chapterForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="chapterForm.title"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" :autosize="{ minRows: 20}" v-model="chapterForm.content"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editChapter: false,
      chapterList: [],
      info: {
        novelname: "",
        author: "",
        tagname: ""
      },
      chapterForm: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.info = JSON.parse(this.$route.query.info);
    this.getChapterList();
  },
  methods: {
    startRead(item) {
      let info = item
      info.author = this.info.writername
      this.$router.push({ path: "/common/chapterDetail", query: { info: item } });
    },
    getChapterList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getAll`,
        method: "get"
      }).then(res => {
        this.chapterList = res;
      });
    },
    cancel(){
      this.initChapter()
      this.editChapter = false
    },
    onSubmit(){
      if(this.chapterForm.title === ''||this.chapterForm.content === ''){
        this.$message.error('请输入完整内容')
        return
      }
      const formData = new FormData();
      formData.append("novelId", this.info.novelid);
      formData.append("chapterName", this.chapterForm.title);
      formData.append("content", this.chapterForm.content);
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/insertByNovelId`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        if (res.type === "success") {
          this.$message.success("章节添加成功");
          this.getChapterList()
          this.editChapter = false;
          this.initChapter()
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    initChapter(){
      this.chapterForm.title = ''
      this.chapterForm.content = ''
    }
  }
};
</script>
<style lang="less" scoped>
.detailPage {
  margin: 20px 60px;
  background: rgba(92, 102, 164, 0.1);
  border: 1px solid rgba(92, 102, 164, 1);
  .main_mod {
    margin: 20px 60px;
    display: flex;
    /deep/.el-form {
      width: 100%;
    }
    .img {
      width: 200px;
      height: auto;
    }
    .more {
      padding: 0.36rem 0;
      text-align: left;
      margin-left: 50px;
      font-size: 20px;
      line-height: 40px;
      .title {
        letter-spacing: 2px;
      }
      .author {
        font-size: 15px;
        color: #969799;
        padding: 0.3rem 0;
      }
      .tag {
        font-size: 0.3rem;
        color: #969799;
        padding: 0.3rem 0;
      }
      .btnBar {
        margin-top: 90px;
      }
    }
  }
  .bottom_mod {
    margin: 20px 60px;
    /deep/.el-tabs__item {
      font-size: 20px;
    }
    /deep/.el-divider__text {
      background: none;
    }
    /deep/.el-divider--horizontal {
      margin: 15px 0;
    }
    .addChapter {
      float: right;
      line-height: 40px;
      font-size: 15px;
      cursor: pointer;
    }
    .chapter_line {
      display: flex;
      border-bottom: 1px #dddddd dashed;
      text-align: center;
      color: #333;
      line-height: 40px;
      .index {
        width: 100px;
      }
      .title {
        flex: 1;
      }
    }
    .none-notice {
      line-height: 60px;
      text-align: center;
      font-size: 14px;
      color: #909399;
      margin-top: 50px;
    }
  }
}
</style>