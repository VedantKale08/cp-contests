export default function Prizes() {
  const prizes = [
    { place: '1st', reward: 'Rs.5000' },
    { place: '2nd', reward: 'Rs.3000' },
    { place: '3rd', reward: 'Rs.1000' },
  ]

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Prizes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <div key={index} className="bg-black text-green-400 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{prize.place} Place</h3>
              <p>{prize.reward}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

