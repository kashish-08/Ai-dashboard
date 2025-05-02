
import { useState } from "react";
import { Incident, Severity } from "../types/incident";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NewIncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void;
}

export const NewIncidentForm = ({ onSubmit }: NewIncidentFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      title,
      description,
      severity,
    });

    setTitle("");
    setDescription("");
    setSeverity("Medium");
  };

  return (
    <Card className="w-full mb-8" className="bg-purple-300 text-gray-800">
      <CardHeader>
        <CardTitle>Report New Incident</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Incident Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Incident Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/*  */}
          <div className="mt-6">
  <button
    onClick={() => setSeverity("Low")}
    className={`btn ${severity === "Low" ? "btn-active" : ""}`}
    style={{
      padding: '10px 20px',
      backgroundColor: severity === "Low" ? 'blue' : '#f0f0f0',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '5px',
      borderRadius: '20px',
      fontSize: '14px',
    }}>
    Low
  </button>
  <button 
    onClick={() => setSeverity("Medium")}
    className={`btn ${severity === "Medium" ? "btn-active" : ""}`}
    style={{
      padding: '10px 20px',
      backgroundColor: severity === "Medium" ? 'orange' : '#f0f0f0',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '5px',
      borderRadius: '20px', 
      fontSize: '14px', 
    }}>
    Medium
  </button>
  <button 
    onClick={() => setSeverity("High")}
    className={`btn ${severity === "High" ? "btn-active" : ""}`}
    style={{
      padding: '10px 20px',
      backgroundColor: severity === "High" ? 'red' : '#f0f0f0',
      border: '1px solid #ccc',
      cursor: 'pointer',
      margin: '5px',
      borderRadius: '20px',
      fontSize: '14px',
    }}>
    High
  </button>

  <style jsx>{`
    .btn-active {
      color: white;
    }
  `}</style>
</div>



          <Button type="submit" className="w-full">
            Submit Incident
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
