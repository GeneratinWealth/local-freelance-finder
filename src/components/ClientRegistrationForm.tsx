
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sanitizeInput } from "@/utils/securityUtils";
import { analytics } from "@/services/analytics";

// Enhanced validation schema with security considerations
const formSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must not exceed 100 characters." })
    .regex(/^[a-zA-Z\s\-'.]+$/, { message: "Full name contains invalid characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." })
    .toLowerCase(),
  country: z.string()
    .min(1, { message: "Please select your country." })
    .refine((val) => countries.some(country => country.code === val), {
      message: "Please select a valid country.",
    }),
  phoneCode: z.string()
    .min(1, { message: "Please select your country code." })
    .regex(/^\+\d{1,4}$/, { message: "Invalid phone code format." }),
  phoneNumber: z.string()
    .min(5, { message: "Phone number must be at least 5 digits." })
    .max(15, { message: "Phone number must not exceed 15 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  language: z.string()
    .min(1, { message: "Please select your preferred language." })
    .refine((val) => languages.some(lang => lang.code === val), {
      message: "Please select a valid language.",
    }),
  gender: z.enum(["male", "female"], {
    message: "Please select your gender.",
  }),
});

const ClientRegistrationForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      phoneCode: "",
      phoneNumber: "",
      language: "",
      gender: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Sanitize all input values
      const sanitizedValues = {
        fullName: sanitizeInput(values.fullName),
        email: sanitizeInput(values.email),
        country: sanitizeInput(values.country),
        phoneCode: sanitizeInput(values.phoneCode),
        phoneNumber: sanitizeInput(values.phoneNumber),
        language: sanitizeInput(values.language),
        gender: values.gender,
      };

      console.log("Sanitized registration data:", sanitizedValues);

      // Track registration attempt
      analytics.trackEvent({
        category: 'registration',
        action: 'client_registration_attempt',
        label: sanitizedValues.country
      });

      // Here we would typically send the data to a secure API
      // For now, simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Track successful registration
      analytics.trackEvent({
        category: 'registration',
        action: 'client_registration_success',
        label: sanitizedValues.country
      });

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully. Please check your email for verification.",
      });

      // Clear form data from memory
      form.reset();
      
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      
      // Track registration failure
      analytics.trackEvent({
        category: 'error',
        action: 'client_registration_failure',
        label: error instanceof Error ? error.message : 'unknown_error'
      });

      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Secure country change handler with validation
  const handleCountryChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    const selectedCountry = countries.find(country => country.code === sanitizedValue);
    
    if (selectedCountry) {
      form.setValue("country", sanitizedValue);
      form.setValue("phoneCode", selectedCountry.phoneCode);
    } else {
      console.warn("Invalid country selection attempted:", value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
        Become a Client
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field}
                    maxLength={100}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    type="email"
                    {...field}
                    maxLength={254}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Female
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country/Region</FormLabel>
                <Select
                  onValueChange={handleCountryChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="phoneCode"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input 
                      readOnly 
                      {...field}
                      autoComplete="tel-country-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Phone number" 
                      {...field}
                      maxLength={15}
                      autoComplete="tel-national"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center gap-2">
                          <span>{language.flag}</span>
                          <span>{language.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 via-orange-500 to-blue-600 hover:from-purple-700 hover:via-orange-600 hover:to-blue-700"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating Account..." : "Register as Client"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ClientRegistrationForm;
