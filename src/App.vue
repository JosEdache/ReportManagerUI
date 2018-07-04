<template>
  <div id="app">
    <app-nav-bar/>
    <app-side-bar/>
    <app-content/>
    <app-create-account @creatAccount/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'
  import SideBar from './components/SideBar'
  import Content from './components/Contents'
  import CreateAccount from './components/CreateAccount'

  export default {
    name: 'App',
    components: {
      'app-nav-bar': NavBar,
      'app-side-bar': SideBar,
      'app-content': Content,
      'app-create-account': CreateAccount
    },
    data() {
      return {
        isSideBar : false,
        isCreateAccount : false
      }
    }
  }
</script>

<style lang="scss" scoped>

  #app {
    position: relative;
    top: 60px;
  }
</style>
