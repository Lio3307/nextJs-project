import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="text-3xl">
            Blog<span className="text-sky-500">Lio</span>
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            className=" font-medium hover:text-sky-600 underline-2 decoration-blue-600 hover:underline transition-colors"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className=" font-medium hover:text-sky-600 underline-2 decoration-blue-600 hover:underline transition-colors"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white font-bold bg-sky-500 hover:bg-sky-600 cursor-pointer py-2 px-4 rounded-md">Sign Up</button>
      </div>
    </nav>
  );
}
