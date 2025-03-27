
import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { JobCardWithCurrency } from "@/components/JobCardWithCurrency";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CurrencyCode } from "@/components/CurrencySelector";
import { FreelancerStatus } from "@/components/StatusBadge";
import { DrawerMenu } from "@/components/DrawerMenu";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import {
  Search,
  Wrench,
  Paintbrush,
  Baby,
  Scissors,
  Home,
  Calendar,
  Briefcase,
  MapPin,
  Globe,
} from "lucide-react";

const categories = [
  { icon: Wrench, title: "Plumbing", count: 124 },
  { icon: Home, title: "Handy Work", count: 98 },
  { icon: Paintbrush, title: "Cleaning", count: 156 },
  { icon: Baby, title: "Baby Sitting", count: 87 },
  { icon: Scissors, title: "Hair Styling", count: 113 },
  { icon: Calendar, title: "Event Planning", count: 76 },
  { icon: Briefcase, title: "Business Services", count: 92 },
];

const locations = [
  // North America
  "Brooklyn, NY, USA",
  "Manhattan, NY, USA",
  "Queens, NY, USA",
  "Bronx, NY, USA",
  "Staten Island, NY, USA",
  "Jersey City, NJ, USA",
  "Hoboken, NJ, USA",
  // Europe
  "London, UK",
  "Paris, France",
  "Berlin, Germany",
  "Rome, Italy",
  "Madrid, Spain",
  "Amsterdam, Netherlands",
  // Asia
  "Tokyo, Japan",
  "Singapore, Singapore",
  "Hong Kong, China",
  "Mumbai, India",
  "Bangkok, Thailand",
  "Seoul, South Korea",
  // Australia & Oceania
  "Sydney, Australia",
  "Melbourne, Australia",
  "Auckland, New Zealand",
  // Africa
  "Cape Town, South Africa",
  "Nairobi, Kenya",
  "Cairo, Egypt",
  // South America
  "Rio de Janeiro, Brazil",
  "Buenos Aires, Argentina",
  "Lima, Peru",
];

const allJobs = [
  {
    id: "1",
    title: "Professional Plumber Needed",
    company: "HomeServices Co.",
    location: "Brooklyn, NY, USA",
    salary: "$45-60/hr",
    type: "Contract",
    postedTime: "2h ago",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop",
    category: "Plumbing",
    status: "available" as FreelancerStatus,
    distance: "2.5 miles",
  },
  {
    id: "2",
    title: "House Cleaning Professional",
    company: "CleanPro Inc.",
    location: "London, UK",
    salary: "$30-40/hr",
    type: "Part-time",
    postedTime: "5h ago",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
    category: "Cleaning",
    status: "busy" as FreelancerStatus,
    distance: "3.2 miles",
  },
  {
    id: "3",
    title: "Experienced Hair Stylist",
    company: "Style Studio",
    location: "Paris, France",
    salary: "$50-70/hr",
    type: "Full-time",
    postedTime: "1d ago",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
    category: "Hair Styling",
    status: "offline" as FreelancerStatus,
    distance: "5.7 miles",
  },
  {
    id: "4",
    title: "Babysitter for Weekends",
    company: "Family Care",
    location: "Berlin, Germany",
    salary: "$25-35/hr",
    type: "Part-time",
    postedTime: "6h ago",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?w=200&h=200&fit=crop",
    category: "Baby Sitting",
    status: "available" as FreelancerStatus,
    distance: "4.1 miles",
  },
  {
    id: "5",
    title: "Handyman for Home Repairs",
    company: "Urban Fixers",
    location: "Tokyo, Japan",
    salary: "$40-55/hr",
    type: "Contract",
    postedTime: "12h ago",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd63bc041?w=200&h=200&fit=crop",
    category: "Handy Work",
    status: "busy" as FreelancerStatus,
    distance: "6.3 miles",
  },
  {
    id: "6",
    title: "Event Planner for Corporate Function",
    company: "EventPro",
    location: "Sydney, Australia",
    salary: "$60-80/hr",
    type: "Contract",
    postedTime: "1d ago",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop",
    category: "Event Planning",
    status: "available" as FreelancerStatus,
    distance: "7.8 miles",
  },
  {
    id: "7",
    title: "Business Consultant",
    company: "Strategy Partners",
    location: "Singapore, Singapore",
    salary: "$85-100/hr",
    type: "Full-time",
    postedTime: "2d ago",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=200&h=200&fit=crop",
    category: "Business Services",
    status: "offline" as FreelancerStatus,
    distance: "8.4 miles",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobs, setJobs] = useState(allJobs);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");

  useEffect(() => {
    let filteredJobs = [...allJobs];
    
    if (searchQuery) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(job => job.category === selectedCategory);
    }
    
    if (selectedLocation && selectedLocation !== "all-locations") {
      filteredJobs = filteredJobs.filter(job => job.location === selectedLocation);
    }
    
    setJobs(filteredJobs);
  }, [searchQuery, selectedCategory, selectedLocation]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: `Selected: ${category}`,
      description: `Showing jobs for ${category} category`,
    });
  };

  const handleAiSuggestion = () => {
    setShowAiSuggestion(true);
    toast({
      title: "AI Suggestions",
      description: "Improve your profile with AI-generated descriptions and attract more clients!",
    });
    
    setTimeout(() => {
      setShowAiSuggestion(false);
    }, 5000);
  };

  const handleCurrencyChange = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    toast({
      title: "Currency Changed",
      description: `Showing salaries in ${currency}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 via-orange-400 to-blue-500 py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <DrawerMenu
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
            
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Freelancer
            </h1>
            
            <div className="w-9 h-9">
              {/* Empty div for spacing */}
            </div>
          </div>
          
          <p className="text-xl text-white max-w-2xl mx-auto">
            Connect with skilled professionals around the world
          </p>
          
          <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1">
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-12 w-full md:w-40">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[50vh] overflow-y-auto">
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="north-america-locations" disabled className="font-semibold text-primary">
                  North America
                </SelectItem>
                {locations.slice(0, 7).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="europe-locations" disabled className="font-semibold text-primary">
                  Europe
                </SelectItem>
                {locations.slice(7, 13).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="asia-locations" disabled className="font-semibold text-primary">
                  Asia
                </SelectItem>
                {locations.slice(13, 19).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="australia-oceania-locations" disabled className="font-semibold text-primary">
                  Australia & Oceania
                </SelectItem>
                {locations.slice(19, 22).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="africa-locations" disabled className="font-semibold text-primary">
                  Africa
                </SelectItem>
                {locations.slice(22, 25).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="south-america-locations" disabled className="font-semibold text-primary">
                  South America
                </SelectItem>
                {locations.slice(25).map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="h-12" size="lg">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" onClick={handleAiSuggestion} className="bg-white">
              Get AI Suggestions for Your Profile
            </Button>
          </div>
          
          {showAiSuggestion && (
            <div className="bg-white p-4 rounded-lg shadow-md text-left">
              <h3 className="font-medium text-primary">AI-Generated Profile Suggestions</h3>
              <p className="text-sm text-gray-600">
                Based on your skills, we recommend highlighting your expertise in problem-solving
                and client communication. Consider adding examples of past projects that showcase
                your attention to detail.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up">
            {categories.map((category) => (
              <CategoryCard 
                key={category.title} 
                {...category} 
                onClick={() => handleCategoryClick(category.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory ? `${selectedCategory} Jobs` : 'Featured Opportunities'}
              {selectedLocation && selectedLocation !== "all-locations" ? ` in ${selectedLocation}` : ''}
            </h2>
            
            {(selectedCategory || (selectedLocation && selectedLocation !== "all-locations")) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {jobs.length > 0 ? (
            <div className="space-y-6 animate-slide-up">
              {jobs.map((job) => (
                <JobCardWithCurrency 
                  key={job.id} 
                  {...job} 
                  currency={selectedCurrency}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No jobs found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedLocation("");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <AnimatedLogo />
    </div>
  );
};

export default Index;
