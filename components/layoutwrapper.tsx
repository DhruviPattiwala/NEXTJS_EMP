
'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <Navbar isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
        <main
          className={`pt-20 transition-all duration-300 ${isOpen ? 'ml-20 lg:ml-64' : 'ml-0'
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}


















// "use client";
// import { useState } from "react";
// import { Navbar } from "@/components/Navbar";


// const LayoutWrapper = ({children}:{children : React.ReactNode}) => {
//      const [isOpen, setIsOpen] = useState(true);
//   return (
//     <>
//              <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
//         <main className={`pt-20 transition-all duration-300 ${isOpen ? "ml-4" : "mr-50"}`}>
//             {children}
//        </main>
//     </>
//   )
// }

// export default LayoutWrapper