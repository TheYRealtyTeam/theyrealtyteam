import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { makeCorsHeaders } from '../_shared/cors.ts';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = makeCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentDetails: AppointmentDetails = await req.json();
    
    // Generate iCal content
    const icalContent = generateICalContent(appointmentDetails);
    const icalBase64 = btoa(icalContent);

    // Send confirmation email to client
    await resend.emails.send({
      from: "Y Realty Team <no-reply@theYteam.co>",
      to: [appointmentDetails.email],
      subject: "Property Viewing Appointment Confirmation",
      html: `
        <h2>Appointment Confirmed!</h2>
        <p>Hi ${appointmentDetails.name},</p>
        <p>Your property viewing appointment has been confirmed for:</p>
        <ul>
          <li><strong>Date:</strong> ${appointmentDetails.date}</li>
          <li><strong>Time:</strong> ${appointmentDetails.time}</li>
          <li><strong>Property:</strong> ${appointmentDetails.property_address}</li>
          <li><strong>Type:</strong> ${appointmentDetails.property_type}</li>
        </ul>
        ${appointmentDetails.notes ? `<p><strong>Notes:</strong> ${appointmentDetails.notes}</p>` : ''}
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
      from: "Y Realty Team <no-reply@theYteam.co>",
      to: ["info@theYteam.co"],
      subject: "New Appointment Scheduled",
      html: `
        <h2>New Appointment</h2>
        <ul>
          <li><strong>Client:</strong> ${appointmentDetails.name}</li>
          <li><strong>Email:</strong> ${appointmentDetails.email}</li>
          <li><strong>Phone:</strong> ${appointmentDetails.phone}</li>
          <li><strong>Date:</strong> ${appointmentDetails.date}</li>
          <li><strong>Time:</strong> ${appointmentDetails.time}</li>
          <li><strong>Property:</strong> ${appointmentDetails.property_address}</li>
          <li><strong>Type:</strong> ${appointmentDetails.property_type}</li>
          ${appointmentDetails.notes ? `<li><strong>Notes:</strong> ${appointmentDetails.notes}</li>` : ''}
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
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), 
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
    `SUMMARY:Property Viewing - ${details.property_type}`,
    `DESCRIPTION:Property viewing appointment at ${details.property_address}${details.notes ? `\\n\\nNotes: ${details.notes}` : ''}`,
    `LOCATION:${details.property_address}`,
    'ORGANIZER;CN=Y Realty Team:mailto:info@theYteam.co',
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
