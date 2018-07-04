<template>
  <div id="payment">
    <div class="dropdown is-active">
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a href="#" class="dropdown-item">
            Dropdown item
          </a>
          <a class="dropdown-item">
            Other dropdown item
          </a>
          <a href="#" class="dropdown-item is-active">
            Active dropdown item
          </a>
          <a href="#" class="dropdown-item">
            Other dropdown item
          </a>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item">
            With a divider
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // todo create a form to make payment payment log
  export default {
    name: "Payment"
  }
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/all";
  @import "~bulma/sass/base/all";
  @import "~bulma/sass/components/dropdown";
  @import "~bulma/sass/elements/form";
  @import "~bulma/sass/elements/button";
  @import "~bulma/sass/elements/other";


</style>
