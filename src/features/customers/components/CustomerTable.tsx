import { Package, ShoppingBag, User } from "lucide-react";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/shared/DataTable";

import type { CustomerSummary } from "../types/customer.types";

interface CustomerTableProps {
  customers: CustomerSummary[];
}

const CELL_BG = "bg-[#101214]";

export function CustomerTable({
  customers,
}: CustomerTableProps) {
  const columns: DataTableColumn<CustomerSummary>[] =
    [
      {
        key: "customer",
        header: "Cliente",
        className: CELL_BG,

        render: (customer) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#343A40] bg-[#20242A] text-[#8B9299]">
              <User className="h-4 w-4" />
            </div>

            <div className="min-w-0 max-w-[240px]">
              <p className="truncate font-medium text-[#EDEEEB]">
                {customer.customerName}
              </p>

              <p className="truncate text-xs text-[#7F878F]">
                {customer.customerEmail}
              </p>
            </div>
          </div>
        ),
      },

      {
        key: "orders",
        header: "Pedidos",
        className: `${CELL_BG} whitespace-nowrap`,

        render: (customer) => (
          <div className="flex items-center gap-2 text-[#C1C5C9]">
            <ShoppingBag className="h-4 w-4 shrink-0 text-[#656D75]" />

            <span className="font-medium">
              {customer.totalOrders}
            </span>
          </div>
        ),
      },

      {
        key: "products",
        header: "Productos comprados",
        className: `${CELL_BG} whitespace-nowrap`,

        render: (customer) => (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              border
              border-[#40382F]
              bg-[#29231D]
              px-2.5
              py-1.5
              text-xs
              font-semibold
              text-[#D0AE82]
            "
          >
            <Package className="h-3.5 w-3.5" />

            {customer.totalProductsPurchased}
          </span>
        ),
      },
    ];

  return (
    <DataTable
      data={customers}
      columns={columns}
      rowKey={(customer) => customer.customerEmail}
    />
  );
}
