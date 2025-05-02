import { useState } from "react";
import { Incident, Severity } from "../types/incident";
import { mockIncidents } from "../data/mockIncidents";
import { IncidentCard } from "../components/IncidentCard";
import { NewIncidentForm } from "../components/NewIncidentForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<"All" | Severity>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleNewIncident = (newIncident: Omit<Incident, "id" | "reported_at">) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map((i) => i.id)) + 1,
      reported_at: new Date().toISOString(),
    };
    setIncidents([incident, ...incidents]);
  };

  const filteredIncidents = incidents
    .filter((incident) => severityFilter === "All" || incident.severity === severityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-purple-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">AI Safety Incident Dashboard</h1>

        <NewIncidentForm onSubmit={handleNewIncident} />

        {/* Added mt-8 to add space between the sections */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-8">
          <div className="flex-1">
            <Select value={severityFilter} onValueChange={(value: typeof severityFilter) => setSeverityFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Severity" />
              </SelectTrigger>
              <SelectContent className="flex-1">
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={sortOrder} onValueChange={(value: typeof sortOrder) => setSortOrder(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
