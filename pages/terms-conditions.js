import React from "react";

const TermsAndConditions = (props) => {
  const { darkMode, toggleDarkMode, companyName } = props;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center p-6`}>
      <div className={` ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-2xl p-8 max-w-3xl w-full`}>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="leading-relaxed mb-6">
          Welcome to {companyName}! These Terms & Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms.
        </p>

        <div className="mt-6 space-y-4">
          {/* Introduction */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              These Terms & Conditions apply to all users of our website. By using our website, you agree to the terms outlined in this document. If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Use of Our Services */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Use of Our Services</h2>
            <p>
              By accessing our website, you agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services for any activity that violates local, national, or international law.
            </p>
          </div>

          {/* User Responsibilities */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">User Responsibilities</h2>
            <ul className="list-disc pl-6 mt-4">
              <li>You agree not to engage in any unlawful activities through our website.</li>
              <li>You agree to provide accurate and truthful information when using our services.</li>
              <li>You are responsible for maintaining the confidentiality of your account details.</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p>
              {companyName} shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
            </p>
          </div>

          {/* Modifications to the Terms */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Modifications to the Terms</h2>
            <p>
              We reserve the right to update or modify these Terms & Conditions at any time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
            </p>
          </div>

          {/* Termination */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any time, without notice, for any reason, including if you violate these Terms.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mt-8 text-center">
            
                      </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

