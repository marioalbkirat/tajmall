import Sidebar from "@/components/sidebar/sidebar";
export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
            <Sidebar>
                {children}
            </Sidebar>
    );
}