<template>
  <div>
      <el-table
      :data="table"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="" v-if='scope.row.img !== "null"'>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
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
import {mapActions,mapGetters} from 'vuex';
import {reqCatedelete} from '@/utils/http';
import {successAlert} from '@/utils/alert'
export default {
  props:['table'],
    methods:{
        
        del(id){
          reqCatedelete(id).then(res=>{
            if(res.data.code == 200){
              successAlert('删除成功');
              this.reqList()
            }
          })
        },
        edit(id){
           this.$emit("edit",id)
        }
    },
    computed:{
       
    },
    mounted() {
    
        console.log(this.table,'================') 
    },
}
</script>

<style lang='stylus'>
img 
    width 100px
    height 80px
</style>