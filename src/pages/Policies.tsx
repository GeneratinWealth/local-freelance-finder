
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Policies = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("global");
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-0">
                Policies & Terms
              </h1>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-500" />
                <Select onValueChange={setRegion} defaultValue={region}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms of Service</h2>
                <p className="text-gray-700 mb-3">
                  Welcome to Freelancer, the platform that connects talented freelancers with clients seeking their services. By using our platform, you agree to comply with and be bound by the following terms and conditions.
                </p>
                <p className="text-gray-700">
                  Freelancer provides a platform for freelancers and clients to connect, negotiate, and conduct business. We do not employ freelancers and are not responsible for the quality of work, delays, or disputes that may arise between freelancers and clients.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Conduct</h2>
                <p className="text-gray-700 mb-3">
                  Users of Freelancer must comply with all applicable laws and regulations. Users are prohibited from:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Posting false, inaccurate, misleading, defamatory, or libelous content</li>
                  <li>Infringing on the intellectual property rights of others</li>
                  <li>Distributing viruses or any other technologies that may harm Freelancer or its users</li>
                  <li>Imposing an unreasonable load on our infrastructure or interfering with the proper working of Freelancer</li>
                  <li>Bypassing any measures we may use to prevent or restrict access to Freelancer</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
                <p className="text-gray-700 mb-3">
                  At Freelancer, we take your privacy seriously. We collect information that you provide directly to us, such as when you create an account, update your profile, or communicate with other users. We also collect information about your use of our services, such as your IP address, browser type, and pages visited.
                </p>
                <p className="text-gray-700">
                  We use this information to provide, maintain, and improve our services, to communicate with you, and to protect our users. We may share your information with third-party service providers who help us deliver our services, but we do not sell your personal information to advertisers or other third parties.
                </p>
                {region === "eu" && (
                  <p className="text-gray-700 mt-3">
                    In accordance with the General Data Protection Regulation (GDPR), users in the European Union have specific rights regarding their personal data, including the right to access, correct, delete, and port their data. For more information on how to exercise these rights, please contact us.
                  </p>
                )}
                {region === "us" && (
                  <p className="text-gray-700 mt-3">
                    California residents have certain rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information.
                  </p>
                )}
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
                <p className="text-gray-700 mb-3">
                  Freelancer charges a service fee for the use of our platform. The fee is calculated as a percentage of the transaction between freelancer and client. Fee structures may vary based on the type of service and the user's status on our platform.
                </p>
                <p className="text-gray-700">
                  All payments must be processed through our platform. Direct payments between freelancers and clients outside of our platform are prohibited and may result in suspension or termination of your account.
                </p>
                {region === "eu" && (
                  <p className="text-gray-700 mt-3">
                    In compliance with EU regulations, you have the right to withdraw from purchases within 14 days without giving any reason, subject to certain exceptions for digital content and services that have begun with your prior express consent.
                  </p>
                )}
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Dispute Resolution</h2>
                <p className="text-gray-700">
                  In the event of a dispute between a freelancer and a client, we encourage users to first attempt to resolve the issue directly. If that is not possible, Freelancer provides a dispute resolution process. We will review the circumstances of the dispute and make a determination based on our policies and the information provided by both parties.
                </p>
                {region === "us" && (
                  <p className="text-gray-700 mt-3">
                    For users in the United States, disputes that cannot be resolved through our internal process may be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                )}
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-3">
                  Pursuant to Section 230 of the Communications Decency Act and applicable international laws including the Electronic Commerce Directive 2000/31/EC of the European Parliament and of the Council, Freelancer shall not be held liable for any physical altercations, disputes, or other in-person conflicts that may occur between users of our platform.
                </p>
                <p className="text-gray-700 mb-3">
                  By using our services, you acknowledge and agree that Freelancer is an interactive computer service provider that enables the creation and development of information provided by another information content provider, and as such, cannot be treated as the publisher or speaker of any information provided by another information content provider.
                </p>
                <p className="text-gray-700">
                  To the maximum extent permitted by applicable law, Freelancer, its affiliates, and their respective officers, employees, agents, partners and licensors shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">International Use</h2>
                <p className="text-gray-700 mb-3">
                  Freelancer is a global platform operating across multiple jurisdictions. Users are responsible for ensuring that their use of our platform complies with all applicable local, state, national, and international laws and regulations.
                </p>
                <p className="text-gray-700">
                  Users acknowledge that different countries have different laws regarding online platforms, consumer protection, data privacy, and business transactions. By using our platform, you agree to comply with all relevant laws in your jurisdiction as well as in the jurisdictions of any clients or freelancers with whom you interact through our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Systems and Automated Features</h2>
                <p className="text-gray-700 mb-3">
                  Our platform employs various artificial intelligence systems to enhance your experience, including:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Automated policy updates based on current legislation and jurisdiction</li>
                  <li>Profile content assistance and optimization</li>
                  <li>Service quality monitoring and improvement</li>
                  <li>Risk assessment and fraud prevention</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  While we strive to ensure the accuracy and reliability of these automated systems, you acknowledge that they may not be perfect and that the ultimate responsibility for any content you post or actions you take on our platform rests with you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Last Updated</h2>
                <p className="text-gray-700">
                  These terms were last updated on {new Date().toLocaleDateString()}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;
