import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function isAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user.role === "admin";
}

export async function require_isLoggedIn_IsAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Förbidden" }, { status: 403 });
  }

  return null;
}
