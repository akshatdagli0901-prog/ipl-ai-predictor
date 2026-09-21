import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;