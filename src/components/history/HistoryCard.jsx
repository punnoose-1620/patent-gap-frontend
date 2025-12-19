import { AlertCircle, CheckCircle, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const getRiskColor = (level) => {
  switch (level) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getRiskIcon = (level) => {
  switch (level) {
    case 'high':
      return <AlertCircle className="w-4 h-4" />;
    case 'medium':
      return <TrendingUp className="w-4 h-4" />;
    case 'low':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

const HistoryCard = ({ history }) => (
  <Card className="hover:shadow-md transition-all cursor-pointer">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{history.title}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                history.riskLevel,
              )}`}
            >
              {getRiskIcon(history.riskLevel)}
              {history.riskLevel.charAt(0).toUpperCase() + history.riskLevel.slice(1)} Risk
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Patent ID: {history.patentId}</p>

          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Competitors:</p>
              <div className="flex items-center gap-2">
                {history.competitors.map((competitor) => (
                  <span
                    key={competitor}
                    className="inline-block px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                  >
                    {competitor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right ml-4">
          <p className="text-sm text-muted-foreground mb-3">{history.lastUpdated}</p>
          <div className="bg-primary/10 px-3 py-2 rounded-lg">
            <p className="text-sm font-semibold text-primary">
              {history.matchCount} potential matches
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HistoryCard;
