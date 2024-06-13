import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface BorrowedDetailModel {
  id: string;
  name: string;
  book_id: string;
  borrowed_day: string;
  pay_day: string;
  note: string;
}

interface BorrowedDetailState {
  borrowed_detail: BorrowedDetailModel[];
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
    const data: BorrowedDetailModel[] = await response.json();
    return data;
  }
);

export const getBorrowedDetailById = createAsyncThunk(
  "borrowedDetail/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: BorrowedDetailModel = await response.json();
    return data;
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
