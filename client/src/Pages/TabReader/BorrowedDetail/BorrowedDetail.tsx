import { useEffect } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { getBorrowedDetail } from "../../../Redux/Reducers/borrowed_detail.reducer";
import AddBorrowedDetail from "./components/AddBorrowedDetail";
import BorrowedDetailTable from "./components/BorrowedDetailTable";

const BorrowedDetail = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBorrowedDetail());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Chi tiết phiếu mượn</h3>
        <AddBorrowedDetail />
      </div>
      <br />
      <BorrowedDetailTable />
    </div>
  );
};

export default BorrowedDetail;
