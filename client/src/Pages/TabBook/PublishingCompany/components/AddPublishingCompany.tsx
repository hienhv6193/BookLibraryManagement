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
import { useState } from "react";
import {
  CreatePublishingCompanyBody,
  createPublishingCompany,
  getPublishingCompany,
} from "../../../../Redux/Reducers/publishing_company";
import { useAppDispatch } from "../../../../Redux/hooks";

const AddPublishingCompany = () => {
  const inputName = useId("input");
  const inputAddress = useId("input");
  const inputEmail = useId("input");
  const [publishing, setPublishing] = useState<CreatePublishingCompanyBody>({
    name: "",
    address: "",
    email: "",
  });
  const dispatch = useAppDispatch();
  const handleCreate = async (newPublishing: CreatePublishingCompanyBody) => {
    try {
      await dispatch(createPublishingCompany(newPublishing));
      await dispatch(getPublishingCompany());
    } catch (error) {
      console.error("Failed to create publishing company", error);
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
          <DialogTitle>Thêm nhà xuất bản</DialogTitle>
          <DialogContent>
            <Field
              label="Tên nhà xuất bản"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputName}
                required
                onChange={(e) =>
                  setPublishing({ ...publishing, name: e.target.value })
                }
              />
            </Field>
            <br />
            <Field label="Địa chỉ" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputAddress}
                required
                onChange={(e) =>
                  setPublishing({ ...publishing, address: e.target.value })
                }
              />
            </Field>
            <br />
            <Field label="Email" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputEmail}
                type="email"
                required
                onChange={(e) =>
                  setPublishing({ ...publishing, email: e.target.value })
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
                  !publishing.name || !publishing.address || !publishing.email
                }
                onClick={() => handleCreate(publishing)}
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

export default AddPublishingCompany;
