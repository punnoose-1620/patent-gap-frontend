import { Plus, FileUp, Search, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NewAnalysisCard() {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Start New Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Upload a patent or portfolio to begin infringement analysis
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => navigate("/new-analysis?type=single")} 
            className="gap-2"
            size="default"
          >
            <Plus className="h-4 w-4" />
            New Single Patent
          </Button>
          
          <Button 
            onClick={() => navigate("/new-analysis?type=portfolio")} 
            variant="outline"
            className="gap-2"
            size="default"
          >
            <FileUp className="h-4 w-4" />
            Upload Portfolio
          </Button>
          
          <Button 
            onClick={() => navigate("/new-analysis?type=search")} 
            variant="outline"
            className="gap-2"
            size="default"
          >
            <Search className="h-4 w-4" />
            Search by Patent ID
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
