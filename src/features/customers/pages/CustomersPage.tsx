import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

import { useCustomers } from "../hooks/useCustomers";
import { CustomerTable } from "../components/CustomerTable";

const PAGE_WRAPPER_CLASSNAME =
  "min-h-full space-y-6 bg-[#101214] p-4 text-[#F5F5F2] sm:p-6 lg:p-8";

export function CustomersPage() {
  const { customers, isLoading, isError } =
    useCustomers();

  if (isLoading) {
    return (
      <div className={PAGE_WRAPPER_CLASSNAME}>
        <PageHeader
          title="Clientes"
          description="Consultá los clientes que compraron en Court Store."
        />

        <LoadingState message="Cargando clientes..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={PAGE_WRAPPER_CLASSNAME}>
        <PageHeader
          title="Clientes"
          description="Consultá los clientes que compraron en Court Store."
        />

        <div className="overflow-hidden rounded-3xl border border-[#3D3435] bg-[#181B1F] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <EmptyState
            title="No fue posible cargar los clientes"
            description="Ocurrió un error al consultar los datos."
          />
        </div>
      </div>
    );
  }

  return (
    <div className={PAGE_WRAPPER_CLASSNAME}>
      <PageHeader
        title="Clientes"
        description="Consultá los clientes que compraron en Court Store."
      />

      {customers.length === 0 ? (
        <div className="overflow-hidden rounded-3xl border border-dashed border-[#343A40] bg-[#181B1F] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <EmptyState
            title="No hay clientes todavía"
            description="Los clientes aparecerán acá una vez que se registren ventas."
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[#292E34] bg-[#101214] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <CustomerTable customers={customers} />
        </div>
      )}
    </div>
  );
}
