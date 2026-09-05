import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

import { useCustomers } from "../hooks/useCustomers";
import { CustomerTable } from "../components/CustomerTable";

const PAGE_WRAPPER_CLASSNAME =
  "min-h-full space-y-6 bg-[var(--tt-bg-page)] p-4 text-[var(--tt-text-primary)] sm:p-6 lg:p-8";

export function CustomersPage() {
  const { customers, isLoading, isError } =
    useCustomers();

  if (isLoading) {
    return (
      <div className={PAGE_WRAPPER_CLASSNAME}>
        <PageHeader
          title="Clientes"
          description="Consultá los clientes que compraron en Tennis Stars."
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

        <div className="overflow-hidden rounded-3xl border border-[var(--tt-border-danger)] bg-[var(--tt-bg-surface)] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
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
        <div className="overflow-hidden rounded-3xl border border-dashed border-[var(--tt-border-strong)] bg-[var(--tt-bg-surface)] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <EmptyState
            title="No hay clientes todavía"
            description="Los clientes aparecerán acá una vez que se registren ventas."
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[var(--tt-border)] bg-[var(--tt-bg-page)] shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <CustomerTable customers={customers} />
        </div>
      )}
    </div>
  );
}
