<template>
  <nav id="nav-bar" class="navbar is-fixed-top">
      <div style="margin-left: 30px">
        <span class="icon" @click="openSideBar">
          <i class="fas fa-bars"></i>
        </span>
      </div>

      <div style="width: 60%;">
        <div class="field has-addons">
          <div class="control" style="width: 50%">
            <auto-complete
              input-class="input is-medium"
              source="http://localhost:8080/accounts/paymentlog/suggestion?q="
              results-display="autocomplete"
              results-value="autocomplete">
            </auto-complete>
          </div>
          <div class="control">
            <a class="button is-medium">
              Search
            </a>
          </div>
        </div>
      </div>

      <div style="margin-right: 30px">
        <span class="icon" @click="createAccount">
          <i class="fas fa-user-plus"></i>
        </span>
      </div>
  </nav>
</template>

<script>
  import AutoComplete from 'vuejs-auto-complete'
  import {eventBus} from "../main";

  export default {
    name: "NavBar",
    components: {
      'auto-complete': AutoComplete
    },
    data() {
      return {
        isSideBar: false,
        isCreateAccount : true
      }
    },
    methods: {
      openSideBar() {
        const sideBar = document.getElementById('SideBar')
        const contents = document.getElementById('Contents')
        if (!this.isSideBar) {
          this.isSideBar = true
          sideBar.style.width = '250px'
          contents.style.marginLeft = '230px'
        } else {
          this.isSideBar = false
          sideBar.style.width = '0px'
          contents.style.marginLeft = '0px'
        }
      },
      createAccount() {
        eventBus.$emit('createAccount' , this.isCreateAccount)
      }
    }
  }
</script>

<style lang="scss" scoped src="../sass/nav-bar.scss">

</style>
