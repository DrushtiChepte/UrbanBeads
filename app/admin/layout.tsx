import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 flex h-screen flex-col">
        <div className="flex-1 p-6">{children}</div>
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
