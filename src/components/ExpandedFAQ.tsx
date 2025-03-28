
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const ExpandedFAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqItems: FAQItem[] = [
    // Getting Started
    {
      question: "How do I sign up as a freelancer?",
      answer: "To sign up as a freelancer, navigate to our homepage and click on the 'Become a Freelancer' button. Follow the registration process and complete your profile with relevant skills, experience, and portfolio items to attract potential clients.",
      category: "getting-started"
    },
    {
      question: "How do I get verified?",
      answer: "Visit the Verification page to learn about our three-level verification process. Basic verification requires email and phone verification. Verified status requires government ID and address proof. Premium verification adds background checks and professional certifications.",
      category: "getting-started"
    },
    {
      question: "How do payment protections work?",
      answer: "All payments on our platform are protected through our escrow system. Clients make payments that are held in escrow until the work is completed satisfactorily. This protects both parties and ensures fair transactions.",
      category: "getting-started"
    },
    // Verification
    {
      question: "What documents do I need for verification?",
      answer: "For basic verification, you'll need access to your email and phone. For verified status, provide a government-issued photo ID (passport, driver's license) and proof of address (utility bill, bank statement). Premium verification requires professional certifications and may involve a background check.",
      category: "verification"
    },
    {
      question: "How long does verification take?",
      answer: "Basic verification is instant upon email and phone confirmation. Verified status typically takes 1-2 business days for document review. Premium verification can take 3-5 business days due to the additional background checks and certification validation.",
      category: "verification"
    },
    {
      question: "Can I work without being verified?",
      answer: "Yes, you can create a profile and bid on projects with basic verification. However, many clients prefer working with fully verified freelancers, and some high-value projects may require verified or premium status.",
      category: "verification"
    },
    // Payments
    {
      question: "How and when do I get paid?",
      answer: "Payments are released from escrow after the client approves your work. For fixed-price projects, this happens upon project completion. For hourly work, payments are processed weekly based on verified hours. Funds can be withdrawn to your connected bank account or payment service.",
      category: "payments"
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit/debit cards, PayPal, and bank transfers for clients making payments. Freelancers can withdraw funds via direct deposit, PayPal, or other supported payment services available in their region.",
      category: "payments"
    },
    {
      question: "What fees does the platform charge?",
      answer: "Freelancers pay a service fee that starts at 20% for the first $500 with a client, then decreases to 10% for lifetime billings between $500.01 and $10,000, and 5% for lifetime billings over $10,000. Clients pay a 5% processing fee.",
      category: "payments"
    },
    // Account Management
    {
      question: "How do I change my account settings?",
      answer: "Click on your profile picture in the top right corner and select 'Settings' from the dropdown menu. From there, you can update your personal information, password, notification preferences, and privacy settings.",
      category: "account"
    },
    {
      question: "Can I have both a freelancer and client account?",
      answer: "Yes, you can use the same account to both hire freelancers and offer your services. Simply toggle between freelancer and client mode in your dashboard to access the appropriate features.",
      category: "account"
    },
    {
      question: "How do I delete my account?",
      answer: "Go to your account settings, scroll to the bottom, and click on 'Delete Account'. Note that this action is permanent and will remove all your data from our platform after a 30-day grace period.",
      category: "account"
    },
  ];
  
  const filteredFAQs = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;
  
  const groupedFAQs = filteredFAQs.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, FAQItem[]>);
  
  const categoryTitles: Record<string, string> = {
    "getting-started": "Getting Started",
    "verification": "Verification Process",
    "payments": "Payments & Billing",
    "account": "Account Management"
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search FAQ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full"
            onClick={() => setSearchQuery("")}
          >
            Clear
          </Button>
        )}
      </div>
      
      {Object.entries(groupedFAQs).length > 0 ? (
        Object.entries(groupedFAQs).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {categoryTitles[category] || category}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${category}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No FAQ items matched your search.</p>
          <Button 
            variant="link" 
            onClick={() => setSearchQuery("")}
            className="mt-2"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};
