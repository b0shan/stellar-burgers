import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TUser } from '@utils-types';
import { getIngredientsApi } from '@api';

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
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  setUser,
  clearUser
} = burgerSlice.actions;

export default burgerSlice.reducer;
