
const Header = () => (
  <div className="text-center">
    <section className=" flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-cyan-400 relative overflow-hidden">
      {/* Left Text Side */}
      <div className="w-full md:w-1/2 text-white z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          👋 Welcome to SafeSpere
        </h1>
        <p className="text-lg md:text-base font-medium leading-relaxed mb-8">
          A comprehensive digital platform dedicated to enhancing public safety, <br />promoting crime awareness, and simplifying access to law enforcement support.
        </p>
        <button className="bg-white text-cyan-600 font-bold px-6 py-3 shadow-md hover:bg-sky-200 transition duration-75">
          EXPLORE
        </button>
      </div>
      {/* Right Image Side */}
      <div className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0">
        {/* Background Circle */}
        <div className="absolute -top-10 -right-10 w-[400px] h-[400px] bg-cyan-600 rounded-full opacity-40 z-0"></div>
        <div className="absolute top-0 right-0 w-[300px] h-[300px] border-[12px] border-cyan-300 rounded-full z-0"></div>

        {/* Placeholder Image Box */}
        <div className="relative z-10 w-[200px] h-[300px] bg-gray-200 flex items-center justify-center text-gray-600 rounded-xl shadow-md">
          <img src="src/assets/Screenshot 2025-05-31 185815.png" alt="img" />
        </div>
      </div>
    </section>

    <section>
      <div className='bg-gray-500'>
        <p className='text-2xl py-5 m-2'>What Our Portal Offers</p>
      </div>
    </section>

    <section className="grid md:grid-cols-2">
      {/* Prevent Violent Crime Block */}
      <div className="bg-blue-900 text-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Crime Statistics in India</h2>
        <p className="text-lg mb-6">
          Analyze detailed crime data across various regions and timelines to stay informed and aware of emerging trends.
        </p>
        <a href="/statistics" className="text-cyan-400 font-semibold hover:underline">KNOW STATISTICS</a>
      </div>
      {/* Image Placeholder Block */}
      <div className="bg-gray-100 flex items-center justify-center p-10">
        {/* Just a placeholder where you can put image later */}
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          <img className='h-72 w-lvw' src="src/assets/download.png" alt="stats" />
        </div>
      </div>
    </section>

    <section className="grid md:grid-cols-2">
      {/* GO FOR REAL Logo Section */}
      <div className="bg-gray-100 flex items-center justify-center p-10">
        {/* Just a placeholder where you can put image later */}
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          <img className='h-72 w-lvw' src="src/assets/download (1).jpeg" alt="Fir" />
        </div>
      </div>
      {/* Counterfeit Products Info Section */}
      <div className="bg-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">Online FIR Registration</h2>
        <p className="text-lg mb-6 text-gray-700">
          Conveniently file First Information Reports through our secure portal, ensuring timely access and response by the concerned authorities.
        </p>
        <a href="/FirRegister" className="text-cyan-600 font-semibold hover:underline">REGISTER</a>
      </div>
    </section>

    <section className="grid md:grid-cols-2">
      {/* Prevent Violent Crime Block */}
      <div className="bg-blue-700 text-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Emergency SOS & Crime Hotspot Alerts</h2>
        <p className="text-lg mb-6">
          Receive real-time alerts regarding high-risk areas and utilize SOS services during emergencies for immediate assistance.
        </p>
        <a href="/sos" className="text-cyan-400 font-semibold hover:underline">SEARCH</a>
      </div>
      {/* Image Placeholder Block */}
      <div className="bg-gray-100 flex items-center justify-center p-10">
        {/* Just a placeholder where you can put image later */}
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          <img className='h-72 w-lvw' src="src/assets/download (2).jpeg" alt="sos" />
        </div>
      </div>
    </section>

    <section className="grid md:grid-cols-2">
      {/* GO FOR REAL Logo Section */}
      <div className="bg-gray-100 flex items-center justify-center p-10">
        {/* Just a placeholder where you can put image later */}
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          <img className='h-72 w-lvw' src="src/assets/premium_photo-1677094310919-d0361465d3be.jpeg" alt="bot" />
        </div>
      </div>
      {/* Counterfeit Products Info Section */}
      <div className="bg-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800"> Interactive Crime Awareness Chatbot</h2>
        <p className="text-lg mb-6 text-gray-700">
          Engage with our AI-powered chatbot to gain knowledge about different types of crimes and learn effective ways to safeguard yourself.
        </p>
        <a href="/chatbot" className="text-cyan-600 font-semibold hover:underline">CHECK</a>
      </div>
    </section>

  </div>
);

export default Header;