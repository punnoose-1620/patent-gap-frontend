import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResultsHeatmap({ patentName, resultId, matches }) {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [filterRisk, setFilterRisk] = useState("all");

  // Claims data
  const claims = [
    { id: 1, text: "Claim 1: Foldable display device with hinge..." },
    { id: 2, text: "Claim 2: Hinge mechanism with dual pivot..." },
    { id: 3, text: "Claim 3: Display panel flex region..." },
    { id: 4, text: "Claim 4: Housing coupling structure..." },
  ];

  // Create heatmap matrix
  const heatmapData = claims.map((claim) =>
    matches.map((match) => ({
      claim: claim.id,
      match: match.id,
      hasMatch: match.matchedClaims.includes(claim.id),
      riskLevel: match.riskLevel,
      overlapScore: match.overlapScore,
    }))
  );

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success/20 text-success-foreground";
    }
  };

  const getCellColor = (hasMatch, riskLevel) => {
    if (!hasMatch) return "bg-muted/30";
    switch (riskLevel) {
      case "high":
        return "bg-destructive/80 hover:bg-destructive";
      case "medium":
        return "bg-warning/80 hover:bg-warning";
      case "low":
        return "bg-success/40 hover:bg-success/50";
    }
  };

  const filteredMatches = matches.filter((m) => filterRisk === "all" || m.riskLevel === filterRisk);

  const handleSelectMatch = (match) => {
    setSelectedMatch(match.id);
    // Navigate to comparison page with IDs
    navigate(`/results/${resultId}/comparison/${match.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
        <p className="text-muted-foreground">
          Found {matches.length} potential matches • {matches.filter((m) => m.riskLevel === "high").length} high risk
        </p>
        <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md mt-2">
          <span className="text-sm text-muted-foreground">Your Patent:</span>
          <span className="text-sm font-mono font-semibold">{patentName}</span>
        </div>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-destructive/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">High Risk</p>
                <p className="text-3xl font-bold text-destructive">
                  {matches.filter((m) => m.riskLevel === "high").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Requires immediate review</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medium Risk</p>
                <p className="text-3xl font-bold text-warning">
                  {matches.filter((m) => m.riskLevel === "medium").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Further analysis recommended</p>
          </CardContent>
        </Card>
        <Card className="border-success/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Low Risk</p>
                <p className="text-3xl font-bold text-success">{matches.filter((m) => m.riskLevel === "low").length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Minimal overlap detected</p>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Overlap Heatmap</CardTitle>
          <CardDescription>Visual representation of claim matches across competitor patents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive" />
              <span>High Risk (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning" />
              <span>Medium Risk (50-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/40" />
              <span>Low Risk (&lt;50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted/30" />
              <span>No Match</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `200px repeat(${matches.length}, 150px)` }}>
                <div className="p-2 text-xs font-semibold">Your Claims</div>
                {matches.map((match) => (
                  <div key={match.id} className="p-2 text-xs text-center">
                    <div className="font-semibold truncate">{match.company}</div>
                    <div className="text-muted-foreground font-mono truncate">{match.patent}</div>
                  </div>
                ))}
              </div>

              {/* Matrix Grid */}
              {heatmapData.map((row, rowIdx) => (
                <div key={rowIdx} className="grid gap-1 mb-1" style={{ gridTemplateColumns: `200px repeat(${matches.length}, 150px)` }}>
                  <div className="p-2 text-xs font-medium bg-muted/50 rounded flex items-center">
                    <span className="truncate">Claim {claims[rowIdx].id}</span>
                  </div>
                  {row.map((cell, cellIdx) => (
                    <button
                      key={`${cell.claim}-${cell.match}`}
                      className={cn(
                        "p-2 rounded transition-all cursor-pointer border border-transparent hover:border-primary",
                        getCellColor(cell.hasMatch, cell.riskLevel),
                        selectedMatch === cell.match && "ring-2 ring-primary"
                      )}
                      onClick={() => {
                        if (cell.hasMatch) {
                          handleSelectMatch(matches[cellIdx]);
                        }
                      }}
                      disabled={!cell.hasMatch}
                    >
                      {cell.hasMatch && (
                        <div className="text-center">
                          <div className="text-xs font-bold">{cell.overlapScore}%</div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Match List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detailed Findings</CardTitle>
              <CardDescription>Click on any match to view detailed claim comparison</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterRisk === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRisk("all")}
              >
                All
              </Button>
              <Button
                variant={filterRisk === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRisk("high")}
              >
                High
              </Button>
              <Button
                variant={filterRisk === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRisk("medium")}
              >
                Medium
              </Button>
              <Button
                variant={filterRisk === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRisk("low")}
              >
                Low
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                selectedMatch === match.id ? "border-primary bg-primary/5" : "border-border"
              )}
              onClick={() => handleSelectMatch(match)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn("text-xs", getRiskColor(match.riskLevel))}>
                      {match.riskLevel.toUpperCase()}
                    </Badge>
                    <span className="font-mono text-sm text-muted-foreground">{match.patent}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{match.title}</h3>
                  <p className="text-sm text-muted-foreground">{match.company}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{match.overlapScore}%</div>
                    <div className="text-xs text-muted-foreground">Overlap</div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Matched Claims:</span>
                {match.matchedClaims.map((claim) => (
                  <Badge key={claim} variant="outline" className="text-xs">
                    {claim}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

