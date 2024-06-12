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
import {
  deleteLibraryCard,
  getLibraryCard,
} from "../../../../Redux/Reducers/library_card.reducer";
import EditLibraryCard from "./EditLibraryCard";

const columns = [
  { label: "Mã độc giả" },
  { label: "Ngày cấp" },
  { label: "Ngày hết hạn" },
  { label: "Ghi chú" },
  { label: "Tác vụ" },
];

const LibraryCardTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });
  const dispatch = useAppDispatch();
  const handleDeleteLibraryCard = async (id: string) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        return;
      } else {
        await dispatch(deleteLibraryCard(id));
        await dispatch(getLibraryCard());
      }
    } catch (error) {
      console.error("Failed to delete type book", error);
    }
  };
  const libraryCard = useAppSelector((state) => state.libraryCard.libraryCard);
  const loading = useAppSelector((state) => state.libraryCard.loading);
  const error = useAppSelector((state) => state.libraryCard.error);
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
          {columns.map((column, index) => (
            <TableHeaderCell key={index}>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {libraryCard.map((item, index) => (
          <TableRow key={index}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.id}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.card_created_date}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.card_expiry_date}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.note}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <EditLibraryCard id={item.id} />
                <Button
                  icon={<DeleteRegular />}
                  aria-label="Delete"
                  onClick={() => handleDeleteLibraryCard(item.id)}
                />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LibraryCardTable;
