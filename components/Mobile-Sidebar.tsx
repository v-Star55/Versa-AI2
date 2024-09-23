"use client";

import { Menu, MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import SidebarDash from "./Sidebar";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
        <Sheet>
            <SheetTrigger className="mr-4"><MenuIcon /></SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SidebarDash />
            </SheetContent>
        </Sheet>

    )
}

export default MobileSidebar;