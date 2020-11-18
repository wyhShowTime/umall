<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <div class="line">
        <el-input
          v-model="user.username"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </div>
      <div class="line">
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          clearable
          show-password
        ></el-input>
      </div>
      <div class="last">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "@/utils/http";
import { successAlert } from "@/utils/alert";
export default {
  data() {
    return {
      // 2.初始化
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      "changeUser":"changeUser"
    }),
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("登陆成功");

          //存入vuex
          this.changeUser(res.data.list);
          //跳页面
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style lang="stylus" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #423a53, #2f3d60);
}

.con {
  width: 400px;
  height: 250px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  padding: 20px;

  h3 {
    margin-bottom: 20px;
  }

  .line {
    margin-bottom: 20px;
  }

  .last {
    .el-button {
      width: 100%;
    }
  }
}
</style>