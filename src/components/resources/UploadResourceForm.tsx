
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const UploadResourceForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select a PDF file"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a PDF file to upload"
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      toast({
        title: "Upload successful",
        description: "Your resource has been uploaded"
      });

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="space-y-2">
        <Label htmlFor="title">Resource Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter resource title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter resource description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">PDF File</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={uploading} 
        className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
      >
        <Upload className="mr-2 h-4 w-4" />
        {uploading ? 'Uploading...' : 'Upload Resource'}
      </Button>
    </form>
  );
};

export default UploadResourceForm;
