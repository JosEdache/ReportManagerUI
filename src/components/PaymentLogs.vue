<template>
  <div id="accounts">
    <app-pagination @gotoPage="gotoPage" :pages="totalPages"/>
    <div style="margin-right: 15px">
      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th style="width: 8%">ID</th>
          <th style="width: 15%">DATE LOG</th>
          <th style="width: 15%">LAST MODIFIED</th>
          <th style="width: 40%">DESCRIPTION</th>
          <th style="width: 20%">ACCOUNT CODE</th>
          <th style="width: 15%">PAYMENT TYPE</th>
        </tr>
        </thead>
      </table>
    </div>
    <div style="overflow: auto;height: 500px">
      <table class="table is-fullwidth is-striped is-hoverable is-narrow">
        <tbody>
        <tr v-for="log in paymentLogs.slice(pageStart , pageEnd)" :key="log.id" @click="view(log.id)">
          <th style="width: 8%"><input type="checkbox"> &nbsp;{{log.id}}</th>
          <td style="width: 15%">{{log.dateLog.toString().substr(0 , 10)}}</td>
          <td style="width: 15%;">{{log.lastModified.substr(0 , 10)}}</td>
          <td style="width: 40%;">{{log.description}}</td>
          <td style="width: 20%;">{{log.account.code}}</td>
          <td style="width: 15%;">{{log.paymentType}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div id="view" class="modal is-active" v-if="isView">
        <div class="modal-background" @click="isView = !isView"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Payment Details</p>
            <button class="delete" aria-label="close" @click="isView = !isView"></button>
          </header>
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Id:</label>
                  <span>{{accountDetails.id}}</span>
                </div>
                <div class="field">
                  <label class="label">Account Code:</label>
                  <span>{{accountDetails.account.code}}</span>
                </div>
                <div class="field">
                  <label class="label">Date Logged:</label>
                  <span>{{accountDetails.dateLog.toString().substr(0 , 10)}}</span>
                </div>
                <div class="field">
                  <label class="label">Last Modified:</label>
                  <span>{{accountDetails.lastModified.substr(0 , 10)}}</span>
                </div>
                <div class="field">
                  <label class="label">Last Modified:</label>
                  <span>{{accountDetails.paymentType}}</span>
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
  </div>
</template>

<script>
import Http from "../utils/http";
import Pagination from "./Pagination";

export default {
  name: "Accounts",
  components: {
    "app-pagination": Pagination
  },
  data: function() {
    return {
      paymentLogs: [],
      pageStart: 0,
      perPage: 0,
      pageEnd: 0,
      totalPages: 0,
      isView: false,
      accountDetails: {}
    };
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
      this.paymentLogs.forEach(log => {
        if (log.id === e) {
          this.accountDetails = {
            ...log
          };
        }
      });
    }
  },
  mounted: function() {
    let rpm = this;
    Http.get("accounts/payment-logs").then(result => {
      for (let value of result.data) {
        rpm.paymentLogs.push(value);
      }

      this.perPage = 50;
      this.pageEnd = 50;
      this.totalPages = Math.ceil(this.paymentLogs.length / this.perPage);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/all";

$icon-dimensions-small: "2rem";

@import "~bulma/sass/base/all";
@import "~bulma/sass/elements/table";
@import "~bulma/sass/elements/container";
@import "~bulma/sass/elements/icon";
@import "~bulma/sass/components/modal";
@import "~bulma/sass/elements/form";
@import "~bulma/sass/elements/other";

.table {
  table-layout: fixed;
  thead th {
    font-size: 0.9rem;
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
