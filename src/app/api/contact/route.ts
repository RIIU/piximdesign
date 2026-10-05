import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, services, budget, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required." },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "";

    const formattedServices = Array.isArray(services) && services.length > 0
      ? services.join(", ")
      : (typeof services === "string" && services) || "None specified";

    const emailContent = `
New Project Brief from Pixim Design Contact Form:
--------------------------------------------------
Client Name:    ${name}
Client Email:   ${email}
Phone/WhatsApp: ${phone || "Not provided"}
Services:       ${formattedServices}
Budget:         ${budget || "Not specified"}
Message/Goals:  ${message || "No message provided"}
--------------------------------------------------
Sent to: contact@piximdesign.com
    `.trim();

    // If Web3Forms access key is configured, send through Web3Forms API
    if (accessKey) {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Project Inquiry from ${name} - Pixim Design`,
          from_name: "Pixim Design Inquiry",
          to_email: "contact@piximdesign.com",
          name,
          email,
          phone: phone || "Not provided",
          services: formattedServices,
          budget: budget || "Not specified",
          message: message || "No message provided",
        }),
      });

      const web3Data = await web3Response.json();

      if (!web3Response.ok || !web3Data.success) {
        console.error("Web3Forms error:", web3Data);
        return NextResponse.json(
          {
            success: false,
            message: web3Data.message || "Failed to send email via Web3Forms.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Message sent successfully to contact@piximdesign.com!",
      });
    }

    // If Formspree ID is configured as alternative
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    if (formspreeId) {
      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          services: formattedServices,
          budget,
          message,
          _replyto: email,
        }),
      });

      if (!formspreeResponse.ok) {
        return NextResponse.json(
          { success: false, message: "Failed to send email via Formspree." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    // Development/Fallback mode: logs to server console
    console.log("========================================");
    console.log("NEW PROJECT INQUIRY RECEIVED FOR contact@piximdesign.com");
    console.log(emailContent);
    console.log("========================================");
    console.log("NOTE: Add WEB3FORMS_ACCESS_KEY in .env.local to receive live emails in your inbox.");

    return NextResponse.json({
      success: true,
      message: "Message received successfully! (Add WEB3FORMS_ACCESS_KEY to receive directly in inbox)",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
