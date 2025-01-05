import Header from './components/Header'
import Footer from './components/Footer'
import RegistrationForm from './components/RegistrationForm'
import EventDetails from './components/EventDetails'
import CountdownTimer from './components/CountdownTimer'
import Prizes from './components/Prizes'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <section className="bg-black text-green-400 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Graph-Based Contest</h1>
            <p className="text-xl mb-8">Challenge yourself and win amazing prizes!</p>
            <a
              href="#register"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
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
            <h2 className="text-3xl font-bold text-center text-black mb-8">Register for the Event</h2>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <RegistrationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

