import ResourceTable from "../../components/ResourceTable";
import { movementColumns, stockColumns } from "../../modules/inventory";

export default function InventoryPage() {
  return (
    <>
      <h2>Inventory</h2>
      <ResourceTable title="Stock" endpoint="/stock-items/" columns={stockColumns} />
      <ResourceTable title="Stock movements" endpoint="/stock-movements/" columns={movementColumns} />
    </>
  );
}
