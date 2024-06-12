import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Redux/hooks";
import {
  BorrowedDetail,
  getBorrowedDetailById,
} from "../../../../Redux/Reducers/borrowed_detail.reducer";

interface BorrowedDetailProps {
  id: string;
}

const BorrowedDetailById: React.FC<BorrowedDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [borrowedDetail, setBorrowedDetail] = useState<BorrowedDetail>({
    id: "",
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getBorrowedDetailById(id));
      setBorrowedDetail(data.payload as BorrowedDetail);
    }

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Chi tiết phiếu mượn</h3>
      </div>
      <br />
      <div>
        <p>{borrowedDetail.id}</p>
        <p>{borrowedDetail.name}</p>
        <p>{borrowedDetail.book_id}</p>
        <p>{borrowedDetail.borrowed_day}</p>
        <p>{borrowedDetail.pay_day}</p>
        <p>{borrowedDetail.note}</p>
      </div>
    </div>
  );
};

export default BorrowedDetailById;
