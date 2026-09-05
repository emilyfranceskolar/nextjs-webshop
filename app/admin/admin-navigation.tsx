import { Button } from "@/components/ui/button";
import Link from "next/link";

type AdminNavigationProps = {
  currentPage: "products" | "orders";
};

export default function AdminNavigation({ currentPage }: AdminNavigationProps) {
  return (
    <nav aria-label="Admin navigation" className="flex justify-center gap-2">
      <Button
        asChild
        variant={currentPage === "products" ? "default" : "outline"}
      >
        <Link
          href="/admin"
          aria-current={currentPage === "products" ? "page" : undefined}
        >
          Products
        </Link>
      </Button>
      <Button
        asChild
        variant={currentPage === "orders" ? "default" : "outline"}
      >
        <Link
          href="/admin/orders"
          data-cy="admin-orders-link"
          aria-current={currentPage === "orders" ? "page" : undefined}
        >
          Orders
        </Link>
      </Button>
    </nav>
  );
}
