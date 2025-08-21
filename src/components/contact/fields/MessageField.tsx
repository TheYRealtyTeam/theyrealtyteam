
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface MessageFieldProps {
  value: string;
  onChange: (field: string, value: string) => void;
}

const MessageField = ({ value, onChange }: MessageFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium text-gray-700">
        Message *
      </label>
      <Textarea
        id="message"
        value={value}
        onChange={(e) => onChange('message', e.target.value)}
        placeholder="Tell us about your property management needs..."
        required
        maxLength={2000}
        minLength={10}
        rows={5}
        className="w-full resize-none"
      />
      <p className="text-xs text-gray-500">
        {value.length}/2000 characters (minimum 10)
      </p>
    </div>
  );
};

export default MessageField;
