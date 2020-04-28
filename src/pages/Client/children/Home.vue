<template>
  <div class="page">
    <div class="cell blue">
      <div class="cell_header">
        <span class="header__title">推荐小说</span>
        <span class="header__btn" @click="$router.push('/client/book')">更多></span>
      </div>
      <ul class="cell_list">
        <li v-for="(item,index) in recommedList" :key="index" @click="lookBook(item)">
          <p class="title">
            {{item.novelname?('《'+item.novelname+'》'):''}}
          </p>
        </li>
        <div class="none-notice" v-if="recommedList.length===0">暂无推荐小说</div>
      </ul>
    </div>
    <div class="cell yellow">
      <div class="cell_header">
        <span class="header__title">热门活动</span>
        <span class="header__btn" @click="$router.push('/client/activity')">更多></span>
      </div>
      <ul class="cell_list">
        <li v-for="(item,index) in activityList" :key="index" @click="lookActivity(item)">
          <p class="title">
            {{item.acttitle}}
            <span class="location">{{item.location}}</span>
          </p>
        </li>
        <div class="none-notice" v-if="activityList.length===0">暂无活动</div>
      </ul>
    </div>
    <div class="cell pink">
      <div class="cell_header">
        <span class="header__title">言悦论坛</span>
        <span class="header__btn" @click="$router.push('/client/post')">进入></span>
      </div>
      <ul class="cell_list">
        <li v-for="(item,index) in postList" :key="index" @click="lookPost(item)">
          <p class="title">{{item.posttitle}}</p>
          <div class="detail">
            <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div>
            <div class="poster">{{item.writername}}</div>
          </div>
        </li>
        <div class="none-notice" v-if="postList.length===0">暂无通知</div>
      </ul>
    </div>
    <div class="cell green">
      <div class="cell_header">
        <span class="header__title">新闻通知</span>
        <span class="header__btn" @click="$router.push('/client/news')">更多></span>
      </div>
      <ul class="cell_list">
        <li v-for="(item,index) in newsList" :key="index" @click="lookNews(item)">
          <!--            <p class="title">{{item.name}}<span class="new" v-if="dayjs().isBefore(dayjs(item.publishTime).add(3, 'day'))">NEW</span></p>-->
          <p class="title">
            {{item.newstitle}}
          </p>
          <div class="detail">
            <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div>
          </div>
        </li>
        <div class="none-notice" v-if="newsList.length===0">暂无通知</div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      activityList:[],
      recommedList:[],
      postList:[]
    };
  },
  created(){
    this.getNewsList()
    this.getActivityList()
    this.getRecommedList()
    this.getPostList()
  },
  methods: {
    getNewsList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/news/pagesAll`,
        method: "get",
        params: {
          page: 1,
          size: 5
        }
      }).then(res => {
          this.newsList = res.list
      })
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
    getActivityList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/pagesAll`,
        method: "get",
        params: {
          page: 1,
          size: 8
        }
      }).then(res => {
          this.activityList = res.list
      })
    },
    lookActivity(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/getOne`,
        method: "get",
        params:{
          actId:item.actid
        }
      }).then(res => {
        this.$router.push({path:'/common/activityDetail',query:{info:JSON.stringify(res[0])}})
      })
    },
    getRecommedList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/recommend/recommendPages`,
        method: "get",
        params: {
          page: 1,
          size: 8
        }
      }).then(res => {
        this.recommedList=res.list
      })
    },
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
    getPostList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/post/pagesApart`,
        method: "get",
        params: {
          page: 1,
          size: 5,
          postType: "交流分享"
        }
      }).then(res => {
        this.postList = res.list
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
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  display: flex;
  .cell {
    width: 25%;
    height: 370px;
    padding: 0 30px;
    margin: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    .cell_header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      height: 40px;
      user-select: none;
      .header__title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        position: relative;
      }
      .header__title:before {
        position: absolute;
        top: 2px;
        left: -10px;
        width: 4px;
        height: 16px;
        background: rgba(2, 144, 255, 1);
        border-radius: 3px;
        content: "";
      }
      .header__btn {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        cursor: pointer;
        position: relative;
      }
    }
    .cell_list {
      padding: 0px;
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
      .title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-bottom: 4px;
        margin-top: 13px;
        word-break: break-word;
        .location {
          display: inline-block;
          height: 16px;
          line-height: 16px;
          border:1px solid #1989fa;
          border-radius: 2px;
          font-size: 12px;
          color: #1989fa;
          text-align: center;
          margin-left: 10px;
          padding: 2px 3px;
          transform: scale(0.83);
        }
      }
      .detail {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin: 0px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .blue{
    background-color: rgba(194, 224, 230, 0.5);
  }
  .yellow{
    background-color: rgba(254, 228, 205, 0.5);
  }
  .pink{
    background-color: rgba(247, 231, 232, 0.5);
  }
  .green{
    background-color: rgba(215, 232, 212, 0.5);
  }
}
</style>
