<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="">
      </div>
      <!-- 登陆表单 -->
      <el-form :model="loginFrom" ref="loginFormRef" :rules="loginFromRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginFrom.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="butns">
          <el-button size="mini" type="primary" @click="logonFormBtn">登 录</el-button>
          <el-button size="mini" @click="resetLoginForm()">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据对象
      loginFrom: {
        username: 'zhaoning',
        password: '123456'
      },
      // 表单验证
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    logonFormBtn () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginFrom)
          if (res.meta.status === 200) {
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('home')
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'warning'
            })
          }
        }
      })
    },
    // 点击重置按钮，重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container{
  background:#2b4b6b;
  height:calc(100vh);
}
.login_box{
  width:450px;
  height:300px;
  background: #fff;
  position:absolute;
  top: 50%;
  left: 50%;
  border-radius: 3px;
  transform: translate(-50%,-50%);  // 位移
}
.avatar_box{
  width: 130px;
  height: 130px;
  border: 1px solid #111;
  border-radius: 50%;
  padding:10px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  img{
    width:100%;
    height:100%;
    background:#eee;
    border-radius: 50%;
  }
}
.login_form{
  position:absolute;
  bottom:0;
  width:100%;
  padding:0 25px;
  box-sizing: border-box;
}
.butns{
  display: flex;
  justify-content: flex-end;
}
</style>
