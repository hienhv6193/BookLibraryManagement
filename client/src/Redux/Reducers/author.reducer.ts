import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface Author {
  id: string;
  name: string;
  website: string;
  note: string;
}

export interface CreateAuthorBody {
  name: string;
  website: string;
  note: string;
}

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthorState = {
  authors: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/Author`;

export const getAuthor = createAsyncThunk("author", async () => {
  const response = await fetch(apiUrl);
  const data: Author[] = await response.json();
  return data;
});

export const getAuthorById = createAsyncThunk(
  "author/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: Author = await response.json();
    return data;
  }
);

export const createAuthor = createAsyncThunk(
  "author/create",
  async (author: CreateAuthorBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    const data: Author = await response.json();
    return data;
  }
);

export const updateAuthor = createAsyncThunk(
  "author/update",
  async (author: CreateAuthorBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${author.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    const data: Author = await response.json();
    return data;
  }
);

export const deleteAuthor = createAsyncThunk(
  "author/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthor.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAuthor.fulfilled, (state, action) => {
      state.authors = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAuthor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.authors = [];
    });
  },
});

export default authorSlice.reducer;
