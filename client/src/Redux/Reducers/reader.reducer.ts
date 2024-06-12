import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface Reader {
  id: string;
  name: string;
  address: string;
  library_card_id: string;
}

export interface CreateReaderBody {
  name: string;
  address: string;
  library_card_id: string;
}

interface ReaderState {
  readers: Reader[];
  loading: boolean;
  error: string | null;
}

const initialState: ReaderState = {
  readers: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/Reader`;

export const getReader = createAsyncThunk("reader", async () => {
  const response = await fetch(apiUrl);
  const data: Reader[] = await response.json();
  return data;
});

export const getReaderById = createAsyncThunk(
  "reader/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: Reader = await response.json();
    return data;
  }
);

export const createReader = createAsyncThunk(
  "reader/create",
  async (newReader: CreateReaderBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReader),
    });
    const data: Reader = await response.json();
    return data;
  }
);

export const updateReader = createAsyncThunk(
  "reader/update",
  async (updateReader: CreateReaderBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${updateReader.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateReader),
    });
    const data: Reader = await response.json();
    return data;
  }
);

export const deleteReader = createAsyncThunk(
  "reader/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const readerSlice = createSlice({
  name: "readers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReader.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReader.fulfilled, (state, action) => {
      state.readers = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getReader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.readers = [];
    });
  },
});

export default readerSlice.reducer;
