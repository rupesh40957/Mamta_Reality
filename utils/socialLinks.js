import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaPinterest, FaTwitter, FaYoutube, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

// Map of icon components for easy reference
const iconMap = {
  FaWhatsapp,
  FaInstagram, 
  FaPinterest,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaEnvelope
};

// Social media links configuration
const socialLinks = [
  { 
    name: "WhatsApp",
    url: "https://wa.me/919876543210",
    icon: "FaWhatsapp",
    color: "#25D366",
    ariaLabel: "Chat on WhatsApp"
  },
  {
    name: "Email",
    url: "mailto:contact@mamtarealty.com", 
    icon: "FaEnvelope",
    color: "#D44638",
    ariaLabel: "Send us an email"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mamta_realty/",
    icon: "FaInstagram", 
    color: "#E1306C",
    ariaLabel: "Follow us on Instagram"
  },
  {
    name: "Pinterest",
    url: "https://in.pinterest.com/mamtarealty/",
    icon: "FaPinterest",
    color: "#BD081C", 
    ariaLabel: "Follow us on Pinterest"
  },
  {
    name: "Twitter",
    url: "https://x.com/MamtaRealt63332",
    icon: "FaTwitter",
    color: "#1DA1F2",
    ariaLabel: "Follow us on Twitter"
  },
  {
    name: "YouTube", 
    url: "https://www.youtube.com/@MamtaRealty",
    icon: "FaYoutube",
    color: "#FF0000",
    ariaLabel: "Subscribe to our YouTube channel"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mamta-realty-a6b221345/",
    icon: "FaLinkedin",
    color: "#0077B5",
    ariaLabel: "Connect with us on LinkedIn"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61572393522425",
    icon: "FaFacebook", 
    color: "#1877F2",
    ariaLabel: "Follow us on Facebook"
  }
];

const SocialLinks = () => {
  return (
    <div className="social-links">
      {socialLinks.map((social) => {
        const IconComponent = iconMap[social.icon];
        return (
          <Link 
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="social-link"
          >
            <IconComponent 
              color={social.color}
              size={24}
              title={social.name}
            />
          </Link>
        );
      })}

      <style jsx>{`
        .social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .social-link {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }

        .social-link:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .social-links {
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SocialLinks;

  