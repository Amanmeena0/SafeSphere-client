
export default function AboutUs() {
  return (
    <section className="bg-white text-gray-800 px-6 py-12 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Full Version */}
        <h2 className="text-3xl font-bold text-blue-700 mb-6">About Us – SafeSphere</h2>
        <p className="mb-4">
          At <strong>SafeSphere</strong>, we are reimagining public safety through the power of technology.
          As a unified digital platform, SafeSphere bridges the gap between <strong>civilians</strong> and
          <strong> law enforcement</strong>, empowering both with tools to act swiftly, transparently, and efficiently.
        </p>
        <p className="mb-4">
          Whether it’s <strong>filing an FIR</strong>, monitoring <strong>real-time crime statistics</strong>,
          identifying <strong>nearby police stations</strong>, or detecting <strong>crime clusters</strong>,
          our mission is simple: to create a <strong>safer, smarter, and more responsive ecosystem</strong> for every citizen in India.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Empowering Civilians</h3>
        <p className="mb-4">
          SafeSphere enables individuals to report incidents with ease, track public safety metrics, and stay informed.
          Transparency and accessibility are at the heart of our design—so you’re never in the dark when it comes to your safety.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Enabling Law Enforcement</h3>
        <p className="mb-4">
          For law enforcement, SafeSphere acts as a command interface. With access to real-time FIRs,
          <strong> SOS alerts</strong>, and <strong>localized crime insights</strong>, officers can respond swiftly and make
          <strong> data-driven decisions</strong> where it matters most.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600">Built with Purpose</h3>
        <p className="mb-4">
          SafeSphere is a <strong>solo-developed initiative</strong>—designed and maintained to harness technology for public good.
          By integrating geolocation services and user-focused design, we are building a platform that is both intelligent and inclusive.
        </p>

        <p className="text-gray-700 font-medium mt-6">
          Together, let’s create a future where safety is a shared responsibility—and a digital reality.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Short Version */}
        <h2 className="text-2xl font-bold text-blue-700 mb-4">About SafeSphere (Short)</h2>
        <p className="text-gray-700">
          <strong>SafeSphere</strong> is a digital platform connecting <strong>civilians and police</strong> to enhance
          public safety. Civilians can file FIRs, explore crime data, and report incidents, while police can respond to
          <strong> SOS alerts</strong>, access <strong>nearby stations</strong>, and view <strong>crime clusters</strong>.
          Built independently with a vision to make safety accessible and data-driven across India.
        </p>
      </div>
    </section>
  );
}
