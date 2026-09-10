import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationHero from "./prospera/DestinationHero";

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
    image: "/holiday-international.jpg",
    path: "/prospera/holidays",
    icon: <HolidaysIcon />,
    description: "Curated getaways, planned with care.",
    eyebrow: "India & international",
  },
  {
    name: "Events",
    image: "/home-events.jpg",
    path: "/prospera/events",
    icon: <EventsIcon />,
    description: "Memorable events, big or small.",
    eyebrow: "Personal & corporate",
  },
  {
    name: "Gifting",
    image: "/home-gifting.jpg",
    path: "/prospera/gifting",
    icon: <GiftingIcon />,
    description: "Thoughtful gifts for every occasion.",
    eyebrow: "Thoughtfully selected",
  },
  {
    name: "MICE",
    image: "/home-mice.jpg",
    path: "/prospera/mice",
    icon: <MiceIcon />,
    description: "Meetings, Incentives, Conferences & Exhibitions.",
    eyebrow: "Business experiences",
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
  useLayoutEffect(() => {
    /* SAVE PARENT SITE SETTINGS */

    // The shared Prospera layout owns the document title.

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


    favicon.href = "/prospera-logo-transparent.png";

    /* ENABLE NORMAL SCROLL */

    document.documentElement.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.scrollBehavior = "auto";

    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.position = "static";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    /* RESTORE PARENT SITE */

    return () => {
      if (window.location.pathname.startsWith("/prospera")) {
        return;
      }


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

    };
  }, []);

  return (
    <div style={styles.page} className="prospera-page">
      <main style={styles.container} className="prospera-container">

        {/* =================================================
            HEADER
        ================================================= */}

        {false && <header style={styles.header} className="prospera-header">

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
            <MenuLink to="/prospera">
              Home
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

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

            <MenuLink href="#prospera-about">
              About Us
            </MenuLink>

            <span style={styles.menuSeparator}>|</span>

            <MenuLink href="#prospera-contact">
              Contact Us
            </MenuLink>
          </nav>

          {/* RIGHT BRANDING */}

          <a href="#prospera-contact" className="prospera-header-cta">
            Plan with us <span aria-hidden="true">→</span>
          </a>

        </header>}

        {/* =================================================
            HERO
        ================================================= */}

        <DestinationHero
          kicker="Thoughtful journeys. Memorable celebrations."
          heading="Every plan deserves a personal touch."
          introduction="From relaxed family holidays to milestone events and corporate experiences, Prospera brings every detail together with care."
          planningHref="#prospera-contact"
          whatsappHref="https://wa.me/919963854127?text=Hello%20Prospera%2C%20I%27m%20interested%20in%20planning%20a%20holiday%20or%20event.%20Please%20share%20more%20details."
        />

        {/* =================================================
            CARDS
        ================================================= */}

        <section
          style={styles.grid}
          className="prospera-grid"
          aria-labelledby="prospera-services-title"
        >
          <div className="prospera-section-heading">
            <span>What we do</span>
            <h2 id="prospera-services-title">One trusted team for every occasion</h2>
          </div>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              style={styles.card}
              className="prospera-card prospera-photo-card"
            >
              <div className="prospera-card-photo"><img src={cat.image} alt="" width="1536" height="1024" loading="lazy" decoding="async" /><h2 className="prospera-card-photo-title">{cat.name}</h2></div>
              <div className="prospera-card-copy">
              <span className="prospera-card-eyebrow">{cat.eyebrow}</span>

              

              <p style={styles.cardDesc}>
                {cat.description}
              </p>
              <span className="prospera-card-link">Explore <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </section>

        <section id="prospera-about" className="prospera-about" aria-labelledby="prospera-about-title">
          <div className="prospera-about-copy">
            <span className="prospera-kicker">Why Prospera</span>
            <h2 id="prospera-about-title">Planning that feels clear, warm and effortless.</h2>
            <p>
              We listen first, understand what matters to you, and coordinate the details
              with dependable partners—so you can focus on enjoying the moment.
            </p>
          </div>
          <div className="prospera-pillars">
            <article>
              <strong>Personal attention</strong>
              <span>Recommendations shaped around your people, purpose and budget.</span>
            </article>
            <article>
              <strong>End-to-end care</strong>
              <span>One point of contact from the first idea through final coordination.</span>
            </article>
            <article>
              <strong>Thoughtful choices</strong>
              <span>Practical options presented clearly, with no unnecessary complexity.</span>
            </article>
          </div>
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

              <div style={styles.contactLine}>
                GST: 36AENPK9956J1ZN
              </div>
              <div style={styles.contactLine}>
                <strong>Legal Proprietor:</strong> Aravind Babu K
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
                "Hello Prospera, I’m interested in planning a holiday or event. Please share more details."
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

        .prospera-page {
          color: #132052;
          background: radial-gradient(circle at 8% 8%, rgba(245,197,24,.11), transparent 26rem), linear-gradient(180deg, #ffffff 0%, #f8faff 58%, #ffffff 100%) !important;
        }

        .prospera-header {
          position: sticky;
          top: 8px;
          z-index: 50;
          padding: 8px 14px !important;
          border: 1px solid rgba(26,42,108,.08);
          border-radius: 18px;
          background: rgba(255,255,255,.92);
          box-shadow: 0 12px 35px rgba(26,42,108,.08);
          backdrop-filter: blur(14px);
        }

        .prospera-header-cta,
        .prospera-primary-button,
        .prospera-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 18px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .prospera-header-cta,
        .prospera-primary-button {
          color: #fff;
          background: linear-gradient(135deg, #13245f, #2344a0);
          box-shadow: 0 10px 22px rgba(26,42,108,.2);
        }

        .prospera-header-cta:hover,
        .prospera-primary-button:hover,
        .prospera-secondary-button:hover {
          transform: translateY(-2px);
        }

        .prospera-intro {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 32px 38px;
          border: 1px solid rgba(26,42,108,.09);
          border-radius: 20px;
          background: rgba(255,255,255,.92);
          box-shadow: 0 16px 40px rgba(26,42,108,.08);
          text-align: left;
        }

        .prospera-kicker,
        .prospera-section-heading > span {
          color: #b78300;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .prospera-intro h1 {
          max-width: 720px;
          margin: 7px 0 8px;
          color: #132052;
          font-size: clamp(25px, 3vw, 44px);
          line-height: 1.08;
          letter-spacing: -.035em;
        }

        .prospera-intro p {
          max-width: 760px;
          color: #58627e;
          font-size: 13px;
          line-height: 1.65;
        }

        .prospera-intro-actions {
          display: flex;
          flex: 0 0 auto;
          gap: 10px;
        }

        .prospera-secondary-button {
          color: #13245f;
          border: 1px solid rgba(26,42,108,.2);
          background: #fff;
        }

        .prospera-grid {
          position: relative;
          padding-top: 82px;
        }

        .prospera-section-heading {
          position: absolute;
          top: 18px;
          left: 0;
          width: 100%;
          text-align: center;
        }

        .prospera-section-heading h2 {
          margin-top: 5px;
          color: #132052;
          font-size: 24px;
          font-weight: 750;
        }

        .prospera-card {
          position: relative;
          min-height: 220px !important;
          padding: 28px 22px 22px !important;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }

        .prospera-card:hover {
          transform: translateY(-6px);
          border-color: rgba(245,197,24,.65) !important;
          box-shadow: 0 20px 38px rgba(26,42,108,.13) !important;
        }

        .prospera-card-eyebrow {
          margin-bottom: 15px;
          color: #8c720e;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .prospera-card-link {
          margin-top: 14px;
          color: #1a2a6c;
          font-size: 10px;
          font-weight: 800;
        }

        .prospera-about {
          display: grid;
          grid-template-columns: .85fr 1.35fr;
          gap: 38px;
          padding: 42px;
          border-radius: 22px;
          color: #fff;
          background: linear-gradient(135deg, #101d50 0%, #1a2f78 68%, #284ca5 100%);
          box-shadow: 0 20px 50px rgba(16,29,80,.2);
          text-align: left;
        }

        .prospera-about h2 {
          margin: 8px 0 12px;
          color: #fff;
          font-size: 28px;
          font-weight: 750;
          line-height: 1.2;
        }

        .prospera-about-copy p {
          color: rgba(255,255,255,.72);
          font-size: 12px;
          line-height: 1.65;
        }

        .prospera-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .prospera-pillars article {
          padding: 20px;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 15px;
          background: rgba(255,255,255,.07);
        }

        .prospera-pillars strong,
        .prospera-pillars span { display: block; }

        .prospera-pillars strong {
          margin-bottom: 7px;
          color: #ffdb52;
          font-size: 11px;
        }

        .prospera-pillars span {
          color: rgba(255,255,255,.72);
          font-size: 9px;
          line-height: 1.55;
        }

        /* -----------------------------------------------
           TABLET / MOBILE
        ----------------------------------------------- */

        @media (max-width: 768px) {

          .prospera-header-cta {
            grid-area: branding;
            justify-self: end;
            min-height: 36px;
            padding: 0 12px;
            font-size: 10px;
          }

          .prospera-intro,
          .prospera-about {
            grid-template-columns: 1fr;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            padding: 24px 20px;
          }

          .prospera-intro-actions { flex-wrap: wrap; }
          .prospera-pillars { grid-template-columns: 1fr; }

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
            min-height: 190px !important;

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
              1fr !important;

            gap: 7px !important;
          }

          .prospera-card {
            min-height: 175px !important;

            padding:
              9px 6px !important;
          }

          .prospera-contact {
            padding: 10px !important;
          }
        }

        .prospera-card.prospera-photo-card{padding:0!important;min-height:0!important;justify-content:flex-start!important;align-items:stretch!important;text-align:left!important;border:1px solid #e5e8e9!important;border-radius:18px!important;background:#fff!important}.prospera-card-photo{width:100%;aspect-ratio:3/2;overflow:hidden;background:#f4f3ec}.prospera-card-photo img{display:block;width:100%!important;height:100%!important;object-fit:cover;transition:transform .5s ease}.prospera-photo-card:hover .prospera-card-photo img{transform:scale(1.025)}.prospera-card-copy{display:flex;flex-direction:column;flex:1;padding:22px;border-top:2px solid #e9ce84}.prospera-card-copy .prospera-card-eyebrow{margin-bottom:10px;font-weight:600}.prospera-card-copy h2{font-size:20px!important;font-weight:600!important;margin-bottom:8px!important}.prospera-card-copy p{font-size:12px!important;line-height:1.6!important;color:#657080!important;margin-bottom:18px!important}.prospera-card-copy .prospera-card-link{margin-top:auto;font-weight:600}@media(prefers-reduced-motion:reduce){.prospera-card-photo img{transition:none}.prospera-photo-card:hover .prospera-card-photo img{transform:none}}
        .prospera-card-photo{position:relative}.prospera-card-photo::after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(180deg,transparent,rgba(10,24,55,.78));pointer-events:none}.prospera-card-photo .prospera-card-photo-title{position:absolute;z-index:1;left:22px;right:22px;bottom:19px;margin:0;color:#fff;font-size:24px;font-weight:600;line-height:1.15;letter-spacing:-.025em;text-shadow:0 2px 8px rgba(0,0,0,.2)}
        .prospera-hero-banner{position:relative;isolation:isolate;padding:7px;box-sizing:border-box;border:1px solid rgba(255,255,255,.88);border-radius:26px!important;background:linear-gradient(135deg,rgba(255,255,255,.82),rgba(231,241,249,.42) 55%,rgba(255,247,218,.52));box-shadow:0 18px 45px rgba(24,49,86,.12),inset 0 1px 0 #fff!important;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}.prospera-hero-banner img{position:relative;display:block;width:100%;height:auto;border-radius:19px;filter:saturate(.91) contrast(.98)}.prospera-hero-banner::after{content:'';position:absolute;inset:7px;border-radius:19px;pointer-events:none;background:linear-gradient(155deg,rgba(255,255,255,.19),transparent 38%,transparent 78%,rgba(255,255,255,.06));box-shadow:inset 0 1px 0 rgba(255,255,255,.8),inset 0 0 0 1px rgba(255,255,255,.22)}@media(max-width:600px){.prospera-hero-banner{padding:4px;border-radius:18px!important}.prospera-hero-banner img{border-radius:13px}.prospera-hero-banner::after{inset:4px;border-radius:13px}}
        .prospera-page .dh-label h2 { font-size: clamp(16px, 1.5vw, 22px); }
        @media (min-width: 1001px) {
          .prospera-page .dh-with-copy .dh-panel { height: 386px; }
        }
        @media (max-width: 1000px) and (min-width: 601px) {
          .prospera-page .dh-with-copy .dh-panel { height: 460px; }
        }
        @media (max-width: 600px) {
          .prospera-page .dh-with-copy .dh-panel { height: 540px; }
        }
        @media (max-width: 600px) {
          .prospera-page .dh-with-copy .dh-panel { height: 420px; }
          .prospera-page .dh-overlay { top: 42px; padding: 14px; gap: 10px; }
          .prospera-page .dh-overlay-copy h1 { font-size: 22px; margin: 6px 0 8px; }
          .prospera-page .dh-overlay-copy p { font-size: 10px; line-height: 1.5; padding: 8px 10px; }
        }
        .prospera-destination-hero{width:100%;padding:6px;box-sizing:border-box;border:1px solid rgba(255,255,255,.9);border-radius:24px;background:linear-gradient(135deg,#ffffffcc,#eef4f8aa,#fff8e7cc);box-shadow:0 16px 40px rgba(24,49,86,.12);overflow-x:auto;scrollbar-width:thin}.prospera-destination-panels{position:relative;min-width:750px;aspect-ratio:3/1;border-radius:18px;overflow:hidden}.prospera-destination-panels>img{display:block;width:100%!important;height:100%!important;object-fit:cover}.prospera-destination-labels{position:absolute;inset:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr))}.prospera-destination-panel{display:flex;align-items:flex-end;padding:clamp(8px,1.2vw,20px);background:linear-gradient(180deg,transparent 50%,rgba(9,26,44,.35));border-right:1px solid rgba(255,255,255,.3)}.prospera-destination-panel:last-child{border-right:0}.prospera-destination-glass{width:100%;padding:14px 12px;box-sizing:border-box;background:rgba(15,34,48,.24);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.36);border-radius:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,.14);color:#fff}.prospera-destination-glass h2{margin:0 0 5px;font-size:clamp(19px,2vw,30px);font-weight:500;letter-spacing:-.025em;line-height:1.1}.prospera-destination-glass p{margin:0;font-size:clamp(8px,.8vw,12px);line-height:1.5;color:#fff5dc}@media(max-width:600px){.prospera-destination-hero{padding:4px;border-radius:18px}.prospera-destination-glass{padding:10px 8px;border-radius:9px}}
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

  height: "78px",
  minHeight: "78px",

  display: "grid",

  gridTemplateColumns:
    "80px minmax(0, 1fr) auto",

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

  fontSize: "10px",     // more visible
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

    fontSize: "18px",

    fontWeight: 700,

    lineHeight: 1.2,

    margin: "0 0 2px",
  },

  cardDesc: {
    color: "#555555",

    fontSize: "11px",

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
