import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Redux/hooks";
import { Book, getBookById } from "../../../../Redux/Reducers/book.reducer";

interface BookDetailProps {
  id: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [bookDetail, setBook] = useState<Book>({
    id: "",
    name: "",
    type_id: "",
    author_id: "",
    publishing_id: "",
  });
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getBookById(id));
      setBook(data.payload as Book);
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
        <p>{bookDetail.id}</p>
        <p>{bookDetail.name}</p>
        <p>{bookDetail.type_id}</p>
        <p>{bookDetail.author_id}</p>
        <p>{bookDetail.publishing_id}</p>
      </div>
    </div>
  );
};

export default BookDetail;
