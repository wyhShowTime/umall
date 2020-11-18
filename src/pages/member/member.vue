<template>
  <div>
    <v-list :list="list" class="table" @edit="edit"></v-list>
    <v-form :info="info" :formCon="formCon" @edit='init'></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { reqMemberlist, reqMemberinfo } from "@/utils/http";
import { reqRolelist } from "../../utils/http";
export default {
  methods: {
    edit(uid) {
      reqMemberinfo(uid).then((res) => {
        this.formCon = res.data.list;
        this.info.isshow = true;
        this.formCon.password = "";
        this.formCon.uid = uid;
      });
    },
    init() {
      reqMemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
  },
  data() {
    return {
      list: [],
      info: {
        isshow: false,
      },
      formCon: {},
    };
  },
  components: {
    vList,
    vForm,
  },
  mounted() {
    this.init()
  },
};
</script>

<style lang='stylus'>
.table {
  margin-top: 20px;
}
</style>