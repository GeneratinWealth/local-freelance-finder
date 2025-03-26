import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
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
} from "lucide-react";

// Sample data
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
  "Brooklyn, NY",
  "Manhattan, NY",
  "Queens, NY",
  "Bronx, NY",
  "Staten Island, NY",
  "Jersey City, NJ",
  "Hoboken, NJ",
];

const allJobs = [
  {
    title: "Professional Plumber Needed",
    company: "HomeServices Co.",
    location: "Brooklyn, NY",
    salary: "$45-60/hr",
    type: "Contract",
    postedTime: "2h ago",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop",
    category: "Plumbing",
  },
  {
    title: "House Cleaning Professional",
    company: "CleanPro Inc.",
    location: "Manhattan, NY",
    salary: "$30-40/hr",
    type: "Part-time",
    postedTime: "5h ago",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
    category: "Cleaning",
  },
  {
    title: "Experienced Hair Stylist",
    company: "Style Studio",
    location: "Queens, NY",
    salary: "$50-70/hr",
    type: "Full-time",
    postedTime: "1d ago",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
    category: "Hair Styling",
  },
  {
    title: "Babysitter for Weekends",
    company: "Family Care",
    location: "Bronx, NY",
    salary: "$25-35/hr",
    type: "Part-time",
    postedTime: "6h ago",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?w=200&h=200&fit=crop",
    category: "Baby Sitting",
  },
  {
    title: "Handyman for Home Repairs",
    company: "Urban Fixers",
    location: "Jersey City, NJ",
    salary: "$40-55/hr",
    type: "Contract",
    postedTime: "12h ago",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd63bc041?w=200&h=200&fit=crop",
    category: "Handy Work",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobs, setJobs] = useState(allJobs);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  // Filter jobs based on search, category, and location
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
    
    // This would be replaced with actual AI integration
    setTimeout(() => {
      setShowAiSuggestion(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Find Local Freelance Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with businesses and individuals in your area looking for skilled professionals
          </p>
          
          {/* Enhanced Search Bar */}
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
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                {locations.map(location => (
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
          
          <Button variant="outline" onClick={handleAiSuggestion} className="bg-white">
            Get AI Suggestions for Your Profile
          </Button>
          
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

      {/* Categories Section */}
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

      {/* Featured Jobs Section */}
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
                <JobCard key={job.title} {...job} />
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
    </div>
  );
};

export default Index;
