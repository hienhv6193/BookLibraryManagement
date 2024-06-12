import { DeleteRegular } from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { deleteBook, getBook } from "../../../../Redux/Reducers/book.reducer";
import EditBook from "./EditBook";

const columns = [
  { label: "Mã sách" },
  { label: "Tên sách" },
  { label: "Thể loại" },
  { label: "Tác giả" },
  { label: "Nhà xuất bản" },
  { label: "Tác vụ" },
];

const BookTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteBook = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteBook(id));
        await dispatch(getBook());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const book = useAppSelector((state) => state.book.books);
  const loading = useAppSelector((state) => state.book.loading);
  const error = useAppSelector((state) => state.book.error);
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }
  return (
    <Table {...keyboardNavAttr} role="grid">
      <TableHeader className="font-bold">
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {book.map((item) => (
          <TableRow key={item.id}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.name}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.type_id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.author_id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.publishing_id}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                {/* <BookDetail id={item.id} /> */}
                <EditBook id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteBook(item.id)}
                />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
