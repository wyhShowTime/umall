<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select placeholder="请选择" v-model="user.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input autocomplete="off" v-model="user.catename"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          label-width="120px"
          v-if="!(user.pid == '0')"
        >
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-error="changeFile2"
          >
            <img :src="imgUrl" v-if="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { reqcateAdd, reqCateinfo, reqcateUpdate } from "@/utils/http";

import path from "path";
export default {
  data() {
    return {
      imgUrl: "",
      user: {
        pid: null,
        catename: "",
        img: "",
        status: "",
      },
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
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
    changeFile2(err, e) {
      let file = e.raw;
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      let extname = path.extname(file.name); //'.jpg'
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式！");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    add() {
      if (this.user.img == "") {
        this.user.img = "null";
      }
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
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