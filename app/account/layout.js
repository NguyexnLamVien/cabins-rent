import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
    return <div className="grid grid-cols-[16rem_1fr] gap-12 h-screen">
        <SideNavigation />
        <div className="max-w-7xl mx-auto w-full" >{children}</div>
    </div>;
}