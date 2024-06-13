import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface LoanSlip {
  id: string;
  library_card_id: string;
}

export interface CreateLoanSlipBody {
  library_card_id: string;
  name: string;
  book_id: string;
  borrowed_day: string;
  pay_day: string;
  note: string;
}

interface LoanSlipState {
  loanSlip: LoanSlip[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanSlipState = {
  loanSlip: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/LoanSlip`;

export const getLoanSlip = createAsyncThunk("loanSlip", async () => {
  const response = await fetch(apiUrl);
  const data: LoanSlip[] = await response.json();
  return data;
});

export const getLoanSlipById = createAsyncThunk(
  "loanSlip/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: LoanSlip = await response.json();
    return data;
  }
);

export const createLoanSlip = createAsyncThunk(
  "loanSlip/create",
  async (loanSlip: CreateLoanSlipBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loanSlip),
    });
    const data: LoanSlip = await response.json();
    return data;
  }
);

export const updateLoanSlip = createAsyncThunk(
  "loanSlip/update",
  async (loanSlip: CreateLoanSlipBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${loanSlip.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loanSlip),
    });
    const data: LoanSlip = await response.json();
    return data;
  }
);

export const deleteLoanSlip = createAsyncThunk(
  "loanSlip/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const loanSlipSlice = createSlice({
  name: "loanSlip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoanSlip.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getLoanSlip.fulfilled, (state, action) => {
      state.loanSlip = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getLoanSlip.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.loanSlip = [];
    });
  },
});

export default loanSlipSlice.reducer;
