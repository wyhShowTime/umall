<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules" ref="seckForm">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input autocomplete="off" v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-time-picker
            is-range
            v-model="value1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
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
        <el-form-item
          label="二级分类"
          label-width="120px"
          v-if="second"
          prop="second_cateid"
        >
          <el-select
            placeholder="请选择"
            v-model="user.second_cateid"
            @change="rr"
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
        <el-form-item
          label="商品"
          label-width="120px"
          v-if="second"
          prop="goodsid"
        >
          <el-select placeholder="请选择" v-model="user.goodsid">
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in goodslist"
              :key="item.id"
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
        <el-button type="primary" v-if="info.title === '添加秒杀'" @click="add"
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
import {
  reqcateAdd,
  reqCateinfo,
  reqcateUpdate,
  reqSeckadd,
  reqgoodsList,
  reqSeckinfo,
  reqSeckedit,
} from "@/utils/http";

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
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "这个是必填奥" }],
        first_cateid: [{ required: true, message: "这个也是必选奥" }],
        second_cateid: [{ required: true, message: "这个也得必选" }],
        goodsid: [{ required: true, message: "这个也得选" }],
      },
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      second: [],
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
    rr() {
      this.reqCon({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      });
    },
    qq() {
      if (this.user.first_cateid == 0) {
        this.second = "";
        return;
      }

      this.second = this.cateList.find(
        (item) => item.id == this.user.first_cateid
      ).children;
    },
    ...mapActions({
      reqList: "cate/reqList",
      reqCon: "goods/reqList",
      clearList: "goods/clearList",
    }),
    getOne(id) {
      reqSeckinfo(id).then((res) => {
        let _this = this;
        if (res.data.code == 200) {
          this.user = res.data.list;

          this.user.id = id;
          this.qq();
          this.rr();
          let d = new Date();
          this.value1 = [
            new Date(Number(res.data.list.begintime)),
            new Date(Number(res.data.list.endtime)),
          ];
        }
      });
    },
    xiu() {
      this.user.begintime = this.value1[0].getTime();
      this.user.endtime = this.value1[1].getTime();
      reqSeckedit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("go");
        }
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      };
    },
    add() {
      this.$refs.seckForm.validate((valid) => {
        if (valid) {
          this.user.begintime = this.value1[0].getTime();
          this.user.endtime = this.value1[1].getTime();
          reqSeckadd(this.user).then((res) => {
            if (res.data.code == 200) {
              successAlert("添加成功");
              this.cancel();
              this.empty();
              this.$emit("go");
            }
          });
        }else{
          errorAlert('添加失败')
        }
      });
    },
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "编辑秒杀") {
        this.empty();
        this.goods = [];
        this.second = [];
        this.clearList();
      }
    },
  },
  mounted() {
    this.reqList();
  },
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