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
  Input,
  Field,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import {
  CreateTypeBookBody,
  createTypeBook,
  getTypeBook,
} from "../../../../Redux/Reducers/type_book.reducer";
import { useAppDispatch } from "../../../../Redux/hooks";
import { useState } from "react";

const AddTypeBook = () => {
  const inputId = useId("input");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const handleCreate = async (newTypeBook: CreateTypeBookBody) => {
    try {
      await dispatch(createTypeBook(newTypeBook));
      await dispatch(getTypeBook());
    } catch (error) {
      console.error("Failed to create type book", error);
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
          <DialogTitle>Thêm thể loại sách</DialogTitle>
          <DialogContent>
            <Field
              label="Tên thể loại sách"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputId}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                onClick={() => handleCreate({ name })}
                disabled={!name}
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

export default AddTypeBook;
