<template>
  <el-card>
    <el-steps :active="active" simple finish-status="success" class=" max-w-4xl mx-auto">
      <el-step title="填写转账信息" />
      <el-step title="确认转账信息" />
      <el-step title="完成" />
    </el-steps>
    <div class="max-w-sm mx-auto mt-10">
      <el-form
        v-if="active === State.START"
        ref="payFormRef"
        label-position="top"
        :rules="payRules"
        :model="form"
      >
        <el-form-item label="付款账户" prop="sender">
          <el-select v-model="form.sender" placeholder="please select" class="w-full">
            <el-option label="iron.cheng@bayconnect.com.cn" value="iron" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款账户" required>
          <el-row justify="space-between">
            <el-col :span="7">
              <el-form-item prop="receiverMethod">
                <el-select v-model="form.receiverMethod" placeholder="please select">
                  <el-option label="wechat" value="iron" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="receiver">
                <el-input v-model="form.receiver" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="收款人" prop="name">
          <el-input v-model="form.name" placeholder="please input" />
        </el-form-item>
        <el-form-item label="转账金额" prop="money" class="fs-num">
          <el-input-number v-model="form.money" :min="1" :max="5988" controls-position="right" />
        </el-form-item>
        <el-button class="mt-2" type="primary" @click="commit(payFormRef)">Next</el-button>
      </el-form>
      <div v-else-if="active === State.CONFIRM">
        <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="info" show-icon />
        <el-descriptions border :column="1" class="my-6">
          <el-descriptions-item label="付款账户">{{ form.sender }}</el-descriptions-item>
          <el-descriptions-item label="收款账户">{{ form.receiver }}</el-descriptions-item>
          <el-descriptions-item label="收款人姓名">{{ form.name }}</el-descriptions-item>
          <el-descriptions-item label="转账金额	">{{ form.money }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-form ref="payPassRef" label-position="top" :model="payPassForm">
          <el-form-item label="支付密码" prop="pass" required>
            <el-input
              v-model="payPassForm.pass"
              placeholder="please input password"
              show-password
            />
          </el-form-item>
          <el-button class="mt-2" @click="active = State.START">Previous</el-button>
          <el-button class="mt-2" type="primary" @click="confirm(payPassRef)">Next</el-button>
        </el-form>
      </div>
      <div v-else-if="active === State.COMPLETE">
        <el-result icon="success" title="Success" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary" @click="active = State.START">再转一笔</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { type FormRules, type FormInstance, ElForm } from 'element-plus';
import { ref } from 'vue';

enum State {
  START,
  CONFIRM,
  COMPLETE,
}

const active = ref(State.START);
const payFormRef = ref<FormInstance>();
const payRules = ref<FormRules>({
  sender: [
    {
      required: true,
      message: 'please select pay account',
      trigger: 'blur',
    },
  ],
  receiverMethod: [
    {
      required: true,
      message: 'please select a method',
      trigger: 'blur',
    },
  ],
  receiver: [
    {
      required: true,
      message: 'please input account email',
      trigger: 'blur',
    },
    {
      type: 'email',
    },
  ],
  name: [
    {
      required: true,
      message: 'please input name',
      trigger: 'blur',
    },
  ],
  money: [
    {
      required: true,
      message: 'please input money',
      trigger: 'blur',
    },
  ],
});
const form = ref({
  sender: 'example@1r21.cn',
  receiverMethod: 'wechat',
  receiver: 'iron.cheng@qq.com',
  name: 'aha',
  money: 1980,
});

const payPassRef = ref<FormInstance>();
const payPassForm = ref({
  pass: '',
});

function commit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      active.value = State.CONFIRM;
    }
  });
}

function confirm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      active.value = State.COMPLETE;
    }
  });
}
</script>

<style scoped>
.el-input-number {
  width: 100%;
}

:global(.fs-num .el-input-number .el-input__inner) {
  text-align: left;
}
</style>
