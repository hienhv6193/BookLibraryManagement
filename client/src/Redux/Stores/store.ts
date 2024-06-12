import { configureStore } from "@reduxjs/toolkit";
import readerReducer from "../Reducers/reader.reducer";
import libraryCardReducer from "../Reducers/library_card.reducer";
import loanSlipReducer from "../Reducers/loan_slip.reducer";
import borrowedDetailReducer from "../Reducers/borrowed_detail.reducer";
import authorReducer from "../Reducers/author.reducer";
import bookReducer from "../Reducers/book.reducer";
import typeBookReducer from "../Reducers/type_book.reducer";
import publishingCompanyReducer from "../Reducers/publishing_company";

export const store = configureStore({
  reducer: {
    reader: readerReducer,
    libraryCard: libraryCardReducer,
    loanSlip: loanSlipReducer,
    borrowedDetail: borrowedDetailReducer,
    author: authorReducer,
    book: bookReducer,
    typeBook: typeBookReducer,
    publishingCompany: publishingCompanyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
