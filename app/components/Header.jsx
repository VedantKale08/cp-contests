import Image from "next/image";
import Link from "next/link";
import SubmitButton from "./Graph contest/SubmitButton";

export default function Header({ isContestPage = false, setPopup = void 0 }) {
  return (
    <header className=" bg-[#0e1111] text-white p-4 shadow-xl px-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-3">
          <img
            src={"/coco_logo.png"}
            alt="coc_logo"
            width={0}
            height={0}
            className="w-10 h-10"
          />
          CoC
        </Link>
        <nav>
          {!isContestPage ? (
            <ul className="flex space-x-4">
              {/* <li>
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
              </li> */}
            </ul>
          ) : (
            <SubmitButton setPopup={setPopup} />
          )}
        </nav>
      </div>
    </header>
  );
}
