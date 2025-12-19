import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchStrategy } from "@/components/SearchStrategy";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Analysis() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get patent info from URL params or use defaults
  const patentName = searchParams.get("patent") || "US-2024-0123456";
  const projectName = searchParams.get("project") || "New Analysis";

  const handleStartSearch = (config) => {
    console.log("Starting search with config:", config);
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      // Generate a result ID (in real app, this would come from API)
      const resultId = `result-${Date.now()}`;
      
      // Navigate to results page with the result ID
      navigate(`/results/${resultId}`);
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Initializing Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Setting up your search parameters and preparing the analysis...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <SearchStrategy patentName={patentName} onStartSearch={handleStartSearch} />
    </div>
  );
}

