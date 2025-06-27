import React from "react";
import { PRODUCT_CATEGORIES } from "@/lib/config";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserNav from "./UserNav";
import { User } from "@/payload-types";

const MobileNav = ({ user }: { user: User | null }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="block lg:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="lg:hidden" >
        {PRODUCT_CATEGORIES.map((product) => (
          <a
            key={product.value}
            href={`/products?category=${product.value}`}
            className="text-sm block py-2 px-4 hover:bg-gray-100"
          >
            {product.label}
          </a>
        ))}

        <div className="mt-2">
          <UserNav user={user} className="flex flex-col items-start" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
