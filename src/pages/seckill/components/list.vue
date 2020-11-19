<template>
  <div>
    <el-table
      :data="table"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqCatedelete, reqSeckdelete } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  props: ["table"],
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
      reqCon: "goods/reqList",
      
    }),
    del(id) {
      reqSeckdelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.$emit('go')
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodslist: "goods/list",
    }),
  },
};
</script>

<style lang='stylus'>
img {
  width: 100px;
  height: 80px;
}
</style>