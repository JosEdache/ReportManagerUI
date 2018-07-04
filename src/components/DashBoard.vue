<template>
  <div id="dashboard">
    <h2> Dashboard </h2>
    <hr>
    <!--<div class="flex-container">
      <div class="test">1</div>
      <div class="test">2</div>
    </div>-->
    <div class="flex-container">
      <div class="item first">
        <div class="item-body">
          <div class="left">
            <span class="icon is-large">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <div class="right">
            <i>{{totalAccount}}</i>
            <h2 style="color: white;">Total Accounts</h2>
          </div>
        </div>
        <div class="item-footer">
          <span class="detail">View Accounts</span>
          <span class="icon">
            <router-link tag="i" to="/accounts" class="fas fa-arrow-circle-right"></router-link>
          </span>
        </div>
      </div>
      <div class="item second">
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
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // todo add google chart for date log in payment logs component
  export default {
    name: "DashBoard",
    data() {
      return {
        totalAccount : null,
        totalBookmarks : [] ,
      }
    },

    methods: {
      checkContent() {
        const contents = document.getElementById('Contents')
        const dashboard_one = document.getElementsByClassName('item').item(0)
        const dashboard_two = document.getElementsByClassName('item').item(1)
        if (contents.style.marginLeft  === '250px') {
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
    hr {
      height: 1px;
      border: 0;
      border-top: 1px solid #e6e6e6;
      padding: 0;
    }

    h2 {
      font-family: 'Courier New', Courier, monospace
    }

    .flex-container {
      display: flex;
      justify-content: space-between;
      height: 200px;
      .test {
        background-color: #f1f1f1;
        width: 500px;
        margin: 10px;
        text-align: center;
        line-height: 75px;
        font-size: 30px;
      }
      .first {
        margin-right: 10px;
      }

      .second {
        margin-left: 10px;
      }

      .item {
        background-color: #f1f1f1;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        transition: max-width .2s ease-out;

        .item-body {
          background-color: #2a56c6;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .left, .right {
            padding: 20px;
          }

          .left {

            .icon {
              color: white;
              font-size: 100px;
            }
          }

          .right {
            text-align: right;
            width: 300px;

            i {
              color: white;
              font-size: 50px
            }
          }
        }
        .item-footer {
          display: flex;
          justify-content: space-between;

          .icon:hover {
            cursor: pointer;
          }
          span {
            padding: 10px;
            color: #2a56c6;
          }
        }
      }
    }
  }


</style>
