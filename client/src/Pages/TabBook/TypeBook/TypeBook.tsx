import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import AddTypeBook from "./components/AddTypeBook";
import { getTypeBook } from "../../../Redux/Reducers/type_book.reducer";
import TypeBookTable from "./components/TypeBookTable";

const TypeBook = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTypeBook());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Thể loại sách</h3>
        <AddTypeBook />
      </div>
      <br />
      <TypeBookTable />
    </div>
  );
};

export default TypeBook;
