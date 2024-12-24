import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <div className="flex flex-col gap-10 -text--color-grey-700">
      <div className="flex justify-between items-center" type="horizontal">
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
