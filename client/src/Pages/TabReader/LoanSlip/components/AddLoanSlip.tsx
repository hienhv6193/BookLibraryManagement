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

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

const AddLoanSlip = (props: Partial<DropdownProps>) => {
  const dispatch = useAppDispatch();
  const dropdownId = useId("dropdown-default");
  const styles = useStyles();
  const [options, setOptions] = useState<string[]>([]);
  const libraryCards = useAppSelector((state) => state.libraryCard.libraryCard);
  useEffect(() => {
    dispatch(getLibraryCard());
    if (libraryCards) {
      setOptions(libraryCards.map((card) => card.id));
    }
  }, [dispatch, libraryCards]);
  const [loanSlip, setLoanSlip] = useState<CreateLoanSlipBody>({
    library_card_id: "",
  });
  const handleLibraryCardSelect = (selectedCardId: string) => {
    setLoanSlip((prevReader) => ({
      ...prevReader,
      library_card_id: selectedCardId,
    }));
  };
  const handleCreate = async (newLoanSlip: CreateLoanSlipBody) => {
    try {
      await dispatch(createLoanSlip(newLoanSlip));
      await dispatch(getLoanSlip());
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
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Hủy</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                disabled={!loanSlip.library_card_id}
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
