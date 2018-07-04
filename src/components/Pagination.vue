<template>
  <div id="pagination">
    <nav class="pagination is-centered is-rounded is-small">
      <a class="pagination-previous next-previous" @click="gotoPage(current-1)" ref="previous" disabled> Previous </a>
      <a class="pagination-next" @click="gotoPage(current+1)" ref="next"> Next </a>
      <ul class="pagination-list">
        <li v-for="page in pages" :key="page">
          <a
          v-if="(page >= pageSection[0].from && page <= pageSection[0].to)
          || (page >= pageSection[1].from && page <= pageSection[1].to)
          || (page >= (pages - pageSection[2].from) && page <= pages)"
             :class="['pagination-link', page == 1 ? 'is-current':'']"
             @click="gotoPage(page)"
             :ref="page">{{page}}
          </a>
          <span v-if="page == pageSection[0].ellipsis || page === pageSection[1].ellipsis"
          class="pagination-ellipsis">
          &hellip;
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pages'],
    data() {
      return {
        current : 1,
        pageSection: [
          {
            from: 1,
            to: 5,
            ellipsis : 6
          },
          {
            from: 10,
            to: 11,
            ellipsis : 12
          },
          {
            from: 2,
          }
        ],
      }
    },
    methods: {
      gotoPage(e) {
        this.$emit('gotoPage' , e)
        this.removeCurrent()
        this.addCurrent(e)
      },
      addCurrent(e) {
        this.$refs[e][0].classList.add('is-current')
        this.current = e

        if (e >= 1 && e <= 4) {
          this.pageSection[0].to = 5
          this.pageSection[0].ellipsis = 6
          this.pageSection[1].from = 10
          this.pageSection[1].to = 11
          this.pageSection[2].from = 2
        }

        if (e >= 5 && e < (this.pages - 4)) {
          this.pageSection[0].to = 2
          this.pageSection[0].ellipsis = 3
          this.pageSection[1].from = e - 1
          this.pageSection[1].to = e + 5
          this.pageSection[1].ellipsis = this.pages - 4
          this.pageSection[2].from = 1
          if (this.pageSection[1].to > (this.pages - 4)) {
            this.pageSection[1].to = this.pages - 4
          }
        }
        if (e >= (this.pages - 4)) {
          this.pageSection[0].to = 3
          this.pageSection[0].ellipsis = 4
          this.pageSection[1].from = 10
          this.pageSection[1].to = 11
          this.pageSection[1].ellipsis = 12
          this.pageSection[2].from = 5
        }


      },
      removeCurrent() {
        this.$refs[this.current][0].classList.remove('is-current')
      },
      next() {
        //this.gotoPage(this.current + 1)
      },
      previous() {
        //this.gotoPage(this.current - 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/all";
  @import "~bulma/sass/base/all";
  @import "~bulma/sass/components/pagination";

  .pagination {
    padding: 10px;
    margin: 10px;
  }

  .next-previous {
    pointer-events: none;
    cursor: default
  }
</style>
