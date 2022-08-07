import { defineStore } from 'pinia';

import { login } from '@/services/user';

export const useStore = defineStore('main', {
  state: () => {
    return {
      user: {
        token: '',
      },
    };
  },
  actions: {
    async login(name: string, password: string) {
      this.user = await login(name, password);
      localStorage.setItem('token', this.user.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
  },
});
