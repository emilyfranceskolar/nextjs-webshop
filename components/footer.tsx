"use client";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <main className="bg-[#f5efe6]">
      <footer className="grid grid-cols-3 mx-auto items-center justify-between p-4 border-t-26 border-rose-900 px-6 py-8 justify-items-center pt-12 pb-12">
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">"Brand"</h2>
          <Link
            href="/aboutus"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            About Us
          </Link>
          <Link
            href="/sustainability"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Sustainability
          </Link>
          <Link
            href="/careers"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Careers
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">Discover</h2>
          <Link
            href="/howitworks"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            How it works
          </Link>
          <Link
            href="/verification"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Verification
          </Link>
          <Link
            href="/signup"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Sign Up
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">Help</h2>
          <Link
            href="/delivery"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Delivery
          </Link>
          <Link
            href="/returnpolicy"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Return Policy
          </Link>
          <Link
            href="/contactus"
            className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Contact Us
          </Link>
        </section>
      </footer>
      <Separator />
      <section className="flex gap-4 justify-center text-2xl pb-10">
        <Link href="#">
          <FiFacebook />
        </Link>
        <Link href="#">
          <FiInstagram />
        </Link>
        <Link href="#">
          {" "}
          <FiLinkedin />
        </Link>
      </section>
    </main>
  );
}
