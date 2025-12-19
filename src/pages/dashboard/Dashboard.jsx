import { FileText, Search, AlertTriangle, CheckCircle } from "lucide-react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NewAnalysisCard } from "@/components/dashboard/NewAnalysisCard";

const mockProjects = [
  {
    id: "1",
    title: "Smartphone Screen Folding Mechanism",
    patentId: "US-2024-0123456",
    status: "processing" ,
    progress: 67,
    lastUpdated: "2 hours ago",
    matchCount: 3,
  },
  {
    id: "2",
    title: "Electric Vehicle Battery Cooling System",
    patentId: "US-2024-0789012",
    status: "complete" ,
    lastUpdated: "1 day ago",
    matchCount: 7,
  },
  {
    id: "3",
    title: "Wireless Phone Charging Technology",
    patentId: "US-2023-0456789",
    status: "complete" ,
    lastUpdated: "3 days ago",
    matchCount: 2,
  },
  {
    id: "4",
    title: "Digital Camera Lens Design",
    patentId: "US-2024-0234567",
    status: "draft" ,
    lastUpdated: "1 week ago",
  },
];

export default function Dashboard() {
  return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your patent analysis projects and view recent activity
          </p>
        </div>

        {/* New Analysis Section */}
        <div className="mb-8">
          <NewAnalysisCard />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Active Scans"
            value={3}
            subtitle="This week"
            icon={<Search className="h-5 w-5 text-primary" />}
          />
          <StatsCard
            title="Patents Analyzed"
            value={48}
            subtitle="Total"
            icon={<FileText className="h-5 w-5 text-primary" />}
          />
          <StatsCard
            title="High Risk Matches"
            value={12}
            subtitle="Requires attention"
            icon={<AlertTriangle className="h-5 w-5 text-warning" />}
          />
          <StatsCard
            title="Cleared Patents"
            value={31}
            subtitle="No infringement"
            icon={<CheckCircle className="h-5 w-5 text-success" />}
          />
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              patentId={project.patentId}
              status={project.status}
              progress={project.progress}
              lastUpdated={project.lastUpdated}
              matchCount={project.matchCount}
            />
          ))}
        </div>

        {/* Weekly Results */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Weekly Search Results</h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Automated VGR Monitoring</p>
                <p className="text-sm text-muted-foreground">
                  Last scan: December 18, 2025
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
                2 new results
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Weekly automated scans monitor competitor filings and industry changes relevant to your portfolio.
            </p>
          </div>
        </div>
      </div>
  );
}
