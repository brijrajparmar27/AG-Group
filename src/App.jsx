import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import "./App.css";
import { data } from "./data";

function App() {
  const cols = [
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "population" },
    { field: "males" },
    { field: "females" },
    { field: "average_age" },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const isRowMaster = useMemo(() => {
    return (dataItem) => {
      return dataItem ? dataItem.states.length > 0 : false;
    };
  }, []);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "name" },
          { field: "population" },
          { field: "males" },
          { field: "females" },
          { field: "average_age" },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.states);
      },
    };
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "100vh", width: "100vw" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={cols}
        defaultColDef={defaultColDef}
        masterDetail={true}
        // isRowMaster={isRowMaster}
        detailCellRendererParams={detailCellRendererParams}
        detailRowAutoHeight={true}
        // detailRowHeight={"10px"}
        modules={[MasterDetailModule]}
      ></AgGridReact>
    </div>
  );
}

export default App;
