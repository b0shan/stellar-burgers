import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TUser, TOrder } from '@utils-types';
import {
  getIngredientsApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  orderBurgerApi,
  getOrdersApi,
  getFeedsApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async () => {
    console.log('Fetching ingredients from API...');
    try {
      const ingredients = await getIngredientsApi();
      console.log('Ingredients received:', ingredients);
      return ingredients;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  }
);

export const createOrder = createAsyncThunk(
  'burger/createOrder',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const fetchUserOrders = createAsyncThunk(
  'burger/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const fetchFeed = createAsyncThunk('burger/fetchFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

export const loginUser = createAsyncThunk(
  'burger/loginUser',
  async (credentials: TLoginData) => {
    const response = await loginUserApi(credentials);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'burger/registerUser',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('burger/logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const getUser = createAsyncThunk('burger/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

type BurgerState = {
  ingredients: {
    data: TIngredient[];
    loading: boolean;
    error: string | null;
  };
  constructor: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  user: {
    data: TUser | null;
    loading: boolean;
    error: string | null;
  };
  order: {
    data: TOrder | null;
    loading: boolean;
    error: string | null;
  };
  userOrders: {
    data: TOrder[];
    loading: boolean;
    error: string | null;
  };
  feed: {
    data: TOrder[];
    total: number;
    totalToday: number;
    loading: boolean;
    error: string | null;
  };
};

const initialState: BurgerState = {
  ingredients: {
    data: [],
    loading: false,
    error: null
  },
  constructor: {
    bun: null,
    ingredients: []
  },
  user: {
    data: null,
    loading: false,
    error: null
  },
  order: {
    data: null,
    loading: false,
    error: null
  },
  userOrders: {
    data: [],
    loading: false,
    error: null
  },
  feed: {
    data: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  }
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructor.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.constructor.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (_, index) => index !== Number(action.payload)
      );
    },
    clearConstructor: (state) => {
      state.constructor.bun = null;
      state.constructor.ingredients = [];
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user.data = action.payload;
    },
    clearUser: (state) => {
      state.user.data = null;
    },
    clearOrder: (state) => {
      state.order.data = null;
      state.order.error = null;
    },
    clearUserOrders: (state) => {
      state.userOrders.data = [];
      state.userOrders.error = null;
    },
    clearFeed: (state) => {
      state.feed.data = [];
      state.feed.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredients.loading = true;
        state.ingredients.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients.loading = false;
        state.ingredients.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredients.loading = false;
        state.ingredients.error = action.error.message || 'Ошибка загрузки';
      })
      .addCase(createOrder.pending, (state) => {
        state.order.loading = true;
        state.order.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order.loading = false;
        state.order.data = action.payload;
        state.constructor.bun = null;
        state.constructor.ingredients = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.order.loading = false;
        state.order.error = action.error.message || 'Ошибка создания заказа';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrders.loading = true;
        state.userOrders.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders.loading = false;
        state.userOrders.data = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrders.loading = false;
        state.userOrders.error =
          action.error.message || 'Ошибка загрузки заказов';
      })
      .addCase(fetchFeed.pending, (state) => {
        state.feed.loading = true;
        state.feed.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed.loading = false;
        state.feed.data = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.feed.loading = false;
        state.feed.error =
          action.error.message || 'Ошибка загрузки ленты заказов';
      })
      .addCase(loginUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(registerUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.data = null;
        state.user.loading = false;
        state.user.error = null;
        state.userOrders.data = [];
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.loading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user.data = null;
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  setUser,
  clearUser,
  clearOrder,
  clearUserOrders,
  clearFeed
} = burgerSlice.actions;

export default burgerSlice.reducer;
