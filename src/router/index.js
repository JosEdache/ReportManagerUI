import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '../components/DashBoard'
import Bookmarks from '@/components/Bookmarks'
import PaymentLogs from '@/components/PaymentLogs'
import Accounts from '@/components/Accounts'
import Payment from '@/components/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name : 'DashBoard' , component : DashBoard , path : '/'
    },
    {
      name : 'Bookmarks' , component : Bookmarks , path : '/bookmarks'
    },
    {
      name : 'PaymentLogs' , component : PaymentLogs , path : '/payment-logs'
    },
    {
      name : 'Accounts' , component : Accounts , path : '/accounts'
    },
    {
      name : 'Payment' , component : Payment , path : '/payment'
    }
  ]
})
