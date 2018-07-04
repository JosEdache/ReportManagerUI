<template>
  <div id="checked-bar">
    <nav id="nav-bar" class="navbar is-fixed-top">
      <div class="navbar-brand">
        <div class="navbar-item">
        <span class="icon" @click="$emit('removeCheckedItems')">
          <i class="fas fa-arrow-left"/>
        </span>
        </div>
        <div class="navbar-item">
          <span style="font-family: 'Courier New', Courier, monospace">BACK</span>
        </div>
      </div>
      <div class="navbar-item" style="margin-left: 450px">
        <span style="font-family: 'Courier New', Courier, monospace">
          <input type="checkbox" ref="checkbox" @click="$emit('toggleCheck')" />
          Selected {{checkedItemLength}}
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "CheckedBar",
    props: ['checkedItemLength'],
    methods: {
      toggle() {
        if (this.checkedItemLength > 0) {
          this.$refs.checkbox.setAttribute('checked', '')
        }else this.$refs.checkbox.removeAttribute('checked')
      }
    },
    updated() {
      //this.toggle()
    },
    mounted() {
      //this.toggle()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/all";

  $navbar-background-color: #e1f5fe;
  $navbar-height: 4rem;

  @import "~bulma/sass/components/navbar";
  @import "~bulma/sass/elements/form";
  @import "~bulma/sass/elements/icon";
  @import "~bulma/sass/elements/button";

  .fas:hover {
    cursor: pointer;
  }

  input[type=checkbox] {
    cursor: pointer;
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
