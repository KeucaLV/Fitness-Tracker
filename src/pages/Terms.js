import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

function Terms() {
    const navigate = useNavigate();
    return (
        <>
        <div className="bg-black text-white font-montserrat ">
            <div className="flex relative w-full justify-between items-center pr-[10px] mt-3 px-8 dark:bg-gray-100 flex-wrap -top-4 bg-[#131313]">
                <div className="flex flex-row ">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white bg-green-600 hover:bg-green-700 transition-all duration-200 px-4 py-2 rounded-xl shadow-md"
                    >
                        ← Back
                    </button>
                </div>
                <img className="w-[50px] h-[50px] m-5" src={logo} alt="Logo" />
            </div>
            <div className="p-8 text-white font-montserrat leading-relaxed">
                <h1 className="text-white text-3xl border-b-2 border-green-500 pb-4">Terms of Service</h1>
                <p className="italic text-white mt-4">Last Updated: 04/22/2025</p>

                <div className="mt-6 space-y-4">
                    <p>Welcome to kevfitness.com! These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our services, you agree to these Terms. If you disagree with any part, you must discontinue your use.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">1. Services Provided</h2>
                    <p>We offer fitness-related services including personalized meal plans, workout guides, an activity calendar, and a leaderboard. Services may evolve over time, and we reserve the right to modify, suspend, or discontinue any part of them at our discretion.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">2. User Accounts</h2>
                    <p>To access certain services, you must create an account. You agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and any activities under it. If unauthorized access occurs, notify us immediately.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">3. Use of Services</h2>
                    <p>You agree to use our services solely for personal, non-commercial purposes. You may not misuse, hack, or exploit our services in any way, including using the services for any unlawful activity.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">4. Content</h2>
                    <p>Our website and services contain both user-generated and kevfitness.com-generated content. You agree not to share or post harmful, inappropriate, or copyrighted content. We reserve the right to remove any content that violates these Terms.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">5. Payment and Subscription</h2>
                    <p>Some services on our platform may require payment or a subscription. All fees are non-refundable unless stated otherwise. Payment terms are provided during the subscription process.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">6. Disclaimers</h2>
                    <p>We do not guarantee specific fitness results from using our services. Consult a healthcare professional before making any changes to your diet or exercise routine. We are not liable for any injury, loss, or damage resulting from using our services.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">7. Termination</h2>
                    <p>We reserve the right to suspend or terminate your access to our services at our discretion for any violation of these Terms.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">8. Changes to Terms</h2>
                    <p>We may update these Terms from time to time. We will notify users of any material changes via email or our website. Continued use of the services means you accept any changes.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">9. Governing Law</h2>
                    <p>These Terms shall be governed by the laws of Latvia, without regard to its conflict of laws principles.</p>

                    <h2 className="text-2xl border-b-2 border-green-500 pb-4 text-white">10. Contact Us</h2>
                    <p>If you have any questions regarding these Terms, please contact us at nikskevinsm@kevfitness.com.</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Terms;
