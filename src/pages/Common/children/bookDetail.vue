<template>
  <div class="detailPage">
    <div class="main_mod">
      <div class="img">
        <img class="img" src="../../../assets/noface.png">
      </div>
      <div class="more">
        <div class="title">{{info.novelname}}</div>
        <div class="author">作者：{{info.writername}}</div>
        <!-- <div class="content">{{item.content}}</div> -->
        <div class="tag">
          <span>标签：</span>
          <el-tag  size="small">{{ info.typename }}</el-tag>
        </div>
        <div class="btnBar">
          <el-button @click="startRead(chapterList[0])">开始阅读</el-button>
          <el-button @click="startComment = true">发表评论</el-button>
          <el-button icon="iconfont icon-xingxing"  @click="collect"> 收藏</el-button>
          <el-button icon="iconfont icon-aixin"  @click="like"> 点赞</el-button>
        </div>
      </div>
    </div>
    <div class="bottom_mod">
      <el-tabs>
        <el-tab-pane label="评论">
          <div class="comment_body" v-for="(item,index) in commentList" :key="index">
            <div class="head">
              <i class="iconfont icon-yonghu-" style="font-size:30px"/>
              <div style="margin-left:0.5rem">
                <div class="author">{{item.writername}}</div>
                <div class="time">{{util.formatDateTime(item.createtime)}}</div>
              </div>
            </div>
            <div class="content">
              <div>{{item.commentcontent}}</div>
              <div class="handleBar">
                <div class="btn" @click="commentlike(item)">
                  <i class="iconfont icon-aixin" />
                  <span>{{item.likedata}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="none-notice" v-if="commentList.length===0">暂无评论</div>
        </el-tab-pane>
        <el-tab-pane label="目录">
          <div class="chapter_line">
            <div class="index">章节</div>
            <div class="title">标题</div>
          </div>
          <div class="chapter_line" v-for="(item ,index) in chapterList" :key="index" @click="startRead(item)">
            <div class="index">{{index+1}}</div>
            <div class="title">{{item.chaptername}}</div>
          </div>
          <div class="none-notice" v-if="chapterList.length===0">暂无章节</div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
        v-model="comment">
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
      commentList:[],
      comment:'',
      user:{},
      chapterList:[],
      info: {
        novelname: "",
        author: "",
        tagname: ""
      }
    };
  },
  created(){
    this.info = JSON.parse(this.$route.query.info)
    this.getCommentList()
    this.getChapterList()
  },
  methods:{
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
    collect() {
      this.$request({
        url: `${process.env.VUE_APP_API}/measure/insert`,
        method: "post"
      }).then(res => {
        if (res.type === "success") {
            this.$message.success("收藏成功");
          } else {
            this.$message.error(res.msg);
          }
      });
    },
    like() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/doLike`,
        method: "post"
      }).then(res => {
        console.log(res);
        this.$message.success("点赞成功");
      });
    },
    getCommentList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/pagesAll`,
        method: "get",
        params:{
          novelId:this.info.novelid
        }
      }).then(res => {
        this.commentList = res.list;
      });
    },
    cancelPost(){
      this.startComment = false
      this.comment = ''
    },
    sumbitPost(){
      const formData = new FormData();
      formData.append("commentContent", this.comment);
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/insertComment`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$message.success('发表成功');
            this.getCommentList();
            this.comment=''
            this.startComment = false
          } else {
            this.$message.error(res.msg);
          }
      });
    },
    commentlike(item){
      const formData = new FormData();
      formData.append("commentId", item.commentid);
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/doLike`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$message.success(res.msg);
             this.getCommentList();
          } else {
            this.$message.error(res.msg);
          }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.detailPage{
  margin: 20px 60px;
  //min-height: 500px;
  background: rgba(92, 102, 164,0.1);
  border:1px solid rgba(92, 102, 164,1);
  .main_mod{
    margin: 20px 60px;
    display: flex;
    .img{
      width: 200px;
      height: auto;
    }
    .more{
      padding: 0.36rem 0;
      text-align: left;
      margin-left: 50px;
      font-size: 20px;
      line-height: 40px;
      .title{
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
      .btnBar{
        margin-top: 90px;
      }
    }
  }
  .bottom_mod{
    margin: 20px 60px;
    /deep/.el-tabs__item{
      font-size: 20px;
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
        padding: 0.3rem;
        padding-bottom: 1.5rem;
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
    .chapter_line{
      cursor: pointer;
      display: flex;
      border-bottom: 1px #dddddd dashed;
      text-align: center;
      color:#333;
      line-height: 40px;
      .index{
        width: 100px;
      }
      .title{
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