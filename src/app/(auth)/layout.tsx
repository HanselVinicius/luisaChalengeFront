import Navbar from "@/components/navbar/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="mt-16">{children}</main>
    </div>
  );
}
