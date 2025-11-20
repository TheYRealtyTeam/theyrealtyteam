import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { makeCorsHeaders } from '../_shared/cors.ts';
import { verifyRecaptcha } from '../_shared/recaptcha.ts';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Validation schema
const AppointmentSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s\-\.\']+$/),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20).regex(/^[\d\s\-\+\(\)\.]+$/),
  property_address: z.string().min(5).max(200),
  property_type: z.string().min(2).max(50),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{1,2}:\d{2}$/),
  notes: z.string().max(500).optional(),
});

interface AppointmentDetails {
  name: string;
  email: string;
  phone: string;
  property_address: string;
  property_type: string;
  date: string;
  time: string;
  notes?: string;
}

// HTML sanitization function
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// iCal escape function
function escapeIcal(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = makeCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request
    const rawData = await req.json();
    
    // Verify reCAPTCHA token - REQUIRED
    const isValidRecaptcha = await verifyRecaptcha(rawData.recaptchaToken);
    if (!isValidRecaptcha) {
      console.log("Invalid reCAPTCHA token");
      return new Response(
        JSON.stringify({ 
          error: "Invalid reCAPTCHA verification. Please refresh the page and try again."
        }),
        { 
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
          status: 403,
        }
      );
    }
    
    const validationResult = AppointmentSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error);
      return new Response(
        JSON.stringify({ error: "Invalid appointment data" }), 
        {
          headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    const appointmentDetails: AppointmentDetails = validationResult.data;
    
    // Generate iCal content
    const icalContent = generateICalContent(appointmentDetails);
    const icalBase64 = btoa(icalContent);

    // Send confirmation email to client
    await resend.emails.send({
      from: "Y Realty Team <no-reply@theyteam.co>",
      to: [appointmentDetails.email],
      subject: "Property Viewing Appointment Confirmation",
      html: `
        <h2>Appointment Confirmed!</h2>
        <p>Hi ${sanitizeHtml(appointmentDetails.name)},</p>
        <p>Your property viewing appointment has been confirmed for:</p>
        <ul>
          <li><strong>Date:</strong> ${sanitizeHtml(appointmentDetails.date)}</li>
          <li><strong>Time:</strong> ${sanitizeHtml(appointmentDetails.time)}</li>
          <li><strong>Property:</strong> ${sanitizeHtml(appointmentDetails.property_address)}</li>
          <li><strong>Type:</strong> ${sanitizeHtml(appointmentDetails.property_type)}</li>
        </ul>
        ${appointmentDetails.notes ? `<p><strong>Notes:</strong> ${sanitizeHtml(appointmentDetails.notes)}</p>` : ''}
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>Y Realty Team</p>
      `,
      attachments: [
        {
          filename: 'appointment.ics',
          content: icalBase64,
        },
      ],
    });

    // Send notification email to business
    await resend.emails.send({
      from: "Y Realty Team <no-reply@theyteam.co>",
      to: ["info@theyteam.co"],
      subject: "New Appointment Scheduled",
      html: `
        <h2>New Appointment</h2>
        <ul>
          <li><strong>Client:</strong> ${sanitizeHtml(appointmentDetails.name)}</li>
          <li><strong>Email:</strong> ${sanitizeHtml(appointmentDetails.email)}</li>
          <li><strong>Phone:</strong> ${sanitizeHtml(appointmentDetails.phone)}</li>
          <li><strong>Date:</strong> ${sanitizeHtml(appointmentDetails.date)}</li>
          <li><strong>Time:</strong> ${sanitizeHtml(appointmentDetails.time)}</li>
          <li><strong>Property:</strong> ${sanitizeHtml(appointmentDetails.property_address)}</li>
          <li><strong>Type:</strong> ${sanitizeHtml(appointmentDetails.property_type)}</li>
          ${appointmentDetails.notes ? `<li><strong>Notes:</strong> ${sanitizeHtml(appointmentDetails.notes)}</li>` : ''}
        </ul>
      `,
      attachments: [
        {
          filename: 'appointment.ics',
          content: icalBase64,
        },
      ],
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in appointment notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process appointment request" }), 
      {
        headers: { ...Object.fromEntries(corsHeaders), "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

// Generate iCalendar content for calendar integration
function generateICalContent(details: AppointmentDetails): string {
  const dateStr = details.date;
  const timeStr = details.time;
  
  let appointmentDate: Date;
  
  // Try parsing ISO format first (YYYY-MM-DD)
  if (dateStr.includes('-')) {
    const [year, month, day] = dateStr.split('-').map(Number);
    appointmentDate = new Date(year, month - 1, day);
  } else if (dateStr.includes('/')) {
    // Try parsing MM/DD/YYYY format
    const [month, day, year] = dateStr.split('/').map(Number);
    appointmentDate = new Date(year, month - 1, day);
  } else {
    // Fallback to default date parsing
    appointmentDate = new Date(dateStr);
  }
  
  // Parse time (assuming HH:MM format)
  const [hours, minutes] = timeStr.split(':').map(Number);
  appointmentDate.setHours(hours, minutes, 0, 0);
  
  // Calculate end time (1 hour after start)
  const endDate = new Date(appointmentDate);
  endDate.setHours(endDate.getHours() + 1);
  
  // Format dates for iCal (YYYYMMDDTHHMMSS)
  const formatICalDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  };
  
  const dtStart = formatICalDate(appointmentDate);
  const dtEnd = formatICalDate(endDate);
  const dtStamp = formatICalDate(new Date());
  
  const icalContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Y Realty Team//Appointment//EN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@theYteam.co`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Property Viewing - ${escapeIcal(details.property_type)}`,
    `DESCRIPTION:Property viewing appointment at ${escapeIcal(details.property_address)}${details.notes ? `\\n\\nNotes: ${escapeIcal(details.notes)}` : ''}`,
    `LOCATION:${escapeIcal(details.property_address)}`,
    'ORGANIZER;CN=Y Realty Team:mailto:info@theyteam.co',
    `ATTENDEE;CN=${details.name}:mailto:${details.email}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'DESCRIPTION:Reminder',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  return icalContent;
}

serve(handler);
