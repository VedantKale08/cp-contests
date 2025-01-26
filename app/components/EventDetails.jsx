export default function EventDetails({ isWumpus }) {
  return (
    <section className="py-12 px-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Event Details</h2>
        <div className="grid md:grid-cols-2 gap-8 place-content-center place-items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">About the Contest</h3>
            <p className="mb-4">
              {isWumpus
                ? "Take a deep dive into the Wumpus World environment and use your problem-solving skills to navigate the dangers, avoid the Wumpus, and grab the gold. Sharpen your logic and strategy to succeed in this exciting challenge."
                : "Join us for an exciting Graph-Based Contest where you'll tackle challenging problems and showcase your algorithmic skills. This event is perfect for both beginners and experienced coders looking to enhance their knowledge."}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Schedule</h3>
            <ul className="list-disc list-inside">
              <li>Registration Opens: January 23, 2025</li>
              <li>Contest Start: January 26, 2025, 1:00 PM</li>
              <li>Contest End: January 26, 2025, 3:00 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
