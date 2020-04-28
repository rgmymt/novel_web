<template>
  <div class="login">
    <el-container>
      <el-header style="padding: 0px;height: auto;">
        <img src="../../assets/login-header.png" style="width: 100%;" />
      </el-header>
      <el-main style="margin-left: auto;margin-right: auto;padding-top: 20px;">
        <el-input
          style="width:300px;background-color: #4B56A5;padding-left: 35px;margin-bottom: 20px;"
          placeholder="请输入您的用户名"
          v-model="username"
        >
          <i
            slot="prefix"
            class="iconfont icon-yonghu-"
            style="font-size: 25px;line-height: 40px;color: #FFFFFF;"
          ></i>
        </el-input>
        <br />
        <el-input
          style="width: 300px;background-color: #4B56A5;padding-left: 35px;margin-bottom: 20px;"
          placeholder="请设置您的密码"
          v-model="password1"
          show-password
        >
          <i
            slot="prefix"
            class="iconfont icon-suo"
            style="font-size: 25px;line-height: 40px;color: #FFFFFF;"
          ></i>
        </el-input>
        <br />
        <el-input
          style="width: 300px;background-color: #4B56A5;padding-left: 35px;margin-bottom: 20px;"
          placeholder="请再次输入您的密码"
          v-model="password2"
          show-password
        >
          <i
            slot="prefix"
            class="iconfont icon-suo"
            style="font-size: 25px;line-height: 40px;color: #FFFFFF;"
          ></i>
        </el-input>
        <br/>
        <el-button type="text">
          <el-input
            style="width:150px;padding-left: 35px;background-color: #4B56A5;margin-bottom: 20px;"
            placeholder="输入验证码"
            v-model="checknum"
          >
            <i
              slot="prefix"
              class="iconfont icon-yanzheng"
              style="font-size: 25px;line-height: 40px;color: #FFFFFF;"
            ></i>
          </el-input>
          <canvas
            id="CAPTCHA"
            v-on:click="capOn"
            style="height: 39px;vertical-align:middle;width: 76px;margin-left: 10px;"
          ></canvas>
          <span v-on:click="capOn" style="color: #999999;width: 50px;font-size: 10px;">
            <span>换一张</span>
            <i class="iconfont icon-huanfang" style="font-size: 10px;line-height: 40px;"></i>
          </span>
          <br />
        </el-button>
        <br />
        <el-button
          type="primary"
          style="width: 165px;background-color:#4B56A5;border: 0px;"
          @click="register"
        >注册</el-button>
        <el-button
          type="primary"
          style="width: 165px;background-color:#E8E8E8 ;border: 0px;color: #000000;"
          @click="reset"
        >重置</el-button>
        <br />
        <el-button type="text" style="margin-top: 20px;color: #4B56A5;width: 100%;" @click="$router.push('/')">返回登录>></el-button>
      </el-main>
      <el-footer
        style="text-align: center;position: absolute;bottom: 0px;width: 100%;white-space: nowrap;color: #A7A7A7;font-size: 10px;line-height: 30px;"
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
var yanzhengma = "";
export default {
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      checknum: ""
    };
  },
  mounted() {
    yanzhengma = this.drawPic();
    console.log(yanzhengma);
  },
  methods: {
    reset() {
      this.username = "";
      this.password1 = "";
      this.password2 = "";
      this.checknum = "";
    },
    register() {
        if(this.username===''||this.password1===''||this.password2===''){
            this.$message.error('请输入完整信息')
            return
        }
        if(this.password1!==this.password2){
            this.$message.error('两次密码输入需保持一致')
            return
        }
        if(this.checknum!==yanzhengma){
            this.$message.error('验证码错误')
            return
        }
        const formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password1);
        this.$request({
          url: `${process.env.VUE_APP_API}/register`,
          method: "post",
          data: formData
        }).then(res => {
          this.$message.success("注册成功");
          this.$router.push({ path: "/" });
        });
    },
    randomNum: function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor: function(min, max) {
      var _r = this.randomNum(min, max);
      var _g = this.randomNum(min, max);
      var _b = this.randomNum(min, max);
      return "rgb(" + _r + "," + _g + "," + _b + ")";
    },
    drawPic: function() {
      var $canvas = document.getElementById("CAPTCHA");
      var _str = "0123456789"; //设置随机数库
      var _picTxt = ""; //随机数
      var _num = 4; //4个随机数字
      var _width = $canvas.width;
      var _height = $canvas.height;
      var ctx = $canvas.getContext("2d"); //获取 context 对象
      ctx.textBaseline = "bottom"; //文字上下对齐方式--底部对齐
      ctx.fillStyle = "#8998dc"; //填充画布颜色
      ctx.fillRect(0, 0, _width, _height); //填充矩形--画画
      for (var i = 0; i < _num; i++) {
        var x = ((_width - 10) / _num) * i + 10;
        var y = this.randomNum(_height / 2, _height);
        var deg = this.randomNum(-45, 45);
        var txt = _str[this.randomNum(0, _str.length)];
        _picTxt += txt; //获取一个随机数
        ctx.fillStyle = this.randomColor(10, 100); //填充随机颜色
        ctx.font = this.randomNum(40, 90) + "px SimHei"; //设置随机数大小，字体为SimHei
        ctx.translate(x, y); //将当前xy坐标作为原始坐标
        ctx.rotate((deg * Math.PI) / 180); //旋转随机角度
        ctx.fillText(txt, 0, 0); //绘制填色的文本
        ctx.rotate((-deg * Math.PI) / 180);
        ctx.translate(-x, -y);
      }
      for (var i = 0; i < _num; i++) {
        //定义笔触颜色
        ctx.strokeStyle = this.randomColor(90, 180);
        ctx.beginPath();
        //随机划线--4条路径
        ctx.moveTo(this.randomNum(0, _width), this.randomNum(0, _height));
        ctx.lineTo(this.randomNum(0, _width), this.randomNum(0, _height));
        ctx.stroke();
      }
      for (var i = 0; i < _num * 10; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        //随机画原，填充颜色
        ctx.arc(
          this.randomNum(0, _width),
          this.randomNum(0, _height),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
      return _picTxt; //返回随机数字符串
    },
    capOn(e) {
      e.preventDefault();
      yanzhengma = this.drawPic()
    }
  }
}
</script>
<style lang="less" scoped>
.login{
    /deep/.el-container{
      margin: 0px;
      position: relative;
      height: calc(100vh - 80px);
      min-height: 750px;
      box-sizing: border-box;
  }
}
</style>
<style>
.el-input__inner {
  border-radius: 0px;
  padding-left: 10px !important;
}
</style>
