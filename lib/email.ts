// Brevo (formerly Sendinblue) email service
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_SENDER_EMAIL =
    process.env.BREVO_SENDER_EMAIL || "info@landlordmaster.com";
  const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Landlord Master";

  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not defined in environment variables");
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: options.from || BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: options.to,
          },
        ],
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      throw new Error(
        `Brevo API Error: ${response.status} - ${errorData.message || "Unknown error"}`,
      );
    }

    const result = await response.json();
    console.log("Email sent successfully via Brevo:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    throw error;
  }
};

// Alternative function for sending emails with more options
export const sendAdvancedEmail = async (options: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  templateId?: number;
  params?: Record<string, any>;
}) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_SENDER_EMAIL =
    process.env.BREVO_SENDER_EMAIL || "info@landlordmaster.com";
  const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Landlord Master";

  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not defined in environment variables");
  }

  // Convert single email to array format
  const toEmails = Array.isArray(options.to)
    ? options.to.map((email) => ({ email }))
    : [{ email: options.to }];

  const ccEmails = options.cc?.map((email) => ({ email })) || [];
  const bccEmails = options.bcc?.map((email) => ({ email })) || [];

  const emailData: any = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: options.from || BREVO_SENDER_EMAIL,
    },
    to: toEmails,
    subject: options.subject,
  };

  // Add CC and BCC if provided
  if (ccEmails.length > 0) emailData.cc = ccEmails;
  if (bccEmails.length > 0) emailData.bcc = bccEmails;

  // Add reply-to if provided
  if (options.replyTo) {
    emailData.replyTo = { email: options.replyTo };
  }

  // Use template if templateId is provided, otherwise use content
  if (options.templateId) {
    emailData.templateId = options.templateId;
    if (options.params) {
      emailData.params = options.params;
    }
  } else {
    if (options.html) emailData.htmlContent = options.html;
    if (options.text) emailData.textContent = options.text;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      throw new Error(
        `Brevo API Error: ${response.status} - ${errorData.message || "Unknown error"}`,
      );
    }

    const result = await response.json();
    console.log(
      "Advanced email sent successfully via Brevo:",
      result.messageId,
    );
    return result;
  } catch (error) {
    console.error("Error sending advanced email via Brevo:", error);
    throw error;
  }
};

// Function to send transactional email using Brevo templates
export const sendTemplateEmail = async (options: {
  to: string;
  templateId: number;
  params?: Record<string, any>;
  from?: string;
}) => {
  return sendAdvancedEmail({
    to: options.to,
    subject: "", // Subject will come from template
    templateId: options.templateId,
    params: options.params,
    from: options.from,
  });
};
