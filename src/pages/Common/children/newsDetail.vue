<template>
  <div class="detailPage">
    <div class="news_title">{{info.newstitle}}</div>
    <div class="other_info">
      <div class="author">{{info.writer}}</div>
      <div class="time">{{util.formatDateTime(info.createtime)}}</div>
    </div>
    <div class="description">{{info.newscontent}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created(){
    this.info = JSON.parse(this.$route.query.info)
  },
  methods:{
  }
}
</script>
<style lang="less" scoped>
.detailPage{
  margin: 20px 60px;
  //min-height: 500px;
  background: rgba(92, 102, 164,0.1);
  border:5px solid rgba(92, 102, 164,1);
  border-radius: 20px;
  .news_title{
    font-size: 30px;
    text-align: center;
    line-height: 60px;
  }
  .other_info{
    display: flex;
    //justify-content: space-between;
    width: auto;
    font-size: 15px;
    color: #999;
   .author{
      font-size: 15px;
      margin-right: 20px;
      color: #999;
      width: 50%;
      text-align: right;
    }
  }
  .description{
    margin: 20px 60px;
      padding: 0 20px;
      line-height: 40px;
    }
}
</style>