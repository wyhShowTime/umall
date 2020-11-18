<template>
  <div>
      <el-button type="primary" class="oneBtn" @click="willAdd">添加</el-button>
      <v-list :list='list' @init='init' @edit='edit'></v-list>
      <v-form :info='info' @init='init' ref="form"></v-form>
  </div>
</template>

<script>
import vList from './components/list';
import vForm from './components/form'
import {reqRolelist} from '@/utils/http'
export default {
  data(){
    return{
      list:[],
      info:{
        title:"添加角色",
        isshow:false
      }
    }
  },
  components:{
    vList,vForm
  },
  methods:{
    willAdd(){
      this.info.title = '添加角色';
      this.info.isshow = true;
    },
    init() {
      reqRolelist().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id){
      this.info.title = '编辑角色',
      this.info.isshow = true;
      this.$refs.form.getOne(id)
    }
  },
  mounted(){
    reqRolelist().then(res=>{
      if(res.data.code == 200){
        this.list = res.data.list
      }
    })
  }
}
</script>

<style lang='stylus'>
.oneBtn
  margin 15px 0 15px 0
</style>