"use client";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <main className="bg-zinc-200">
      <footer className="grid grid-cols-3 max-w-5xl mx-auto justify-items-center pt-12 pb-12">
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">"Brand"</h2>
          <Link
            href="/aboutus"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            About Us
          </Link>
          <Link
            href="/sustainability"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Sustainability
          </Link>
          <Link
            href="/careers"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Careers
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">Discover</h2>
          <Link
            href="/howitworks"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            How it works
          </Link>
          <Link
            href="/verification"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Verification
          </Link>
          <Link
            href="/signup"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Sign Up
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="font-bold mb-4">Help</h2>
          <Link
            href="/delivery"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Delivery
          </Link>
          <Link
            href="/returnpolicy"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Return Policy
          </Link>
          <Link
            href="/contactus"
            className="relative after:absolute after:left-0 after:bottom-px after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
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
