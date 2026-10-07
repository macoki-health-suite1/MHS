import ResourceTable from "../../components/ResourceTable";
import { orderColumns, supplierColumns } from "../../modules/procurement";

export default function ProcurementPage() {
  return (
    <>
      <h2>Procurement</h2>
      <ResourceTable title="Purchase orders" endpoint="/purchase-orders/" columns={orderColumns} />
      <ResourceTable title="Suppliers" endpoint="/suppliers/" columns={supplierColumns} />
    </>
  );
}
