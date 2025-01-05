export default function EventDetails() {
  return (
    <section className="bg-black text-green-400 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Event Details</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">About the Contest</h3>
            <p className="mb-4">
              Join us for an exciting Graph-Based Contest where you'll tackle challenging problems
              and showcase your algorithmic skills. This event is perfect for both beginners and
              experienced coders looking to enhance their knowledge.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Schedule</h3>
            <ul className="list-disc list-inside">
              <li>Registration Opens: January 18, 2025</li>
              <li>Contest Start: January 20, 2025, 10:00 AM</li>
              <li>Contest End: January 20, 2025, 2:00 PM</li>
              <li>Results Announcement: January 21, 2025</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

