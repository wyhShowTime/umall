<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input autocomplete="off" v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-time-select
            placeholder="起始时间"
            v-model="user.begintime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="user.endtime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: user.begintime,
            }"
          >
          </el-time-select>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px">
          <el-select
            placeholder="请选择"
            v-model="user.first_cateid"
            @change="qq(user.first_cateid)"
          >
            <el-option label="顶级菜单" :value="0" disabled></el-option>
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in cateList"
              :key="item.catename"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" v-if="second">
          <el-select
            placeholder="请选择"
            v-model="user.second_cateid"
            @change="
              rr({
                first_cateid: user.first_cateid,
                second_cateid: user.second_cateid,
              })
            "
          >
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in second"
              :key="item.catename"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" v-if="second">
          <el-select placeholder="请选择" v-model="user.goodsid">
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in goodslist"
              :key="item.goodsname"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            :active-value="1"
            :inactive-value="2"
            v-model="user.status"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title === '添加分类'" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="xiu">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "@/utils/alert";
import { reqcateAdd, reqCateinfo, reqcateUpdate,reqSeckadd,reqgoodsList } from "@/utils/http";

import path from "path";
export default {
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      },
      second: [],
      goods: [],
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodslist: "goods/list",
    }),
  },
  methods: {
    rr(obj) {
      this.reqCon({fid:this.user.first_cateid,sid:this.user.second_cateid})
    },
    qq(pid) {
      if (this.user.first_cateid == 0) {
        this.second = "";
        return;
      }
      this.reqList();
      this.second = this.cateList.find((item) => item.id == pid).children;
    },
    ...mapActions({
      reqList: "cate/reqList",
      reqCon: "goods/reqList",
    }),
    xiu() {
      reqcateUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    getOne(id) {
      reqCateinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$imgPre + res.data.list.img;
        }
      });
    },
    empty() {
      this.user = {
        pid: "",
        catename: "",
        img: "",
        status: "",
      };
    },

    add() {
      console.log(this.user);
      reqSeckadd(this.user).then(res=>{
        if(res.data.code == 200){
          successAlert("添加成功");
          // this.cancel();
          // this.empty();
          // this.reqList();
        }
      })
      // reqcateAdd(this.user).then((res) => {
      //   if (res.data.code == 200) {
      //     successAlert("添加成功");
      //     this.cancel();
      //     this.empty();
      //     this.reqList();
      //   }
      // });
    },
  },
  mounted() {},
};
</script>

<style lang='stylus'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>