import Header from '../../components/Header'
import Footer from '../../components/Footer'

export async function generateMetadata({ params }) {
  const id = await params.id; 
  return {
    title: `Dashboard for ${id}`,
  };
}

export default async function Dashboard({ params }) {
  const id = await params.id;
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Welcome to the Dashboard</h1>
        <p className="text-center text-lg">Your HackerRank ID is: {id}</p>
      </main>
      <Footer />
    </div>
  )
}

