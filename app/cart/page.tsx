import ShoppingCartList from "@/components/shopping-cart";

export default function CartPage() {
  return (
    <main>
      <section className="grid place-items-center gap-16 p-12">
        <h1 className="flex gap-2 text-3xl font-bold">Shopping cart</h1>
        <p>Your cart is currently empty.</p>
        <ShoppingCartList />
      </section>
    </main>
  );
}
