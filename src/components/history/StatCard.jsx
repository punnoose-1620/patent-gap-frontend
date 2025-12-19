import { Card, CardContent } from '../ui/card';

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {number} props.value
 * @param {React.ComponentType} props.icon
 */
const StatCard = ({ label, value, icon: Icon }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
