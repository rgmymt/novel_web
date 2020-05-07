<template>
  <div class="page">
    <div class="news_box yellow">
      <div class="creat_post" @click="addActivity=true">
        发起活动
        <i class="el-icon-place"></i>
      </div>
      <ul class="cell_list">
        <li v-for="(item,index) in activityList" :key="index" @click="lookActivity(item)">
          <div class="line">
            <div class="title">
              <!-- <div class="dot"></div> -->
              {{item.acttitle}}
              <div class="detail">
                <div class="time">{{item.location }}</div>
                <div class="poster">{{item.organizer}}</div>
              </div>
            </div>
            <div class="time">{{item.createtime ? util.formatDateTime(item.createtime) : ''}}</div>
          </div>
        </li>
        <div class="none-notice" v-if="activityList.length===0">暂无活动</div>
      </ul>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total,->, prev, pager, next, jumper"
        :total="total"
        :page-size="size"
      ></el-pagination>
    </div>
    <!-- 创建活动弹窗 -->
    <el-dialog title="发起活动" :visible.sync="addActivity" width="50%" center>
      <el-form ref="form" :model="actForm" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="actForm.activityTitle"></el-input>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="actForm.activityPos"></el-input>
        </el-form-item>
        <el-form-item label="活动说明">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="actForm.activityCon"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAct">取 消</el-button>
        <el-button type="primary" @click="sumbitAct">创 建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addActivity: false,
      total: 0,
      activityList: [],
      actForm: {
        activityTitle: "",
        activityPos: "",
        activityCon: ""
      },
      page: 1,
      size: 5
    };
  },
  created() {
    this.getActivityList();
  },
  methods: {
    getActivityList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        this.total = res.total;
        this.activityList = res.list;
      });
    },
    lookActivity(item) {
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/getOne`,
        method: "get",
        params: {
          actId: item.actid
        }
      }).then(res => {
        this.$router.push({
          path: "/common/activityDetail",
          query: { info: JSON.stringify(res[0]) }
        });
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getActivityList();
    },
    cancelAct() {
      this.initActForm()
      this.addActivity =false
    },
    sumbitAct() {
      if(this.actForm.activityTitle === ''||this.actForm.activityPos === ''||this.actForm.activityCon === ''){
        this.$message.error('请填入完整信息');
        return
      }
      const formData = new FormData();
      formData.append("actTitle", this.actForm.activityTitle);
      formData.append("location", this.actForm.activityPos);
      formData.append("description", this.actForm.activityCon);
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/insert`,
        method: "post",
        data: formData
      }).then(res => {
        this.$message.success('创建成功');
        this.addActivity = false
        this.initActForm()
        this.getActivityList()
      });
    },
    initActForm(){
      this.actForm.activityTitle=''
      this.actForm.activityPos=''
      this.actForm.activityCon=''
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  .news_box {
    margin: 10px;
    border: 1px solid rgba(254, 228, 205, 1);
    border-radius: 10px;
    //width: 100%;
    height: 450px;
    box-sizing: border-box;
    .creat_post {
      cursor: pointer;
      margin-top: 10px;
      line-height: 20px;
      margin-left: 20px;
      font-size: 14px;
      i {
        margin-left: 5px;
        font-size: 16px;
      }
    }
    .cell_list {
      padding: 0 10px;
      margin: 0px;
      overflow-y: auto;
      height: calc(100% - 65px);
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
        align-items: baseline;
        margin-bottom: 4px;
        margin-top: 13px;
        .title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          word-break: break-word;
          .detail {
            display: flex;
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 12px;
            margin: 0px;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            margin-top: 13px;
            .poster {
              border-left: 1px #999999 solid;
              margin-left: 5px;
              padding-left: 5px;
            }
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
  }
  .yellow {
    background-color: rgba(254, 228, 205, 0.5);
  }
}
</style>
