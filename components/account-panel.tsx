"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type AccountView = "sign-in" | "create-account";

type CustomerOrder = {
  orderNumber: string;
  createdAt: string;
  items: { quantity: number; title: string }[];
};

export default function AccountPanel() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AccountView>("sign-in");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const isCreatingAccount = view === "create-account";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    setErrorMessage("");
    setIsSubmitting(true);

    const result =
      view === "sign-in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({
            name: String(formData.get("name")),
            email,
            password,
          });

    setIsSubmitting(false);

    if (result.error) {
      setErrorMessage(
        result.error.message ?? "Something went wrong. Please try again.",
      );
      return;
    }

    setIsOpen(false);
    router.refresh();
  }

  async function handleSignOut() {
    await authClient.signOut();
    setIsOpen(false);
    router.refresh();
  }

  function changeView(nextView: AccountView) {
    setView(nextView);
    setErrorMessage("");
  }

  useEffect(() => {
    if (!isOpen || !session) {
      return;
    }

    async function loadOrders() {
      setIsLoadingOrders(true);

      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        }
      } finally {
        setIsLoadingOrders(false);
      }
    }

    loadOrders();
  }, [isOpen, session?.user.id]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Open account menu"
          data-cy="account-menu-button"
        >
          <CircleUserRound className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
        <SheetHeader className="border-b border-zinc-200 px-8 py-8">
          <SheetTitle className="text-2xl font-semibold">
            {session?.user.name
              ? `Welcome, ${session.user.name}`
              : "Your account"}
          </SheetTitle>
          <SheetDescription>
            {session
              ? `Signed in as ${session.user.email}.`
              : isCreatingAccount
                ? "Create an account to make checkout faster and keep track of your orders."
                : "Sign in to view your orders and manage your account."}
          </SheetDescription>
        </SheetHeader>

        <div className="p-8">
          {session ? (
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-semibold">Your orders</h2>
                {isLoadingOrders ? (
                  <p className="mt-3 text-sm text-zinc-600">
                    Loading orders...
                  </p>
                ) : orders.length === 0 ? (
                  <p className="mt-3 text-sm text-zinc-600">
                    You have not placed any orders yet.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {orders.map((order) => (
                      <li
                        key={order.orderNumber}
                        className="rounded-lg border border-zinc-200 p-4 text-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium">
                            Order #{order.orderNumber}
                          </span>
                          <span className="text-zinc-600">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-zinc-600">
                          {order.items
                            .map((item) => `${item.quantity} × ${item.title}`)
                            .join(", ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <Button
                type="button"
                className="h-11 w-full bg-[#8b0836] hover:bg-[#6f062b]"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-2 rounded-lg bg-zinc-100 p-1"
                aria-label="Account options"
              >
                <Button
                  type="button"
                  variant={isCreatingAccount ? "ghost" : "default"}
                  className="h-10"
                  onClick={() => changeView("sign-in")}
                >
                  Sign in
                </Button>
                <Button
                  type="button"
                  variant={isCreatingAccount ? "default" : "ghost"}
                  className="h-10"
                  onClick={() => changeView("create-account")}
                >
                  Create account
                </Button>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {isCreatingAccount && (
                  <AccountField
                    id="name"
                    label="Full name"
                    autoComplete="name"
                  />
                )}

                <AccountField
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                />
                <AccountField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete={
                    isCreatingAccount ? "new-password" : "current-password"
                  }
                  minLength={8}
                />

                {errorMessage && (
                  <p className="text-sm text-red-700" role="alert">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full bg-[#8b0836] hover:bg-[#6f062b]"
                >
                  {isSubmitting
                    ? "Please wait..."
                    : isCreatingAccount
                      ? "Create account"
                      : "Sign in"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-600">
                {isCreatingAccount
                  ? "Already have an account?"
                  : "New to Glajjan?"}{" "}
                <button
                  type="button"
                  className="font-medium text-black underline underline-offset-4"
                  onClick={() =>
                    changeView(isCreatingAccount ? "sign-in" : "create-account")
                  }
                >
                  {isCreatingAccount ? "Sign in" : "Create an account"}
                </button>
              </p>
            </>
          )}

          {session?.user.role === "admin" && (
            <div className="mt-8 border-t border-zinc-200 pt-6">
              <Link
                href="/admin"
                data-cy="admin-link"
                className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-black"
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

type AccountFieldProps = {
  id: string;
  label: string;
  type?: "email" | "password" | "text";
  autoComplete: string;
  minLength?: number;
};

function AccountField({
  id,
  label,
  type = "text",
  autoComplete,
  minLength,
}: AccountFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="h-11 border-zinc-300"
      />
    </div>
  );
}
