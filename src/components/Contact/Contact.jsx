import { useRef, useState } from "react";
import { FaEnvelope, FaWhatsapp, FaGithub, FaPaperPlane, FaArrowUp } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Contact.css";

import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const emailAddress = "hashir.muhmmad1427@gmail.com";
  const whatsappUrl = "https://wa.me/923080763337";
  const githubUrl = "https://github.com/AIworking860-art";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);

    formData.append(
      "access_key",
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    );

    formData.append("subject", "New Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you! Your message has been sent successfully.",
          confirmButtonColor: "#06b6d4",
          background: "#0a0f1d",
          color: "#ffffff",
        });

        form.current.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result.message || "Something went wrong.",
          confirmButtonColor: "#06b6d4",
          background: "#0a0f1d",
          color: "#ffffff",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Unable to send message. Please try again.",
        confirmButtonColor: "#06b6d4",
        background: "#0a0f1d",
        color: "#ffffff",
      });
    }

    setLoading(false);
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!form.current) return;

    const name = form.current.name.value.trim();
    const email = form.current.email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill in your Name, Email, and Message before sending via WhatsApp.",
        confirmButtonColor: "#25d366",
        background: "#0a0f1d",
        color: "#ffffff",
      });
      return;
    }

    const formattedText = `Hello Hashir! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Project Details / Message:*\n${message}`;
    const encodedText = encodeURIComponent(formattedText);
    const whatsappLink = `https://wa.me/923080763337?text=${encodedText}`;

    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    Swal.fire({
      icon: "success",
      title: "Opening WhatsApp!",
      text: "Your message was pre-filled and opened in WhatsApp.",
      confirmButtonColor: "#25d366",
      background: "#0a0f1d",
      color: "#ffffff",
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        {/* Section Header */}
        <div className="contact-header text-center">
          <div className="section-badge">GET IN TOUCH</div>
          <h2 className="contact-title">
            Let's Build Something <span className="text-gradient">Intelligent</span>
          </h2>
          <p className="contact-subtitle">
            Available for AI Development, Autonomous Agents, Generative AI models, and n8n Workflow Automations.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: ONLY GitHub, Email, WhatsApp Cards */}
          <div className="contact-methods">
            
            {/* Email Card (Click opens default email app) */}
            <a href={`mailto:${emailAddress}`} className="contact-card glass-panel email-card">
              <div className="contact-card-glow"></div>
              <div className="contact-icon-box cyan">
                <FaEnvelope />
              </div>
              <div className="contact-card-info">
                <span className="method-label">Official Email</span>
                <h3 className="method-value">{emailAddress}</h3>
                <span className="method-action">Click to send email &rarr;</span>
              </div>
            </a>

            {/* WhatsApp Card (Click opens chat directly) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass-panel whatsapp-card"
            >
              <div className="contact-card-glow"></div>
              <div className="contact-icon-box emerald">
                <FaWhatsapp />
              </div>
              <div className="contact-card-info">
                <span className="method-label">WhatsApp Direct</span>
                <h3 className="method-value">+92 308 0763337</h3>
                <span className="method-action">Start instant chat &rarr;</span>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass-panel github-card"
            >
              <div className="contact-card-glow"></div>
              <div className="contact-icon-box purple">
                <FaGithub />
              </div>
              <div className="contact-card-info">
                <span className="method-label">GitHub Repositories</span>
                <h3 className="method-value">AIworking860-art</h3>
                <span className="method-action">View open-source code &rarr;</span>
              </div>
            </a>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="contact-form-wrapper glass-panel">
            <h3 className="form-heading">Send a Direct Message</h3>
            <p className="form-subheading">Fill in your details and choose your preferred destination (Gmail or WhatsApp).</p>

            <form ref={form} onSubmit={handleFormSubmit} className="contact-form">
              <div className="input-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. alex@company.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="message">Project Description</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe your Python, Agentic AI, GenAI, or n8n automation project..."
                  required
                ></textarea>
              </div>

              <div className="form-action-buttons">
                <button type="submit" className="btn-send-email" disabled={loading}>
                  <FaEnvelope />
                  <span>{loading ? "Sending Email..." : "Send via Gmail"}</span>
                </button>

                <button type="button" onClick={handleWhatsAppSend} className="btn-send-whatsapp">
                  <FaWhatsapp />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;