<template>
  <div class="detailPage">
    <div class="activity_title">{{info.acttitle}}</div>
    <div class="other_info">
      <div class="line">组织者：<span>{{info.organizer}}</span></div>
      <div class="line">活动地点：<span>{{info.location}}</span></div>
      <div class="line">发布时间：<span>{{util.formatDateTime(info.createtime)}}</span></div>
      <div class="line">活动说明：</div>
      <div class="description">{{info.description}}</div>
    </div>
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

  .activity_title{
    font-size: 30px;
    text-align: center;
    line-height: 60px;
  }
  .other_info{
    margin: 20px 60px;
    .line{
      line-height: 60px;
      font-size: 20px;
      //font-weight: 600;
    }
    .description{
      padding: 0 20px;
      line-height: 40px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}
</style>