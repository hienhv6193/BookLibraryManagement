import { getReader } from "../../../Redux/Reducers/reader.reducer";
import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import AddReader from "./components/AddReader";
import ReaderTable from "./components/ReaderTable";
const Reader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReader());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Độc giả</h3>
        <AddReader />
      </div>
      <br />
      <ReaderTable />
    </div>
  );
};

export default Reader;
