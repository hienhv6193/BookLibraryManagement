import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface TypeBook {
  id: string;
  name: string;
}

export interface CreateTypeBookBody {
  name: string;
}

interface TypeBookState {
  typeBooks: TypeBook[];
  loading: boolean;
  error: string | null;
}

const initialState: TypeBookState = {
  typeBooks: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/TypeBook`;

export const getTypeBook = createAsyncThunk("typeBook", async () => {
  const response = await fetch(apiUrl);
  const data: TypeBook[] = await response.json();
  return data;
});

export const getTypeBookById = createAsyncThunk(
  "typeBook/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: TypeBook = await response.json();
    return data;
  }
);

export const createTypeBook = createAsyncThunk(
  "typeBook/create",
  async (newTypeBook: CreateTypeBookBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTypeBook),
    });
    const data: TypeBook = await response.json();
    return data;
  }
);

export const updateTypeBook = createAsyncThunk(
  "typeBook/update",
  async (typeBook: CreateTypeBookBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${typeBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typeBook),
    });
    const data: TypeBook = await response.json();
    return data;
  }
);

export const deleteTypeBook = createAsyncThunk(
  "typeBook/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const typeBookSlice = createSlice({
  name: "typeBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTypeBook.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTypeBook.fulfilled, (state, action) => {
      state.typeBooks = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getTypeBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.typeBooks = [];
    });
  },
});

export default typeBookSlice.reducer;
