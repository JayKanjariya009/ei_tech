import {
  saveContactMessage,
  getAllContactMessages,
  getContactById,
  deleteContactMessage,
} from "../models/contactModel.js";
import transporter from "../config/mail.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, serviceType, message } =
      req.body;

    if (!firstName || !email || !message) {
      return res
        .status(400)
        .json({ message: "First name, email, and message are required" });
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();
    const subject = serviceType || "General Inquiry";

    const id = await saveContactMessage({
      name: fullName,
      email,
      subject,
      message: `Phone: ${phone || "Not provided"}\n\nMessage: ${message}`,
    });

    // Send email notification
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `<h3>New Contact Message</h3>
             <p><strong>Name:</strong> ${fullName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
             <p><strong>Service Type:</strong> ${
               serviceType || "General Inquiry"
             }</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.log("Email sending failed:", emailError);
    }

    res.status(201).json({ message: "Message sent successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await getAllContactMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleContactMessage = async (req, res) => {
  try {
    const message = await getContactById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeContactMessage = async (req, res) => {
  try {
    await deleteContactMessage(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Newsletter subscription
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Newsletter Subscription Confirmed",
      html: `<h3>Thank you for subscribing!</h3>
             <p>You have successfully subscribed to our newsletter.</p>
             <p>You'll receive updates about our latest IT solutions and services.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.log("Newsletter email sending failed:", emailError);
    }

    res.status(200).json({ message: "Successfully subscribed to newsletter" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
