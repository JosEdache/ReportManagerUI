<template>
  <transition appear>
    <div id="create-account" v-if="isView">
      <div class="modal is-active">
        <div class="modal-background" @click="isView = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Account</p>
            <span class="icon is-small"
                  style="color: #6f6f6f;">
            <i class="fas fa-times" @click="isView = false"></i>
            </span>
          </header>
          <section class="modal-card-body">
            <div class="flex-container">
              <div class="field">
                <label class="label">Code</label>
                <p class="control">
                  <input type="number" class="input" v-model="accountDetails.code">
                </p>
              </div>
              <div class="field">
                <label class="label">Account Type</label>
                <div class="control">
                  <div class="select">
                    <select v-model="accountDetails.accountType">
                      <option v-for="type in accountType">{{type}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <p class="control">
                <textarea class="textarea" v-model="accountDetails.description"/>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="flex-container">
              <div class="field is-grouped">
                <p class="control">
                  <button class="button" @click="isEdit = !isEdit">Cancel</button>
                </p>
                <p class="control">
                  <button class="button is-primary" @click="saveAccount">Create Account</button>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Http from "../utils/http";
  import {eventBus} from "../main";

  export default {
    name: "CreateAccount",
    props: ['isCreateAccount'],
    data() {
      return {
        isView: false,
        accountDetails: {},
        accountType: []
      }
    },
    mounted() {
      this.getAllAccountType()
    },
    methods: {
      getAllAccountType() {
        let rpm = this;
        Http.get("accounts/account-types").then(result => {
          for (let value of result.data) {
            rpm.accountType.push(value.description)
          }
        })
      },
      saveAccount() {
        console.log(this.accountDetails)
        Http.post('accounts/'+this.accountDetails.accountType+'/create', {
          // "id": this.accountDetails.id,
          "code": this.accountDetails.code,
          "bookmarks": false,
          "description": this.accountDetails.description,
          // "accountType": this.accountDetails.accountType
        }).then(response => {
          if (response.data === "Account creation success") this.isView = false;
        })
      },
    },
    created() {
      eventBus.$on('createAccount', (e) => this.isView = e)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/all";

  $modal-background-background-color: rgba($black, 0.16);
  $modal-card-head-radius: $radius-small;

  @import "~bulma/sass/components/modal";
  @import "~bulma/sass/elements/other";
  @import "~bulma/sass/base/all";
  @import "~bulma/sass/elements/icon";
  @import "~bulma/sass/elements/button";
  @import "~bulma/sass/elements/form";

  .modal {
    .fas, .far {
      opacity: 1;
      cursor: pointer;
    }

    .modal-card-body {
      //font-family: 'Courier New', Courier, monospace;

      .flex-container {
        display: flex;
        justify-content: space-between;
      }

      .field {
        margin-right: 20px;
        label {
          //display: inline;
        }
      }
    }
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
