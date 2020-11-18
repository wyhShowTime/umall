<template>
  <div>
    <el-button type="primary" class="oneBtn" @click="willAdd">添加</el-button>
    <v-list @init="newInit" @edit="edit" :list="list"></v-list>
    <v-form :info="info" @init="newInit" ref="form"></v-form>
    <el-pagination
      background
      :total="total"
      @current-change="changePage"
      layout="prev, pager, next"
      :page-size="size"
    >
    </el-pagination>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { reqRolelist, reqUserList, reqUserCount } from "@/utils/http";
export default {
  data() {
    return {
      list: [],
      total: 0, //总数
      size: 2, //一页的数量
      page: 1, //页码
      info: {
        title: "添加角色",
        isshow: false,
      },
    };
  },
  components: {
    vList,
    vForm,
  },
  methods: {
    newInit() {
      this.init();
      this.getCount();
    },
    changePage(page) {
      this.page = page;
      this.init();
    },
    willAdd() {
      this.info.title = "添加角色";
      this.info.isshow = true;
    },
    // 53 获取总数
    getCount() {
      reqUserCount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    init() {
      //获取列表数据
      reqUserList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list ? res.data.list : [];

        // 56.如果取到的list是[],并且page>1,page自减，请列表
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }

        this.list = list;
      });
    },
    edit(uid) {
      (this.info.title = "编辑角色"), (this.info.isshow = true);
      this.$refs.form.getOne(uid);
    },
  },
  mounted() {
    this.init();
    this.getCount();
  },
};
</script>

<style lang='stylus'>
.oneBtn {
  margin: 15px 0 15px 0;
}
</style>