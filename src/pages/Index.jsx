import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const toolDetails = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/generate_tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setGeneratedCode(result.code);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedCode('Error generating code. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tool Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="tool-name">Tool Name:</Label>
          <Input type="text" id="tool-name" name="tool_name" required />
        </div>
        <div>
          <Label htmlFor="description">Description:</Label>
          <Textarea id="description" name="description" required />
        </div>
        <div>
          <Label htmlFor="language">Primary Programming Language:</Label>
          <Select name="language" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="frameworks">Frameworks (comma-separated):</Label>
          <Input type="text" id="frameworks" name="frameworks" />
        </div>
        <div>
          <Label htmlFor="input-type">Input Type:</Label>
          <Input type="text" id="input-type" name="input_type" required />
        </div>
        <div>
          <Label htmlFor="output-type">Output Type:</Label>
          <Input type="text" id="output-type" name="output_type" required />
        </div>
        <div>
          <Label htmlFor="additional-features">Additional Features:</Label>
          <Textarea id="additional-features" name="additional_features" />
        </div>
        <Button type="submit">Generate Tool</Button>
      </form>
      {generatedCode && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Code:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Index;