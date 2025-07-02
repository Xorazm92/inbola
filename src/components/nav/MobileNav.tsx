import React from "react";
import { PRODUCT_CATEGORIES } from "@/lib/config";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="lg:hidden">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Browse product categories and access your account
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {PRODUCT_CATEGORIES.map((product) => (
            <a
              key={product.value}
              href={`/products?category=${product.value}`}
              className="text-sm block py-2 px-4 hover:bg-gray-100 rounded-md"
            >
              {product.label}
            </a>
          ))}

          <div className="mt-4 pt-4 border-t">
            <UserNav user={user} className="flex flex-col items-start" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
