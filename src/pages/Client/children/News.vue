<template>
  <div class="page">
    <div class="news_box green">
      <ul class="cell_list">
        <li v-for="(item,index) in newsList" :key="index" @click="lookNews(item)">
          <div class="line">
            <div class="title">
              <div class="dot"></div>
              {{item.newstitle}}
            </div>
            <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div>
          </div>
        </li>
        <div class="none-notice" v-if="newsList.length===0">暂无通知</div>
      </ul>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total,->, prev, pager, next, jumper"
        :total="total"
        :page-size="size">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      newsList: [],
      page: 1,
      size: 10
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/news/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        this.total = res.total
        this.newsList = res.list;
      });
    },
    handleCurrentChange(val){
      this.page = val
      this.getNewsList()
    },
    lookNews(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/news/getOne`,
        method: "get",
        params:{
          newsId:item.newsid
        }
      }).then(res => {
        this.$router.push({path:'/common/newsDetail',query:{info:JSON.stringify(res[0])}})
      })
    },
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
    .cell_list {
      padding: 0 10px;
      margin: 0px;
      overflow-y: auto;
      height: calc(100% - 45px);
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
        .title {
          display: flex;
          align-items: baseline;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          word-break: break-word;
          .dot{
            width: 10px;
            height: 10px;
            border-radius: 8px;
            background-color: #333;
            margin: 0 10px;
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
  }
  .green {
    background-color: rgba(215, 232, 212, 0.5);
  }
}
</style>
