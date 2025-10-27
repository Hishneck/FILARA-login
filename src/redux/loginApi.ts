import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Определяем тип Product прямо здесь
interface Product {
  id: string | number;
  name: string;
  email?: string;
  password: string;
  role?: string;
  // Добавьте другие поля, которые возвращает ваш API
}

// Тип для параметров запроса getLogin
interface GetLoginParams {
  limit?: number;
}

// Тип для тела запроса addProduct (в контексте авторизации это данные для входа)
interface LoginCredentials {
  email: string;
  password: string;
}

// Тип для ответа getLogin
interface GetLoginResponse {
  data: Product[];
  total: number;
}

// Тип для ответа addProduct (токен после успешной авторизации)
interface LoginResponse {
  token: string;
  user: Product; // Дополнительно можем вернуть данные пользователя
}



export const loginApi = createApi({
  reducerPath: 'loginApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/auth/login',
    // Пример добавления заголовка с токеном (если нужно для других эндпоинтов)
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as any).auth.token;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }) ,
  endpoints: (build) => ({
    getLogin: build.query<GetLoginResponse, GetLoginParams>({
      query: (params) => {
        const { limit } = params || {};
        return `login?${limit ? `_limit=${limit}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products' as const, id: 'LIST' },
            ]
          : [{ type: 'Products' as const, id: 'LIST' }],
    }),
    addProduct: build.mutation<LoginResponse, LoginCredentials>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products' as const, id: 'LIST' }],
    }),
  }),
});

// Экспорт хуков с типизацией
export const {
  useGetLoginQuery,
  useAddProductMutation,
} = loginApi;