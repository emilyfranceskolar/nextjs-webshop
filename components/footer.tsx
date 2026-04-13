"use client";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <main className="bg-zinc-200">
      <footer className="grid grid-cols-3 gap-4 max-w-4xl mx-auto justify-items-center pt-12 pb-12">
        <section className="">
          <h2 className="font-bold mb-2">"Brand"</h2>
          <p>About Us</p>
          <p>Sustainability</p>
          <p>Careers</p>
        </section>
        <section>
          <h2 className="font-bold mb-2">Discover</h2>
          <p>How it works</p>
          <p>Verification</p>
          <p>Sign Up</p>
        </section>
        <section>
          <h2 className="font-bold mb-2">Help</h2>
          <p>Delivery</p>
          <p>Return Policy</p>
          <p>Contact Us</p>
        </section>
      </footer>
      <Separator />
      <section className="flex gap-4 justify-center text-2xl pb-10">
        <FiFacebook />
        <FiInstagram />
        <FiLinkedin />
      </section>
    </main>
  );
}
