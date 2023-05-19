<template>
  <div class="login_container">
    <div>
      <el-row>
        <el-col :span="12" :xs="0">
          <h1 class="login_container_left">Hello Welcome</h1>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form
            class="login_form"
            :model="input_login"
            :rules="rules"
            ref="loginForms"
          >
            <h2>Please Login</h2>
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="input_login.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="input_login.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="el-btn"
                size="default"
                @click="login"
                :loading="isload"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import $router from "@/router";
import { ElNotification } from "element-plus";
//引入userStore
import useUserStore from "@/store/modules/user";
import { getTime } from "@/utils/gettime";
import type { FormRules } from "element-plus";
// 仓库 注意加括号useUserStore()
let userStore = useUserStore();
let input_login = reactive({
  username: "",
  password: "",
});
// 登录按钮加载动画
let isload = ref(false);
// 时间
let message = getTime();

//拿到表单实例
let loginForms = ref();

const validateUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback();
  } else {
    callback(new Error("用户名不得小于5位或长于10位"));
  }
};
const validateUserPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 11) {
    callback();
  } else {
    callback(new Error("密码不得小于6位或长于11位"));
  }
};
const login = async () => {
  isload.value = true;
  // 全部表单数据校验合格后才发请求
  await loginForms.value.validate();

  try {
    await userStore.userLogin(input_login);
    $router.push("/layout");
    ElNotification({
      type: "success",
      title: message,
      message: "欢迎回来",
      duration: 4000,
    });
    isload.value = false;
  } catch (error) {
    isload.value = false;
    $router.push("/");
    ElNotification({
      type: "error",
      message: "账号或密码错误",
      duration: 4000,
    });
  }
};
//校验规则  html代码里的正确使用的方法是 :rules 而非 :rule
const rules = reactive<FormRules>({
  username: [
    {
      // required: true, validator:validateUserName, min: 5, max: 10, message: '用户名不得小于5位或长于10位', trigger: 'change'
      required: true,
      validator: validateUserName,
    },
  ],
  password: [
    {
      // required: true, min: 6, max: 11, message: '密码不得小于6位或长于11位', trigger: 'change'
      required: true,
      validator: validateUserPassword,
    },
  ],
});
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/bc_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .login_container_left {
    -webkit-text-fill-color: transparent;
    font-size: 5rem;
    -webkit-text-stroke: 0.05rem #2f90b9;
    margin-top: 5%;
    margin-left: 5%;
  }
  .login_form {
    margin-left: 30%;
    width: 40%;
    top: 30vh;
    position: relative;
    border-radius: 1rem;
    // background-image: url("@/assets/images/login_bc.jpg");
    // background-repeat: no-repeat;
    // background-size: cover;
    .el-btn {
      width: 100%;
      background-color: inherit;
      font-size: 1rem;
      color: #fb8b05;
      border-color: none;
    }
    // h1 {
    //   -webkit-text-fill-color: transparent;
    //   font-size: 2rem;
    //   -webkit-text-stroke: 0.05rem #2f90b9;
    //   margin-bottom: 1rem;
    // }
    h2 {
      -webkit-text-fill-color: transparent;
      font-size: 1.5rem;
      -webkit-text-stroke: 0.03rem #2f90b9;
      margin-bottom: 1rem;
    }
  }
}
</style>
