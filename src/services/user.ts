import { post, get } from '../utils/request';

export async function login(username: string, password: string) {
  return post<API.User & { token: string }>('/login', {
    username,
    password,
  });
}

export async function getCurrentUser() {
  return get<API.User>('/user');
}
