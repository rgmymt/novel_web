<template>
  <div class="main_page">
    <el-container>
      <el-header class="header" style="height: 250px;">
        <div class="Bar">
          <div class="icon">
            <img src="../../assets/icon/logo.png" style="margin: 10px auto;height:40px" />
            <span class="text">
              <b>言悦文学</b>
            </span>
          </div>
          <div class="handler">
            <div class="menu">
              <span class="menu_item active" @click="menuChange(0)">首页</span>
              <span class="menu_item" @click="menuChange(1)">书库</span>
              <span class="menu_item" @click="menuChange(2)">新闻通知</span>
              <span class="menu_item" @click="menuChange(3)">活动</span>
              <span class="menu_item" @click="menuChange(4)">论坛</span>
              <span class="menu_item" @click="menuChange(5)">
                <i class="el-icon-user" style="font-size:18px"></i>
                {{user.username}}
                <el-tag effect="plain" size="mini">{{ user.iswriter|iswriter }}</el-tag>
              </span>
            </div>
            <div class="exit" @click="exit">
              <i
                class="iconfont icon-tuichu"
                style="font-size: 25px;line-height: 40px;color: #FFFFFF;"
              ></i>
              <span style="color: #FFFFFF;font-size: 15px;margin-left: 5px;">退出</span>
            </div>
          </div>
        </div>
      </el-header>
      <router-view></router-view>
      <el-footer
        style="text-align: center;position: absolute;bottom: 0px;width: 100%;height:auto;white-space: nowrap;color: #A7A7A7;font-size: 10px;line-height: 30px;"
      >
        <div>客服电话: 0371-77777 在线Q: 8888888</div>
        <div>言悦文学是一个集小说阅读和小说创作为一体的服务平台。</div>
        <div>地址: XXXXXXX</div>
        <div>www. yanyuewenxue. com 版权所有言悦文学 备案号粤ICP备10054973号-5</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
      },
      menuList: [
        {
          name: "首页",
          link: "/client/home"
        },
        {
          name: "书库",
          link: "/client/book"
        },
        {
          name: "新闻通知",
          link: "/client/news"
        },
        {
          name: "活动",
          link: "/client/activity"
        },
        {
          name: "论坛",
          link: "/client/post"
        },
        {
          name: "个人中心",
          link: "/client/mine"
        }
      ]
    };
  },
  watch:{
    $route(to,from){
      this.changeActive(to.path)
    }
  },
  methods: {
    exit() {
      this.$router.push({ path: "/" });
    },
    menuChange(num) {
      this.$router.push({ path: this.menuList[num].link });
    },
    changeActive(path){
      for(let i = 0;i<this.menuList.length;i++){
        if(path === this.menuList[i].link){
          let btns = document.getElementsByClassName("menu_item");
          for (let j = 0; j < btns.length; j++) {
            btns[j].className = "menu_item";
          }
          btns[i].className = "menu_item active";
          break
        }
      }
    },
    getUserInfo() {
      this.$request({
        url: `${process.env.VUE_APP_API}/userInfo`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.user = res
      })
    },
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
  },
  mounted() {
    this.getUserInfo()
  },
  beforeRouteEnter (to, from, next) {
    next(instance => {
      instance.changeActive(to.path)
    })
  },
};
</script>
<style lang="less" scoped>

.main_page {
  position: relative;
  min-height: 830px;
  /deep/.el-container {
  margin: 0px;
  height: 100vh;
}
  /deep/.el-header{
    padding: 0px;
  }
  // height: 100vh;
  // background-color: #f7f8fa;
  .header {
    background-image: url(../../assets/headerbg.jpg);
    background-size: cover;
    .Bar {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 100px;
      background-image: linear-gradient(rgba(121, 136, 239, 0.5),rgba(121, 136, 239, 0));
      .icon {
        display: flex;
        .text {
          font-size: 25px;
          color: #ffffff;
          margin-left: 20px;
          line-height: 60px;
          white-space: nowrap;
        }
      }
      .handler {
        display: flex;
        .menu {
          margin-right: 30px;
          .menu_item {
            cursor: pointer;
            font-size: 15px;
            color: #ffffff;
            margin-left: 20px;
            line-height: 60px;
            white-space: nowrap;
            text-align: center;
            /deep/.el-tag--plain{
              background: none;
              color: #fbf751;
              border-color:#fbf88b;
              margin-left: 5px;
            }
          }
          .active {
            color: #fcff5b;
            font-size: 20px;
          }
        }
        .exit {
          line-height: 60px;
        }
      }
    }
  }
}
</style>
