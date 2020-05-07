<template>
  <div class="detailPage">
    <div class="main_mod">
      <h3 style="text-align:center">{{info.chaptername}}</h3>
      <div class="author">{{'作者：'+info.author}}</div>
      <div class="content">{{info.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info:{},
    };
  },
  created(){
    this.info = this.$route.query.info;
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
  border:1px solid rgba(92, 102, 164,1);
  .main_mod{
    margin: 20px 60px;
    .author {
        font-size: 15px;
        color: #969799;
        text-align: center;
      }
      .content{
        white-space: pre-wrap;
        word-wrap: break-word;
      }
  }
}
</style>