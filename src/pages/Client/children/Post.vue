<template>
  <div class="page">
    <div class="news_box pink">
      <ul class="cell_list">
        <div class="creat_post" @click="addPost = true">
          <i class="el-icon-chat-line-round"></i>发表新帖
        </div>
        <el-tabs v-model="TabType" type="card" @tab-click="Tabchange" style="margin-top: 10px;">
          <el-tab-pane label="交流分享" name="交流分享"></el-tab-pane>
          <el-tab-pane label="问题反馈" name="问题反馈"></el-tab-pane>
        </el-tabs>
        <li v-for="(item,index) in postList" :key="index" @click="lookPost(item)">
          <div class="line">
            <div class="title">
              {{item.posttitle}}
              <div class="poster">{{item.writername}}</div>
            </div>
            <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div>
          </div>
        </li>
        <div class="none-notice" v-if="postList.length===0">暂无通知</div>
      </ul>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total,->, prev, pager, next, jumper"
        :total="total"
        :page-size="size"
      ></el-pagination>
    </div>
    <!-- 创建帖子弹窗 -->
    <el-dialog title="发表新帖" :visible.sync="addPost" width="50%" center>
      <el-form ref="form" :model="postForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-radio-group v-model="postForm.type">
            <el-radio label="交流分享"></el-radio>
            <el-radio label="问题反馈"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="postForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPost">取 消</el-button>
        <el-button type="primary" @click="sumbitPost">创 建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TabType:'交流分享',//帖子类型
      total: 0,
      addPost:false,
      postForm:{
        title:'',
        type:'',
        content:''
      },
      postList: [],
      page: 1,
      size: 5
    };
  },
  created() {
    this.getpostList();
  },
  methods: {
    // Tab切换
    Tabchange(tab, event){
			console.log(tab, event)
      this.TabType = tab.name
      this.page = 1
      this.getpostList()
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
        this.total = res.total;
        this.postList = res.list;
      })
    },
    lookPost(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/post/getOne`,
        method: "get",
        params:{
          postId:item.postid
        }
      }).then(res => {
        this.$router.push({path:'/common/postDetail',query:{info:JSON.stringify(res)}})
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getpostList();
    },
    cancelPost() {
      this.initPostForm()
      this.addPost =false
    },
    sumbitPost() {
      if(this.postForm.title === ''||this.postForm.content === ''){
        this.$message.error('请填入完整信息');
        return
      }
      const formData = new FormData();
      formData.append("postTitle", this.postForm.title);
      formData.append("postContent", this.postForm.content);
      formData.append("postType",this.postForm.type);
      this.$request({
        url: `${process.env.VUE_APP_API}/post/insert`,
        method: "post",
        data: formData
      }).then(res => {
        this.$message.success('发表成功');
        this.addPost = false
        this.initPostForm()
        this.getpostList()
      });
    },
    initPostForm(){
      this.postForm.title=''
      this.postForm.content=''
      this.postForm.type=''
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  .news_box {
    margin: 10px;
    border: 1px solid rgba(247, 231, 232, 1);
    border-radius: 10px;
    //width: 100%;
    height: 450px;
    .cell_list {
      padding: 0 10px;
      margin: 0px;
      overflow-y: auto;
      height: calc(100% - 45px);
      /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        border-bottom-color: rgba(247, 231, 232, 1);
      }
      /deep/.el-tabs__item.is-active {
        color: #8cbcec;
      }
      /deep/.el-tabs__item {
        font-size: 16px;
      }
      .creat_post {
        position: relative;
        z-index: 2;
        cursor: pointer;
        float: right;
        margin-top: 10px;
        line-height: 40px;
        font-size: 14px;
        i {
          margin-right: 5px;
        }
      }
      .none-notice {
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        color: #909399;
        margin-top: 50px;
      }
      li {
        border-bottom: 1px #dddddd dashed;
        cursor: pointer;
        &.markRead .title {
          color: #999999;
        }
      }
      .line {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin: 0px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 4px;
        margin-top: 13px;
        .title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          word-break: break-word;
          .poster {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
            margin: 0px;
            margin-bottom: 2px;
            margin-top: 5px;
          }
        }
      }
    }
    /deep/.el-pager li {
      background: none;
    }
    /deep/.el-pagination button:disabled {
      background: none;
    }
    /deep/.el-pagination .btn-prev {
      background: none;
    }
    /deep/.el-pagination .btn-next {
      background: none;
    }
  }
  .pink {
    background-color: rgba(247, 231, 232, 0.5);
  }
}
</style>
