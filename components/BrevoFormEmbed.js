import React, { useEffect, useState } from "react";
import Toast from './Toast';

// Brevo form embed without iframe, fully responsive,
// intercepts submission to prevent navigation and show a toast notification
export default function BrevoFormEmbed() {
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
    };

    const hideToast = () => {
        setToast({ ...toast, isVisible: false });
    };
    // 1) Inject Brevo CSS & reCAPTCHA once on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!document.querySelector('link[href*="sib-styles.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://sibforms.com/forms/end-form/build/sib-styles.css";
                document.head.appendChild(link);
            }
            // Temporarily disabled for testing
            // if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
            //     const rec = document.createElement("script");
            //     rec.src = "https://www.google.com/recaptcha/api.js?hl=en";
            //     document.head.appendChild(rec);
            // }
        }
    }, []);

    // 2) Inject Brevo's main.js after the form HTML is in the DOM
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const script = document.createElement("script");
            script.src = "https://sibforms.com/forms/end-form/build/main.js";
            script.async = false;
            setTimeout(() => document.body.appendChild(script), 0);
            return () => {
                if (script.parentNode) script.parentNode.removeChild(script);
            };
        }
    }, []);

    // 3) Intercept the form submit so it never redirects away
    useEffect(() => {
        const form = document.getElementById("sib-form");
        if (!form) return;

        const handleSubmit = async (e) => {
            e.preventDefault();
            // Hide any existing messages
            const success = document.getElementById("success-message");
            const error = document.getElementById("error-message");
            if (success) success.style.display = "none";
            if (error) error.style.display = "none";

            // Fire-and-forget POST (no-cors) to prevent CORS errors
            try {
                await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    mode: "no-cors", // <- here's the magic
                });
                showToast("Thanks for signing up! Check your inbox for confirmation.", "success");
                // Reset form
                form.reset();
            } catch {
                showToast("Signup failed. Please try again.", "error");
            }
        };

        form.addEventListener("submit", handleSubmit);
        return () => {
            form.removeEventListener("submit", handleSubmit);
        };
    }, [showToast]);

    // 4) Inline Brevo form HTML with fluid width and transparent background
    const formHtml = `
    <div class="sib-form" style="text-align:center; background-color:transparent;">
      <div id="error-message" class="sib-form-message-panel" style="display:none; max-width:100%;"></div>
      <div id="success-message" class="sib-form-message-panel" style="display:none; max-width:100%;"></div>
      <div id="sib-container" class="sib-container--large sib-container--vertical"
           style="background-color:transparent; max-width:100%; margin:0 auto; padding:0; box-sizing:border-box;">
        <form id="sib-form"
              method="POST"
              action="https://04270869.sibforms.com/serve/MUIFAOGB1jSOWFoF-g8L6RNhGS3rJxWPhIIs01Ex7oCXFXyNk6nzDChdy4YhypyQkxcxDTsXG8SEumpbLV8MJ91duGZkyuGkpx4JIZc06xPJSgGPb1Shjlrgc_BG8H2W9iisnXdqfRi5HimY8t2KVdXZ8lc5PjqNGTDJNbZgssqC76rp6BrlgA4TYL0OowNE6dbYfas4hIZNL2TE"
              data-type="subscription">
          <div style="margin-bottom:24px;">
            <div class="sib-form-block"
                 style="font-size:32px; text-align:center; font-weight:700; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#fff; margin-bottom:16px;">
              <h3 style="margin:0;">Stay Updated</h3>
            </div>
            <div class="sib-form-block"
                 style="font-size:16px; text-align:center; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#9CA3AF; max-width:512px; margin:0 auto;">
              <p style="margin:0;">Subscribe to get the latest updates on capturGO features, launches, and community news.</p>
            </div>
          </div>
          <div style="max-width:448px; margin:0 auto; padding:0 16px;">
            <div style="display:flex; gap:8px; align-items:center;">
              <div class="sib-input sib-form-block" style="flex:1; min-width:0;">
                <input
                  type="email"
                  id="EMAIL"
                  name="EMAIL"
                  placeholder="Enter your email"
                  required
                  style="width:100%; padding:12px 16px; background:#1F2937; color:#fff; border-radius:8px; border:1px solid #374151; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px; outline:none; transition:all 0.2s; box-sizing:border-box;"
                  onfocus="this.style.borderColor='#935EFF'; this.style.boxShadow='0 0 0 2px rgba(147, 94, 255, 0.2)';"
                  onblur="this.style.borderColor='#374151'; this.style.boxShadow='none';"
                />
              </div>
              <div class="sib-form-block" style="flex-shrink:0;">
                <button
                  type="submit"
                  class="sib-form-block__button"
                  style="padding:12px 16px; border:none; border-radius:8px; background-color:#935EFF; color:#fff; font-weight:600; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; cursor:pointer; transition:all 0.2s; white-space:nowrap;"
                  onmouseover="this.style.backgroundColor='#7B4FE6';"
                  onmouseout="this.style.backgroundColor='#935EFF';"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

    return (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
            <div dangerouslySetInnerHTML={{ __html: formHtml }} />
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
                duration={5000}
            />
        </div>
    );
}
