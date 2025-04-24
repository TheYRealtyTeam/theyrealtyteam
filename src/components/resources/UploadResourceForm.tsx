
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file: z.instanceof(File, { message: "File is required" })
});

type FormValues = z.infer<typeof formSchema>;

const UploadResourceForm = () => {
  const [uploading, setUploading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        onChange(selectedFile);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select a PDF file"
        });
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    setUploading(true);
    try {
      const fileExt = values.file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = fileName;

      // 1. First upload the file to storage
      const { error: uploadError, data: fileData } = await supabase.storage
        .from('resources')
        .upload(filePath, values.file);

      if (uploadError) throw uploadError;

      // 2. Get the public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);
      
      const fileUrl = publicUrlData.publicUrl;
      
      // 3. Store the resource metadata in the database
      const { error: dbError } = await supabase
        .from('resources')
        .insert([
          { 
            title: values.title, 
            description: values.description, 
            file_path: filePath,
            file_url: fileUrl,
            file_type: 'pdf',
            file_name: values.file.name,
            file_size: values.file.size
          }
        ]);
        
      if (dbError) throw dbError;

      toast({
        title: "Upload successful",
        description: "Your resource has been uploaded"
      });

      form.reset();
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "There was an error uploading your file"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-white">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Resource Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter resource title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter resource description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem className="space-y-2">
              <FormLabel>PDF File</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={uploading} 
          className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Resource'}
        </Button>
      </form>
    </Form>
  );
};

export default UploadResourceForm;
