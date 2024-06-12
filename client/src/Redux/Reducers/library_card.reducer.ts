import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface LibraryCard {
  id: string;
  card_created_date: string;
  card_expiry_date: string;
  note: string;
}

export interface CreateLibraryCardBody {
  card_created_date: string;
  card_expiry_date: string;
  note: string;
}

interface ReaderState {
  libraryCard: LibraryCard[];
  loading: boolean;
  error: string | null;
}

const initialState: ReaderState = {
  libraryCard: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/LibraryCard`;

export const getLibraryCard = createAsyncThunk("libraryCard", async () => {
  const response = await fetch(apiUrl);
  const data: LibraryCard[] = await response.json();
  return data;
});

export const getLibraryCardById = createAsyncThunk(
  "libraryCard/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: LibraryCard = await response.json();
    return data;
  }
);

export const createLibraryCard = createAsyncThunk(
  "libraryCard/create",
  async (libraryCard: CreateLibraryCardBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libraryCard),
    });
    const data: LibraryCard = await response.json();
    return data;
  }
);

export const updateLibraryCard = createAsyncThunk(
  "libraryCard/update",
  async (libraryCard: CreateLibraryCardBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${libraryCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libraryCard),
    });
    const data: LibraryCard = await response.json();
    return data;
  }
);

export const deleteLibraryCard = createAsyncThunk(
  "libraryCard/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const libraryCardSlice = createSlice({
  name: "libraryCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLibraryCard.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getLibraryCard.fulfilled, (state, action) => {
      state.libraryCard = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getLibraryCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.libraryCard = [];
    });
  },
});

export default libraryCardSlice.reducer;
