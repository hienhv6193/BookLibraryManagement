import * as React from "react";
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components";
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";
import LibraryCard from "./LibraryCard/LibraryCard";
import LoanSlip from "./LoanSlip/LoanSlip";
import Reader from "./Reader/Reader";
import BorrowedDetail from "./BorrowedDetail/BorrowedDetail";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "10px 20px",
    rowGap: "20px",
  },
  panels: {
    padding: "0 10px",
    "& th": {
      textAlign: "left",
      padding: "0 30px 0 0",
    },
  },
  propsTable: {
    "& td:first-child": {
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      padding: "0 30px 0 0",
    },
  },
});

const TabReader = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] =
    React.useState<TabValue>("libraryCard");

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const LibraryCardTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Thẻ thư viện">
      <LibraryCard />
    </div>
  ));

  const ReaderTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Độc giả">
      <Reader />
    </div>
  ));

  const LoanSlipTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Phiếu mượn">
      <LoanSlip />
    </div>
  ));

  const BorrowedDetailTab = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Chi tiết phiếu mượn">
      <BorrowedDetail />
    </div>
  ));
  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="conditions" value="libraryCard">
          Thẻ thư viện
        </Tab>
        <Tab id="Reader" value="reader">
          Độc giả
        </Tab>
        <Tab id="LoanSlip" value="loanSlip">
          Phiếu mượn
        </Tab>
        <Tab id="BorrowedDetail" value="borrowedDetail">
          Chi tiết phiếu mượn
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === "libraryCard" && <LibraryCardTab />}
        {selectedValue === "reader" && <ReaderTab />}
        {selectedValue === "loanSlip" && <LoanSlipTab />}
        {selectedValue === "borrowedDetail" && <BorrowedDetailTab />}
      </div>
    </div>
  );
};

export default TabReader;
