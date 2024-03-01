// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";

// import { useRouter } from "next/navigation";

// export const Header = () => {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   return (
//     <div className="py-4  border-b-2 border-gray-900">
//       <header className="container mx-auto flex flex-row items-center justify-between ">
//         <h1 className="px-4">
//           <Link href="/">
//             Story_Co-Pilot
//           </Link>
//         </h1>

//         <ul className="flex flex-row items-center justify-between">
//           <li className="px-4">
//             <Link href="/">
//               Home
//             </Link>
//           </li>

//           <li className="px-4">
//             <Link href="/dashboard">
//               Dashboard
//             </Link>
//           </li>
//           <li className="px-4 border-l-2 border-gray-900">
//             {user ? (
//               <button
//                 type="button"
//                 onClick={async () => {
//                   try {
//                     await logout();
//                     await router.push("/login");
//                   } catch (error) {
//                     console.log(error);
//                   }
//                 }}
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link href="/login">
//                 Login
//               </Link>
//             )}
//           </li>
//         </ul>
//       </header>
//     </div>
//   );
// };

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      await router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 h-[70px] w-screen">
      <header className="container flex justify-between p-4">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
          <Link href="/">
            Story_Co-Pilot
          </Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <li>
            <Link href="/">
              <div className="text-white hover:text-gray-300">Home</div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="text-white hover:text-gray-300">Dashboard</div>
            </Link>
          </li>
          <li>
            {user ? (
              <button
                type="button"
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <div className="text-white hover:text-gray-300">Login</div>
              </Link>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
};
