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
  Textarea,
  Field,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import {
  CreateAuthorBody,
  createAuthor,
  getAuthor,
} from "../../../Redux/Reducers/author.reducer";

const AddAuthor = () => {
  const inputName = useId("input");
  const inputWebsite = useId("input");
  const inputNote = useId("input");
  const [author, setAuthor] = useState<CreateAuthorBody>({
    name: "",
    website: "",
    note: "",
  });
  const dispatch = useAppDispatch();
  const handleCreate = async (newAuthor: CreateAuthorBody) => {
    try {
      await dispatch(createAuthor(newAuthor));
      await dispatch(getAuthor());
    } catch (error) {
      console.error("Failed to create author", error);
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
          <DialogTitle>Thêm tác giả</DialogTitle>
          <DialogContent>
            <Field label="Tên tác giả" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputName}
                required
                onChange={(e) => setAuthor({ ...author, name: e.target.value })}
              />
            </Field>
            <br />
            <Field label="Website" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputWebsite}
                required
                onChange={(e) =>
                  setAuthor({ ...author, website: e.target.value })
                }
              />
            </Field>
            <br />
            <Field label="Ghi chú" style={{ paddingInlineEnd: "12px" }}>
              <Textarea
                id={inputNote}
                required
                resize="vertical"
                onChange={(e) => setAuthor({ ...author, note: e.target.value })}
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
                disabled={!author.name || !author.website || !author.note}
                onClick={() => handleCreate(author)}
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

export default AddAuthor;
