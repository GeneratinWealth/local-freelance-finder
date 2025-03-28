
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SuggestionProps {
  profileContent: string;
  setProfileContent: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileCreationHelper: React.FC<SuggestionProps> = ({ 
  profileContent, 
  setProfileContent 
}) => {
  const [showHelper, setShowHelper] = useState(false);
  const [profileType, setProfileType] = useState("general");
  const [skill, setSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const profileTypes = [
    { value: "general", label: "General Profile" },
    { value: "technical", label: "Technical Specialist" },
    { value: "creative", label: "Creative Professional" },
    { value: "service", label: "Service Provider" },
    { value: "consulting", label: "Consultant" },
  ];

  const generateSuggestion = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const suggestions = {
        general: `I'm a dedicated professional with ${skill ? `expertise in ${skill}` : 'a diverse skill set'} and a track record of delivering high-quality results. I pride myself on communication, reliability, and attention to detail, ensuring that each project is completed to the highest standards.`,
        technical: `Experienced ${skill || 'technical specialist'} with a deep understanding of industry best practices and cutting-edge tools. I specialize in delivering robust, scalable solutions that meet complex requirements while maintaining clean, maintainable code.`,
        creative: `Passionate ${skill || 'creative professional'} with an eye for detail and a flair for innovation. I blend technical skills with artistic vision to create compelling content that resonates with audiences and achieves business objectives.`,
        service: `Reliable and customer-focused ${skill || 'service provider'} committed to delivering exceptional experiences. I combine technical knowledge with interpersonal skills to ensure client satisfaction and build lasting relationships.`,
        consulting: `Strategic ${skill || 'consultant'} with expertise in analyzing challenges and implementing effective solutions. I partner with clients to understand their unique needs and deliver actionable insights that drive measurable results.`,
      };
      
      const suggestion = suggestions[profileType as keyof typeof suggestions];
      setProfileContent(prevContent => {
        if (prevContent.trim() === "") {
          return suggestion;
        } else {
          return `${prevContent}\n\n${suggestion}`;
        }
      });
      
      setIsGenerating(false);
      toast({
        title: "AI Suggestion Added",
        description: "The generated content has been added to your profile.",
      });
    }, 1500);
  };

  const addRecommendedKeywords = () => {
    const keywordsByType = {
      general: ["reliable", "professional", "experienced", "detail-oriented", "collaborative"],
      technical: ["problem-solver", "innovative", "analytical", "developer", "engineer"],
      creative: ["creative", "design", "portfolio", "artistic", "visual"],
      service: ["customer-focused", "quality", "timely", "service-oriented", "satisfaction"],
      consulting: ["strategic", "results-driven", "advisor", "expertise", "solutions"]
    };
    
    const keywords = keywordsByType[profileType as keyof typeof keywordsByType];
    const keywordText = `\n\nKeywords: ${keywords.join(', ')}`;
    
    setProfileContent(prevContent => prevContent + keywordText);
    
    toast({
      title: "Keywords Added",
      description: "Professional keywords have been added to your profile.",
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium">Profile Content</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowHelper(!showHelper)}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          {showHelper ? "Hide AI Helper" : "Show AI Helper"}
        </Button>
      </div>
      
      <Textarea
        placeholder="Describe yourself, your experience, and what makes you unique..."
        className="min-h-32"
        value={profileContent}
        onChange={(e) => setProfileContent(e.target.value)}
      />
      
      {showHelper && (
        <Card className="border border-purple-100 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Content Helper</CardTitle>
            <CardDescription>
              Generate professional content for your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="profile-type" className="text-sm font-medium">
                  Profile Type
                </label>
                <Select 
                  value={profileType} 
                  onValueChange={setProfileType}
                >
                  <SelectTrigger id="profile-type">
                    <SelectValue placeholder="Select profile type" />
                  </SelectTrigger>
                  <SelectContent>
                    {profileTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="skill" className="text-sm font-medium">
                  Primary Skill (Optional)
                </label>
                <input
                  id="skill"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Web Development"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={addRecommendedKeywords}
            >
              Add Keywords
            </Button>
            <Button 
              onClick={generateSuggestion}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 text-white hover:opacity-90"
            >
              {isGenerating ? (
                <>Generating<Sparkles className="ml-2 h-4 w-4 animate-pulse" /></>
              ) : (
                <>Generate Content<Sparkles className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
