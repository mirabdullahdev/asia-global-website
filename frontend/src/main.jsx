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

const translations = {
  en: {
    brandTagline: "Apparel Sourcing Liaison",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      products: "Products",
      contact: "Contact"
    },
    pages: {
      about: "About Us",
      services: "Services",
      products: "Products"
    },
    hero: {
      eyebrow: "Pakistan based apparel sourcing office",
      title: "Reliable apparel sourcing from Pakistan.",
      copy:
        "Asia Global Textiles connects international importers with capable Pakistani vendors and keeps every order moving with clear communication, quality supervision, and shipment discipline.",
      cta: "Start an inquiry",
      panel:
        "From first inquiry to final shipment, one liaison office keeps the order visible.",
      metricStages: "Order stages supervised",
      metricAccountability: "Local point of accountability"
    },
    intro: {
      eyebrow: "Why importers work with us",
      title: "Local vendor access, international buyer discipline.",
      copy:
        "We act as the practical bridge between buyer expectations and factory execution, helping reduce sourcing risk while keeping development, production, and shipping conversations organized."
    },
    trust: [
      ["Importer support", "Clear communication for overseas buying teams."],
      ["Vendor network", "Experienced production partners for Pakistan apparel."],
      ["Quality assurance", "Checks and follow-up before problems travel."],
      ["Timely shipments", "Schedule tracking from approval to dispatch."]
    ],
    process: {
      eyebrow: "What we manage",
      title: "Every stage has someone watching it closely.",
      copy:
        "Sourcing is easier to trust when development, production, and shipment details are visible at the right time.",
      steps: [
        [
          "Inquiry",
          "Requirements, technical details, quantities, and timelines are reviewed before vendor direction."
        ],
        [
          "Development",
          "Sampling, fabric direction, trims, measurements, and approvals are followed with production awareness."
        ],
        [
          "Production",
          "Vendor coordination, progress checks, and buyer updates keep the order under active control."
        ],
        [
          "Shipment",
          "Final checks, packing readiness, documentation coordination, and dispatch follow-up stay organized."
        ]
      ]
    },
    capability: {
      eyebrow: "Built for confidence",
      title: "Hands-on supervision for specialized apparel orders.",
      copy:
        "Asia Global Textiles helps importers source goods out of Pakistan through experienced vendors and practical order management. The office is positioned to reduce uncertainty: faster answers, visible production status, and quality control before shipment.",
      items: [
        "Vendor selection aligned to product type",
        "Prompt communication from inquiry onward",
        "Sampling and development supervision",
        "Production tracking and shipment coordination",
        "Quality assurance before dispatch"
      ]
    },
    cta: {
      eyebrow: "Ready to discuss an order?",
      title: "Send your apparel sourcing inquiry to our Pakistan liaison office.",
      button: "Contact us"
    },
    contact: {
      eyebrow: "Contact",
      title: "Start a sourcing conversation.",
      copy:
        "Share your product requirements, target quantities, market needs, and shipment timeline. Asia Global Textiles will respond with the next practical step.",
      name: "Name",
      namePlaceholder: "Your name",
      company: "Company",
      companyPlaceholder: "Company name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      inquiry: "Inquiry",
      inquiryPlaceholder: "Tell us about the product, quantity, and timeline.",
      send: "Send via email",
      panelCopy: "Pakistan based apparel liaison office for international importers.",
      note:
        "From inquiry to development, production, quality assurance, and shipment supervision."
    },
    comingSoon: {
      title: "Coming soon",
      copyStart: "This section is being prepared. For current sourcing inquiries, contact Asia Global Textiles directly at"
    },
    footer: {
      copy: "Apparel sourcing and order supervision from Pakistan."
    },
    languageLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    homeAria: "Go to homepage"
  },
  es: {
    brandTagline: "Oficina de enlace para abastecimiento de prendas",
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      products: "Productos",
      contact: "Contacto"
    },
    pages: {
      about: "Nosotros",
      services: "Servicios",
      products: "Productos"
    },
    hero: {
      eyebrow: "Oficina de abastecimiento de prendas en Pakistán",
      title: "Abastecimiento confiable de prendas desde Pakistán.",
      copy:
        "Asia Global Textiles conecta a importadores internacionales con proveedores pakistaníes capacitados y mantiene cada pedido en marcha con comunicación clara, supervisión de calidad y disciplina en los embarques.",
      cta: "Iniciar consulta",
      panel:
        "Desde la primera consulta hasta el embarque final, una oficina de enlace mantiene el pedido visible.",
      metricStages: "Etapas del pedido supervisadas",
      metricAccountability: "Punto local de responsabilidad"
    },
    intro: {
      eyebrow: "Por qué trabajan con nosotros",
      title: "Acceso local a proveedores, disciplina para compradores internacionales.",
      copy:
        "Actuamos como el puente práctico entre las expectativas del comprador y la ejecución de fábrica, ayudando a reducir el riesgo de abastecimiento y manteniendo organizadas las conversaciones de desarrollo, producción y embarque."
    },
    trust: [
      ["Soporte para importadores", "Comunicación clara para equipos de compra internacionales."],
      ["Red de proveedores", "Socios de producción experimentados para prendas de Pakistán."],
      ["Aseguramiento de calidad", "Controles y seguimiento antes de que los problemas avancen."],
      ["Embarques a tiempo", "Seguimiento del cronograma desde la aprobación hasta el despacho."]
    ],
    process: {
      eyebrow: "Lo que gestionamos",
      title: "Cada etapa tiene supervisión cercana.",
      copy:
        "El abastecimiento genera más confianza cuando el desarrollo, la producción y el embarque son visibles en el momento correcto.",
      steps: [
        [
          "Consulta",
          "Revisamos requisitos, detalles técnicos, cantidades y plazos antes de orientar al proveedor adecuado."
        ],
        [
          "Desarrollo",
          "Damos seguimiento a muestras, telas, avíos, medidas y aprobaciones con criterio de producción."
        ],
        [
          "Producción",
          "La coordinación con proveedores, los controles de avance y las actualizaciones al comprador mantienen el pedido bajo control."
        ],
        [
          "Embarque",
          "Las revisiones finales, empaque, documentación y despacho se mantienen organizados."
        ]
      ]
    },
    capability: {
      eyebrow: "Construido para generar confianza",
      title: "Supervisión directa para pedidos especializados de prendas.",
      copy:
        "Asia Global Textiles ayuda a importadores a abastecerse desde Pakistán mediante proveedores experimentados y una gestión práctica del pedido. La oficina está preparada para reducir la incertidumbre: respuestas rápidas, estado visible de producción y control de calidad antes del embarque.",
      items: [
        "Selección de proveedores según el tipo de producto",
        "Comunicación rápida desde la consulta inicial",
        "Supervisión de muestras y desarrollo",
        "Seguimiento de producción y coordinación de embarques",
        "Aseguramiento de calidad antes del despacho"
      ]
    },
    cta: {
      eyebrow: "¿Listo para conversar sobre un pedido?",
      title: "Envíe su consulta de abastecimiento a nuestra oficina de enlace en Pakistán.",
      button: "Contactar"
    },
    contact: {
      eyebrow: "Contacto",
      title: "Inicie una conversación de abastecimiento.",
      copy:
        "Comparta los requisitos del producto, cantidades objetivo, necesidades del mercado y fecha estimada de embarque. Asia Global Textiles responderá con el siguiente paso práctico.",
      name: "Nombre",
      namePlaceholder: "Su nombre",
      company: "Empresa",
      companyPlaceholder: "Nombre de la empresa",
      email: "Correo electrónico",
      emailPlaceholder: "usted@ejemplo.com",
      inquiry: "Consulta",
      inquiryPlaceholder: "Cuéntenos sobre el producto, cantidad y plazo.",
      send: "Enviar por correo",
      panelCopy: "Oficina de enlace de prendas en Pakistán para importadores internacionales.",
      note:
        "Desde la consulta hasta el desarrollo, producción, aseguramiento de calidad y supervisión del embarque."
    },
    comingSoon: {
      title: "Próximamente",
      copyStart: "Esta sección está en preparación. Para consultas actuales de abastecimiento, contacte directamente a Asia Global Textiles en"
    },
    footer: {
      copy: "Abastecimiento de prendas y supervisión de pedidos desde Pakistán."
    },
    languageLabel: "Idioma",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    homeAria: "Ir a la página principal"
  }
};

function App() {
  const [route, setRoute] = React.useState(getInitialRoute);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [language, setLanguage] = React.useState(() => localStorage.getItem("language") || "en");
  const copy = translations[language];

  React.useEffect(() => {
    const onPopState = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    setMenuOpen(false);
    window.history.pushState(null, "", nextRoute === "home" ? "/" : `/${nextRoute}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <Header
        route={route}
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {route === "home" && <LandingPage copy={copy} onNavigate={navigate} />}
        {route === "contact" && <ContactPage copy={copy} />}
        {copy.pages[route] && <ComingSoon copy={copy} title={copy.pages[route]} />}
      </main>
      <Footer copy={copy} onNavigate={navigate} />
    </div>
  );
}

function getInitialRoute() {
  const route = window.location.pathname.replace("/", "") || "home";
  return route === "contact" || translations.en.pages[route] ? route : "home";
}

function Header({ route, copy, language, onLanguageChange, onNavigate, menuOpen, setMenuOpen }) {
  const navItems = [
    ["home", copy.nav.home],
    ["about", copy.nav.about],
    ["services", copy.nav.services],
    ["products", copy.nav.products],
    ["contact", copy.nav.contact]
  ];

  return (
    <header className="header">
      <button className="brand" onClick={() => onNavigate("home")} aria-label={copy.homeAria}>
        <img src={logoSrc} alt="Asia Global Textiles" />
        <span className="brand-text">{copy.brandTagline}</span>
      </button>

      <div className={menuOpen ? "nav-wrap nav-open" : "nav-wrap"}>
        <nav className="nav" aria-label="Primary navigation">
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

        <div className="language-switcher" aria-label={copy.languageLabel}>
          {["en", "es"].map((code) => (
            <button
              key={code}
              className={language === code ? "active" : ""}
              onClick={() => onLanguageChange(code)}
              type="button"
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        className="icon-button menu-button"
        aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function LandingPage({ copy, onNavigate }) {
  const processIcons = [<ClipboardCheck />, <Shirt />, <PackageCheck />, <Truck />];
  const trustIcons = [<Globe2 />, <Factory />, <ShieldCheck />, <Timer />];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy-block">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-copy">{copy.hero.copy}</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => onNavigate("contact")}>
                {copy.hero.cta} <ArrowRight size={18} />
              </button>
              <a className="secondary-button" href="mailto:info@asiaglobaltex.com">
                <Mail size={18} /> info@asiaglobaltex.com
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Asia Global Textiles order supervision">
            <img src={logoSrc} alt="Asia Global Textiles" />
            <div className="panel-divider" />
            <p>{copy.hero.panel}</p>
            <div className="metric-row">
              <div>
                <strong>4</strong>
                <span>{copy.hero.metricStages}</span>
              </div>
              <div>
                <strong>1</strong>
                <span>{copy.hero.metricAccountability}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="intro-band">
        <div>
          <p className="section-kicker">{copy.intro.eyebrow}</p>
          <h2>{copy.intro.title}</h2>
        </div>
        <p>{copy.intro.copy}</p>
      </section>

      <section className="trust-strip" aria-label="Trust indicators">
        {copy.trust.map(([title, text], index) => (
          <TrustItem key={title} icon={trustIcons[index]} title={title} text={text} />
        ))}
      </section>

      <section className="split-section">
        <div className="section-heading">
          <p className="section-kicker">{copy.process.eyebrow}</p>
          <h2>{copy.process.title}</h2>
          <p>{copy.process.copy}</p>
        </div>
        <div className="process-grid">
          {copy.process.steps.map(([title, text], index) => (
            <ProcessStep key={title} icon={processIcons[index]} title={title} text={text} />
          ))}
        </div>
      </section>

      <section className="capability-band">
        <div className="band-copy">
          <p className="section-kicker">{copy.capability.eyebrow}</p>
          <h2>{copy.capability.title}</h2>
          <p>{copy.capability.copy}</p>
        </div>
        <div className="assurance-list">
          {copy.capability.items.map((item) => (
            <div className="assurance-item" key={item}>
              <CheckCircle2 size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-cta">
        <div>
          <p className="section-kicker">{copy.cta.eyebrow}</p>
          <h2>{copy.cta.title}</h2>
        </div>
        <button className="primary-button dark" onClick={() => onNavigate("contact")}>
          {copy.cta.button} <ArrowRight size={18} />
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

function ContactPage({ copy }) {
  return (
    <section className="page-section contact-page">
      <div className="page-heading">
        <p className="section-kicker">{copy.contact.eyebrow}</p>
        <h1>{copy.contact.title}</h1>
        <p>{copy.contact.copy}</p>
      </div>

      <div className="contact-layout">
        <form className="contact-form">
          <label>
            {copy.contact.name}
            <input type="text" name="name" placeholder={copy.contact.namePlaceholder} />
          </label>
          <label>
            {copy.contact.company}
            <input type="text" name="company" placeholder={copy.contact.companyPlaceholder} />
          </label>
          <label>
            {copy.contact.email}
            <input type="email" name="email" placeholder={copy.contact.emailPlaceholder} />
          </label>
          <label>
            {copy.contact.inquiry}
            <textarea name="message" rows="6" placeholder={copy.contact.inquiryPlaceholder} />
          </label>
          <a className="primary-button form-mail" href="mailto:info@asiaglobaltex.com">
            <Mail size={18} /> {copy.contact.send}
          </a>
        </form>

        <aside className="contact-panel">
          <img className="panel-logo" src={logoSrc} alt="Asia Global Textiles" />
          <h2>Asia Global Textiles</h2>
          <p>{copy.contact.panelCopy}</p>
          <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>
          <div className="contact-note">{copy.contact.note}</div>
        </aside>
      </div>
    </section>
  );
}

function ComingSoon({ copy, title }) {
  return (
    <section className="page-section coming-soon">
      <p className="section-kicker">{title}</p>
      <h1>{copy.comingSoon.title}</h1>
      <p>
        {copy.comingSoon.copyStart}{" "}
        <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>.
      </p>
    </section>
  );
}

function Footer({ copy, onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={logoSrc} alt="Asia Global Textiles" />
        <strong>Asia Global Textiles</strong>
        <p>{copy.footer.copy}</p>
      </div>
      <div className="footer-links">
        <button onClick={() => onNavigate("home")}>{copy.nav.home}</button>
        <button onClick={() => onNavigate("contact")}>{copy.nav.contact}</button>
        <a href="mailto:info@asiaglobaltex.com">info@asiaglobaltex.com</a>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
