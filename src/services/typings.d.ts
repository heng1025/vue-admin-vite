declare namespace API {
  type Response<T = unknown> = {
    code: number;
    message?: string;
    data: T;
  };

  type User = {
    username: string;
    avatar: string;
    email?: string;
    signature?: string;
    address?: string;
    title?: string;
    group?: string;
    tags?: UserTag[];
  };

  type UserTag = {
    key: string;
    label: string;
  };
}
