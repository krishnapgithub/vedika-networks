import { useLayoutEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { applyProsperaMetadata, prosperaTitle } from "../../prosperaMetadata";

const pageCardTitles = {
  "holidays": [
    "Domestic Holidays",
    "International Holidays",
    "Family Getaways",
    "Honeymoons & Couples",
    "Group Tours",
    "Custom Itineraries"
  ],
  "gifting": [
    "Corporate Gifting",
    "Festive Hampers",
    "Welcome Kits",
    "Event Gifting",
    "Personal Occasions",
    "Custom Branding"
  ],
  "mice": [
    "Corporate Meetings",
    "Incentive Travel",
    "Conferences",
    "Exhibitions",
    "Product Launches",
    "Team Experiences"
  ],
  "events": [
    "MICE, Conferences & Corporate Meetings",
    "Team Building & Incentives",
    "Corporate Parties & Gala Dinners",
    "Exhibitions & Product Launches",
    "Events & Gifting",
    "Private Occasions"
  ],
  "home": [
    "Holidays",
    "Events",
    "Gifting",
    "MICE"
  ],
  "about": [
    "Holidays",
    "Events",
    "Gifting",
    "MICE"
  ],
  "contact": [
    "Email",
    "Phone",
    "Address",
    "GST"
  ]
};

const items = [
  ["Home", "/prospera", true],
  ["Holidays", "/prospera/holidays"],
  ["Events", "/prospera/events"],
  ["Gifting", "/prospera/gifting"],
  ["MICE", "/prospera/mice"],
  ["About Us", "/prospera/about"],
  ["Contact Us", "/prospera/contact"],
];

const footerServices = [
  ["flight", "Domestic", "Tour Packages"],
  ["hotel", "Hotels &", "Resorts"],
  ["car", "Transport", "Services"],
  ["camera", "Sightseeing", "& Experiences"],
  ["palm", "Family Trips &", "Honeymoon"],
  ["group", "Group Tours &", "Customized Packages"],
];

function ServiceIcon({ type }) {
  const paths = {
    flight: <path d="m3 16 8-5V5.5c0-1 .8-2.5 2-2.5s2 1.5 2 2.5V11l6 4v2l-6-2v4l2 1.5V22l-4-1-4 1v-1.5l2-1.5v-4l-8 3Z" />,
    hotel: <><path d="M4 21V7l8-4 8 4v14M2 21h20M8 8h1m3 0h1m3 0h1M8 12h1m3 0h1m3 0h1M8 16h1m3 0h1m3 0h1" /><path d="M11 21v-3h2v3" /></>,
    car: <><path d="m4 16 1.5-5h13l1.5 5v4h-2v-2H6v2H4v-4Z" /><path d="m7 11 2-4h6l2 4M7.5 15h.01m9 0h.01" /></>,
    camera: <><path d="M4 7h4l1.5-2h5L16 7h4v12H4Z" /><circle cx="12" cy="13" r="4" /></>,
    palm: <><path d="M12 21c-1-6 1-10 3-13M5 9c2-3 5-4 8-1-4 0-6 1-8 1Zm7-3c2-3 6-3 8 0-4-1-6 0-8 0Zm3 2c4-2 7 0 8 3-4-2-6-1-8-3Z" /></>,
    group: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M14 14c4-1 7 2 7 6" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

export default function ProsperaLayout() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const shell = document.querySelector('.prospera-shell');
    const selectors = ['.prospera-top-strip', '.prospera-shell-header', '.prospera-card-strip', '.prospera-bottom-strip'];
    const sections = selectors.map(selector => shell.querySelector(selector));
    const measure = () => {
      sections.forEach((section, index) => shell.style.setProperty(`--pinned-${index}`, `${section.getBoundingClientRect().height}px`));
    };
    const observer = new ResizeObserver(measure);
    sections.forEach(section => observer.observe(section));
    measure();
    return () => observer.disconnect();
  }, []);
  const cardTitles = pageCardTitles[pathname.split("/").filter(Boolean)[1] || "home"] || [];

  useLayoutEffect(() => {
    const previousTitle = document.querySelector("title")?.dataset.originalTitle || document.title;
    const favicon = document.querySelector("link[rel~='icon']");
    const previousFavicon = favicon?.getAttribute("href");
    const oldHtmlOverflow = document.documentElement.style.overflow;
    const oldHtmlOverflowY = document.documentElement.style.overflowY;
    const oldBodyOverflow = document.body.style.overflow;
    const oldBodyPosition = document.body.style.position;

    if (favicon) favicon.href = "/prospera-logo-transparent.png";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "scroll";
    document.body.style.overflow = "auto";
    document.body.style.position = "static";

    return () => {
      document.title = previousTitle;
      if (favicon && previousFavicon) favicon.href = previousFavicon;
      document.documentElement.style.overflow = oldHtmlOverflow;
      document.documentElement.style.overflowY = oldHtmlOverflowY;
      document.body.style.overflow = oldBodyOverflow;
      document.body.style.position = oldBodyPosition;
    };
  }, []);

  useLayoutEffect(() => {
    document.title = /^\/prospera\/?$/.test(pathname)
      ? prosperaTitle
      : pathname === "/prospera/events"
      ? "Corporate Events | Prospera Holidays & Events"
      : "Prospera Holidays & Events";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (/^\/prospera\/?$/.test(pathname)) return applyProsperaMetadata();
  }, [pathname]);

  return (
    
    <div className="prospera-shell">
      <div className="prospera-top-strip" aria-label="Prospera services">
        {footerServices.map(([type, title, subtitle]) => (
          <span className="prospera-top-strip-item" key={type}>
            <ServiceIcon type={type} />
            <span>{title} {subtitle}</span>
          </span>
        ))}
      </div>
      <header className="prospera-shell-header">
        <Link className="prospera-shell-logo" to="/prospera" aria-label="Prospera home">
          <img src="/prospera-logo.png" alt="Prospera" />
          <span className="prospera-brand-copy">
            <span className="prospera-brand-title">HOLIDAYS AND EVENTS</span>
            <span className="prospera-brand-tagline">Memories. Moments. Made with Care.</span>
          </span>
        </Link>
        <nav aria-label="Prospera menu">
          {items.map(([label, to, end], index) => (
            <span className="prospera-shell-item" key={to}>
              {index > 0 && <i aria-hidden="true">|</i>}
              <NavLink to={to} end={end}>{label}</NavLink>
            </span>
          ))}
        </nav>
      </header>
      <section className="prospera-card-strip" data-page={pathname.split("/").filter(Boolean)[1] || "home"} aria-label={pathname.replace(/\/$/, "") === "/prospera/contact" ? "Contact details" : "What Prospera offers"}>
        <span className="prospera-card-strip-label">{pathname.replace(/\/$/, "") === "/prospera/contact" ? "GET IN TOUCH" : "What Prospera Offers:"}</span>
        <ul>{cardTitles.map(title => <li key={title}>{title}</li>)}</ul>
      </section>
      <Outlet />
      <footer className="prospera-bottom-strip">
        <span className="prospera-bottom-contact">
          <span>© 2026 Prospera. All rights reserved.</span>
          <a href="mailto:aravind.prospera@gmail.com"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>aravind.prospera@gmail.com</a>
          <a href="tel:+919963854127"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4M11 h2" /></svg>+91 99638 54127</a>
        </span>
        <span>Maintained &amp; developed by Vedika Networks.</span>
      </footer>
      <style>{`
        .prospera-top-strip{position:fixed;inset:0 0 auto;height:20px;z-index:1001;display:flex;align-items:center;justify-content:space-around;gap:12px;padding:0 12px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;background:linear-gradient(115deg,#0046ad,#002f8d 68%,#002475);border-bottom:1px solid #ffe400;box-sizing:border-box;color:#fff}.prospera-top-strip::-webkit-scrollbar{display:none}.prospera-top-strip-item{display:inline-flex;align-items:center;justify-content:center;gap:4px;flex:0 0 auto;white-space:nowrap;font-size:10px;font-weight:400;line-height:19px}.prospera-top-strip-item svg{display:block;width:16px;height:16px;flex:0 0 16px;fill:none;stroke:#ffe400;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
        .prospera-shell{min-height:100vh;padding-bottom:48px;padding-top:118px;color:#132052;background:radial-gradient(circle at 8% 8%,rgba(245,197,24,.11),transparent 26rem),linear-gradient(180deg,#fff 0%,#f8faff 58%,#fff);font-family:'Poppins',Arial,Helvetica,sans-serif;overflow:visible}
        .prospera-shell-header{width:100%;height:78px;min-height:78px;margin:0;padding:8px 42px;display:grid;grid-template-columns:80px minmax(0,1fr) 80px;align-items:center;gap:12px;position:fixed;inset:20px 0 auto 0;z-index:1000;border:0;border-bottom:1px solid rgba(26,42,108,.10);border-radius:0;background:rgba(255,255,255,.98);box-shadow:0 6px 20px rgba(26,42,108,.08);backdrop-filter:blur(14px)}.prospera-shell-header::after{content:'';display:block;width:80px}
        .prospera-shell-logo img{display:block;width:60px;height:auto;filter:saturate(1.18) contrast(1.05)}.prospera-shell-header nav{min-width:0;display:flex;align-items:center;justify-content:center;white-space:nowrap}.prospera-shell-item{display:inline-flex;align-items:center}.prospera-shell-item i{margin:0 4px;color:#f5c518;font-size:15px;font-style:normal;font-weight:500}.prospera-shell-item a{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:7px 10px;color:#1a2a6c;font-size:12px;font-weight:600;line-height:1.2;text-decoration:none}.prospera-shell-item a::after{content:'';position:absolute;left:50%;bottom:-1px;width:0;height:3px;border-radius:999px;background:#f5c518;opacity:0;transform:translateX(-50%) translateY(5px);transition:width .28s ease,opacity .28s ease,transform .28s ease;box-shadow:0 3px 8px rgba(245,197,24,.55)}.prospera-shell-item a:hover::after,.prospera-shell-item a:focus-visible::after,.prospera-shell-item a.active::after{width:72%;opacity:1;transform:translateX(-50%) translateY(0)}
        .prospera-service-footer{position:relative;margin-top:34px;padding:25px clamp(18px,4vw,64px) 22px;overflow:hidden;background:linear-gradient(115deg,#0046ad,#002f8d 68%,#002475);color:#fff;border-top:5px solid #ffe400}.prospera-service-footer__wave{position:absolute;left:-3%;right:-3%;top:-19px;height:28px;border-radius:50%;background:#ffe400}.prospera-service-footer__items{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));max-width:1500px;margin:0 auto}.prospera-service-footer__item{min-width:0;display:flex;align-items:center;justify-content:center;gap:12px;padding:7px 18px;border-right:1px solid rgba(255,228,0,.78)}.prospera-service-footer__item:last-child{border-right:0}.prospera-service-footer__item svg{width:37px;height:37px;flex:0 0 auto;fill:none;stroke:#ffe400;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}.prospera-service-footer__item span{display:flex;min-width:0;flex-direction:column;line-height:1.18}.prospera-service-footer__item strong{font-size:12px;font-weight:700}.prospera-service-footer__item small{margin-top:2px;color:rgba(255,255,255,.86);font-size:10px;font-weight:500}
        @media(max-width:1050px){.prospera-service-footer__items{grid-template-columns:repeat(3,1fr);row-gap:12px}.prospera-service-footer__item:nth-child(3){border-right:0}.prospera-service-footer__item:nth-child(-n+3){padding-bottom:16px;border-bottom:1px solid rgba(255,228,0,.35)}}
        @media(max-width:768px){.prospera-shell{padding-top:134px}.prospera-shell-header{height:94px;min-height:94px;margin:0;padding:3px 10px 2px;grid-template-columns:65px minmax(0,1fr);grid-template-areas:'logo empty' 'menu menu';gap:5px 8px}.prospera-shell-header::after{display:none}.prospera-shell-logo{grid-area:logo}.prospera-shell-logo img{width:48px}.prospera-shell-header nav{grid-area:menu;width:100%;justify-content:center;overflow-x:hidden;padding:3px 0 6px}.prospera-shell-item i{margin:0 2px;font-size:12px}.prospera-shell-item a{padding:5px 4px;font-size:9px}}
        @media(max-width:600px){.prospera-service-footer{padding:25px 8px 15px}.prospera-service-footer__items{grid-template-columns:repeat(2,1fr);row-gap:0}.prospera-service-footer__item{justify-content:flex-start;gap:8px;padding:12px 10px;border-right:1px solid rgba(255,228,0,.35);border-bottom:1px solid rgba(255,228,0,.28)!important}.prospera-service-footer__item:nth-child(even){border-right:0}.prospera-service-footer__item:nth-last-child(-n+2){border-bottom:0!important}.prospera-service-footer__item svg{width:30px;height:30px}.prospera-service-footer__item strong{font-size:10px}.prospera-service-footer__item small{font-size:8px}}
        @media(max-width:480px){.prospera-shell-header{padding-inline:5px;grid-template-columns:55px minmax(0,1fr)}.prospera-shell-logo img{width:42px}.prospera-shell-item i{margin:0 1px;font-size:11px}.prospera-shell-item a{padding:4px 3px;font-size:8.5px}}
        .prospera-card-strip{position:fixed;inset:98px 0 auto;z-index:999;height:20px;display:flex;align-items:center;justify-content:center;gap:14px;padding:0 clamp(12px,3vw,42px);box-sizing:border-box;border-bottom:1px solid #eee4c7;background:linear-gradient(90deg,#fffaf0,#fff5d9 55%,#fffaf0);color:#46516a;cursor:default}.prospera-card-strip-label{flex:0 0 auto;padding-right:14px;border-right:1px solid #e5d7ac;color:#967623;font-size:8px;font-weight:600;letter-spacing:.12em;line-height:12px}.prospera-card-strip ul{display:flex;align-items:center;gap:0;min-width:0;margin:0;padding:0;list-style:none;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}.prospera-card-strip ul::-webkit-scrollbar{display:none}.prospera-card-strip li{display:flex;align-items:center;flex:0 0 auto;white-space:nowrap;font-size:10px;font-weight:400;line-height:19px}.prospera-card-strip li+li::before{content:'';width:3px;height:3px;margin:0 14px;border-radius:50%;background:#c5a553;flex:0 0 auto}@media(max-width:768px){.prospera-card-strip{top:114px;justify-content:flex-start;gap:10px}.prospera-card-strip-label{padding-right:10px;font-size:7px;letter-spacing:.08em}.prospera-card-strip li+li::before{margin-inline:10px}}
        .prospera-bottom-strip{position:fixed;inset:auto 0 0;z-index:1002;height:24px;pointer-events:none;overflow:hidden;background:linear-gradient(115deg,#0046ad,#002f8d 68%,#002475);border-top:5px solid #ffe400;box-sizing:border-box}.prospera-bottom-strip::before{content:"";position:absolute;left:-3%;right:-3%;top:-19px;height:24px;border-radius:50%;background:#ffe400}
        .prospera-shell-header{grid-template-columns:auto minmax(0,1fr);gap:24px}.prospera-shell-header::after{display:none}.prospera-shell-logo{display:flex;align-items:center;gap:6px;text-decoration:none;white-space:nowrap}.prospera-brand-copy{display:flex;flex-direction:column;align-items:center;gap:5px;color:#132b70}.prospera-brand-title{display:flex;align-items:center;gap:7px;color:#c69208;font-size:11px;font-weight:800;letter-spacing:.08em;line-height:1.2}.prospera-brand-title::before,.prospera-brand-title::after{content:'';width:16px;height:2px;background:#f5c518}.prospera-brand-tagline{color:#164bce;font-weight:600;letter-spacing:-.045em;word-spacing:-.08em;font-family:'Segoe Script','Brush Script MT',cursive;font-size:13px;font-style:italic;line-height:1.3}.prospera-shell-header nav{justify-content:flex-end}@media(max-width:1050px) and (min-width:769px){.prospera-shell-header{padding-inline:18px;gap:12px}.prospera-shell-item a{padding-inline:6px;font-size:11px}.prospera-shell-logo{gap:6px}.prospera-brand-title{font-size:9px}.prospera-brand-tagline{font-size:11px}.prospera-brand-title::before,.prospera-brand-title::after{width:10px}}@media(max-width:768px){.prospera-shell-header{grid-template-columns:1fr;grid-template-areas:'logo' 'menu';gap:5px}.prospera-shell-logo{justify-self:start;gap:6px}.prospera-shell-header nav{justify-content:center}.prospera-brand-copy{gap:3px}.prospera-brand-title{font-size:9px}.prospera-brand-tagline{font-size:11px}.prospera-brand-title::before,.prospera-brand-title::after{width:12px}}
        .prospera-bottom-strip{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 24px;color:#fff;font-size:9px;font-weight:400;line-height:19px}.prospera-bottom-strip>span{position:relative;z-index:1;white-space:nowrap}@media(max-width:600px){.prospera-bottom-strip{padding-inline:8px;font-size:7px;gap:4px}}
        .prospera-bottom-contact{display:flex;align-items:center;flex-wrap:wrap;column-gap:14px;min-width:0;max-width:100%}.prospera-bottom-contact a svg{width:12px;height:12px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.prospera-bottom-contact a{display:inline-flex;align-items:center;gap:4px;color:inherit;text-decoration:none;pointer-events:auto;white-space:nowrap}.prospera-bottom-contact a:hover{text-decoration:underline}.prospera-bottom-contact a:focus-visible{outline:1px solid #ffe400;outline-offset:1px}
        @media(max-width:900px){.prospera-bottom-strip{height:auto;min-height:24px;flex-wrap:wrap;gap:0;padding-block:2px}.prospera-bottom-contact{column-gap:10px}.prospera-shell{padding-bottom:80px}}
        @media(max-width:768px){
          .prospera-shell{padding-top:114px}
          .prospera-card-strip{position:sticky;top:114px;height:auto;min-height:20px;flex-direction:column;align-items:flex-start;gap:4px;padding:7px 12px}
          .prospera-card-strip-label{padding-right:0;border-right:0}
          .prospera-card-strip ul{width:100%;flex-wrap:wrap;gap:3px 12px;overflow:visible}
          .prospera-card-strip li{flex:0 1 auto;white-space:normal;line-height:16px}
          .prospera-card-strip li+li::before{display:none}
        }
        @media(max-width:768px){
          .prospera-shell{padding-top:0}
          .prospera-top-strip{position:relative;inset:auto;height:auto;flex-wrap:wrap;justify-content:flex-start;gap:3px 12px;padding:5px 10px;overflow:visible}
          .prospera-top-strip-item{flex:0 1 auto;white-space:normal;line-height:16px}
          .prospera-shell-header{position:sticky;top:0}
          .prospera-card-strip{top:94px}
        }
        .prospera-top-strip-item + .prospera-top-strip-item::before{content:'|';color:#ffe400;margin-right:8px;font-size:12px;line-height:16px;flex:none}
        @media(max-width:768px){
          .prospera-top-strip{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:10px 12px;border-bottom:2px solid #f5c518}
          .prospera-top-strip-item{justify-content:flex-start;gap:7px;min-width:0;padding:7px 8px;border:1px solid #ffffff26;border-radius:8px;background:#ffffff0c;font-size:10px;line-height:1.4}
          .prospera-top-strip-item svg{width:17px;height:17px;flex:0 0 17px}
          .prospera-top-strip-item + .prospera-top-strip-item::before{display:none}
          .prospera-card-strip{gap:8px;padding:10px 12px 12px;background:linear-gradient(110deg,#fff8db,#fffdf3);border-bottom:1px solid #efd67b}
          .prospera-card-strip-label{font-size:8px;letter-spacing:.12em;color:#976000;font-weight:700}
          .prospera-card-strip ul{gap:6px}
          .prospera-card-strip li{padding:5px 10px;border:1px solid #e9dfc6;border-radius:5%;background:#fff;color:#24365e;font-size:10px;line-height:1.4}
        }
        @media(max-width:768px){
          .prospera-shell{padding-bottom:0}
          .prospera-bottom-strip{position:relative;inset:auto;height:auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;margin-top:20px;padding:16px 14px;border-top:3px solid #f5c518;font-size:10px;line-height:1.5;overflow:visible}
          .prospera-bottom-strip::before{display:none}
          .prospera-bottom-strip>span{white-space:normal}
          .prospera-bottom-contact{display:flex;justify-content:center;gap:8px;max-width:100%}
          .prospera-bottom-contact>span{order:2;flex:0 0 100%;margin-top:4px;text-align:center;color:#ffffffcf;font-size:9px}
          .prospera-bottom-contact a{justify-content:center;gap:6px;padding:8px 10px;border:1px solid #ffffff30;border-radius:8px;background:#ffffff0c;font-size:10px}
          .prospera-bottom-contact a svg{width:14px;height:14px;color:#ffe400}
          .prospera-bottom-strip>span:last-child{text-align:center;padding-top:10px;border-top:1px solid #ffffff26;color:#ffffffb8;font-size:9px}
        }
        @media(max-width:768px){
          .prospera-top-strip{gap:8px 14px;padding:12px 14px}
          .prospera-top-strip-item{padding:2px 0;border:0;border-radius:0;background:transparent;cursor:default}
          .prospera-card-strip ul{gap:8px 18px}
          .prospera-card-strip li{padding:0;border:0;border-radius:0;background:transparent;gap:7px;align-items:baseline;cursor:default}
          .prospera-card-strip li::before,.prospera-card-strip li+li::before{content:'';display:block;width:4px;height:4px;margin:0;border-radius:50%;background:#d6a000;flex:0 0 4px;align-self:center}
        }
        @media(max-width:768px){
          .prospera-top-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:3px 0;padding:7px 12px;background:linear-gradient(110deg,#edf5ff,#f8fbff);color:#244b91;border-bottom:1px solid #d5e4fb}
          .prospera-top-strip-item{display:inline-flex;flex:0 1 auto;gap:0;padding:0;font-size:9px;font-weight:500;line-height:1.5;justify-content:center}
          .prospera-top-strip-item svg{display:none}
          .prospera-top-strip-item + .prospera-top-strip-item::before{content:'';display:block;width:3px;height:3px;margin:0 8px;border-radius:50%;background:#d6a000;flex:0 0 3px}
        }
        @media(max-width:768px){
          .prospera-card-strip li{font-family:inherit;font-size:9px;font-weight:500;line-height:1.5;color:#244b91}
        }
        @media(max-width:768px){
          .prospera-shell-header,.prospera-card-strip{position:relative;inset:auto}
        }
        @media(max-width:768px){
          .prospera-shell{padding-top:calc(var(--pinned-0,60px) + var(--pinned-1,94px) + var(--pinned-2,60px));padding-bottom:var(--pinned-3,130px)}
          .prospera-top-strip{position:fixed;inset:0 0 auto}
          .prospera-shell-header{position:fixed;inset:var(--pinned-0,60px) 0 auto}
          .prospera-card-strip{position:fixed;inset:calc(var(--pinned-0,60px) + var(--pinned-1,94px)) 0 auto}
          .prospera-bottom-strip{position:fixed;inset:auto 0 0;margin-top:0}
        }
        @media(max-width:768px){
          .prospera-shell{padding-top:0}
          .prospera-top-strip,.prospera-card-strip{position:relative;inset:auto}
          .prospera-shell-header{position:sticky;inset:0 0 auto}
        }
        @media(max-width:768px){
          .prospera-shell{padding-top:var(--pinned-1,94px)}
          .prospera-shell-header{position:fixed;inset:0 0 auto}
          .prospera-bottom-strip{gap:3px;padding:6px 12px;background:#fffaf0;color:#687386;border-top:1px solid #eee4c7;font-size:9px;line-height:1.5}
          .prospera-bottom-contact{gap:3px 12px}
          .prospera-bottom-contact a{padding:0;border:0;border-radius:0;background:transparent;color:#687386;font-size:9px;line-height:1.5}
          .prospera-bottom-contact a svg{width:11px;height:11px;color:#b9a26b}
          .prospera-bottom-contact>span{margin-top:0;color:#687386;font-size:9px}
          .prospera-bottom-strip>span:last-child{padding-top:0;border-top:0;color:#687386;font-size:9px}
        }
        @media(max-width:768px){
          .prospera-top-strip,.prospera-card-strip{z-index:1}
          .prospera-shell-header{z-index:1000;background:#fff}
        }
        @media(max-width:768px){
          .prospera-shell-header{height:auto;min-height:104px;padding-top:7px;padding-bottom:5px;box-shadow:0 4px 16px rgba(20,75,180,.10)}
          .prospera-shell-logo img{width:54px;filter:saturate(1.3) contrast(1.08)}
          .prospera-brand-title{font-size:10px;color:#ad7600}
          .prospera-brand-title::before,.prospera-brand-title::after{background:#f5be00}
          .prospera-brand-tagline{font-size:12px;color:#064de0;font-weight:700}
          .prospera-shell-header nav{flex-wrap:wrap;row-gap:5px;overflow:visible}
          .prospera-shell-item a{color:#0646bd;font-size:10px;font-weight:700;padding:6px 4px;border-radius:5px}
          .prospera-shell-item a.active{color:#07358a;background:#fff3bc}
          .prospera-shell-item a::after{background:#edb500;box-shadow:0 2px 6px rgba(245,197,24,.35)}
          .prospera-shell-item i{color:#d99b00}
        }
        @media(max-width:768px){
          .prospera-top-strip{position:fixed;inset:0 0 auto;z-index:1001;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 10px;padding:7px 10px;background:linear-gradient(110deg,#0046ad,#002f8d);color:#fff;border-bottom:2px solid #f5c518}
          .prospera-top-strip-item{justify-content:flex-start;align-items:center;min-width:0;gap:5px;font-size:9px;font-weight:500;line-height:1.35;white-space:normal}
          .prospera-top-strip-item svg{display:block;width:14px;height:14px;flex:0 0 14px;stroke:#ffe400}
          .prospera-top-strip-item + .prospera-top-strip-item::before{display:none}
          .prospera-shell-header{inset:var(--pinned-0,70px) 0 auto}
          .prospera-shell{padding-top:calc(var(--pinned-0,70px) + var(--pinned-1,104px))}
        }
        @media(max-width:768px){
          .prospera-card-strip[data-page="home"]{flex-direction:row;align-items:center;gap:8px;padding:9px 10px}
          .prospera-card-strip[data-page="home"] .prospera-card-strip-label{white-space:nowrap;font-size:7px;letter-spacing:.06em}
          .prospera-card-strip[data-page="home"] ul{width:auto;flex:0 1 auto;flex-wrap:nowrap;justify-content:flex-start;gap:10px}
          .prospera-card-strip[data-page="home"] li{white-space:nowrap;gap:4px;font-size:9px}
          .prospera-card-strip[data-page="holidays"] ul{display:grid;grid-template-columns:repeat(3,max-content);justify-content:start;gap:6px 12px}
          .prospera-card-strip[data-page="holidays"] li{min-width:0;gap:4px;font-size:9px;line-height:1.4;align-items:center}
        }
        @media(max-width:768px){
          .prospera-card-strip[data-page="home"] .prospera-card-strip-label,.prospera-card-strip[data-page="holidays"] .prospera-card-strip-label{font-size:9px;letter-spacing:0;text-transform:none}
          .prospera-card-strip[data-page="holidays"]{gap:7px;padding:9px 10px;flex-direction:row;align-items:baseline;flex-wrap:wrap}
          .prospera-card-strip[data-page="holidays"] ul{width:auto;max-width:100%}
          .prospera-card-strip[data-page="home"] li::before,.prospera-card-strip[data-page="holidays"] li::before{content:'*';width:auto;height:auto;background:none;border-radius:0;flex:0 0 auto;color:#c38b00;font-weight:700;align-self:baseline}
        }
        @media(max-width:380px){
          .prospera-card-strip[data-page="home"]{gap:6px;padding-inline:8px}
          .prospera-card-strip[data-page="home"] ul{gap:7px}
          .prospera-card-strip[data-page="holidays"] ul{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 8px}
        }
      `}</style>
    </div>
  );
}
