<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form ref="roleFoem" :rules="rules" :model="user">
        <el-form-item label="角色名称" label-width="120px" prop="rolename">
          <el-input autocomplete="off" v-model="user.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px" prop="title">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="upDate">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleinfo,
  reqRoleedit,
} from "@/utils/http";
import { successAlert ,errorAlert } from "@/utils/alert";
export default {
  props: ["info"],
  methods: {
    closed() {
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    },
    upDate() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleedit(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
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
    cancel() {
      this.info.isshow = false;
    },
    getOne(id) {
      reqRoleinfo(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
      });
    },
    add() {
      this.$refs.roleFoem.validate((valid) => {
        if (valid) {
          this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          reqRoleAdd(this.user).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.list);
              this.cancel();
              //数据清空
              this.empty();
              //24 刷新list
              this.$emit("init");
            }
          });
        }else{
          errorAlert('添加失败')
        }
      });
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //把树清空
      this.$refs.tree.setCheckedKeys([]);
    },
  },
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [{ required: true, message: "这个是必填奥" }],
      },
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.data = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>