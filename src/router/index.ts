import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { Edit, Grid, User, List, Failed, DataAnalysis } from '@element-plus/icons-vue';

import BasicLayout from '@/layouts/BasicLayout.vue';
import UserLayout from '@/layouts/UserLayout.vue';

const Analysis = () => import('@/pages/Dashboard/Analysis.vue');
const Monitor = () => import('@/pages/Dashboard/Monitor.vue');
const Workspace = () => import('@/pages/Dashboard/Workspace.vue');

const FormBasic = () => import('@/pages/Form/FormBasic.vue');
const FormStep = () => import('@/pages/Form/FormStep.vue');

const Level1 = () => import('@/pages/Nested/Level1.vue');
const Level11 = () => import('@/pages/Nested/Level1-1.vue');
const Level12 = () => import('@/pages/Nested/Level1-2.vue');
const Level2 = () => import('@/pages/Nested/Level2.vue');

const NotFound = () => import('@/pages/Exception/404.vue');
const Login = () => import('@/pages/User/Login.vue');

const AccountCenter = () => import('@/pages/Account/AccountCenter.vue');
const AccountSettings = () => import('@/pages/Account/AccountSettings.vue');

const userRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const dashboardRoutes = [
  {
    path: '/dashboard/analysis',
    name: 'Analysis',
    component: Analysis,
  },
  {
    path: '/dashboard/monitor',
    name: 'Monitor',
    component: Monitor,
  },
  {
    path: '/dashboard/workplace',
    name: 'Workplace',
    component: Workspace,
  },
];

const nestedSubRoutes = [
  {
    path: '/nested/level1',
    name: 'Level 1',
    component: Level1,
    children: [
      {
        path: '/nested/level1-1',
        name: 'Level 1-1',
        component: Level11,
      },
      {
        path: '/nested/level1-2',
        name: 'Level 1-2',
        component: Level12,
      },
    ],
  },
  {
    path: '/nested/level2',
    name: 'Level 2',
    component: Level2,
  },
];

const accountRoutes = [
  {
    path: '/account/center',
    name: 'Account Center',
    component: AccountCenter,
  },
  {
    path: '/account/settings',
    name: 'Account Settings',
    component: AccountSettings,
  },
];

const resultRoutes = [
  {
    path: '/exception/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/exception/500',
    name: '500',
    component: () => import('@/pages/Exception/500.vue'),
  },
];

// path should absolute path
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'User',
    component: UserLayout,
    children: userRoutes,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    component: BasicLayout,
    name: 'Dashboard',
    redirect: '/dashboard/analysis',
    meta: {
      icon: DataAnalysis,
    },
    children: dashboardRoutes,
  },
  {
    path: '/form',
    name: 'Form',
    component: BasicLayout,
    redirect: '/form/basic-form',
    meta: {
      title: 'Form',
      icon: Edit,
    },
    children: [
      {
        path: '/form/basic-form',
        name: 'Basic Form',
        component: FormBasic,
      },
      {
        path: '/form/step-form',
        name: 'Step Form',
        component: FormStep,
      },
    ],
  },
  {
    path: '/list',
    name: 'List',
    component: BasicLayout,
    redirect: '/list/basic-list',
    meta: {
      icon: List,
    },
    children: [
      {
        path: '/list/basic-list',
        name: 'Basic List',
        component: () => import('../pages/List/BasicList.vue'),
      },
      {
        path: '/list/table-list',
        name: 'Table List',
        component: () => import('../pages/List/TableList.vue'),
      },
      {
        path: '/list/card-list',
        name: 'Card List',
        component: () => import('../pages/List/CardList.vue'),
      },
    ],
  },
  {
    path: '/nested',
    name: 'Nested',
    component: BasicLayout,
    redirect: '/nested/level1',
    meta: {
      title: 'Nested',
      icon: Grid,
    },
    children: nestedSubRoutes,
  },
  {
    path: '/exception',
    name: 'Exception',
    component: BasicLayout,
    redirect: '/exception/404',
    meta: {
      icon: Failed,
    },
    children: resultRoutes,
  },
  {
    path: '/account',
    name: 'Account',
    component: BasicLayout,
    redirect: '/account/center',
    meta: {
      title: 'Account',
      icon: User,
    },
    children: accountRoutes,
  },
  // must be put at the end !!!
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Match',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
