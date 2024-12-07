// import Row from "../ui/Row";

import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center -text--color-grey-700" type="horizontal">
        <h1 className="text-4xl">All cabins</h1>
        <p className="text-lg">Filter / Sort</p>
      </div>
      <div className="flex flex-col gap-5">
        <CabinTable />
        <button onClick={() => setShowForm(e => !e)} className="self-start rounded-lg px-8 py-2 -bg--color-brand-600 hover:-bg--color-brand-700 transition-all -text--color-brand-50 text-lg">{showForm ? 'Hide form' : 'Add new cabin'}</button>
        {
          showForm && <CreateCabinForm setShowForm={setShowForm} />
        }
      </div>
    </div>
  );
}

export default Cabins;
