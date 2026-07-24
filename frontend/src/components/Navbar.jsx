import { useState } from "react";

const sectionPopups = {
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
    const currentPopup = activePopup ? sectionPopups[activePopup] : null;

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-tag">VN</span> Vedika Networks
                </div>

                <div className="nav-links">
                    <button type="button" className="nav-popup-button" onClick={() => setActivePopup("benefits")}>
                        Benefits
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => setActivePopup("features")}>
                        Features
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => setActivePopup("pricing")}>
                        Pricing
                    </button>
                    <button type="button" className="nav-popup-button" onClick={() => setActivePopup("gst")}>
                        GST Details
                    </button>
                </div>

                <button type="button" className="cta-btn" onClick={() => setActivePopup("start")}>
                    Get Started
                </button>
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
                        className="section-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="section-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="gst-modal-close"
                            aria-label={`Close ${currentPopup.label}`}
                            onClick={() => setActivePopup(null)}
                        >
                            X
                        </button>
                        <p className="section-modal-label">{currentPopup.label}</p>
                        <h2 id="section-modal-title">{currentPopup.title}</h2>
                        <p>{currentPopup.text}</p>
                    </section>
                </div>
            )}
        </>
    );
}
