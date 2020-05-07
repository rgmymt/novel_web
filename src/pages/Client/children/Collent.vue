<template>
  <div class="page">
    <div class="news_box green">
      <div class="headBar">
        <div class="status">
          <span>{{'用户名：'+user.username}}</span>
          <span>当前认证：{{user.iswriter|iswriter}}</span>
        </div>
        <div v-if="user.iswriter===undefined" class="btn" @click="$router.push('/')">前往登录>></div>
      </div>
      <div>
        <el-divider>我的收藏</el-divider>
        <ul class="cell_list">
          <li v-for="(item,index) in collentList" :key="index" @click="editBook(item)">
            <div class="line">
              <div class="line_left">
                <div class="title">
                  {{item.novelname}}
                  <!-- <div class="tag"></div> -->
                  <el-tag effect="plain" size="mini">{{ item.typename }}</el-tag>
                </div>
                <!-- <div class="detail">
                  <div class="time">{{'阅读量：'+item.readdata }}</div>
                  <div class="poster">{{'点赞量：'+item.likedata}}</div>
                </div> -->
              </div>
              <div class="title" @click="lookBook(item)">进入阅读>></div>
              <!-- <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div> -->
            </div>
          </li>
          <div class="none-notice" v-if="collentList.length===0">暂无收藏</div>
        </ul>
      </div>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        layout="total,->, prev, pager, next, jumper"
        :total="total"
        :page-size="size">
      </el-pagination>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      total: 0,
      collentList:[],
      tagList: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getcollentList();
  },
  methods: {
    getcollentList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/measure/pagesAll`,
        method: "get",
        params: {
          page: 1,
          size: 9999
        }
      }).then(res => {
        this.total = res.total;
        this.collentList = res.list;
      });
    },
    // handleCurrentChange(val){
    //   this.page = val
    //   this.getworkList()
    // },
    lookBook(item) {
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params: {
          novelId: item.novelid
        }
      }).then(res => {
        console.log(res);
        this.$router.push({ path: "/common/bookDetail", query: { info: JSON.stringify(res) } });
      });
    },
    getUserInfo() {
      this.$request({
        url: `${process.env.VUE_APP_API}/userInfo`,
        method: "get"
      })
        .then(res => {
          this.user = res;
        })
        .catch(error => {
          this.user = {
            username: "未登录"
          };
        });
    }
  },
  filters: {
    iswriter(val) {
      if (val === 1) {
        return "作者";
      } else if (val === -1) {
        return "普通用户";
      } else if (val === 0) {
        return "审核中";
      } else {
        return "未登录";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  .news_box {
    margin: 10px;
    border: 1px solid rgba(215, 232, 212, 1);
    border-radius: 10px;
    //width: 100%;
    height: 450px;
    .headBar {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding: 0 30px;
      .status {
        span {
          margin-right: 10px;
          font-size: 14px;
        }
      }
      .btn {
        cursor: pointer;
      }
    }
    /deep/.el-divider__text {
      background: none;
    }
    /deep/.el-divider--horizontal {
      margin: 15px 0;
    }
    .cell_list {
      padding: 0 30px;
      margin: 0px;
      overflow-y: auto;
      height: 365px;
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
        .line_left {
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
          /deep/.el-tag--plain {
            background-color: rgba(215, 232, 212, 0);
            margin-left: 10px;
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
    /deep/.el-select {
      width: 100%;
    }
  }
  .green {
    background-color: rgba(215, 232, 212, 0.5);
  }
}
</style>
