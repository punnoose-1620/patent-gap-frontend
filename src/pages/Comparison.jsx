import { useParams } from "react-router-dom";
import { ClaimComparison } from "@/components/ClaimComparison";

export default function Comparison() {
  const { resultId, comparisonId } = useParams();

  // Mock data - in real app, fetch based on resultId and comparisonId
  const yourPatent = "US-2024-0123456";
  const competitorPatent = "US-2023-8765432";

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <ClaimComparison
        yourPatent={yourPatent}
        competitorPatent={competitorPatent}
        resultId={resultId}
        comparisonId={comparisonId}
      />
    </div>
  );
}

