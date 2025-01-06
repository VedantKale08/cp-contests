import Link from "next/link";

export default function Header() {
  return (
    <header className=" text-black p-4 shadow-xl px-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CoC
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
