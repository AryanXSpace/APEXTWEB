'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Shield, FileText, DollarSign, ArrowLeft } from 'lucide-react';

const Section = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="relative group mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-tilt"></div>
        <div className="relative border border-gray-700/50 rounded-2xl bg-gray-900/80 backdrop-blur-xl overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-6 text-left text-white font-semibold text-lg focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                {React.cloneElement(icon, { className: 'w-6 h-6 text-indigo-400' })}
                <span className="ml-4">{title}</span>
                </span>
                <ChevronDown
                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed prose prose-invert prose-sm max-w-none">
                {children}
                </div>
            </div>
        </div>
    </div>
  );
};

const TermsPage = () => {
  return (
    <>
    <style jsx global>{`
        .gradient-text {
          background: -webkit-linear-gradient(45deg, #a855f7, #d946ef, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes animate-tilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(0.5deg); }
        }
        .animate-tilt {
            animation: animate-tilt 8s infinite linear;
        }
        .page-bg {
            background-color: #000000;
            background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 20px 20px;
        }
    `}</style>
    <div className="page-bg text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 gradient-text">Terms & Policies</h1>
          <p className="text-gray-400">Last Updated: July 2025</p>
        </header>

        <main>
          <Section title="Terms of Service" icon={<FileText />} defaultOpen={true}>
            <p>Welcome to Apex Services. By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
            <h4>1. Services</h4>
            <p>Apex Services provides web development, design, and other digital services as agreed upon with the client. All services are provided on a best-effort basis.</p>
            <h4>2. User Responsibilities</h4>
            <p>You are responsible for providing accurate information and materials required for the project. You agree not to use our services for any unlawful purpose.</p>
            <h4>3. Intellectual Property</h4>
            <p>Upon final payment, the client will own the intellectual property rights for the final delivered product. We reserve the right to display the project in our portfolio.</p>
            <h4>4. Limitation of Liability</h4>
            <p>Apex Services shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services.</p>
          </Section>

          <Section title="Privacy Policy" icon={<Shield />}>
            <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
            <h4>Information We Collect</h4>
            <p>We may collect personal information such as your name, email address, and project details when you contact us or use our services.</p>
            <h4>How We Use Your Information</h4>
            <p>We use your information to provide and improve our services, communicate with you, and process payments. We do not sell or share your personal information with third parties, except as required by law.</p>
            <h4>Data Security</h4>
            <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
          </Section>

          <Section title="Refund Policy" icon={<DollarSign />}>
            <p className="font-bold text-white">All sales are final. We do not offer refunds for any services provided.</p>
            <p className="mt-4">Due to the nature of our digital services, we cannot provide refunds once a project has commenced. We are committed to working with you to ensure your satisfaction with the final product.</p>
          </Section>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400">If you have any questions about these terms, please contact us at:</p>
            <a href="mailto:contact@apexservices.store" className="text-indigo-400 font-semibold flex items-center justify-center gap-2 mt-4 hover:underline">
              <Mail />
              contact@apexservices.store
            </a>
          </div>

          <div className="mt-20 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
                Back to Main Website
            </Link>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default TermsPage;
