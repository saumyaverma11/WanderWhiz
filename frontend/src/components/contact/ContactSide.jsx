import { useNavigate } from "react-router-dom";
const ContactSide = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-6">

            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
                    alt="travel"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">WanderWhiz</h3>
                    <p className="text-sm">Available Worldwide</p>
                </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-orange-50 p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">Looking for quick answers?</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Check our FAQ page — most common questions are already answered there.
                </p>
                <button
                    onClick={() => navigate("/faq")}
                    className="text-orange-500 font-medium hover:underline"
                >
                    Browse FAQ →
                </button>
            </div>

            {/* Steps */}
            <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold mb-4">What happens next?</h3>

                <div className="space-y-3 text-sm text-gray-600">

                    <p>① Your message is saved and emailed instantly.</p>
                    <p>② We read and respond personally — no bots.</p>
                    <p>③ Expect reply within 24 hours.</p>

                </div>
            </div>

        </div>
    );
};

export default ContactSide;