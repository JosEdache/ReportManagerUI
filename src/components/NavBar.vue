<template>
  <nav id="nav-bar" class="navbar is-fixed-top">
    <div class="navbar-brand" style="margin-left: 20px">
      <div class="navbar-item">
        <span class="icon" @click="openSideBar">
          <i class="fas fa-bars"></i>
        </span>
      </div>

      <div class="navbar-item" style="margin-left: 200px">
        <div class="field has-addons">
          <div class="control">
            <auto-complete
              input-class="input"
              source="http://localhost:8080/accounts/paymentlog/suggestion?q="
              results-display="autocomplete"
              results-value="autocomplete">
            </auto-complete>
          </div>
          <!--<div class="control">
            <a class="button">
              Search
            </a>
          </div>-->
        </div>
      </div>
      <div class="navbar-item" style="margin-left: 500px">
        <span class="icon" @click="createAccount">
          <i class="fas fa-user-plus"></i>
        </span>
      </div>
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
      arrangeAutoComplete() {
        document.getElementsByClassName('autocomplete__box').item(0).style.height = '48px'
        const aci = document.getElementsByClassName('autocomplete__icon').item(0)
        aci.style.height = '20px'
        aci.style.width = '30px'
        const acinput = document.getElementsByClassName('autocomplete__inputs').item(0)
        acinput.style.height = '40px'
        acinput.children[0].style.height = '100%'
      },
      openSideBar() {
        const sideBar = document.getElementById('SideBar')
        const contents = document.getElementById('Contents')
        const dashboard_one = document.getElementsByClassName('item').item(0)
        const dashboard_two = document.getElementsByClassName('item').item(1)
        if (!this.isSideBar) {
          this.isSideBar = true
          sideBar.style.width = '250px'
          contents.style.marginLeft = '250px'
          if(this.$route.name === 'DashBoard'){
            dashboard_one.style.maxWidth = '500px'
            dashboard_two.style.maxWidth = '500px'
          }
        } else {
          this.isSideBar = false
          sideBar.style.width = '0px'
          contents.style.marginLeft = '0px'
          if(this.$route.name === 'DashBoard'){
            dashboard_one.style.maxWidth = '500px'
            dashboard_two.style.maxWidth = '500px'
          }
        }
      },
      createAccount() {
        eventBus.$emit('createAccount' , this.isCreateAccount)
      }

    },
    mounted() {
      this.arrangeAutoComplete()
    }
  }
</script>

<style lang="scss" scoped src="../sass/nav-bar.scss">

</style>
