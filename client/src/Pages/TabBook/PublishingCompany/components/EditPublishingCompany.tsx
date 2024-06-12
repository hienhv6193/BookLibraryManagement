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
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { Field } from "@fluentui/react-components";
import {
  CreatePublishingCompanyBody,
  getPublishingCompany,
  getPublishingCompanyById,
  updatePublishingCompany,
} from "../../../../Redux/Reducers/publishing_company";
import { useAppDispatch } from "../../../../Redux/hooks";
import { useEffect, useState } from "react";

interface EditPublishingCompanyProps {
  id: string;
}

const EditPublishingCompany: React.FC<EditPublishingCompanyProps> = ({
  id,
}) => {
  const inputName = useId("input");
  const inputAddress = useId("input");
  const inputEmail = useId("input");
  const [publishingCompany, setPublishingCompany] =
    useState<CreatePublishingCompanyBody>({
      name: "",
      address: "",
      email: "",
    });
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getPublishingCompanyById(id));
      setPublishingCompany(data.payload as CreatePublishingCompanyBody);
    }

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const handleUpdatePublishingCompany = async (
    editPublishingCompany: CreatePublishingCompanyBody
  ) => {
    try {
      await dispatch(updatePublishingCompany({ ...editPublishingCompany, id }));
      await dispatch(getPublishingCompany());
    } catch (error) {
      console.error("Failed to update type book", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<EditRegular />} aria-label="Edit" />
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Cập nhật nhà xuất bản</DialogTitle>
          <DialogContent>
            <Field
              label="Tên nhà xuất bản"
              style={{ paddingInlineEnd: "12px" }}
            >
              <Input
                id={inputName}
                required
                onChange={(e) =>
                  setPublishingCompany({
                    ...publishingCompany,
                    name: e.target.value,
                  })
                }
                value={publishingCompany.name}
              />
            </Field>
            <br />
            <Field label="Địa chỉ" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputAddress}
                required
                onChange={(e) =>
                  setPublishingCompany({
                    ...publishingCompany,
                    address: e.target.value,
                  })
                }
                value={publishingCompany.address}
              />
            </Field>
            <br />
            <Field label="Email" style={{ paddingInlineEnd: "12px" }}>
              <Input
                id={inputEmail}
                type="email"
                required
                onChange={(e) =>
                  setPublishingCompany({
                    ...publishingCompany,
                    email: e.target.value,
                  })
                }
                value={publishingCompany.email}
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
                  !publishingCompany.name ||
                  !publishingCompany.address ||
                  !publishingCompany.email
                }
                onClick={() =>
                  handleUpdatePublishingCompany({ ...publishingCompany })
                }
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

export default EditPublishingCompany;
