import { useAppDispatch } from "../../../Redux/hooks";
import { useEffect } from "react";
import { getLibraryCard } from "../../../Redux/Reducers/library_card.reducer";
import AddLibraryCard from "./components/AddLibraryCard";
import LibraryCardTable from "./components/LibraryCardTable";

const LibraryCard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLibraryCard());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Thẻ thư viện</h3>
        <AddLibraryCard />
      </div>
      <br />
      <LibraryCardTable />
    </div>
  );
};

export default LibraryCard;
