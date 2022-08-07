<template>
  <el-menu :collapse="collapse" :collapse-transition="false" :background-color="backgroundColor ?? '#ffffff'"
    :default-active="activeMenu" text-color="#9ca3af" @select="changeRoute">
    <sidebar-item v-for="routeItem in routes" :key="routeItem.path" :route="routeItem" />
  </el-menu>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const router = useRouter();
const route = useRoute();

defineProps<{
  backgroundColor: string;
  collapse: boolean;
}>();

// extract single sub route
// just filter first level (layout level)
function getMenus(routes: readonly RouteRecordRaw[]) {
  return routes.reduce<RouteRecordRaw[]>((acc, item) => {
    if (!item?.meta?.hidden) {
      const { children } = item;
      if (!children) {
        acc.push(item);
      } else {
        if (children.length === 1) {
          const [first] = children;
          acc.push(first);
        } else if (children.length > 1) {
          acc.push(item);
        }
      }
    }
    return acc;
  }, []);
}

const routes = computed(() => getMenus(router.options.routes));

const activeMenu = computed(() => route.path);

function changeRoute(path: string) {
  router.push(path);
}
</script>
<style scoped>
.el-menu {
  border-right: none;
}
</style>
