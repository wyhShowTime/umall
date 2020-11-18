<template>
  <div>
    <el-dialog :visible.sync="info.isshow">
      <el-form ref="formName">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="formCon.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="formCon.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="formCon.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="formCon.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberedit } from "@/utils/http";
import {successAlert} from '@/utils/alert'
export default {
  props: ["info", "formCon"],
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    ok() {
      reqMemberedit(this.formCon).then((res) => {
          if(res.data.code == 200){
              successAlert('编辑成功');
              this.cancel();
              this.$emit('edit')
          }
      });
    },
  },
};
</script>

<style>
</style>