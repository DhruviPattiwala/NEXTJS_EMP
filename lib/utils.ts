import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






// <DialogContent className="w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto p-6 rounded-2xl">

// <DialogContent className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
//   <div className="space-y-6">
//     <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* inputs */}
//     </form>
//   </div>
// </DialogContent>