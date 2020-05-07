<template>
  <div class="page">
    <div class="news_box green">
      <div class="headBar">
        <div class="status">
          <span>{{'用户名：'+user.username}}</span>
          <span>当前认证：{{user.iswriter|iswriter}}</span>
        </div>
        <div v-if="user.iswriter===1" class="btn" @click="addBook=true">添加新书入库>></div>
        <div v-if="user.iswriter===undefined" class="btn" @click="$router.push('/')">前往登录>></div>
      </div>
      <el-divider>我的作品</el-divider>
      <ul v-if="user.iswriter===1" class="cell_list">
        <li v-for="(item,index) in workList" :key="index" @click="editBook(item)">
          <div class="line">
            <div class="line_left">
              <div class="title">
              {{item.novelname}}
              <!-- <div class="tag"></div> -->
              <el-tag effect="plain" size="mini">{{ item.typename }}</el-tag>
              </div>
              <div class="detail">
                <div class="time">{{'阅读量：'+item.readdata }}</div>
                <div class="poster">{{'点赞量：'+item.likedata}}</div>
              </div>
            </div>
            <div class="title">
              进入创作>>
            </div>
            <!-- <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div> -->
          </div>
        </li>
        <div class="none-notice" v-if="workList.length===0">暂无作品</div>
      </ul>
      <ul v-else-if="user.iswriter===-1" class="cell_list">
        <div class="none-notice">
          您目前还不是作者，点击
          <span style="text-decoration:underline;cursor: pointer;" @click="applyAuthor">申请成为作者</span>
        </div>
      </ul>
      <ul v-else-if="user.iswriter===0" class="cell_list">
        <div class="none-notice">
         您提交的申请还在审核中，请耐心等候……
        </div>
      </ul>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        layout="total,->, prev, pager, next, jumper"
        :total="total"
        :page-size="size">
      </el-pagination> -->
    </div>
    <!-- 新书入库弹窗 -->
    <el-dialog title="新书入库" :visible.sync="addBook" width="50%" center>
      <el-form ref="form" :model="bookForm" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="bookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="bookForm.tag" filterable clearable  placeholder="请选择" style="width:100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelBook">取 消</el-button>
        <el-button type="primary" @click="submitBook">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user:{},
      total:0,
      addBook:false,
      workList: [],
      tagList:[],
      options:[],
      bookForm:{
        name:'',
        tag:''
      },
      // page: 1,
      // size: 5
    };
  },
  created() {
    this.getUserInfo()
    this.getworkList();
    this.gettagList()
  },
  methods: {
    gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        this.tagList = res
        this.tagList.forEach(item => {
          let obj = {
            text: item.typename,
            value: item.typename
          };
          this.options.push(obj);
        });
      });
		},
    getworkList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getUserBook`,
        method: "get"
      }).then(res => {
        this.total = res.length
        this.workList = res
      });
    },
    cancelBook() {
      this.initBookForm()
      this.addBook =false
    },
    submitBook() {
      if(this.bookForm.name === ''||this.bookForm.tag === ''){
        this.$message.error('请填入完整信息');
        return
      }
      const formData = new FormData();
      formData.append("novelName", this.bookForm.name);
      formData.append("typeName", this.bookForm.tag);
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/insert`,
        method: "post",
        data: formData
      }).then(res => {
        this.$message.success('添加成功');
        this.addBook = false
        this.initBookForm()
        this.getworkList()
      })
    },
    initBookForm(){
      this.bookForm.name = ''
      this.bookForm.tag = ''
    },
    applyAuthor() {
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/doApply`,
        method: "post"
      }).then(res => {
        this.getUserInfo()
        this.$message.success('申请已成功提交');
      });
    },
    editBook(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params: {
          novelId: item.novelid
        }
      }).then(res => {
        console.log(res);
        this.$router.push({ path: "/common/editBook" ,query:{info:JSON.stringify(res)}});
      });
    },
    // handleCurrentChange(val){
    //   this.page = val
    //   this.getworkList()
    // },
    getUserInfo() {
      this.$request({
        url: `${process.env.VUE_APP_API}/userInfo`,
        method: "get"
      }).then(res => {
        this.user = res
      }).catch(error=>{
        this.user = {
          username:'未登录'
        }
      })
    }
  },
  filters:{
    iswriter(val){
      if(val === 1){
        return '作者'
      }else if(val === -1){
        return '普通用户'
      }else if(val === 0){
        return '审核中'
      }else{
        return '未登录'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  .news_box {
    margin: 10px;
    border: 1px solid rgba(215, 232, 212, 1);
    border-radius: 10px;
    //width: 100%;
    height: 450px;
    .headBar{
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding: 0 30px;
      .status{
        span{
          margin-right: 10px;
          font-size: 14px;
        }
      }
      .btn{
        cursor: pointer;
      }
    }
    /deep/.el-divider__text{
      background: none;
    }
    /deep/.el-divider--horizontal{
      margin: 15px 0;
    }
    .cell_list {
      padding: 0 30px;
      margin: 0px;
      overflow-y: auto;
      height: calc(100% - 85px);
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
        margin-bottom: 4px;
        margin-top: 13px;
        .line_left{
          .detail {
            display: flex;
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 12px;
            margin: 0px;
            margin-bottom: 5px;
            display: flex;
            margin-bottom: 4px;
            margin-top: 13px;
            .poster {
              border-left: 1px #999999 solid;
              margin-left: 5px;
              padding-left: 5px;
            }
          }
        }
        .title {
          display: flex;
          align-items: baseline;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          word-break: break-word;
          /deep/.el-tag--plain{
            background-color: rgba(215, 232, 212, 0);
            margin-left: 10px;
          }
        }
      }
    }
    /deep/.el-pager li{
      background: none;
    }
    /deep/.el-pagination button:disabled{
      background: none;
    }
    /deep/.el-pagination .btn-prev{
      background: none;
    }
    /deep/.el-pagination .btn-next{
      background: none;
    }
    /deep/.el-select{
      width:100%;
    }
  }
  .green {
    background-color: rgba(215, 232, 212, 0.5);
  }
}
</style>
