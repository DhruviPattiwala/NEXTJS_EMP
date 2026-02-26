"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon, Menu, X, PieChart, Users } from "lucide-react"
import { logout } from "@/app/hooks/useAuth"

interface UserData {
  name: string;
  profile: string;
}

interface state {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void
}

export const Navbar = ({ isOpen, setIsOpen }: state) => {
  const [data, setData] = useState<UserData | null>(null)
  const navigate = useRouter()
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem("Employee-LoginData") || "{}")
      if (storedData) {
        setData(storedData);
      }
    }, 0);
  }, []);

  function logoutUser() {
    logout()
    navigate.push("/LoginForm")
  }

  const navItems = [
    { name: 'Dashboard', href: '/Dashboard', icon: PieChart },
    { name: 'Employee', href: '/EmployeesPage', icon: Users },];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-sky-900 z-50 flex items-center px-4 text-white">
        <Button className=" p-2 rounded  transition "
          onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</Button>

        <h1 className="ml-3 text-xl font-bold">
          Employee Management System
        </h1>

        <div className="hidden md:flex items-center ml-auto  gap-2 mr-15 ">
          <DropdownMenu  >
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={data?.profile} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate.push("/Profile")}>
                <UserIcon className="mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutUser}>
                <LogOutIcon className="mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="font-semibold text-xl">{data?.name}</span>
        </div>
        <Button className="p-2 rounded-full   transition md:hidden ml-auto" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={data?.profile} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
        {isProfileMenuOpen && (
          <div className="absolute top-16 right-4 bg-sky-100 text-gray-800 shadow-lg shadow-black rounded-md p-2 md:hidden z-40">
            <div className="p-2  text-base border-b text-purple-500 font-bold">{data?.name}</div>
            <div className="p-2  text-base border-b flex" onClick={() => { navigate.push("/Profile"); setIsProfileMenuOpen(false); }}> <UserIcon className="mr-2" /> Profile</div>
            <div className="p-2  text-base border-b flex" onClick={() => { logoutUser(); setIsProfileMenuOpen(false); }}><LogOutIcon className="mr-2" /> Logout</div>
          </div>
        )}
      </nav>


      <aside
        className={` fixed top-16 left-0 h-full bg-sky-200 w-20 lg:w-64  transition-transform duration-300 z-40
           ${isOpen ? "translate-x-0" : "-translate-x-full"}
         `}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 rounded-md mb-2 text-lg font-bold 
              ${isActive
                    ? 'bg-blue-400 text-white'
                    : 'text-sky-800 hover:bg-blue-400 hover:text-white'
                  }`}
              >
                <item.icon className="mr-2" />
                <span className="hidden lg:flex ">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={logoutUser}
            className="text-lg text-sky-800  font-bold w-full text-left p-2 hover:bg-blue-400 hover:text-white rounded"
          >
            <div className="flex"><LogOutIcon className="mr-2" /> <span className="hidden lg:flex  ">Logout</span></div>
          </button>
        </nav>
         </aside>
        

    </>
  )
}
