<template>
  <div id="bookmarks">
    <app-checked-bar
      v-if="isChecked"
      @removeCheckedItems="removeCheckedItems"
      @toggleCheck="toggleCheck"
      :checked-item-length="checkedItems.length"/>
    <app-pagination
    @gotoPage="gotoPage"
    :pages="totalPages"/>
    <div style="margin-right: 15px">
      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th style="width: 8%">ID</th>
          <th style="width: 15%">CODE</th>
          <th style="width: 50%">DESCRIPTION</th>
          <th style="width: 18%">ACCOUNT TYPE</th>
          <th style=""></th>
        </tr>
        </thead>
      </table>
    </div>
    <div style="overflow: auto;height: 500px">
      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <tbody>
        <tr v-for="(account , index) in accounts.slice(pageStart , pageEnd)" :key="account.id" @click="view(account.id)">
          <th style="width: 8%"><input type="checkbox" :value="account.id" v-model="checkedItems" @click.stop>
            {{account.id}}
          </th>
          <td style="width: 15%">{{account.code}}</td>
          <td style="width: 50%;">{{account.description}}</td>
          <td style="width: 18%;">{{account.accountType.description}}</td>
          <td style="text-align: center; overflow: visible">
            <span v-if="account.bookmarks" class="icon is-small has-text-info" title="bookmark"
                  @click.stop="changeBookmark(index)"><i
              class="fas fa-star"></i></span>
            <span class="icon is-small" title="edit account" @click.stop="editAccount(index)">
              <i class="fas fa-pencil-alt"></i>
            </span>
            <div class="dropdown is-right is-hoverable">
              <span class="icon is-small" title="more actions" @click.stop="moreActions(account.id)"><i
                class="fas fa-ellipsis-v"></i>
              </span>
              <div class="dropdown-menu" :id="'dropdown-menu-'+account.id" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item " @click.stop="deleteAccount(account.id)">
                    <span class="icon is-small" title="more actions">
                      <i class="fas fa-trash"/>
                    </span>
                    <span style="font-family: 'Courier New', Courier, monospace">
                      delete
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div id="view" class="modal is-active" v-if="isView">
        <div class="modal-background" @click="isView = !isView"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Account Details</p>
            <span v-if="accountDetails.bookmarks" class="icon is-small has-text-info" title="bookmark"
                  @click.stop="changeBookmark(accountDetails.id)">
              <i class="fas fa-star"></i></span>
            <span v-else class="icon is-small" title="bookmark" @click.stop="changeBookmark(accountDetails.id)">
              <i class="far fa-star"></i>
            </span>
            <span class="icon is-small"
                  @click.stop="deleteAccount(accountDetails.id)" style="color: #6f6f6f;">
              <i class="fas fa-trash"/>
            </span>
            <span class="icon is-small"
                  style="color: #6f6f6f;">
              <i class="fas fa-times" @click="isView = !isView"/>
            </span>
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Id:</label>
                  <span>{{accountDetails.id}}</span>
                </div>
                <div class="field">
                  <label class="label">Code:</label>
                  <span>{{accountDetails.code}}</span>
                </div>
                <div class="field">
                  <label class="label">Account Type:</label>
                  <span>{{accountDetails.accountType.description}}</span>
                </div>
                <div class="field">
                  <label class="label">Description:</label>
                  <span>{{accountDetails.description}}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </transition>
    <transition>
      <div id="edit" class="modal is-active" v-if="isEdit">
        <div class="modal-background" @click="isEdit = !isEdit"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Account</p>
            <span class="icon is-small"
                  style="color: #6f6f6f;">
            <i class="fas fa-times" @click="isEdit = !isEdit"></i>
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
                    <select v-model="accountDetails.accountType.description">
                      <option v-for="type in accountType" :key="type">{{type}}</option>
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
                  <button class="button is-primary" @click="saveChanges">Save Changes</button>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Pagaination from "./Pagination";
import CheckedBar from "./CheckedBar";
export default {
  name: "Bookmarks",
  components: {
    "app-pagination": Pagaination,
    "app-checked-bar": CheckedBar
  },
  data: function() {
    return {
      accounts: [],
      pageStart: 0,
      perPage: 0,
      pageEnd: 0,
      totalPages: 0,
      isView: false,
      isEdit: false,
      isChecked: false,
      isToggleCheck: false,
      checkedItems: [],
      accountDetails: {},
      accountType: [],
      moreActionActive: null
    };
  },
  mounted: function() {
    this.getAllAccount();
    this.getAllAccountType();
  },
  updated() {
    this.processCheckedItems();
  },
  methods: {
    gotoPage(e) {
      let previous = document
        .getElementsByClassName("pagination-previous")
        .item(0);
      let next = document.getElementsByClassName("pagination-next").item(0);
      if (e == this.totalPages + 1 - this.totalPages) {
        previous.classList.add("next-previous");
        previous.setAttribute("disabled", "");
        next.removeAttribute("disabled");
        next.classList.remove("next-previous");
      } else if (e == this.totalPages) {
        next.classList.add("next-previous");
        next.setAttribute("disabled", "");
        previous.removeAttribute("disabled");
        previous.classList.remove("next-previous");
      } else if (
        e > this.totalPages + 1 - this.totalPages &&
        e < this.totalPages
      ) {
        next.removeAttribute("disabled");
        next.classList.remove("next-previous");
        previous.removeAttribute("disabled");
        previous.classList.remove("next-previous");
      }
      this.pageStart = e * this.perPage - this.perPage;
      this.pageEnd = e * this.perPage;
    },
    view(e) {
      this.isView = true;
      this.accounts.forEach(account => {
        if (account.id === e) {
          this.accountDetails = {
            ...account
          };
        }
      });
    },
    saveChanges() {
      axios
        .put("http://localhost:8080/accounts/update", {
          id: this.accountDetails.id,
          code: this.accountDetails.code,
          bookmarks: this.accountDetails.bookmarks,
          description: this.accountDetails.description,
          accountType: this.accountDetails.accountType
        })
        .then(response => {
          if (response.data === "Account updated successful")
            this.getAllAccount();
        });
    },
    deleteAccount(e) {
      axios
        .delete("http://localhost:8080/accounts/delete/" + e)
        .then(response => {
          if (response.data === "Account deleted successful") {
            this.accounts.forEach((account, index) => {
              if (account.id === e) {
                this.accounts.splice(index, 1);
              }
            });
          }
        });
    },
    getAllAccount() {
      let rpm = this;
      axios.get("http://localhost:8080/accounts").then(result => {
        for (let value of result.data) {
          if (value.bookmarks) rpm.accounts.push(value);
        }

        this.perPage = 50;
        this.pageEnd = 50;
        this.totalPages = Math.ceil(this.accounts.length / this.perPage);
      });
    },
    getAllAccountType() {
      let rpm = this;
      axios.get("http://localhost:8080/accounts/account-types").then(result => {
        for (let value of result.data) {
          rpm.accountType.push(value.description);
        }
      });
    },
    changeBookmark(e) {
      const account = this.accounts[e];
      axios
        .put("http://localhost:8080/accounts/update", {
          id: account.id,
          code: account.code,
          bookmarks: !account.bookmarks,
          description: account.description,
          accountType: account.accountType
        })
        .then(response => {
          if (response.data === "Account updated successful") {
            this.accounts[e].bookmarks = !this.accounts[e].bookmarks;
            this.accounts.splice(e, 1);
          }
        });
    },
    editAccount(e) {
      this.isEdit = true;
      const account = this.accounts[e];
      this.accountDetails = {
        ...account
      };
    },
    moreActions(e) {
      /*let previous = document.getElementById('dropdown-menu-' + this.moreActionActive)
        if (previous !== null) previous.parentElement.classList.remove('is-active')
        const parent = document.getElementById('dropdown-menu-' + e).parentElement
        parent.classList.add('is-active')
        this.moreActionActive = e*/
    },
    processCheckedItems() {
      if (this.checkedItems.length > 0) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
    removeCheckedItems() {
      this.checkedItems.splice(0, this.checkedItems.length);
    },
    toggleCheck() {
      if (this.isToggleCheck) {
        this.removeCheckedItems();
        this.isToggleCheck = false;
      } else {
        this.accounts.forEach(account => {
          if (!this.checkedItems.includes(account.id, 0))
            this.checkedItems.push(account.id);
        });
        this.isToggleCheck = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/all";

$icon-dimensions-small: "2rem";
$modal-background-background-color: rgba($black, 0.16);
$modal-card-head-radius: $radius-small;

@import "~bulma/sass/base/all";
@import "~bulma/sass/elements/table";
@import "~bulma/sass/elements/container";
@import "~bulma/sass/elements/icon";
@import "~bulma/sass/components/modal";
@import "~bulma/sass/elements/form";
@import "~bulma/sass/elements/button";
@import "~bulma/sass/components/dropdown";
@import "~bulma/sass/elements/other";
@import "~bulma/sass/components/menu";

.table {
  table-layout: fixed;
}

.modal {
  .fas,
  .far {
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
    }
  }
}

#view {
  .modal-card-body {
    font-family: "Courier New", Courier, monospace;

    .field {
      label {
        display: inline;
      }
    }
  }
}

.fas,
.far {
  opacity: 0;
}

tbody tr:hover .fas {
  opacity: 1;
}

tbody tr:hover .far {
  opacity: 1;
}

tbody tr {
  line-height: 30px;

  :hover {
    cursor: pointer;
  }

  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .dropdown-item {
      text-align: initial;
    }
  }
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.3s;
}

.v-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
</style>

  @import "~bulma/sass/utilities/all";

  $icon-dimensions-small: '2rem';
  $modal-background-background-color: rgba($black, 0.16);
  $modal-card-head-radius: $radius-small;

  @import "~bulma/sass/base/all";
  @import "~bulma/sass/elements/table";
  @import "~bulma/sass/elements/container";
  @import "~bulma/sass/elements/icon";
  @import "~bulma/sass/components/modal";
  @import "~bulma/sass/elements/form";
  @import "~bulma/sass/components/dropdown";
  @import "~bulma/sass/elements/other";

  .table {
    table-layout: fixed;
  }

  .modal {
    .fas, .far {
      opacity: 1;
      cursor: pointer;
    }

    .modal-card-body {
      font-family: 'Courier New', Courier, monospace;

      .field {
        label {
          display: inline;
        }
      }
    }
  }

  .fas, .far {
    opacity: 0;
  }

  tbody tr:hover .fas {
    opacity: 1;
  }

  tbody tr:hover .far {
    opacity: 1;
  }

  tbody tr {
    line-height: 30px;

    :hover {
      cursor: pointer;
    }

    td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .dropdown-item {
        text-align: initial;
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
