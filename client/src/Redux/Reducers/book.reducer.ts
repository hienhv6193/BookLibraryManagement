import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface Book {
  id: string;
  name: string;
  type_id: string;
  author_id: string;
  publishing_id: string;
}

export interface CreateBookBody {
  name: string;
  type_id: string;
  author_id: string;
  publishing_id: string;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/Book`;

export const getBook = createAsyncThunk("book", async () => {
  const response = await fetch(apiUrl);
  const data: Book[] = await response.json();
  return data;
});

export const getBookById = createAsyncThunk(
  "book/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: Book = await response.json();
    return data;
  }
);

export const createBook = createAsyncThunk(
  "book/create",
  async (book: CreateBookBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data: Book = await response.json();
    return data;
  }
);

export const updateBook = createAsyncThunk(
  "book/update",
  async (book: CreateBookBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data: Book = await response.json();
    return data;
  }
);

export const deleteBook = createAsyncThunk(
  "book/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.books = [];
    });
  },
});

export default bookSlice.reducer;
