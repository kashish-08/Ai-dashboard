
import { useState } from "react";
import { Incident } from "../types/incident";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface IncidentCardProps {
  incident: Incident;
}

const getSeverityColor = (severity: Incident["severity"]) => {
  switch (severity) {
    case "High":
      return "bg-red-500 hover:bg-red-600";
    case "Medium":
      return "bg-orange-500 hover:bg-orange-600";
    case "Low":
      return "bg-blue-500 hover:bg-blue-600";
  }
};

export const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = new Date(incident.reported_at).toLocaleDateString();

  return (
    <Card className="w-full mb-4">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{incident.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getSeverityColor(incident.severity)}>
                {incident.severity}
              </Badge>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="px-4 pb-4">
          <p className="text-gray-600">{incident.description}</p>
        </CardContent>
      )}
    </Card>
  );
};
