<template>
  <div>
    <!-- 21.展示list -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        sortable
      ></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { reqUserDel } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props:['list'],
  methods: {
    del(uid) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqUserDel(uid).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.$emit("init");
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          console.log("你点了取消");
        });
    },
    edit(uid) {
      this.$emit("edit",uid);
    },
  },
  mounted() {
   
  },
};
</script>

<style>
</style>