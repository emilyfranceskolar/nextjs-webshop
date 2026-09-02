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
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AccountView = "sign-in" | "create-account";

export default function AccountPanel() {
  const [view, setView] = useState<AccountView>("sign-in");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const isCreatingAccount = view === "create-account";

  return (
    <Sheet>
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
            Your account
          </SheetTitle>
          <SheetDescription>
            {isCreatingAccount
              ? "Create an account to make checkout faster and keep track of your orders."
              : "Sign in to view your orders and manage your account."}
          </SheetDescription>
        </SheetHeader>

        <div className="p-8">
          <div
            className="grid grid-cols-2 rounded-lg bg-zinc-100 p-1"
            aria-label="Account options"
          >
            <Button
              type="button"
              variant={isCreatingAccount ? "ghost" : "default"}
              className="h-10"
              onClick={() => setView("sign-in")}
            >
              Sign in
            </Button>
            <Button
              type="button"
              variant={isCreatingAccount ? "default" : "ghost"}
              className="h-10"
              onClick={() => setView("create-account")}
            >
              Create account
            </Button>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isCreatingAccount && (
              <AccountField id="name" label="Full name" autoComplete="name" />
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
            />

            {!isCreatingAccount && (
              <button
                type="button"
                className="block text-sm text-zinc-600 underline underline-offset-4 hover:text-black"
              >
                Forgot your password?
              </button>
            )}

            <Button
              type="submit"
              className="h-11 w-full bg-[#8b0836] hover:bg-[#6f062b]"
            >
              {isCreatingAccount ? "Create account" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            {isCreatingAccount ? "Already have an account?" : "New to Glajjan?"}{" "}
            <button
              type="button"
              className="font-medium text-black underline underline-offset-4"
              onClick={() =>
                setView(isCreatingAccount ? "sign-in" : "create-account")
              }
            >
              {isCreatingAccount ? "Sign in" : "Create an account"}
            </button>
          </p>

          <div className="mt-8 border-t border-zinc-200 pt-6">
            <Link
              href="/admin"
              data-cy="admin-link"
              className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-black"
            >
              Admin
            </Link>
          </div>
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
};

function AccountField({
  id,
  label,
  type = "text",
  autoComplete,
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
        required
        className="h-11 border-zinc-300"
      />
    </div>
  );
}
