<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit='init' :table='list'></v-list>
    <v-form :info='info' ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import {reqSecklist} from '@/utils/http'
export default {
  data(){
    return {
      info: {
        isshow: false,
        title:"添加分类"
      },
      list:[]
    }
  },
  components: {
    vList,
    vForm,
  },
  methods:{
    willAdd(){
      this.info.isshow = true;
    },
    init(id){  
        this.info.isshow = true;
        this.info.title = '编辑分类'
        this.$refs.form.getOne(id)
    }
  },
  mounted() {
    reqSecklist().then(res=>{
      if(res.data.code == 200){
        this.list = res.data.list
      }
    })
  },
};
</script>

<style>
</style>