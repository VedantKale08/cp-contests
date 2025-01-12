import React from "react";
import Header from "./Header";
import CountdownTimer from "./CountdownTimer";
import EventDetails from "./EventDetails";
import Prizes from "./Prizes";
import RegistrationForm from "./RegistrationForm";
import Footer from "./Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isRegistered = async () => {
    const cookieStore = await cookies();
    const hackerRankId = cookieStore.get("hackerRankId");    
    if (hackerRankId) {
      redirect(`/graph-contest/${hackerRankId.value}`);
    }
}

const GraphLanding = async () => {
  await isRegistered();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <section className=" text-slate-800 py-24 px-4 ">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Graph-Based Contest</h1>
            <p className="text-xl mb-8">
              Challenge yourself and win amazing prizes!
            </p>
            <a
              href="#register"
              className="bg-green-600 text-white font-semibold py-4 px-6 rounded-md hover:bg-green-700 transition duration-300"
            >
              Register Now
            </a>
          </div>
        </section>

        <CountdownTimer />
        <EventDetails />
        <Prizes />

        <section id="register" className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-8">
              Register for the Event
            </h2>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <RegistrationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GraphLanding;
