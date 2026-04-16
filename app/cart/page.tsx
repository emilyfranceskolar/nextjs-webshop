import ShoppingCartList from "@/components/shopping-cart";

export default function CartPage() {
  return (
    <main>
      <section className="grid place-items-center gap-16 p-12">
        <ShoppingCartList />
      </section>
    </main>
  );
}
