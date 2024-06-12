import AddPublishingCompany from "./components/AddPublishingCompany";
import { useAppDispatch } from "../../../Redux/hooks";
import { useEffect } from "react";
import { getPublishingCompany } from "../../../Redux/Reducers/publishing_company";
import PublishingCompanyTable from "./components/PublishingCompanyTable";

const PublishingCompany = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPublishingCompany());
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Nhà xuất bản</h3>
        <AddPublishingCompany />
      </div>
      <br />
      <PublishingCompanyTable />
    </div>
  );
};

export default PublishingCompany;
