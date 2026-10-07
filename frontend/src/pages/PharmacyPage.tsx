import ResourceTable from "../../components/ResourceTable";
import { medicineColumns, prescriptionColumns } from "../../modules/pharmacy";

export default function PharmacyPage() {
  return (
    <>
      <h2>Pharmacy</h2>
      <ResourceTable title="Prescriptions" endpoint="/prescriptions/" columns={prescriptionColumns} />
      <ResourceTable title="Medicines" endpoint="/medicines/" columns={medicineColumns} />
    </>
  );
}
