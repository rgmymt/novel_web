<template>
  <div class="page">
    <div class="news_box blue">
      <div class="headBar">
        <span>标签分类：</span>
        <el-select v-model="tagName" filterable clearable  placeholder="请选择" @change="tagChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      </div>
      <el-divider>{{tagName===''?'推荐':tagName}}</el-divider>
      <ul class="cell_list">
        <li v-for="(item,index) in bookList" :key="index" @click="lookBook(item)">
          <div class="line">
            <div class="line_left">
              <div class="title">
              {{item.novelname?('《 '+item.novelname+' 》'):''}}
              </div>
            </div>
          </div>
        </li>
        <div class="none-notice" v-if="bookList.length===0">暂无作品</div>
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
      tagName:'',
      options:[],
      tagList:[],
      bookList:[],
      page: 1,
      size: 8
    };
  },
  created() {
    this.gettagList()
    this.getRecommedList();
  },
  methods: {
    getRecommedList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/recommend/recommendPages`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        this.bookList=res.list
        this.total = res.total
      })
    },
    handleCurrentChange(val){
      this.page = val
      if(this.tagName === ''){
        this.getRecommedList()
      }else{
        this.getnovelList()
      }
    },
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
		tagChange() {
      if(this.tagName === ''){
        this.getRecommedList()
      }else{
        this.getnovelList()
      }
    },
    //获取小说列表
    getnovelList() {
			console.log(process.env.VUE_APP_API)
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/pagesByType`,
        method: "get",
        params: {
          typeName: this.tagName,
          page: this.page,
          size: this.size
        }
      }).then(res => {
				this.bookList = res.list
				this.total = res.total
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
  }
}
</script>
<style lang="less" scoped>
.page {
  .news_box {
    margin: 10px;
    border: 1px solid rgba(194, 224, 230, 1);
    border-radius: 10px;
    //width: 100%;
    height: 450px;
    .headBar{
      display: flex;
      align-items: baseline;
      margin-top: 8px;
      padding: 0 30px;
      /deep/.el-select{
        width:200px;
        .el-input__inner{
          background:none;
        }
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
      height: calc(100% - 115px);
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
  }
  .blue{
    background-color: rgba(194, 224, 230, 0.5);
  }
}
</style>
