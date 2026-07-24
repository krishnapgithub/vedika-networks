import { useState } from "react";

export default function Navbar() {
    const [showGstDetails, setShowGstDetails] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-tag">VN</span> Vedika Networks
                </div>

                <div className="nav-links">
                    <a href="#">Benefits</a>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <button type="button" className="gst-nav-button" onClick={() => setShowGstDetails(true)}>
                        GST Details
                    </button>
                </div>

                <a href="#" className="cta-btn">
                    Get Started
                </a>
            </nav>

            {showGstDetails && (
                <div className="gst-modal-backdrop" role="presentation" onClick={() => setShowGstDetails(false)}>
                    <section
                        className="gst-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gst-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="gst-modal-header">
                            <div>
                                <p className="gst-modal-eyebrow">GST Details</p>
                                <h2 id="gst-modal-title">Vedika Networks</h2>
                            </div>
                            <button
                                type="button"
                                className="gst-modal-close"
                                aria-label="Close GST details"
                                onClick={() => setShowGstDetails(false)}
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

                        <div className="gst-modal-actions">
                            <a href="/gst-certificate-signed.pdf" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                            <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">
                                Verify on GST Portal
                            </a>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
