import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

function Privacy() {
    const navigate = useNavigate();
    return (
        <>
        <div className="bg-black text-white font-montserrat">
            {/* Header - DO NOT CHANGE */}
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

            {/* Privacy Policy Content */}
            <div className="bg-black text-white px-8 py-4 font-montserrat leading-relaxed">
                <h1 className="text-3xl font-bold border-b-2 border-green-500 pb-4">Privacy Policy</h1>
                <p className="italic text-gray-300 mt-2">Last Updated: 04/22/2025</p>

                <div className="mt-6 space-y-6">
                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2 ">1. Information We Collect</h2>
                        <p>
                            We collect personal information you provide during account registration, such as your name,
                            email, and fitness goals. We also collect data on your usage of the services, such as workouts
                            completed, meals selected, and leaderboard participation.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">2. How We Use Your Information</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>To personalize your experience (e.g., customized meal plans and exercise routines).</li>
                            <li>To improve our services.</li>
                            <li>To communicate with you (e.g., updates, marketing materials, support).</li>
                            <li>To ensure the security and integrity of our services.</li>
                        </ul>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">3. Cookies</h2>
                        <p>
                            We use cookies to enhance user experience, track usage, and personalize content. You can choose
                            to disable cookies, but doing so may affect the functionality of the website.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">4. Data Sharing</h2>
                        <p>
                            We do not sell or rent your personal information. We may share your data with third-party
                            service providers (e.g., payment processors, hosting services) to facilitate our services.
                            These providers are bound by confidentiality obligations.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">5. Data Security</h2>
                        <p>
                            We take data security seriously and use appropriate technical and organizational measures to
                            protect your personal information. However, no method of transmission over the internet is 100%
                            secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">6. Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete your personal data at any time. Contact us at
                            <span className="italic"> [Your Contact Information] </span> to exercise these rights.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">7. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for the privacy
                            practices of these external sites.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">8. Children’s Privacy</h2>
                        <p>
                            Our services are not directed at individuals under the age of 13, and we do not knowingly collect
                            data from minors.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy occasionally. Any changes will be posted on this page, and we
                            will notify you via email for significant updates.
                        </p>
                    </section>

                    <section className="py-2 border-b-2 border-[#272727]">
                        <h2 className="text-2xl font-semibold text-green-500 mb-2">10. Contact Us</h2>
                        <p>
                            For any privacy-related questions, please contact us at
                            <span className="italic"> [Your Contact Information] </span>.
                        </p>
                    </section>
                </div>
            </div>
            </div>
        </>
    );
}

export default Privacy;