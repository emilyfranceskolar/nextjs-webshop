import { FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
  // const [items, setItems] = useState<>

  return (
    <main>
      <section className="grid place-items-center gap-16 p-12">
        <h1 className="flex gap-4 text-5xl">
          Your shopping cart
          <FiShoppingCart />
        </h1>
        <p>Your cart is currently empty.</p>
      </section>
    </main>
  );
}
