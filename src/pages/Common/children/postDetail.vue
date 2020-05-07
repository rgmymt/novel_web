<template>
  <div class="detailPage">
    <div class="news_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>言悦论坛</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.posttype}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.posttitle}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="mini" @click="startComment = true">发表评论</el-button>
    </div>
    <div class="comment_body">
      <div class="head">
        <i class="iconfont icon-yonghu-" style="font-size:30px" />
        <div style="margin-left:0.5rem">
          <div class="author">
            {{info.writername}}
            <el-tag effect="plain" size="mini">贴主</el-tag>
          </div>
          <div class="time">{{util.formatDateTime(info.createtime)}}</div>
        </div>
      </div>
      <div class="content">
        <div>{{info.postcontent}}</div>
      </div>
    </div>
    <div class="comment_body" v-for="(item,index) in commentList" :key="index">
      <div class="head">
        <i class="iconfont icon-yonghu-" style="font-size:30px" />
        <div style="margin-left:0.5rem">
          <div class="author">{{item.writername}}</div>
          <div class="time">{{util.formatDateTime(item.createtime)}}</div>
        </div>
      </div>
      <div class="content">
        <div>{{item.postcommentcontent}}</div>
        <div class="handleBar">
          <div class="btn" @click="commentlike(item)">
            <i class="iconfont icon-aixin" />
            <span>{{item.likedata}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="none-notice" v-if="commentList.length===0">暂无评论</div>
    <!-- 评论弹窗 -->
    <el-dialog
      title="发表评论"
      :visible.sync="startComment"
      width="30%"
      center>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4}"
        placeholder="请输入评论内容"
        v-model="postContent">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPost">取 消</el-button>
        <el-button type="primary" @click="sumbitPost">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startComment:false,
      info: {},
      commentList: [],
      postContent: ""
    };
  },
  created() {
    this.info = JSON.parse(this.$route.query.info);
    this.getComment();
  },
  methods: {
    getComment() {
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/pagesAll`,
        method: "get"
      }).then(res => {
        this.commentList = res.list;
      });
    },
    sumbitPost(){
      const formData = new FormData();
      formData.append("postCommentContent", this.postContent);
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/insert`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$message.success('发表成功');
            this.getComment();
            this.postContent=''
            this.startComment = false
          } else {
            this.$message.error(res.msg);
          }
      });
    },
    commentlike(item){
      const formData = new FormData();
      formData.append("postCommentId", item.postcommentid);
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/addLike`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$message.success(res.msg);
             this.getComment();
          } else {
            this.$message.error(res.msg);
          }
      });
    },
    cancelPost(){
      this.startComment = false
      this.postContent = ''
    }
  }
};
</script>
<style lang="less" scoped>
.detailPage {
  margin: 20px 60px;
  padding: 0 60px;
  //min-height: 500px;
  background: rgba(247, 231, 232, 0.1);
  border: 2px solid rgba(247, 231, 232, 1);
  border-radius: 20px;
  .news_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
  }
  .comment_body {
    padding: 1rem;
    border-bottom: 1px #dddddd dashed;
    .head {
      display: flex;
      align-items: center;
      .author {
        font-size: 1rem;
        //color:#969799;
        margin-top: 0.3rem;
      }
      .time {
        font-size: 0.5rem;
        color: #969799;
        margin-top: 0.3rem;
        span {
          color: #333333;
        }
      }
    }
    .content {
      margin-top: 0.3rem;
      min-height: 1rem;
      //overflow-y: auto;
      padding: 0.3rem 35px;
      padding-bottom: 1.5rem;
      word-break:break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
      .handleBar {
        // bottom: 0.5rem;
        // right: 0.5rem;
        .btn {
          cursor: pointer;
          float: right;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          span {
            font-size: 0.3rem;
            color: #969799;
            margin-left: 0.3rem;
          }
        }
      }
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
</style>