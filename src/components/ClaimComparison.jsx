import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle2, ArrowLeft, Scale, Lightbulb, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClaimComparison({ yourPatent, competitorPatent, resultId, comparisonId }) {
  const navigate = useNavigate();
  const [selectedClaim, setSelectedClaim] = useState(1);

  const claimElements = [
    {
      id: "preamble",
      label: "Preamble",
      text: "A foldable display device comprising:",
      matched: true,
      matchStrength: "exact",
    },
    {
      id: "element-a",
      label: "Element A",
      text: "a flexible display panel having a first region, a second region, and a flex region between the first region and the second region",
      matched: true,
      matchStrength: "substantial",
    },
    {
      id: "element-b",
      label: "Element B",
      text: "a hinge mechanism configured to fold the flexible display panel along the flex region, wherein the hinge mechanism includes a first housing and a second housing rotatably coupled to each other",
      matched: true,
      matchStrength: "substantial",
    },
    {
      id: "element-c",
      label: "Element C",
      text: "a dual pivot structure disposed within the hinge mechanism and configured to support the flexible display panel during folding and unfolding operations",
      matched: true,
      matchStrength: "partial",
    },
  ];

  const competitorText = {
    preamble: "A foldable electronic device comprising:",
    "element-a": "a flexible screen having a foldable portion positioned between a left section and a right section",
    "element-b":
      "a hinge assembly including two housing parts connected via a rotating joint, the hinge assembly enabling the flexible screen to fold",
    "element-c": "a support mechanism within the hinge assembly providing structural support during device operation",
  };

  const aiInsights = [
    {
      element: "Element A",
      insight:
        "Strong match detected. Both patents describe a flexible display with three distinct regions. Terminology differs slightly ('panel' vs 'screen', 'region' vs 'section') but functional equivalence is clear.",
      risk: "high",
    },
    {
      element: "Element B",
      insight:
        "Substantial overlap in hinge mechanism design. The 'rotating joint' in competitor patent appears to serve the same function as 'rotatably coupled' housings in your patent.",
      risk: "high",
    },
    {
      element: "Element C",
      insight:
        "Partial match. Competitor patent describes a 'support mechanism' but lacks specific detail about the 'dual pivot structure'. This distinction may be significant for infringement analysis.",
      risk: "medium",
    },
  ];

  const getMatchColor = (strength) => {
    switch (strength) {
      case "exact":
        return "bg-destructive/10 border-destructive/30";
      case "substantial":
        return "bg-warning/10 border-warning/30";
      case "partial":
        return "bg-success/10 border-success/30";
      default:
        return "bg-muted border-border";
    }
  };

  const getTextColor = (strength) => {
    switch (strength) {
      case "exact":
        return "text-muted-foreground";
      case "substantial":
        return "text-muted-foreground";
      case "partial":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  const getTitleColor = (strength) => {
    switch (strength) {
      case "exact":
        return "text-destructive dark:text-destructive";
      case "substantial":
        return "text-warning dark:text-warning";
      case "partial":
        return "text-success dark:text-success";
      default:
        return "text-foreground";
    }
  };

  const getMatchBadge = (strength) => {
    switch (strength) {
      case "exact":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Exact Match
          </Badge>
        );
      case "substantial":
        return (
          <Badge className="bg-warning text-warning-foreground">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Substantial
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Partial
          </Badge>
        );
      default:
        return <Badge variant="secondary">No Match</Badge>;
    }
  };

  const handleBack = () => {
    navigate(`/results/${resultId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" className="gap-2 mb-2 -ml-3" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </Button>
        <h2 className="text-2xl font-bold mb-2">Claim Chart Comparison</h2>
        <p className="text-muted-foreground">Side-by-side analysis with AI-powered insights</p>
      </div>

      {/* Patent Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Your Patent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono font-bold text-lg mb-1">{yourPatent}</p>
            <p className="text-sm text-muted-foreground">Foldable Display Hinge Mechanism</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Competitor Patent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono font-bold text-lg mb-1">{competitorPatent}</p>
            <p className="text-sm text-muted-foreground">Samsung • Foldable Electronic Device</p>
            <Badge className="bg-destructive text-destructive-foreground mt-2">87% Overlap</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList>
          <TabsTrigger value="comparison" className="gap-2">
            <Scale className="w-4 h-4" />
            Element Comparison
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2">
            <Lightbulb className="w-4 h-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="citations" className="gap-2">
            <Quote className="w-4 h-4" />
            Citations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4 mt-6">
          {/* Claim Selector */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Claim to Analyze</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {[1, 2, 3].map((claim) => (
                  <Button
                    key={claim}
                    variant={selectedClaim === claim ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    Claim {claim}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Element-by-Element Comparison */}
          <div className="space-y-6">
            {claimElements.map((element) => (
              <div key={element.id} className="space-y-3">
                {/* Element Header */}
                <div className="flex items-center justify-between">
                  <h3 className={cn("text-lg font-bold", getTitleColor(element.matchStrength))}>
                    {element.label}
                  </h3>
                  {getMatchBadge(element.matchStrength)}
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Your Patent */}
                  <Card className={cn("border-2", getMatchColor(element.matchStrength))}>
                    <CardContent className="pt-6">
                      <div className="text-xs font-bold tracking-wide text-foreground mb-3">
                        YOUR PATENT
                      </div>
                      <p className={cn("text-base leading-relaxed font-medium", getTextColor(element.matchStrength))}>
                        {element.text}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Competitor Patent */}
                  <Card className={cn("border-2", getMatchColor(element.matchStrength))}>
                    <CardContent className="pt-6">
                      <div className="text-xs font-bold tracking-wide text-foreground mb-3">
                        COMPETITOR PATENT
                      </div>
                      <p className={cn("text-base leading-relaxed font-medium", getTextColor(element.matchStrength))}>
                        {competitorText[element.id]}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Analysis Section */}
                <Card className="bg-muted/30 border-muted">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1">AI Analysis</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {element.matchStrength === "exact" &&
                            "Identical claim language with exact functional equivalence. High infringement risk."}
                          {element.matchStrength === "substantial" &&
                            "Nearly identical functionality with minor terminology differences. Likely infringement."}
                          {element.matchStrength === "partial" &&
                            "Some overlap but significant functional differences. Further analysis needed."}
                          {!element.matchStrength && "No meaningful overlap detected in this element."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>System reasoning and overlap calculations for Claim {selectedClaim}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{insight.element}</h4>
                    <Badge className={cn(insight.risk === "high" ? "bg-destructive" : "bg-warning")}>
                      {insight.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.insight}</p>
                </div>
              ))}

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Overall Assessment</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based on claim-by-claim analysis, there is substantial overlap between your patent and the
                      competitor's patent. The core inventive concepts (flexible display structure, hinge mechanism with
                      dual housings) are present in both. Recommend detailed legal review for potential infringement
                      proceedings.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Citations</CardTitle>
              <CardDescription>Exact locations and references for all compared text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">Your Patent - Claim 1</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      {yourPatent}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Column 12, Lines 45-68 | Page 8, Paragraph [0034]
                  </p>
                  <div className="text-xs bg-muted/50 p-3 rounded font-mono leading-relaxed">
                    "A foldable display device comprising: a flexible display panel having a first region, a second
                    region, and a flex region..."
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">Competitor Patent - Claim 1</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      {competitorPatent}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Column 8, Lines 12-35 | Page 5, Paragraph [0018]</p>
                  <div className="text-xs bg-muted/50 p-3 rounded font-mono leading-relaxed">
                    "A foldable electronic device comprising: a flexible screen having a foldable portion positioned
                    between a left section..."
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                <Quote className="w-4 h-4" />
                <span>
                  All citations verified against official patent office records. Last updated: December 19, 2024
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

