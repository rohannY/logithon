import "./App.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("csv_file", file);

      await axios.post("http://localhost:5000/logithon", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("CSV file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      alert("Failed to upload CSV file");
    }
  };

  return (
    <>
      <div className="font-Geist space-y-1 p-10">
        <p className="font-Aeonik">Upload the CSV file</p>
        <p className="text-sm">
          for the generating the optimized Load Configuration
        </p>
      </div>
      <Separator />
      <div className="font-Geist flex justify-center p-10">
        <div className="grid w-full max-w-sm items-center gap-1.5 space-y-4">
          <Label htmlFor="picture">CSV File</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          <div className="flex justify-center gap-4">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
