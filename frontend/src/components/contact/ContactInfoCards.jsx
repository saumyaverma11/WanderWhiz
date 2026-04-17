import { Mail, MapPin, Clock } from "lucide-react";

const ContactInfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto -mt-10">

      {/* Email */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="bg-orange-100 p-3 rounded-full">
          <Mail className="text-orange-500" />
        </div>
        <div>
          <p className="text-xs text-gray-400">EMAIL US</p>
          <p className="font-semibold text-sm">saumya.work84@gmail.com</p>
          <p className="text-xs text-gray-400">We'll respond within 24 hours</p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <MapPin className="text-blue-500" />
        </div>
        <div>
          <p className="text-xs text-gray-400">LOCATION</p>
          <p className="font-semibold text-sm">Built by me</p>
          <p className="text-xs text-gray-400">Available worldwide</p>
        </div>
      </div>

      {/* Time */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Clock className="text-green-500" />
        </div>
        <div>
          <p className="text-xs text-gray-400">RESPONSE TIME</p>
          <p className="font-semibold text-sm">&lt; 24 hours</p>
          <p className="text-xs text-gray-400">Monday to Friday</p>
        </div>
      </div>

    </div>
  );
};

export default ContactInfoCards;