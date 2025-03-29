
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationMapProps {
  address: string;
  distance?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ address, distance }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // This is a placeholder for actual map integration
    // In a real implementation, you would use the Google Maps or Mapbox API
    if (showMap && mapRef.current) {
      try {
        // Simulate map loading
        const timer = setTimeout(() => {
          setMapLoaded(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error loading map:", error);
        setMapError(true);
      }
    }
  }, [showMap]);

  const handleShowMap = () => {
    setShowMap(true);
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
      {!showMap ? (
        <div className="p-4 flex flex-col items-center text-center">
          <MapPin className="h-8 w-8 text-purple-500 mb-2" />
          <p className="text-gray-700 mb-2">{address}</p>
          {distance && (
            <p className="text-sm text-gray-500 mb-3">{distance} away</p>
          )}
          <Button 
            variant="outline" 
            onClick={handleShowMap} 
            className="w-full sm:w-auto"
          >
            Show on Map
          </Button>
        </div>
      ) : (
        <div className="relative">
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}
          
          {mapError && (
            <div className="p-4 text-center">
              <p className="text-red-500">Failed to load map</p>
              <p className="text-sm text-gray-500 mt-1">Please try again later</p>
            </div>
          )}
          
          <div 
            ref={mapRef} 
            className={`h-64 w-full transition-opacity duration-300 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+5046e5(" +
                encodeURIComponent(address) +
                ")/auto/400x200?access_token=placeholder')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Map container - in a real implementation, the map would be rendered here */}
            {mapLoaded && (
              <div className="absolute bottom-2 right-2 bg-white rounded px-2 py-1 text-xs text-gray-500">
                Map visualization (placeholder)
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{address}</p>
                {distance && <p className="text-xs text-gray-500">{distance} away</p>}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMap(false)}
              >
                Hide Map
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
