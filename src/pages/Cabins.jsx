// import Row from "../ui/Row";

import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center -text--color-grey-700" type="horizontal">
        <h1 className="text-4xl">All cabins</h1>
        <CabinTableOperations />
      </div>
      <div className="flex flex-col gap-5">
        <CabinTable />
        <AddCabin />
      </div>
    </div>
  );
}

export default Cabins;
