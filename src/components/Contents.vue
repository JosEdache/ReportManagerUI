<template>
  <div id="Contents">
    <div class="container is-fluid">
      <transition appear mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Contents",
    data: function () {
      return {
        show: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/container";

  #Contents {
    margin-left: 0px;
    transition: margin-left .2s;
  }

  .v-enter {
    opacity: 0;
  }

  .v-enter-active {
    transition: opacity .3s;
  }

  .v-leave {

  }

  .v-leave-active {
    transition: opacity .3s;
    opacity: 0;
  }


</style>
