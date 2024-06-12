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
  Option,
  Textarea,
  Dropdown,
  makeStyles,
  DropdownProps,
  Input,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { getLoanSlip } from "../../../../Redux/Reducers/loan_slip.reducer";
import { getBook } from "../../../../Redux/Reducers/book.reducer";
import {
  BorrowedDetail,
  createBorrowedDetail,
  getBorrowedDetail,
} from "../../../../Redux/Reducers/borrowed_detail.reducer";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

const AddBorrowedDetail = (
  props: Partial<DatePickerProps>,
  propsDropdown: Partial<DropdownProps>
) => {
  const inputName = useId("input");
  const inputNote = useId("input");
  const dispatch = useAppDispatch();
  const [borrowedDetail, setBorrowedDetail] = useState<BorrowedDetail>({
    id: "",
    name: "",
    book_id: "",
    borrowed_day: "",
    pay_day: "",
    note: "",
  });
  const styles = useStyles();
  // select loan slip
  const dropdownId = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const loanSlip = useAppSelector((state) => state.loanSlip.loanSlip);
  const book = useAppSelector((state) => state.book.books);
  useEffect(() => {
    dispatch(getLoanSlip());
    if (loanSlip) {
      setOptions(loanSlip.map((card) => card.id));
    }
    dispatch(getBook());
    if (book) {
      setOptionsBook(book.map((card) => card.id));
    }
  }, [dispatch, loanSlip, book]);
  const handleLoanSlipSelect = (selectedCardId: string) => {
    setBorrowedDetail((prevLoanSlip) => ({
      ...prevLoanSlip,
      id: selectedCardId,
    }));
  };
  // select book
  const dropdownIdBook = useId("dropdown-default");
  const [optionsBook, setOptionsBook] = useState<string[]>([]);
  const handleBookSelect = (selectedCardId: string) => {
    setBorrowedDetail((prevBook) => ({
      ...prevBook,
      book_id: selectedCardId,
    }));
  };
  const onClickBorrowDay: React.ReactEventHandler<HTMLInputElement> = (
    event
  ) => {
    setBorrowedDetail({
      ...borrowedDetail,
      borrowed_day: event.currentTarget.value,
    });
  };
  const onClickPayDay: React.ReactEventHandler<HTMLInputElement> = (event) => {
    setBorrowedDetail({
      ...borrowedDetail,
      pay_day: event.currentTarget.value,
    });
  };
  const handleCreate = async (newBorrowedDetail: BorrowedDetail) => {
    try {
      await dispatch(createBorrowedDetail(newBorrowedDetail));
      await dispatch(getBorrowedDetail());
    } catch (error) {
      console.error("Failed to create borrowed detail", error);
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
          <DialogTitle>Thêm thẻ thư viện sách</DialogTitle>
          <DialogContent>
            <div className={styles.root}>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn thẻ thư viện
              </label>
              <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Chọn phiếu mượn"
                {...propsDropdown}
              >
                {options.map((option) => (
                  <Option
                    key={option}
                    value={option}
                    onClick={() => handleLoanSlipSelect(option)}
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
                  setBorrowedDetail({ ...borrowedDetail, name: e.target.value })
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
                {...propsDropdown}
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
                value={borrowedDetail.note}
                onChange={(e) =>
                  setBorrowedDetail({ ...borrowedDetail, note: e.target.value })
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
                  !borrowedDetail.id ||
                  !borrowedDetail.name ||
                  !borrowedDetail.book_id ||
                  !borrowedDetail.borrowed_day ||
                  !borrowedDetail.pay_day ||
                  !borrowedDetail.note
                }
                onClick={() => handleCreate({ ...borrowedDetail })}
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

export default AddBorrowedDetail;
