import Navbar from "@/components/Navbar";
import SidebarDash from "@/components/Sidebar";


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        // Step 1: Make the outermost div a flex container
        <div className="flex h-full relative">
        
            <div className="hidden h-full md:flex md:w-72 md:inset-y-0 z-[80] bg-gray-900 md:flex-col">
                <SidebarDash/>
            </div>

            <main className="flex-1 p-4">
                <Navbar/>
                {children}
            </main>
        </div>
     );
}

export default DashboardLayout;