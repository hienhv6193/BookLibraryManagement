import {
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  useId,
  Dialog,
  DropdownProps,
  Dropdown,
  Option,
  makeStyles,
  Field,
  Textarea,
  Input,
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import {
  CreateLoanSlipBody,
  getLoanSlip,
  getLoanSlipById,
  updateLoanSlip,
} from "../../../../Redux/Reducers/loan_slip.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { getLibraryCard } from "../../../../Redux/Reducers/library_card.reducer";
import { getBook } from "../../../../Redux/Reducers/book.reducer";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { format } from "date-fns";
import { getBorrowedDetailById } from "../../../../Redux/Reducers/borrowed_detail.reducer";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

interface EditLoanSlipProps {
  id: string;
}

const EditLoanSlip: React.FC<EditLoanSlipProps> = (
  { id },
  props: Partial<DropdownProps & DatePickerProps>
) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const inputName = useId("input");
  const inputNote = useId("input");
  const dropdownId = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const dropdownIdBook = useId("dropdown-default");
  const [optionsBook, setOptionsBook] = useState<string[]>([]);
  const libraryCards = useAppSelector((state) => state.libraryCard.libraryCard);
  const book = useAppSelector((state) => state.book.books);
  const [loanSlip, setLoanSlip] = useState({
    library_card_id: "",
  });
  const [borrowedDetail, setBorrowedDetail] = useState({
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
  useEffect(() => {
    async function fetchDataLoanSlip() {
      const data = await dispatch(getLoanSlipById(id));
      const borrowData = await dispatch(getBorrowedDetailById(id));
      setLoanSlip(data.payload as { library_card_id: string });
      setBorrowedDetail(
        borrowData.payload as {
          name: string;
          book_id: string;
          borrowed_day: string;
          pay_day: string;
          note: string;
        }
      );
    }
    if (id) {
      fetchDataLoanSlip();
    }
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getLibraryCard());
    dispatch(getBook());
  }, [dispatch]);
  useEffect(() => {
    if (libraryCards) {
      setOptions(libraryCards.map((card) => card.id));
    }
    if (book) {
      setOptionsBook(book.map((card) => card.id));
    }
  }, [libraryCards, book]);
  const handleLibraryCardSelect = (selectedCardId: string) => {
    setLoanSlip((prevReader) => ({
      ...prevReader,
      library_card_id: selectedCardId,
    }));
  };
  const handleBookSelect = (selectedCardId: string) => {
    setLoanSlip((prevBook) => ({
      ...prevBook,
      book_id: selectedCardId,
    }));
  };
  const onClickBorrowDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    const dateString = event.currentTarget.value;
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateString);
      return;
    }

    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    setBorrowedDetail({
      ...borrowedDetail,
      borrowed_day: formattedDate,
    });
  };
  const onClickPayDay: React.ReactEventHandler<HTMLInputElement> = (event) => {
    const dateString = event.currentTarget.value;
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateString);
      return;
    }

    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    setBorrowedDetail({
      ...borrowedDetail,
      pay_day: formattedDate,
    });
  };
  const handleUpdate = async (newLoanSlip: CreateLoanSlipBody) => {
    try {
      await dispatch(updateLoanSlip({ ...newLoanSlip, id }));
      await dispatch(getLoanSlip());
    } catch (error) {
      console.error("Failed to create loan slip", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Thêm phiếu mượn</DialogTitle>
          <DialogContent>
            <div className={styles.root}>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn thẻ thư viện
              </label>
              <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Chọn thẻ thư viện"
                {...props}
                value={loanSlip.library_card_id}
              >
                {options.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleLibraryCardSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <Field
              label="Tên chi tiết phiếu mượn"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputName}
                value={borrowedDetail.name}
                onChange={(e) =>
                  setBorrowedDetail({
                    ...borrowedDetail,
                    name: e.currentTarget.value,
                  })
                }
              />
            </Field>
            <br />
            <div className={styles.root}>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn sách
              </label>
              <Dropdown
                aria-labelledby={dropdownIdBook}
                placeholder="Chọn sách"
                {...props}
                value={borrowedDetail.book_id}
              >
                {optionsBook.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleBookSelect(option)}
                  >
                    {option}
                  </Option>
                ))}
              </Dropdown>
            </div>
            <br />
            <Field label="Ngày cho mượn">
              <DatePicker
                placeholder="Chọn cho mượn..."
                {...props}
                onSelect={onClickBorrowDay}
                value={new Date(borrowedDetail.borrowed_day)}
              />
            </Field>
            <br />
            <Field label="Ngày trả">
              <DatePicker
                placeholder="Chọn ngày trả..."
                {...props}
                onSelect={onClickPayDay}
                value={new Date(borrowedDetail.pay_day)}
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputNote}
                resize="vertical"
                value={borrowedDetail.note}
                onChange={(e) =>
                  setBorrowedDetail({
                    ...borrowedDetail,
                    note: e.currentTarget.value,
                  })
                }
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Hủy</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                disabled={
                  !loanSlip.library_card_id ||
                  !borrowedDetail.name ||
                  !borrowedDetail.book_id ||
                  !borrowedDetail.borrowed_day ||
                  !borrowedDetail.pay_day ||
                  !borrowedDetail.note
                }
                onClick={() => handleUpdate({ ...loanSlip, ...borrowedDetail })}
              >
                Cập nhật
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default EditLoanSlip;
