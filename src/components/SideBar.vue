<template>
  <div id="SideBar">
    <aside class="menu">
      <ul class="menu-list">
        <router-link to="/" exact-active-class="is-active" class="fas fa-home"><span>Dashboard</span></router-link>
        <router-link to="/accounts" exact-active-class="is-active" class="fas fa-credit-card"><span>Accounts</span></router-link>
        <router-link to="/bookmarks" exact-active-class="is-active" class="fas fa-star"><span>Bookmarks</span></router-link>
        <router-link to="/payment-logs" exact-active-class="is-active" class="fas fa-low-vision"><span>Payment&nbsp;Logs</span></router-link>
<!--         <router-link to="/payment" exact-active-class="is-active" class="fas fa-credit-card"><span>Make&nbsp;Payment</span></router-link>
 -->        <hr>
        <router-link to="/settings" class="fas fa-cog"><span>Settings</span></router-link>
      </ul>
    </aside>
  </div>
</template>

<script>
  import {eventBus} from "../main";

  export default {
    name: "SideBar",
    props: ['isSideBar']

  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";

  $menu-item-active-color : $info ;
  $menu-item-active-background-color : $background;

  @import "~bulma/sass/components/menu";
  @import "~bulma/sass/base/all";
  //@import "~bulma/bulma";

  .menu {
    margin-top: 20px;
  }

  #SideBar {
    top: 50px;
    width: 0px;
    height: 100%;
    position: fixed;
    display: inline-block;
    overflow-x: hidden;
    left: 0;
    border-right: 1px solid gainsboro;
    transition: width .2s ease-out;


    a {
      padding-bottom: 18px;
      padding-top: 18px;
      padding-left: 35px
    }
  }

  ul span {
    margin-left: 20px;
    font-family: 'Courier New', Courier, monospace
  }
</style>
