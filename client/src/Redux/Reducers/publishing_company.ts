import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Constants/url.constants";

export interface PublishingCompany {
  id: string;
  name: string;
  address: string;
  email: string;
}

export interface CreatePublishingCompanyBody {
  name: string;
  address: string;
  email: string;
}

interface PublishingCompanyState {
  publishingCompanies: PublishingCompany[];
  loading: boolean;
  error: string | null;
}

const initialState: PublishingCompanyState = {
  publishingCompanies: [],
  loading: false,
  error: "",
};

const apiUrl = `${baseUrl}/PublishingCompany`;

export const getPublishingCompany = createAsyncThunk(
  "publishingCompany",
  async () => {
    const response = await fetch(apiUrl);
    const data: PublishingCompany[] = await response.json();
    return data;
  }
);

export const getPublishingCompanyById = createAsyncThunk(
  "publishingCompany/getById",
  async (id: string) => {
    const response = await fetch(`${apiUrl}/GetById?id=${id}`);
    const data: PublishingCompany = await response.json();
    return data;
  }
);

export const createPublishingCompany = createAsyncThunk(
  "publishingCompany/create",
  async (newPublishingCompany: CreatePublishingCompanyBody) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPublishingCompany),
    });
    const data: PublishingCompany = await response.json();
    return data;
  }
);

export const updatePublishingCompany = createAsyncThunk(
  "publishingCompany/update",
  async (publishingCompany: CreatePublishingCompanyBody & { id: string }) => {
    const response = await fetch(`${apiUrl}?id=${publishingCompany.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publishingCompany),
    });
    const data: PublishingCompany = await response.json();
    return data;
  }
);

export const deletePublishingCompany = createAsyncThunk(
  "publishingCompany/delete",
  async (id: string) => {
    await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const publishingCompanySlice = createSlice({
  name: "publishingCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublishingCompany.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPublishingCompany.fulfilled, (state, action) => {
      state.publishingCompanies = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getPublishingCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.publishingCompanies = [];
    });
  },
});

export default publishingCompanySlice.reducer;
