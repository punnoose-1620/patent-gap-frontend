import { FileText, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const statusConfig = {
  complete: {
    label: "Complete",
    className: "bg-success/10 text-success border-success/20",
  },
  processing: {
    label: "Processing",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function ProjectCard({
  title,
  patentId,
  status,
  progress,
  lastUpdated,
  matchCount,
  onClick,
}) {
  const config = statusConfig[status];

  return (
    <Card
      className="bg-card hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <p className="text-sm font-mono text-muted-foreground">{patentId}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs", config.className)}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {status === "processing" && progress !== undefined && (
          <div className="mb-3">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{lastUpdated}</span>
            </div>
            {matchCount !== undefined && (
              <span>
                {matchCount} potential {matchCount === 1 ? "match" : "matches"}
              </span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
}
