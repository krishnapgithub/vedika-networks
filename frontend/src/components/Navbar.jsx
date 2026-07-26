import { useState } from "react";

const sectionPopups = {
    about: {
        label: "About Us",
        title: "About Vedika Networks",
        intro: "Vedika Networks is a multi-service business ecosystem built to connect people, services, information, and digital operations through one trusted platform.",
        sections: [
            {
                title: "Tours & Travels",
                text: "We support curated travel planning, proposal-ready tour packages, itinerary preparation, and customer-friendly travel desk services.",
            },
            {
                title: "Matrimonial Services",
                text: "Through NichayaVedika, we provide a family-oriented Telugu matrimonial experience focused on genuine profiles, privacy, and respectful matchmaking.",
            },
            {
                title: "Web Portal Creation",
                text: "We design and build responsive web portals, business websites, service dashboards, proposal tools, and content-driven digital platforms.",
            },
            {
                title: "Operational Control",
                text: "We help organize business workflows, manuals, service processes, admin coordination, and operational support for growing teams.",
            },
            {
                title: "Live Information Services",
                text: "We bring useful public information feeds into one place, including market updates, policy headlines, movie information, and business-relevant updates.",
            },
            {
                title: "Core Values",
                items: [
                    "Trust and transparency",
                    "Customer-first service",
                    "Practical digital solutions",
                    "Reliable operations",
                    "Respect for families, businesses, and communities",
                ],
            },
            {
                title: "Our Vision",
                text: "Our vision is to build one platform that supports multiple ecosystems, from travel and relationships to digital success and business operations.",
            },
        ],
        footer: "Vedika Networks - One Platform. Multiple Ecosystems.",
    },
    benefits: {
        label: "Benefits",
        title: "Benefits",
        text: "Coming soon. This section will highlight the main Vedika Networks advantages across travel, technology, and relationship services.",
    },
    features: {
        label: "Features",
        title: "Features",
        text: "Coming soon. This section will showcase platform tools, service workflows, partner support, and customer experience features.",
    },
    pricing: {
        label: "Pricing",
        title: "Pricing",
        text: "Coming soon. Pricing and package details will be added here once the service plans are finalized.",
    },
    start: {
        label: "Get Started",
        title: "Get Started",
        text: "Coming soon. Inquiry and onboarding options will be available here shortly.",
    },
};

export default function Navbar() {
    const [activePopup, setActivePopup] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentPopup = activePopup ? sectionPopups[activePopup] : null;
    const openPopup = (popup) => {
        setActivePopup(popup);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-tag">VN</span> Vedika Networks
                </div>

                <div className="nav-links">
                    <button type="button" className="nav-popup-button" onClick={() => openPopup("about")}>
                        About Us
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => openPopup("benefits")}>
                        Benefits
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => openPopup("features")}>
                        Features
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => openPopup("pricing")}>
                        Pricing
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => openPopup("gst")}>
                        GST Details
                    </button>
                </div>

                <button type="button" className="cta-btn" onClick={() => openPopup("start")}>
                    Get Started
                </button>

                <div className="mobile-nav">
                    <button
                        type="button"
                        className="mobile-menu-button"
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                    >
                        Menu
                    </button>

                    {isMobileMenuOpen && (
                        <div className="mobile-menu-panel">
                            <button type="button" onClick={() => openPopup("about")}>About Us</button>
                            <button type="button" onClick={() => openPopup("benefits")}>Benefits</button>
                            <button type="button" onClick={() => openPopup("features")}>Features</button>
                            <button type="button" onClick={() => openPopup("pricing")}>Pricing</button>
                            <button type="button" onClick={() => openPopup("gst")}>GST Details</button>
                            <button type="button" className="mobile-menu-cta" onClick={() => openPopup("start")}>
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {activePopup === "gst" && (
                <div className="gst-modal-backdrop" role="presentation" onClick={() => setActivePopup(null)}>
                    <section
                        className="gst-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gst-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="gst-modal-header">
                            <span id="gst-modal-title">GST Information</span>
                            <button
                                type="button"
                                className="gst-modal-close"
                                aria-label="Close GST details"
                                onClick={() => setActivePopup(null)}
                            >
                                X
                            </button>
                        </div>

                        <div className="gst-modal-gstin">
                            <span>GSTIN</span>
                            <strong>36AORPP4052L1ZC</strong>
                        </div>

                        <dl className="gst-modal-details">
                            <div>
                                <dt>Trade Name</dt>
                                <dd>Vedika Networks</dd>
                            </div>
                            <div>
                                <dt>Additional Trade Names</dt>
                                <dd>Nichaya Vedika, Vedika Tours</dd>
                            </div>
                            <div>
                                <dt>Business Type</dt>
                                <dd>Proprietorship</dd>
                            </div>
                            <div>
                                <dt>Registration Type</dt>
                                <dd>Regular</dd>
                            </div>
                            <div>
                                <dt>Registration From</dt>
                                <dd>22/07/2026</dd>
                            </div>
                            <div>
                                <dt>Certificate Issue Date</dt>
                                <dd>22/07/2026</dd>
                            </div>
                            <div>
                                <dt>Jurisdictional Office</dt>
                                <dd>Hyderabad</dd>
                            </div>
                        </dl>

                        <p className="gst-modal-note">Information shown for public GST verification.</p>
                    </section>
                </div>
            )}

            {currentPopup && (
                <div className="gst-modal-backdrop" role="presentation" onClick={() => setActivePopup(null)}>
                    <section
                        className="gst-modal section-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="section-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="gst-modal-header">
                            <span id="section-modal-title">{currentPopup.title}</span>
                            <button
                                type="button"
                                className="gst-modal-close"
                                aria-label={`Close ${currentPopup.label}`}
                                onClick={() => setActivePopup(null)}
                            >
                                X
                            </button>
                        </div>

                        <div className="gst-modal-gstin section-modal-hero">
                            <span>{currentPopup.label}</span>
                            <strong>{currentPopup.title}</strong>
                        </div>

                        <dl className="gst-modal-details section-modal-details">
                            {currentPopup.intro && (
                                <div>
                                    <dt>Overview</dt>
                                    <dd>{currentPopup.intro}</dd>
                                </div>
                            )}
                            {currentPopup.text && (
                                <div>
                                    <dt>Information</dt>
                                    <dd>{currentPopup.text}</dd>
                                </div>
                            )}
                            {currentPopup.sections?.map((section) => (
                                <div key={section.title}>
                                    <dt>{section.title}</dt>
                                    <dd>
                                        {section.text && <p>{section.text}</p>}
                                        {section.items && (
                                            <ul>
                                                {section.items.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {currentPopup.footer && <p className="gst-modal-note section-modal-footer">{currentPopup.footer}</p>}
                    </section>
                </div>
            )}
        </>
    );
}
