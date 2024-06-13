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
  Input,
  Textarea,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import {
  CreateLoanSlipBody,
  createLoanSlip,
  getLoanSlip,
} from "../../../../Redux/Reducers/loan_slip.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { getLibraryCard } from "../../../../Redux/Reducers/library_card.reducer";
import { DatePicker, DatePickerProps } from "@fluentui/react-datepicker-compat";
import { getBook } from "../../../../Redux/Reducers/book.reducer";
import { format } from "date-fns";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

const AddLoanSlip = (props: Partial<DropdownProps & DatePickerProps>) => {
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
  const [loanSlip, setLoanSlip] = useState<CreateLoanSlipBody>({
    library_card_id: "",
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
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

    setLoanSlip({
      ...loanSlip,
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

    setLoanSlip({
      ...loanSlip,
      pay_day: formattedDate,
    });
  };
  const handleCreate = async (newLoanSlip: CreateLoanSlipBody) => {
    try {
      if (newLoanSlip.borrowed_day > newLoanSlip.pay_day) {
        alert("Ngày trả phải sau ngày mượn");
        console.log(newLoanSlip.borrowed_day);
      } else {
        await dispatch(createLoanSlip(newLoanSlip));
        await dispatch(getLoanSlip());
      }
    } catch (error) {
      console.error("Failed to create loan slip", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<AddRegular />}>
          Thêm
        </Button>
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
                value={loanSlip.name}
                onChange={(e) =>
                  setLoanSlip({ ...loanSlip, name: e.currentTarget.value })
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
              />
            </Field>
            <br />
            <Field label="Ngày trả">
              <DatePicker
                placeholder="Chọn ngày trả..."
                {...props}
                onSelect={onClickPayDay}
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputNote}
                resize="vertical"
                value={loanSlip.note}
                onChange={(e) =>
                  setLoanSlip({ ...loanSlip, note: e.currentTarget.value })
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
                  !loanSlip.name ||
                  !loanSlip.book_id ||
                  !loanSlip.borrowed_day ||
                  !loanSlip.pay_day ||
                  !loanSlip.note
                }
                onClick={() => handleCreate({ ...loanSlip })}
              >
                Thêm
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default AddLoanSlip;
