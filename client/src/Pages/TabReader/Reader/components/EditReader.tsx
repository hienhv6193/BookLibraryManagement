import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  Option,
  DropdownProps,
  Input,
  makeStyles,
  useId,
  Field,
} from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import {
  CreateReaderBody,
  getReader,
  getReaderById,
  updateReader,
} from "../../../../Redux/Reducers/reader.reducer";
import { useEffect, useState } from "react";
import { EditRegular } from "@fluentui/react-icons";
import { getLibraryCard } from "../../../../Redux/Reducers/library_card.reducer";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
  },
});

interface EditReaderProps {
  id: string;
}

const EditReader: React.FC<EditReaderProps> = (
  { id },
  props: Partial<DropdownProps>
) => {
  const inputName = useId("input");
  const inputAddress = useId("input");
  const styles = useStyles();
  const dropdownId = useId("dropdown-default");
  const [options, setOptions] = useState<string[]>([]);
  const [reader, setReader] = useState<CreateReaderBody>({
    name: "",
    address: "",
    library_card_id: "",
  });
  const dispatch = useAppDispatch();
  const libraryCards = useAppSelector((state) => state.libraryCard.libraryCard);
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getReaderById(id));
      setReader(data.payload as CreateReaderBody);
    }

    if (id) {
      fetchData();
    }

    dispatch(getLibraryCard());
    if (libraryCards) {
      setOptions(libraryCards.map((card) => card.id));
    }
  }, [dispatch, id, libraryCards]);

  const handleLibraryCardSelect = (selectedCardId: string) => {
    setReader((prevReader) => ({
      ...prevReader,
      library_card_id: selectedCardId,
    }));
  };
  const handleUpdate = async (newReader: CreateReaderBody) => {
    try {
      await dispatch(updateReader({ ...newReader, id }));
      await dispatch(getReader());
    } catch (error) {
      console.error("Failed to create reader", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật độc giả</DialogTitle>
          <DialogContent>
            <Field label="Tên độc giả" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputName}
                required
                onChange={(e) => setReader({ ...reader, name: e.target.value })}
                value={reader.name}
              />
            </Field>
            <br />
            <Field label="Địa chỉ" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputAddress}
                required
                onChange={(e) =>
                  setReader({ ...reader, address: e.target.value })
                }
                value={reader.address}
              />
            </Field>
            <br />
            <div className={styles.root}>
              <label id={dropdownId} style={{ paddingInlineEnd: "12px" }}>
                Chọn thẻ thư viện
              </label>
              <Dropdown
                aria-labelledby={dropdownId}
                placeholder="Chọn thẻ thư viện"
                {...props}
                value={reader.library_card_id}
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
                disabled={
                  !reader.name || !reader.address || !reader.library_card_id
                }
                onClick={() => handleUpdate({ ...reader })}
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

export default EditReader;
