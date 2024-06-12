import { useAppDispatch } from "../../../Redux/hooks";
import { useEffect } from "react";
import { getBook } from "../../../Redux/Reducers/book.reducer";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";

const Book = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Sách</h3>
        <AddBook />
      </div>
      <br />
      <BookTable />
    </div>
  );
};

export default Book;
