export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-tag">VN</span> Vedika Networks
            </div>

            <div className="nav-links">
                <a href="#">Benefits</a>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
            </div>

            <a href="#" className="cta-btn">
                Get Started
            </a>
        </nav>
    );
}