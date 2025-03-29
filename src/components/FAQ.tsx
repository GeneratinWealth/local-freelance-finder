
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I hire a freelancer?</AccordionTrigger>
          <AccordionContent>
            Browse through freelancer profiles, view their ratings and verification levels, and 
            then make an offer directly from their profile. You can negotiate rates and 
            discuss project details before finalizing the hire.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>How does verification work?</AccordionTrigger>
          <AccordionContent>
            Freelancers can verify their identity and qualifications through our three-tier 
            verification system. Basic verification confirms email and phone, verified status 
            adds ID verification, and premium verification includes background checks and 
            professional certification verification.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>How are payments processed?</AccordionTrigger>
          <AccordionContent>
            All payments are processed securely through our platform. Funds are held in escrow 
            until you confirm the work has been completed satisfactorily. This protects both 
            clients and freelancers and ensures quality of service.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I change my currency preferences?</AccordionTrigger>
          <AccordionContent>
            Yes, you can change your currency preferences in the settings menu. We support 
            multiple currencies to make it easier for you to understand pricing regardless of 
            your location.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>What if I'm not satisfied with the service?</AccordionTrigger>
          <AccordionContent>
            If you're not satisfied with the service, you can contact the freelancer directly 
            to resolve the issue. If that doesn't work, our customer support team is available 
            to help mediate and find a solution. In some cases, refunds may be issued according 
            to our policy guidelines.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
