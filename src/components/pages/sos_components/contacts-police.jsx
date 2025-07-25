import { PhoneCall, ShieldAlert, Ambulance, Flame, Users } from 'lucide-react';

const emergencyContacts = [
  {
    name: 'Police Control Room',
    number: '100',
    icon: <ShieldAlert className="h-6 w-6 text-white" />,
    bgColor: 'bg-blue-600',
  },
  {
    name: 'Ambulance',
    number: '102',
    icon: <Ambulance className="h-6 w-6 text-white" />,
    bgColor: 'bg-red-500',
  },
  {
    name: 'Fire Brigade',
    number: '101',
    icon: <Flame className="h-6 w-6 text-white" />,
    bgColor: 'bg-orange-500',
  },
  {
    name: 'Women Helpline',
    number: '1091',
    icon: <Users className="h-6 w-6 text-white" />,
    bgColor: 'bg-pink-600',
  },
  {
    name: 'Disaster Management',
    number: '108',
    icon: <PhoneCall className="h-6 w-6 text-white" />,
    bgColor: 'bg-yellow-600',
  },
];

const EmergencyContacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">📞 Emergency Contacts</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Quickly reach out to emergency services. Tap to call directly. Use responsibly in genuine emergencies.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.number}
            className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-md hover:shadow-xl transition-shadow duration-300 ${contact.bgColor}`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white bg-opacity-20">{contact.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-sm opacity-90">Dial {contact.number}</p>
              </div>
            </div>
            <a
              href={`tel:${contact.number}`}
              className="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-opacity-90 transition"
            >
              Call
            </a>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Emergency Directory • Stay Safe, Stay Aware
      </footer>
    </div>
  );
};

export default EmergencyContacts;
