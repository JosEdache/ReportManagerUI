<template>
  <div id="dashboard">
    <!--<h2> Dashboard </h2>
    <hr>-->
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="item">
            <div class="item-body">
              <div class="columns">
                <div class="column">
                <span class="icon is-large">
                  <i class="fas fa-user"></i>
                </span>
                </div>
                <div class="column right">
                  <i>{{totalAccount}}</i>
                  <h2 class="has-text-white">Total&nbsp;Accounts</h2>
                </div>
              </div>
            </div>
            <div class="item-footer">
              <div class="columns">
                <div class="column">
                  <div class="columns">
                    <div class="column is-10">
                      <span style="padding: 0 10px">View Accounts</span>
                    </div>
                    <div class="column">
                      <div style="padding: 0 10px">
                        <span class="icon is-small">
                          <router-link tag="i" to="/bookmarks" class="fas fa-arrow-circle-right"></router-link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="item">
            <div class="item-body">
              <div class="columns">
                <div class="column">
                <span class="icon is-large">
                  <i class="fas fa-bookmark"></i>
                </span>
                </div>
                <div class="column right">
                  <i>{{totalBookmarks.length}}</i>
                  <h2 class="has-text-white">Total&nbsp;Bookmarks</h2>
                </div>
              </div>
            </div>
            <div class="item-footer">
              <div class="columns">
                <div class="column">
                  <div class="columns">
                    <div class="column is-10">
                      <span style="padding: 0 10px">View Bookmarks</span>
                    </div>
                    <div class="column">
                     <div style="padding: 0 10px">
                       <span class="icon is-small">
                        <router-link tag="i" to="/bookmarks" class="fas fa-arrow-circle-right"></router-link>
                       </span>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="item second">
        <div class="item-body">
          <div class="left">
            <span class="icon is-large">
              <i class="fas fa-bookmark"></i>
            </span>
          </div>
          <div class="right">
            <i>{{totalBookmarks.length}}</i>
            <h2 style="color: white;">Total&nbsp;Bookmarks</h2>
          </div>
        </div>
        <div class="item-footer">
          <span class="detail">View Bookmarks</span>
          <span class="icon">
            <router-link tag="i" to="/bookmarks" class="fas fa-arrow-circle-right"></router-link>
          </span>
        </div>
      </div>-->
    </div>
</template>

<script>
  import axios from 'axios'
  // todo add google chart for date log in payment logs component
  export default {
    name: "DashBoard",
    data() {
      return {
        totalAccount: 0,
        totalBookmarks: [],
      }
    },

    methods: {
      checkContent() {
        const contents = document.getElementById('Contents')
        const dashboard_one = document.getElementsByClassName('item').item(0)
        const dashboard_two = document.getElementsByClassName('item').item(1)
        if (contents.style.marginLeft === '250px') {
          dashboard_one.style.maxWidth = '400px'
          dashboard_two.style.maxWidth = '400px'
        }
      }
    },
    mounted() {
      this.checkContent()
      axios.get("http://localhost:8080/accounts").then(result => {
        this.totalAccount = result.data.length;
        for (let value of result.data) {
          if (value.bookmarks) this.totalBookmarks.push(value)
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/all";

  $icon-dimensions-large: 7rem;
  $card-footer-background-color: #e6e6e6;
  //$card-background-color: #2a56c6;

  @import "~bulma/sass/components/card";
  @import "~bulma/sass/elements/icon";
  @import "~bulma/sass/elements/other";
  @import "~bulma/sass/grid/columns";

  #dashboard {
    margin-top: 50px;
    /*hr {*/
      /*width: 80%;*/
      /*height: 1px;*/
      /*border: 0;*/
      /*border-top: 1px solid #e6e6e6;*/
      /*padding: 0;*/
    /*}*/

    /*h2 {*/
      /*width: 80%;*/
      /*font-family: 'Courier New', Courier, monospace*/
    /*}*/

    .item {
      transition: max-width .2s ease-out;

      .item-body {
        background-color: #2a56c6;
        .icon {
          color: white;
          font-size: 5rem;
        }
      }

      .right {
        text-align: right;
        /*width: 300px;*/

        i {
          color: white;
          font-size: 50px;
          padding: 10px;
          display: block;
        }
        h2 {
          padding: 10px;
        }
      }
    }
    .item-footer {
      background-color: #f1f1f1;
      .icon:hover {
        cursor: pointer;
      }
      div {
        color: #2a56c6;
      }
    }
  }


</style>
