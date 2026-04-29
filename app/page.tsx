import { redirect } from "next/navigation";

export default function Home() {
  // Backend logic decides this. For now, send users to the login screen.
  redirect("/login");
}
