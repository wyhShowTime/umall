<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit='init' :table='list' @go='go'></v-list>
    <v-form :info='info' ref="form" @go='go'></v-form>
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
      this.info.title = '添加秒杀'
    },
    init(id){  
        this.info.isshow = true;
        this.info.title = '编辑秒杀'
        this.$refs.form.getOne(id)
    },
    go(){
      reqSecklist().then(res=>{
      if(res.data.code == 200){
        this.list = res.data.list
      }
    })
    }
  },
  mounted() {
    this.go()
  },
};
</script>

<style>
</style>