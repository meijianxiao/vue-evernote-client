import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import NotebookList from '@/components/NotebookList';
import NoteDetail from '@/components/NoteDetail';
import TrashDetail from '@/components/TrashDetail';
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/notebooks',
      component: NotebookList,
    },
    {
      path: '/note',
      component: NoteDetail,
    },
    {
      path: '/trash',
      component: TrashDetail,
    }],
});
