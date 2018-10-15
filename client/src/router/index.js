import VueRouter from 'vue-router'
import MotherBoard from '@/components/MotherBoards'
import Home from '@/components/Home'

const routes = [
    { path: '/mob', component: MotherBoard },
    { path: '/', component: Home }
  ]
  
  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = new VueRouter({
    routes // short for `routes: routes`
  });

  export default router;