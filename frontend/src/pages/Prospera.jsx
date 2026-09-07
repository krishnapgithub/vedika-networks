import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NAVY = "#1a2a6c";
const GOLD = "#f5c518";

/* =========================================================
   ICON WRAPPER
========================================================= */

const IconCircle = ({ children }) => (
  <div style={styles.iconCircle}>{children}</div>
);

/* =========================================================
   ICONS
========================================================= */

const HolidaysIcon = () => (
  <svg viewBox="0 0 64 64" width="22" height="22" fill="none">
    <circle cx="44" cy="20" r="9" fill={NAVY} />
    <path
      d="M14 46c4-14 14-22 26-22 2 0 4 0.3 6 0.8-2 10-10 21-24 25-3 0.8-6 0.4-8-1.2-1.2-1-1.4-2.6-0-2.6z"
      fill={NAVY}
    />
    <path
      d="M20 44c3-9 9-15 17-17"
      stroke={GOLD}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const EventsIcon = () => (
  <svg viewBox="0 0 64 64" width="22" height="22" fill="none">
    <rect x="12" y="16" width="40" height="34" rx="5" fill={NAVY} />
    <rect x="12" y="16" width="40" height="10" rx="5" fill="#0d1642" />
    <rect x="20" y="10" width="4" height="10" rx="2" fill={NAVY} />
    <rect x="40" y="10" width="4" height="10" rx="2" fill={NAVY} />
    <path
      d="M32 30l2.5 5 5.5 0.8-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.5-0.8z"
      fill={GOLD}
    />
  </svg>
);

const GiftingIcon = () => (
  <svg viewBox="0 0 64 64" width="22" height="22" fill="none">
    <rect x="14" y="28" width="36" height="24" rx="3" fill={NAVY} />
    <rect x="10" y="20" width="44" height="10" rx="3" fill={NAVY} />
    <rect x="29" y="20" width="6" height="32" fill={GOLD} />
    <path
      d="M32 20c-3-8-16-8-16-1 0 3 4 1 16 1z"
      fill={GOLD}
    />
    <path
      d="M32 20c3-8 16-8 16-1 0 3-4 1-16 1z"
      fill={GOLD}
    />
  </svg>
);

const MiceIcon = () => (
  <svg viewBox="0 0 64 64" width="22" height="22" fill="none">
    <circle cx="24" cy="22" r="7" fill={NAVY} />
    <circle cx="40" cy="22" r="7" fill={NAVY} />
    <path
      d="M10 48c1-9 7-14 14-14s13 5 14 14z"
      fill={NAVY}
    />
    <path
      d="M26 48c1-9 7-14 14-14s13 5 14 14z"
      fill={NAVY}
      opacity="0.85"
    />
  </svg>
);

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    name: "Holidays",
    path: "/prospera/holidays",
    icon: <HolidaysIcon />,
    description: "Curated getaways, planned with care.",
  },
  {
    name: "Events",
    path: "/prospera/events",
    icon: <EventsIcon />,
    description: "Memorable events, big or small.",
  },
  {
    name: "Gifting",
    path: "/prospera/gifting",
    icon: <GiftingIcon />,
    description: "Thoughtful gifts for every occasion.",
  },
  {
    name: "MICE",
    path: "/prospera/mice",
    icon: <MiceIcon />,
    description: "Meetings, Incentives, Conferences & Exhibitions.",
  },
];

/* =========================================================
   MENU LINK
========================================================= */

const MenuLink = ({ to, href, children }) => {
  const [hovered, setHovered] = useState(false);

  const commonProps = {
    className: "prospera-menu-link",
    style: styles.headerMenuItem,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const content = (
    <>
      <span>{children}</span>

      <span
        style={{
          ...styles.menuHoverLine,
          width: hovered ? "72%" : "0%",
          opacity: hovered ? 1 : 0,
          transform: hovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(5px)",
        }}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} {...commonProps}>
      {content}
    </Link>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Prospera() {
  useEffect(() => {
    /* SAVE PARENT SITE SETTINGS */

    const previousTitle = document.title;

    const existingFavicon =
      document.querySelector("link[rel~='icon']");

    const previousFavicon =
      existingFavicon?.getAttribute("href");

    let favicon = existingFavicon;
    let faviconCreated = false;

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
      faviconCreated = true;
    }

    const oldHtmlOverflow =
      document.documentElement.style.overflow;

    const oldHtmlOverflowX =
      document.documentElement.style.overflowX;

    const oldHtmlOverflowY =
      document.documentElement.style.overflowY;

    const oldHtmlHeight =
      document.documentElement.style.height;

    const oldScrollBehavior =
      document.documentElement.style.scrollBehavior;

    const oldBodyOverflow =
      document.body.style.overflow;

    const oldBodyOverflowX =
      document.body.style.overflowX;

    const oldBodyOverflowY =
      document.body.style.overflowY;

    const oldBodyHeight =
      document.body.style.height;

    const oldBodyPosition =
      document.body.style.position;

    /* PROSPERA TITLE / FAVICON */

    document.title = "Prospera Holidays & Events";
    favicon.href = "/prospera-logo-transparent.png";

    /* ENABLE NORMAL SCROLL */

    document.documentElement.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.scrollBehavior = "smooth";

    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.position = "static";

    /* POPPINS */

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(fontLink);

    /* RESTORE PARENT SITE */

    return () => {
      document.title = previousTitle;

      if (faviconCreated) {
        favicon.remove();
      } else if (favicon && previousFavicon) {
        favicon.href = previousFavicon;
      }

      document.documentElement.style.overflow =
        oldHtmlOverflow;

      document.documentElement.style.overflowX =
        oldHtmlOverflowX;

      document.documentElement.style.overflowY =
        oldHtmlOverflowY;

      document.documentElement.style.height =
        oldHtmlHeight;

      document.documentElement.style.scrollBehavior =
        oldScrollBehavior;

      document.body.style.overflow =
        oldBodyOverflow;

      document.body.style.overflowX =
        oldBodyOverflowX;

      document.body.style.overflowY =
        oldBodyOverflowY;

      document.body.style.height =
        oldBodyHeight;

      document.body.style.position =
        oldBodyPosition;

      if (fontLink.parentNode) {
        fontLink.parentNode.removeChild(fontLink);
      }
    };
  }, []);

  return (
    <div style={styles.page} className="prospera-page">
      <main style={styles.container} className="prospera-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header style={styles.header} className="prospera-header">

          {/* LEFT LOGO */}

          <Link
            to="/prospera"
            style={styles.logoLink}
            className="prospera-logo-link"
          >
            <img
              src="/prospera-logo.png"
              alt="Prospera"
              style={styles.logo}
              className="prospera-logo"
            />
          </Link>

          {/* CENTER MENU */}

          <nav
            style={styles.headerMenu}
            className="prospera-menu"
          >
            <MenuLink to="/prospera/holidays">
              Holidays
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink to="/prospera/events">
              Events
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink to="/prospera/gifting">
              Gifting
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink to="/prospera/mice">
              MICE
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink to="/prospera/about">
              About Us
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink href="#prospera-contact">
              Contact Us
            </MenuLink>
          </nav>

          {/* RIGHT BRANDING */}

          <div
            style={styles.headerRight}
            className="prospera-branding"
          >
            <img
              src="/prospera-caption.png"
              alt="Prospera"
              style={styles.captionImage}
              className="prospera-caption"
            />

            <div
              style={styles.subtitle}
              className="prospera-subtitle"
            >
              Holidays &amp; Events
            </div>

            <div
              style={styles.tagline}
              className="prospera-tagline"
            >
              Memories. Moments. Made with Care.
            </div>
          </div>

        </header>

        {/* =================================================
            HERO
        ================================================= */}

        <section style={styles.heroBanner}>
          <img
            src="/prospera-hero.png"
            alt="Prospera Holidays and Events"
            style={styles.heroBannerImage}
          />
        </section>

        {/* =================================================
            CARDS
        ================================================= */}

        <section
          style={styles.grid}
          className="prospera-grid"
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              style={styles.card}
              className="prospera-card"
            >
              <IconCircle>{cat.icon}</IconCircle>

              <h2 style={styles.cardTitle}>
                {cat.name}
              </h2>

              <p style={styles.cardDesc}>
                {cat.description}
              </p>
            </Link>
          ))}
        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <footer
          id="prospera-contact"
          style={styles.contactCard}
          className="prospera-contact"
        >
          <div
            style={styles.contactLeft}
            className="prospera-contact-left"
          >
            <img
              src="/prospera-logo-transparent.png"
              alt="Prospera"
              style={styles.contactLogo}
            />

            <div style={styles.contactDetails}>
              <div style={styles.contactHeading}>
                Contact Us
              </div>

              <a
                href="mailto:aravind.prospera@gmail.com"
                style={styles.contactLink}
              >
                ✉️ aravind.prospera@gmail.com
              </a>

              <a
                href="tel:+919963854127"
                style={styles.contactLink}
              >
                📞 +91 99638 54127
              </a>

              <div style={styles.contactLine}>
                📍 Flat No. 502, Sai Durga Residency,
                Karmanghat, Hyderabad - 97
              </div>
            </div>
          </div>

          {/* WHATSAPP */}

          <div
            style={styles.whatsappSection}
            className="prospera-whatsapp"
          >
            <a
              href={`https://wa.me/919963854127?text=${encodeURIComponent(
                "Dear Aravind, can you guide us on how we can plan for holidays and events?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappButton}
            >
              <span style={styles.whatsappIcon}>
                ✓
              </span>

              <span>
                <span style={styles.whatsappLabel}>
                  Chat on WhatsApp
                </span>

                <span style={styles.whatsappNumber}>
                  +91 99638 54127
                </span>
              </span>
            </a>
          </div>
        </footer>

      </main>

      {/* ===================================================
          RESPONSIVE CSS
      =================================================== */}

      <style>{`

        /* -----------------------------------------------
           TABLET / MOBILE
        ----------------------------------------------- */

        @media (max-width: 768px) {

          .prospera-container {
            padding: 6px 10px 12px !important;
            gap: 8px !important;
          }

          /*
            MOBILE HEADER

            Logo              Right branding
            -------------------------------
                 Scrollable menu
          */

          .prospera-header {
            width: 100% !important;

            height: auto !important;
            min-height: auto !important;

            display: grid !important;

            grid-template-columns:
              65px minmax(0, 1fr) !important;

            grid-template-areas:
              "logo branding"
              "menu menu" !important;

            align-items: center !important;

            gap: 5px 8px !important;

            padding: 3px 0 2px !important;
          }

          .prospera-logo-link {
            grid-area: logo !important;
          }

          .prospera-logo {
            width: 48px !important;
          }

          .prospera-branding {
            grid-area: branding !important;

            align-items: flex-end !important;

            justify-content: center !important;
          }

          .prospera-caption {
            width: 118px !important;
          }

          .prospera-subtitle {
            font-size: 9px !important;
          }

          .prospera-tagline {
            font-size: 7px !important;
          }

          /* ---------------- MENU ---------------- */

          .prospera-menu {
            grid-area: menu !important;

            width: 100% !important;

            justify-content: flex-start !important;

            overflow-x: auto !important;
            overflow-y: hidden !important;

            white-space: nowrap !important;

            padding: 3px 1px 6px !important;

            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .prospera-menu::-webkit-scrollbar {
            display: none;
          }

          .prospera-menu-link {
            font-size: 11px !important;

            padding:
              6px 8px !important;

            flex-shrink: 0 !important;
          }

          /* ---------------- HERO ---------------- */

          .prospera-page section img {
            max-width: 100%;
          }

          /* ---------------- CARDS ---------------- */

          .prospera-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;

            gap: 8px !important;
          }

          .prospera-card {
            min-height: 120px !important;

            padding:
              10px 8px !important;
          }

          /* ---------------- CONTACT ---------------- */

          .prospera-contact {
            flex-direction: column !important;

            align-items: stretch !important;

            gap: 10px !important;

            padding: 12px !important;
          }

          .prospera-contact-left {
            width: 100% !important;
          }

          .prospera-whatsapp {
            width: 100% !important;

            justify-content: center !important;
          }

          .prospera-whatsapp a {
            width: 100%;

            justify-content: center;

            box-sizing: border-box;
          }
        }

        /* -----------------------------------------------
           SMALL MOBILE
        ----------------------------------------------- */

        @media (max-width: 480px) {

          .prospera-container {
            padding:
              5px 8px 12px !important;
          }

          .prospera-header {
            grid-template-columns:
              55px minmax(0, 1fr) !important;

            gap: 4px 6px !important;
          }

          .prospera-logo {
            width: 42px !important;
          }

          .prospera-caption {
            width: 105px !important;
          }

          .prospera-subtitle {
            font-size: 8px !important;
          }

          .prospera-tagline {
            font-size: 6.5px !important;
          }

          .prospera-menu-link {
            font-size: 10px !important;

            padding:
              5px 7px !important;
          }

          .prospera-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;

            gap: 7px !important;
          }

          .prospera-card {
            min-height: 115px !important;

            padding:
              9px 6px !important;
          }

          .prospera-contact {
            padding: 10px !important;
          }
        }

      `}</style>
    </div>
  );
}

/* =========================================================
   DESKTOP STYLES
========================================================= */

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",

    background: "#ffffff",

    fontFamily:
      "'Poppins', Arial, Helvetica, sans-serif",

    position: "relative",

    overflowX: "hidden",
    overflowY: "visible",
  },

  container: {
    width: "100%",
    maxWidth: "100%",

    minHeight: "100vh",

    margin: 0,

    padding: "6px 28px 12px",

    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",

    gap: "8px",

    overflow: "visible",
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    width: "100%",

    height: "68px",
    minHeight: "68px",

    display: "grid",

    gridTemplateColumns:
      "100px minmax(0, 1fr) 210px",

    alignItems: "center",

    gap: "12px",

    flexShrink: 0,

    boxSizing: "border-box",
  },

  logoLink: {
    display: "inline-block",

    width: "fit-content",

    textDecoration: "none",
  },

  logo: {
    width: "60px",

    height: "auto",

    objectFit: "contain",

    display: "block",
  },

  /* =======================================================
     MENU
  ======================================================= */

  headerMenu: {
    width: "100%",

    minWidth: 0,

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: 0,

    overflow: "visible",
  },

  headerMenuItem: {
    position: "relative",

    display: "inline-flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    color: NAVY,

    fontFamily:
      "'Poppins', Arial, sans-serif",

    fontSize: "12px",

    fontWeight: 600,

    lineHeight: 1.2,

    textDecoration: "none",

    padding: "7px 10px",

    whiteSpace: "nowrap",

    cursor: "pointer",

    overflow: "visible",
  },

  menuSeparator: {
    color: GOLD,

    fontSize: "15px",

    fontWeight: 500,

    margin: "0 4px",

    opacity: 1,
  },

  menuHoverLine: {
    position: "absolute",

    left: "50%",

    bottom: "-1px",

    height: "3px",

    background: GOLD,

    borderRadius: "999px",

    transform:
      "translateX(-50%) translateY(5px)",

    transition:
      "width 0.28s ease, opacity 0.28s ease, transform 0.28s ease",

    boxShadow:
      "0 3px 8px rgba(245,197,24,0.55)",

    pointerEvents: "none",
  },

  /* =======================================================
     RIGHT BRANDING
  ======================================================= */

  headerRight: {
  textAlign: "right",

  display: "flex",
  flexDirection: "column",

  alignItems: "flex-end",
  justifyContent: "center",

  minWidth: 0,

  paddingRight: "4px",
},

captionImage: {
  width: "190px",       // bigger Prospera logo
  maxWidth: "100%",

  height: "auto",

  objectFit: "contain",
  display: "block",
},

subtitle: {
  color: GOLD,

  fontSize: "13px",     // more visible
  fontWeight: 800,

  lineHeight: 1.2,

  marginTop: "2px",

  letterSpacing: "0.1px",
},

tagline: {
  color: NAVY,

  fontSize: "10px",     // more readable
  fontStyle: "italic",
  fontWeight: 600,

  lineHeight: 1.25,

  marginTop: "2px",

  whiteSpace: "nowrap",
},

  /* =======================================================
     HERO
  ======================================================= */

  heroBanner: {
    width: "100%",

    borderRadius: "15px",

    overflow: "hidden",

    flexShrink: 0,

    boxShadow:
      "0 5px 15px rgba(26,42,108,0.08)",
  },

  heroBannerImage: {
    width: "100%",

    height: "auto",

    display: "block",
  },

  /* =======================================================
     GRID
  ======================================================= */

  grid: {
    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",

    gap: "12px",

    flexShrink: 0,

    boxSizing: "border-box",
  },

  /* =======================================================
     CARDS
  ======================================================= */

  card: {
    width: "100%",

    minWidth: 0,

    minHeight: "100px",

    padding: "9px 10px 8px",

    boxSizing: "border-box",

    background:
      "linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)",

    border:
      "1px solid rgba(26,42,108,0.10)",

    borderTop: `3px solid ${GOLD}`,

    borderRadius: "14px",

    boxShadow:
      "0 5px 14px rgba(26,42,108,0.07)",

    textDecoration: "none",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    textAlign: "center",

    overflow: "hidden",
  },

  iconCircle: {
    width: "40px",

    height: "40px",

    borderRadius: "11px",

    background:
      "linear-gradient(135deg, #ffd12a 0%, #f5b900 100%)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,

    marginBottom: "4px",

    boxShadow:
      "0 3px 8px rgba(245,197,24,0.25)",
  },

  cardTitle: {
    color: NAVY,

    fontSize: "13px",

    fontWeight: 700,

    lineHeight: 1.2,

    margin: "0 0 2px",
  },

  cardDesc: {
    color: "#555555",

    fontSize: "9px",

    fontWeight: 400,

    lineHeight: 1.25,

    margin: 0,
  },

  /* =======================================================
     CONTACT
  ======================================================= */

  contactCard: {
    width: "100%",

    minHeight: "72px",

    boxSizing: "border-box",

    background:
      "linear-gradient(135deg, #f2f5ff 0%, #fff9e9 100%)",

    border:
      "1px solid rgba(26,42,108,0.09)",

    borderRadius: "14px",

    padding: "7px 16px",

    display: "flex",

    alignItems: "center",

    justifyContent: "space-between",

    gap: "15px",

    flexShrink: 0,

    scrollMarginTop: "15px",

    boxShadow:
      "0 4px 12px rgba(26,42,108,0.05)",
  },

  contactLeft: {
    display: "flex",

    alignItems: "center",

    gap: "10px",

    minWidth: 0,

    flex: "1 1 auto",
  },

  contactLogo: {
    width: "32px",

    height: "auto",

    objectFit: "contain",

    display: "block",

    flexShrink: 0,
  },

  contactDetails: {
    minWidth: 0,

    display: "flex",

    flexDirection: "column",

    alignItems: "flex-start",

    gap: "1px",
  },

  contactHeading: {
    color: NAVY,

    fontSize: "12px",

    fontWeight: 700,

    lineHeight: 1.2,

    marginBottom: "1px",
  },

  contactLink: {
    color: NAVY,

    fontSize: "8.5px",

    fontWeight: 500,

    textDecoration: "none",

    lineHeight: 1.3,
  },

  contactLine: {
    color: "#555555",

    fontSize: "8.5px",

    fontWeight: 400,

    lineHeight: 1.3,
  },

  /* =======================================================
     WHATSAPP
  ======================================================= */

  whatsappSection: {
    display: "flex",

    alignItems: "center",

    justifyContent: "flex-end",

    flex: "0 0 auto",
  },

  whatsappButton: {
    display: "flex",

    alignItems: "center",

    gap: "8px",

    background:
      "linear-gradient(135deg, #25D366 0%, #19bd59 100%)",

    color: "#ffffff",

    textDecoration: "none",

    padding: "7px 13px",

    borderRadius: "10px",

    boxShadow:
      "0 4px 10px rgba(37,211,102,0.25)",
  },

  whatsappIcon: {
    width: "25px",

    height: "25px",

    borderRadius: "50%",

    border: "2px solid #ffffff",

    color: "#ffffff",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "12px",

    fontWeight: 800,

    flexShrink: 0,
  },

  whatsappLabel: {
    display: "block",

    fontSize: "10px",

    fontWeight: 700,

    lineHeight: 1.15,
  },

  whatsappNumber: {
    display: "block",

    fontSize: "8px",

    fontWeight: 500,

    lineHeight: 1.2,

    marginTop: "1px",

    opacity: 0.95,
  },
};