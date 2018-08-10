<template>
    <div class="container">
      <div id="receipt">
        <div class="heading">
          <h1 class="title is-2">RECEIPT</h1>
          <h3 class="subtitle is-3 has-text-primary">CABSOL</h3>
        </div>
        <div class="" style="padding: 30px">
          <div class="columns">
            <div class="column">
              Receipt:
            </div>
            <div class="column">
              89158
            </div>
          </div>
          <div class="columns">
            <div class="column">
              Date:
            </div>
            <div class="column">
              July 17, 2018 4:15 PM
            </div>
          </div>
          <div class="columns">
            <div class="column">
              Terminal:
            </div>
            <div class="column">
              Online
            </div>
          </div>
          <div class="columns">
            <div class="column">
              Served by
            </div>
            <div class="column">
              Manager
            </div>
          </div>
        </div>
        <div class="" style="padding: 30px;">
          <div class="columns has-text-weight-bold has-text-white has-background-success">
            <div class="column is-5">Description</div>
            <div class="column is-1 has-text-center">Qty</div>
            <div class="column is-3 has-text-right">Unit Price</div>
            <div class="column is-3 has-text-right">Amount</div>
          </div>
          <div v-for="item in transaction" class="columns item font-size">
            <div class="column is-5" style="text-overflow: ellipsis; padding-right: 10px">{{item.item.description}}</div>
            <div class="column is-1 has-text-centered">{{item.quantity}}</div>
            <div class="column is-3 has-text-right" style="padding-left: 10px">{{item.unitPrice | thounsandSeperator}}</div>
            <div class="column is-3 pl-2 has-text-right" style="padding-left: 10px">{{item.amount | thounsandSeperator}}</div>
          </div>
        </div>
        <div class="details" style="padding: 30px">
          <div class="columns font-size">
            <div class="column">Sub Total</div>
            <div class="column has-text-right">{{subTotal | thounsandSeperator}}</div>
          </div>
          <div class="columns font-size">
            <div class="column">VAT(5%)</div>
            <div class="column has-text-right">{{vat | thounsandSeperator}}</div>
          </div>
          <div class="columns" >
            <div class="column font-weight-bold has-text-success">TOTAL</div>
            <div class="column has-text-right has-text-primary text-line">
                {{total | thounsandSeperator}}
            </div>
          </div>

          <div class="columns mt-3 mb-2" style="margin-top: 5px">
            <div class="column font-weight-bold text-success">Cash</div>
          </div>
          <div class="columns font-size">
            <div class="column">Tendered</div>
            <div class="column has-text-right">0</div>
          </div>
          <div class="columns font-size">
            <div class="column">Change</div>
            <div class="column has-text-right">0</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Receipt",
    components: {},
    data() {
      return {
        transaction: [],
        subTotal: 0,
        vat: 0,
        total: 0
      };
    },
    filters: {
      thounsandSeperator(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    mounted() {
      axios.get("http://localhost:8080/get-transaction").then(({ data }) => {
        data.forEach(item => {
          this.transaction.push(item);
        });

        this.transaction.forEach(item => {
          this.subTotal += item.amount;
        });

        this.vat = 5 / 100 * this.subTotal;
        this.total = this.vat + this.subTotal;
      });
    }
  };
</script>

<style lang="scss" scoped src="../sass/receipt.scss">

</style>
