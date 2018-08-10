<template>
  <div id="SideBar">
    <aside class="menu">
      <ul class="menu-list">
        <router-link to="/" exact-active-class="is-active" class="fas fa-home"><span>Dashboard</span></router-link>
        <router-link to="/accounts" exact-active-class="is-active" class="fas fa-credit-card"><span>Accounts</span></router-link>
        <router-link to="/bookmarks" exact-active-class="is-active" class="fas fa-star"><span>Bookmarks</span></router-link>
        <router-link to="/payment-logs" exact-active-class="is-active" class="fas fa-low-vision"><span>Payment&nbsp;Logs</span></router-link>
         <router-link to="/receipt" exact-active-class="is-active" class="fas fa-credit-card"><span>Make&nbsp;Payment</span></router-link>
         <hr>
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

<style lang="scss" scoped src="../sass/side-bar.scss">

</style>
