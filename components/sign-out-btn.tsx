"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const SignOutBtn = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/sign-in");
        } else {
          console.error("Sign out failed:", result.error);
          alert("Failed to sign out. Please try again.");
        }
      }}
    >
      {" "}
      Log Out
    </DropdownMenuItem>
  );
};
