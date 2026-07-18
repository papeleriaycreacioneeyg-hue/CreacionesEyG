import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Toolbar */}
        <Header />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">{children}</main>
      </div>
    </div>
  );
}
