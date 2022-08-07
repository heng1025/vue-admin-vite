<template>
  <div>
    <el-drawer title="add" v-model="drawer" direction="rtl">
      <el-form :model="form" label-width="80px" class="max-w-xl mx-auto">
        <template v-for="col in columns">
          <el-form-item :label="col.label" :prop="col.property">
            <el-input />
          </el-form-item>
        </template>
      </el-form>
    </el-drawer>
    <el-card>
      <template #header>
        <el-button type="primary" class="mb-2" @click="drawer = true">add</el-button>
      </template>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <template v-for="col in columns">
          <el-table-column :label="col.label" :width="col.width">
            <template #default="scope">{{ scope.row[col.property] }}</template>
          </el-table-column>
        </template>

        <el-table-column label="Operations">
          <template #default>
            <el-link type="primary" @click="handleClick">Detail</el-link>
            <el-divider direction="vertical" />
            <el-link type="primary">Edit</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50" class="mt-6 text-right" />
    </el-card>
  </div>
</template>
<script lang="ts" setup>

const columns = ref([
  {
    label: 'Name',
    property: 'name',
    width: 160
  },
  {
    label: 'Date',
    property: 'date',
    width: 120
  },
  {
    label: 'Address',
    property: 'address',
    width: 240
  },
])


const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);

const drawer = ref(false);


const form = ref({
  name: '',
  date: '',
  address: ''
});

function onSubmit() {
  console.log('submit!');
}

function handleSelectionChange() {
  // todo
}

function handleClick() {
  // todo
}

</script>
