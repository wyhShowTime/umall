<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form ref="formName">
        <el-form-item label="所属角色" label-width="120px" prop="title">
          <el-select placeholder="请选择" v-model="user.roleid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 23 list遍历 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px" prop="title">
          <el-input autocomplete="off" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="title">
          <el-input autocomplete="off" v-model="user.password"></el-input>
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
        <el-button type="primary" @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title == '添加角色'" @click="add"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRolelist,
  reqUserList,
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate,
} from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  data() {
    return {
      list: [],
      user: {
        roleid: null,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  props: ["info"],
  methods: {
    add() {
      console.log(this.user);
      reqUserAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    cancel() {
      this.info.isshow = false;
    },
    getOne(uid) {
      reqUserDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    update() {
      reqUserUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
    closed() {
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    },
  },
  mounted() {
    reqRolelist().then((res) => {
      if (res.data.code == 200) {
        this.list = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>