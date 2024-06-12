import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface BorrowedDetail {
  id: string;
  name: string;
  book_id: string;
  borrowed_day: string;
  pay_day: string;
  note: string;
}

interface BorrowedDetailState {
  borrowed_detail: BorrowedDetail[];
  loading: boolean;
  error: string | null;
}

const initialState: BorrowedDetailState = {
  borrowed_detail: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/BorrowedDetail`;

export const getBorrowedDetail = createAsyncThunk(
  "borrowedDetail",
  async () => {
    const response = await fetch(apiUrl);
    const data: BorrowedDetail[] = await response.json();
    return data;
  }
);

export const getBorrowedDetailById = createAsyncThunk(
  "borrowedDetail/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: BorrowedDetail = await response.json();
    return data;
  }
);

export const createBorrowedDetail = createAsyncThunk(
  "borrowedDetail/create",
  async (newReader: BorrowedDetail) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReader),
    });
    const data: BorrowedDetail = await response.json();
    return data;
  }
);

export const updateBorrowedDetail = createAsyncThunk(
  "borrowedDetail/update",
  async (borrowedDetail: BorrowedDetail & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${borrowedDetail.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrowedDetail),
    });
    const data: BorrowedDetail = await response.json();
    return data;
  }
);

export const deleteBorrowedDetail = createAsyncThunk(
  "borrowedDetail/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const borrowedDetailSlice = createSlice({
  name: "borrowedDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBorrowedDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getBorrowedDetail.fulfilled, (state, action) => {
      state.borrowed_detail = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getBorrowedDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.borrowed_detail = [];
    });
  },
});

export default borrowedDetailSlice.reducer;
