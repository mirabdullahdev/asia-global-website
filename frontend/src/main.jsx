import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Globe2,
  Mail,
  Menu,
  PackageCheck,
  ShieldCheck,
  Shirt,
  Timer,
  Truck,
  X
} from "lucide-react";
import "./styles.css";

const logoSrc = "/brand/asia-global-textiles-logo.png";

const comingSoonPages = {
  about: "About Us",
  services: "Services",
  products: "Products"
};

function App() {
  const [route, setRoute] = React.useState(getInitialRoute);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onPopState = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    setMenuOpen(false);
    window.history.pushState(null, "", nextRoute === "home" ? "/" : `/${nextRoute}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <Header route={route} onNavigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        {route === "home" && <LandingPage onNavigate={navigate} />}
        {route === "contact" && <ContactPage />}
        {comingSoonPages[route] && <ComingSoon title={comingSoonPages[route]} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

function getInitialRoute() {
  const route = window.location.pathname.replace("/", "") || "home";
  return route === "contact" || comingSoonPages[route] ? route : "home";
}

function Header({ route, onNavigate, menuOpen, setMenuOpen }) {
  const navItems = [
    ["home", "Home"],
    ["about", "About Us"],
    ["services", "Services"],
    ["products", "Products"],
    ["contact", "Contact"]
  ];

  return (
    <header className="header">
      <button className="brand" onClick={() => onNavigate("home")} aria-label="Go to homepage">
        <img src={logoSrc} alt="Asia Global Textiles" />
        <span className="brand-text">Apparel Sourcing Liaison</span>
      </button>

      <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Primary navigation">
        {navItems.map(([key, label]) => (
          <button
            key={key}
            className={route === key ? "active" : ""}
            onClick={() => onNavigate(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        className="icon-button menu-button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function LandingPage({ onNavigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy-block">
            <p className="eyebrow">Pakistan based apparel sourcing office</p>
            <h1>Reliable apparel sourcing from Pakistan.</h1>
            <p className="hero-copy">
              Asia Global Textiles connects international importers with capable Pakistani vendors
              and keeps every order moving with clear communication, quality supervision, and
              shipment discipline.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => onNavigate("contact")}>
                Start an inquiry <ArrowRight size={18} />
              </button>
              <a className="secondary-button" href="mailto:info@asiaglobaltex.com">
                <Mail size={18} /> info@asiaglobaltex.com
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Asia Global Textiles order supervision">
            <img src={logoSrc} alt="Asia Global Textiles" />
            <div className="panel-divider" />
            <p>From first inquiry to final shipment, one liaison office keeps the order visible.</p>
            <div className="metric-row">
              <div>
                <strong>4</strong>
                <span>Order stages supervised</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Local point of accountability</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="intro-band">
        <div>
          <p className="section-kicker">Why importers work with us</p>
          <h2>Local vendor access, international buyer discipline.</h2>
        </div>
        <p>
          We act as the practical bridge between buyer expectations and factory execution, helping
          reduce sourcing risk while keeping development, production, and shipping conversations
          organized.
        </p>
      </section>

      <section className="trust-strip" aria-label="Trust indicators">
        <TrustItem icon={<Globe2 />} title="Importer support" text="Clear communication for overseas buying teams." />
        <TrustItem icon={<Factory />} title="Vendor network" text="Experienced production partners for Pakistan apparel." />
        <TrustItem icon={<ShieldCheck />} title="Quality assurance" text="Checks and follow-up before problems travel." />
        <TrustItem icon={<Timer />} title="Timely shipments" text="Schedule tracking from approval to dispatch." />
      </section>

      <section className="split-section">
        <div className="section-heading">
          <p className="section-kicker">What we manage</p>
          <h2>Every stage has someone watching it closely.</h2>
          <p>
            Sourcing is easier to trust when development, production, and shipment details are
            visible at the right time.
          </p>
        </div>
        <div className="process-grid">
          <ProcessStep icon={<ClipboardCheck />} title="Inquiry" text="Requirements, technical details, quantities, and timelines are reviewed before vendor direction." />
          <ProcessStep icon={<Shirt />} title="Development" text="Sampling, fabric direction, trims, measurements, and approvals are followed with practical production awareness." />
          <ProcessStep icon={<PackageCheck />} title="Production" text="Vendor coordination, progress checks, and buyer updates keep the order under active control." />
          <ProcessStep icon={<Truck />} title="Shipment" text="Final checks, packing readiness, documentation coordination, and dispatch follow-up stay organized." />
        </div>
      </section>

      <section className="capability-band">
        <div className="band-copy">
          <p className="section-kicker">Built for confidence</p>
          <h2>Hands-on supervision for specialized apparel orders.</h2>
          <p>
            Asia Global Textiles helps importers source goods out of Pakistan through experienced
            vendors and practical order management. The office is positioned to reduce uncertainty:
            faster answers, visible production status, and quality control before shipment.
          </p>
        </div>
        <div className="assurance-list">
          {[
            "Vendor selection aligned to product type",
            "Prompt communication from inquiry onward",
            "Sampling and development supervision",
            "Production tracking and shipment coordination",
            "Quality assurance before dispatch"
          ].map((item) => (
            <div className="assurance-item" key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-cta">
        <div>
          <p className="section-kicker">Ready to discuss an order?</p>
          <h2>Send your apparel sourcing inquiry to our Pakistan liaison office.</h2>
        </div>
        <button className="primary-button dark" onClick={() => onNavigate("contact")}>
          Contact us <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="trust-item">
      {React.cloneElement(icon, { size: 25 })}
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function ProcessStep({ icon, title, text }) {
  return (
    <article className="process-card">
      <div className="process-icon">{React.cloneElement(icon, { size: 24 })}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ContactPage() {
  return (
    <section className="page-section contact-page">
      <div className="page-heading">
        <p className="section-kicker">Contact</p>
        <h1>Start a sourcing conversation.</h1>
        <p>
          Share your product requirements, target quantities, market needs, and shipment timeline.
          Asia Global Textiles will respond with the next practical step.
        </p>
      </div>

      <div className="contact-layout">
        <form className="contact-form">
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Company
            <input type="text" name="company" placeholder="Company name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Inquiry
            <textarea name="message" rows="6" placeholder="Tell us about the product, quantity, and timeline." />
          </label>
          <a className="primary-button form-mail" href="mailto:info@asiaglobaltex.com">
            <Mail size={18} /> Send via email
          </a>
        </form>

        <aside className="contact-panel">
          <img className="panel-logo" src={logoSrc} alt="Asia Global Textiles" />
          <h2>Asia Global Textiles</h2>
          <p>Pakistan based apparel liaison office for international importers.</p>
          <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>
          <div className="contact-note">
            From inquiry to development, production, quality assurance, and shipment supervision.
          </div>
        </aside>
      </div>
    </section>
  );
}

function ComingSoon({ title }) {
  return (
    <section className="page-section coming-soon">
      <p className="section-kicker">{title}</p>
      <h1>Coming soon</h1>
      <p>
        This section is being prepared. For current sourcing inquiries, contact Asia Global Textiles
        directly at <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>.
      </p>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={logoSrc} alt="Asia Global Textiles" />
        <strong>Asia Global Textiles</strong>
        <p>Apparel sourcing and order supervision from Pakistan.</p>
      </div>
      <div className="footer-links">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
        <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
