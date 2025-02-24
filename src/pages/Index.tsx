
import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Wrench,
  Paintbrush,
  Baby,
  Scissors,
  Home,
  Calendar,
  Briefcase,
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

const jobs = [
  {
    title: "Professional Plumber Needed",
    company: "HomeServices Co.",
    location: "Brooklyn, NY",
    salary: "$45-60/hr",
    type: "Contract",
    postedTime: "2h ago",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop",
  },
  {
    title: "House Cleaning Professional",
    company: "CleanPro Inc.",
    location: "Manhattan, NY",
    salary: "$30-40/hr",
    type: "Part-time",
    postedTime: "5h ago",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
  },
  {
    title: "Experienced Hair Stylist",
    company: "Style Studio",
    location: "Queens, NY",
    salary: "$50-70/hr",
    type: "Full-time",
    postedTime: "1d ago",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
          <div className="flex max-w-xl mx-auto gap-2">
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />
            <Button className="h-12" size="lg">
              <Search className="w-5 h-5" />
            </Button>
          </div>
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
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Featured Opportunities
          </h2>
          <div className="space-y-6 animate-slide-up">
            {jobs.map((job) => (
              <JobCard key={job.title} {...job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
