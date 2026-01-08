import { useParams } from "react-router-dom";
import { ResultsHeatmap } from "@/components/ResultsHeatmap";

export default function Results() {
  const { resultId } = useParams();

  // Mock data - in real app, fetch based on resultId
  const mockMatches = [
    {
      id: "1",
      patent: "US-2023-8765432",
      company: "Samsung",
      title: "Foldable Electronic Device",
      riskLevel: "high",
      overlapScore: 87,
      matchedClaims: [1, 2],
    },
    {
      id: "2",
      patent: "US-2023-7654321",
      company: "Samsung",
      title: "Display Device Hinge Structure",
      riskLevel: "high",
      overlapScore: 82,
      matchedClaims: [1, 3],
    },
    {
      id: "3",
      patent: "EP-3456789",
      company: "LG Electronics",
      title: "Flexible Display Apparatus",
      riskLevel: "medium",
      overlapScore: 64,
      matchedClaims: [3],
    },
    {
      id: "4",
      patent: "CN-234567890",
      company: "Huawei",
      title: "Foldable Terminal Device",
      riskLevel: "medium",
      overlapScore: 58,
      matchedClaims: [2, 4],
    },
    {
      id: "5",
      patent: "WO-2023-123456",
      company: "Apple",
      title: "Portable Electronic Device",
      riskLevel: "low",
      overlapScore: 34,
      matchedClaims: [4],
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <ResultsHeatmap
        patentName="US-2024-0123456"
        resultId={resultId}
        matches={mockMatches}
      />
    </div>
  );
}

