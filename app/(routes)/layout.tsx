"use client";
import LayoutWrapper from "@/components/layoutwrapper";
import Toast from "@/components/Toast";
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <LayoutWrapper>
            {children}
            <Toast />
        </LayoutWrapper>

    );
}
