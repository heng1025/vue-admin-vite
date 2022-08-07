<template>
  <el-sub-menu v-if="route.children?.length && !isRouteHidden" :index="route.path">
    <template #title>
      <menu-icon />
      <menu-title />
    </template>
    <sidebar-item v-for="sub in route.children" :key="sub.path" :index="sub.path" :route="sub" />
  </el-sub-menu>
  <el-menu-item v-else-if="!isRouteHidden" :index="route.path">
    <menu-icon />
    <template #title>
      <menu-title />
    </template>
  </el-menu-item>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElIcon } from 'element-plus';

const routeProps = defineProps<{
  route: RouteRecordRaw;
}>();

const isRouteHidden = ref(routeProps.route?.meta?.hidden);

// functional component
const MenuIcon = () => {
  const icon = routeProps.route?.meta?.icon;
  if (icon) {
    return (
      <ElIcon size={18} class="mr-2 align-middle">
        <icon />
      </ElIcon>
    );
  }
};

const MenuTitle = (props: { class?: string }) => {
  return <span class={props.class}>{routeProps.route?.meta?.title ?? routeProps.route.name}</span>;
};
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: var(--el-color-primary) !important;
}

:global(.el-sub-menu__title:hover),
:global(.el-sub-menu.is-active > .el-sub-menu__title),
.el-menu-item:hover > span,
.el-menu-item.is-active > span {
  color: var(--el-color-white) !important;
}
</style>
