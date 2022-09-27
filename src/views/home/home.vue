<template>
  <el-container class="home_container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../../assets/heima.png" alt="" />
        <span>赵戳戳</span>
      </div>
      <el-button @click="qiutBtn" size="mini">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container >
      <!-- 左侧菜单 -->
      <el-aside :width="iscollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <el-menu :router="true" :collapse="iscollapse" :collapse-transition="false" background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true">
          <!-- 一级菜单 -->
          <el-submenu :index="'/'+item.path" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+row.path" v-for="row in item.children" :key="row.id">
              <i class="el-icon-menu"></i>
              <span>{{item.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- 放一个路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      iscollapse: false
    }
  },
  created () {
    // 获取菜单
    this.getMenuList()
  },
  methods: {
    // 查询菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status === 200) {
        this.menuList = res.data
      }
    },
    // 退出系统
    qiutBtn () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 控制菜单的折叠展开
    toggleCollapse () {
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background: #333744;
  .el-menu{
    border-right:none;
  }
}
.el-main {
  background: #eaedf1;
}

.home_container {
  height: calc(100vh);
}
.toggle-button{
  background: #4a5064;
  color:#fff;
  font-size:10px;
  line-height:24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
