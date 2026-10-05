import { site } from "@/lib/site";
import type { Dict } from "./fr";
import type { IconName } from "@/components/ui/Icon";

/** EN content — mirrors fr.ts. Bracketed text [ … ] is a PLACEHOLDER (see PLACEHOLDERS.md). */
const t = site.trialDays;

export const en: Dict = {
  meta: {
    siteTitle: "Kinetic — The fast Shopify theme built to convert",
    siteDescription:
      "Kinetic is a Shopify theme that replaces your apps with native settings: upsells, smart cart, landing pages. Faster, more profitable, no code.",
    home: {
      title: "Kinetic — The fast Shopify theme built to convert",
      description:
        "The Shopify theme that sets your sales in motion: built-in conversion tools, lightning-fast loading and a design that's fully yours. Free trial.",
    },
    features: {
      title: "Kinetic Shopify theme features",
      description:
        "Conversion, merchandising, design system, performance, SEO, international: see everything Kinetic ships natively, with no third-party app.",
    },
    pricing: {
      title: "Pricing — Kinetic Shopify theme",
      description: `Simple plans, no hidden fees. ${t}-day free trial, updates and support included, cancel in one click.`,
    },
    contact: {
      title: "Contact — Kinetic",
      description:
        "A question before you start, help with your store or an agency project? Write to the Kinetic team.",
    },
    legal: { title: "Legal notice — Kinetic", description: "Legal notice for the Kinetic website." },
    privacy: {
      title: "Privacy policy — Kinetic",
      description: "How Kinetic collects, uses and protects your personal data.",
    },
  },

  common: {
    skipToContent: "Skip to content",
    nav: {
      features: "Features",
      demos: "Demos",
      reviews: "Reviews",
      pricing: "Pricing",
      contact: "Contact",
    },
    mainNav: "Main navigation",
    login: "Log in",
    ctaTrial: "Free trial",
    ctaTrialLong: "Start your free trial",
    ctaDemos: "Explore the demos",
    ctaFeatures: "All features",
    ctaPricing: "See pricing",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToggle: "Toggle light / dark theme",
    langLabel: "Language",
    langSwitch: "Français",
    langSwitchShort: "FR",
    langSwitchAria: "Passer en français",
    announcement: {
      badge: "New",
      text: "Kinetic 2.0 is here with nested blocks and a redesigned design system.",
      cta: "See what's new",
    },
    ratingLabel: "Average rating",
    placeholderTitle: "Sample content to replace",
    reassurance: [`${t}-day free trial`, "No credit card", "Cancel in 1 click"],
    breadcrumbHome: "Home",
  },

  hero: {
    eyebrow: "Shopify 2.0 theme · Built to convert",
    titleStart: "The Shopify theme that sets your sales",
    titleHighlight: "in motion.",
    lead: "Kinetic packs what you used to pay apps for into a single theme: smart cart, cross-sells, reviews, landing pages. Your store loads faster, sells more, and every pixel stays on-brand.",
    points: ["Ready in one evening", "Zero lines of code", "Updates included"],
    primary: "Start your free trial",
    secondary: "Explore the demos",
    proof: "[4.9]/5 · [250+] verified reviews",
    proofSub: "[Rating and review count to replace]",
  },

  mockups: {
    url: "your-store.com",
    productName: "Pulse watch — Pearl white",
    productPrice: "€149",
    addToCart: "Add to cart",
    inStock: "In stock · ships within 24h",
    freeShipping: "€12 away from free shipping",
    pageSpeed: "Speed score",
    conversions: "Conversion",
    cartTitle: "Your cart",
    upsellTitle: "Often bought with",
    upsellItem: "Onde headphones",
    upsellPrice: "€89",
    add: "Add",
    checkout: "Checkout",
    subtotal: "Subtotal",
    editorSections: "Sections",
    editorBlocks: ["Animated banner", "Product gallery", "Trust bar", "Customer reviews", "Cross-sells", "FAQ"],
    editorAdd: "Add block",
    templates: ["Product", "Collection", "Landing", "About", "Launch", "Listicle"],
    landingTag: "Launch",
    landingTitle: "The new collection has landed",
    landingCta: "Discover",
    countdown: "Offer ends in",
    heroAlt: "White smartwatch on a light grey background, shown on a product page",
    upsellAlt: "Black headphones on a yellow background",
  },

  logos: {
    title: "Stores already speeding up with Kinetic",
    placeholder: "[Client logo]",
  },

  benefits: {
    eyebrow: "Why Kinetic",
    title: "Everything you need to sell. Nothing that slows you down.",
    lead: "We took the usual friction of a Shopify store — stacked apps, heavy pages, rigid design — and removed it, one piece at a time.",
    items: [
      {
        icon: "puzzle" as IconName,
        title: "Fewer apps, lower costs",
        text: "Reviews, cross-sells, bundles, timers, mega menu: the features you rented one by one now ship with the theme.",
      },
      {
        icon: "gauge" as IconName,
        title: "Speed you can feel",
        text: "Code loads on demand with no external library. Every page only carries what it actually displays.",
      },
      {
        icon: "palette" as IconName,
        title: "Your brand, everywhere",
        text: "Colours, fonts, radii and spacing are set once in the design system, then applied across the whole store.",
      },
      {
        icon: "smartphone" as IconName,
        title: "Mobile first",
        text: "Every section is designed for thumbs before being widened for desktop — where most of your orders happen.",
      },
    ],
  },

  featureRows: {
    eyebrow: "Features",
    title: "One theme, four growth levers",
    lead: "Build, convert, adapt, launch: every step has its native tool inside the Shopify editor.",
    rows: [
      {
        visual: "editor" as const,
        eyebrow: "Visual editor",
        title: "Compose pages like building blocks",
        text: "Dozens of combinable blocks right inside the Shopify editor. Drag, nest, reorder: you get unique layouts without opening a single code file.",
        bullets: [
          "Nested blocks and dynamic sections",
          "Instant mobile and desktop preview",
          "Ready for Shopify's latest platform updates",
        ],
      },
      {
        visual: "cart" as const,
        eyebrow: "Conversion",
        title: "Sales levers wired into the theme",
        text: "Free-shipping bar, in-cart cross-sells, bundles, trust badges: each lever switches on with a toggle, no third-party script or extra subscription.",
        bullets: [
          "Cart drawer with recommendations",
          "Bundles and tiered discounts",
          "Honest urgency: low stock, timer, pre-order",
        ],
      },
      {
        visual: "templates" as const,
        eyebrow: "Ready-made templates",
        title: "Start from a page that already converts",
        text: "A library of templates designed by industry — product page, collection, about, launch page. Import, swap in your copy and visuals, publish.",
        bullets: [
          "One-click importable templates",
          "Structures based on e-commerce best practice",
          "New templates added with each update",
        ],
      },
      {
        visual: "landing" as const,
        eyebrow: "Native landing pages",
        title: "Campaign pages, no page builder",
        text: "Launches, sales, listicles, ad landing pages: build them with the same blocks as the rest of the site. No external tool to pay for, no script dragging load times down.",
        bullets: [
          "Campaign pages in minutes",
          "Same speed as the rest of the store",
          "Visual consistency guaranteed by the design system",
        ],
      },
    ],
  },

  performance: {
    eyebrow: "Performance",
    title: "Designed to be fast. Measured to stay fast.",
    lead: "Every millisecond saved brings a visitor closer to checkout. Kinetic starts from a lightweight base and refuses anything that isn't essential.",
    points: [
      { icon: "layers" as IconName, title: "On-demand loading", text: "Only the sections present on the page send their code to the browser." },
      { icon: "codeOff" as IconName, title: "Zero dependencies", text: "No jQuery, no animation library: short, targeted, native JavaScript." },
      { icon: "image" as IconName, title: "Responsive images", text: "Modern formats, sizes tailored to each screen and lazy loading off-screen." },
    ],
    scoresTitle: "Mobile Lighthouse scores",
    scoresNote: "[Sample scores — replace with your own measurements]",
    scores: [
      { label: "Performance", value: 98 },
      { label: "Accessibility", value: 100 },
      { label: "Best practices", value: 100 },
      { label: "SEO", value: 100 },
    ],
    loadTitle: "Time to display main content",
    loadRows: [
      { label: "Kinetic", value: "[1.1 s]", width: 26, brand: true },
      { label: "Standard theme + 6 apps", value: "[3.4 s]", width: 80, brand: false },
    ],
  },

  demos: {
    eyebrow: "Demo stores",
    title: "One foundation, as many stores as there are brands",
    lead: "Six fictional brands to see Kinetic adapt to your industry. Change the palette, fonts and rhythm: the structure that converts stays the same.",
    cta: "View demo",
    credit: "Photos: Unsplash",
    items: [
      { key: "mode", name: "Atelier Soleil", sector: "Fashion & apparel", accent: "#E8B23A", tone: "light" },
      { key: "beaute", name: "Sève", sector: "Natural cosmetics", accent: "#9C6B4A", tone: "light" },
      { key: "maison", name: "Nido", sector: "Furniture & decor", accent: "#D9A21B", tone: "dark" },
      { key: "outdoor", name: "Altitude", sector: "Outdoor & hiking", accent: "#3F7D4E", tone: "dark" },
      { key: "cafe", name: "Ruelle", sector: "Coffee roasters & deli", accent: "#B4682E", tone: "dark" },
      { key: "audio", name: "Ondes", sector: "Audio & tech", accent: "#F2C230", tone: "light" },
    ],
    alt: {
      mode: "Person in a yellow outfit posing outdoors, illustrating a fashion store",
      beaute: "Amber serum bottle on a pedestal, illustrating a cosmetics store",
      maison: "Yellow armchair in a bright living room, illustrating a decor store",
      outdoor: "Hiker with a backpack in a green valley, illustrating an outdoor store",
      cafe: "Close-up of roasted coffee beans, illustrating a deli store",
      audio: "Black headphones on a yellow background, illustrating a tech store",
    } as Record<string, string>,
  },

  comparison: {
    eyebrow: "Before / With Kinetic",
    title: "Stop stacking subscriptions",
    lead: "A standard theme forces you to patch every gap with an app. Kinetic replaces them with native settings.",
    beforeTitle: "Standard theme + apps",
    afterTitle: "With Kinetic",
    note: "[Indicative amounts to replace with your own estimates]",
    perMonth: "/mo",
    total: "Monthly total",
    before: [
      { label: "Customer reviews app", price: "[€15]" },
      { label: "Cross-sells & upsells", price: "[€25]" },
      { label: "Landing page builder", price: "[€40]" },
      { label: "Bundles & discounts", price: "[€20]" },
      { label: "Mega menu & advanced filters", price: "[€12]" },
      { label: "Timer & announcement bar", price: "[€10]" },
    ],
    beforeTotal: "[€122]",
    beforeCons: ["Third-party scripts slowing every page", "Inconsistent styles from app to app", "Conflicts with every update"],
    after: [
      "Reviews, upsells, bundles and timers built in",
      "Landing pages with native blocks",
      "One design system for the whole site",
      "One subscription, one support team",
    ],
    afterPriceLabel: "From",
    afterPrice: `€${site.prices.solo.yearly}`,
    afterPros: ["Lighter pages", "Consistent look", "Updates that don't break"],
  },

  steps: {
    eyebrow: "Getting started",
    title: "Live in three steps",
    lead: "No agency to brief, no integration delay: you stay in control of the schedule.",
    items: [
      { icon: "download" as IconName, title: "Start your trial", text: "Pick your plan, no commitment. The theme is instantly available in your account." },
      { icon: "upload" as IconName, title: "Install on Shopify", text: "Upload the file to your store or start from a demo. Your current theme stays live while you work." },
      { icon: "rocket" as IconName, title: "Customise, publish", text: "Set colours, fonts and content in the editor, check the mobile view, then go live in one click." },
    ],
  },

  stats: {
    eyebrow: "Results",
    title: "The impact, in numbers",
    note: "[Sample figures — replace with your measured, sourced data]",
    items: [
      { value: "[−40%]", label: "load time after migrating" },
      { value: "[+20%]", label: "average conversion rate uplift" },
      { value: "[€120]", label: "saved every month on apps" },
      { value: "[< 6h]", label: "average support response time" },
    ],
  },

  testimonials: {
    eyebrow: "Customer reviews",
    title: "What merchants say",
    lead: "[Sample testimonials — replace them with real, verified customer reviews.]",
    prev: "Previous review",
    next: "Next review",
    carouselLabel: "Customer testimonials",
    slideLabel: "Review {n} of {total}",
    items: [
      { quote: "[Customer review to replace] Describe the concrete result achieved: speed, sales, time saved.", name: "[First name L.]", role: "[Founder · fashion store]" },
      { quote: "[Customer review to replace] Mention the apps removed and the monthly savings.", name: "[First name L.]", role: "[Owner · delicatessen]" },
      { quote: "[Customer review to replace] Tell how quickly the editor was learned and the store went live.", name: "[First name L.]", role: "[Merchant · cosmetics]" },
      { quote: "[Customer review to replace] Quote an exchange with support and how fast it replied.", name: "[First name L.]", role: "[E-commerce manager · decor]" },
      { quote: "[Customer review to replace] Explain why the agency rolls Kinetic out for its clients.", name: "[First name L.]", role: "[Director · Shopify agency]" },
      { quote: "[Customer review to replace] Share how the conversion rate evolved after migrating.", name: "[First name L.]", role: "[Co-founder · outdoor brand]" },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Your questions, answered",
    lead: "Can't find your answer? The team will reply to you directly.",
    contactCta: "Ask a question",
    items: [
      {
        q: "Does Kinetic work with my current Shopify store?",
        a: "Yes. Kinetic is an Online Store 2.0 theme compatible with every Shopify store. Install it next to your current theme, set it up at your own pace, and publish when everything is ready. Your products, collections and orders stay untouched.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. Everything is configured from Shopify's visual editor: colours, fonts, sections, blocks and conversion features. Developers can go further, but it's never required.",
      },
      {
        q: "How does the free trial work?",
        a: `You get the full theme for ${t} days, no credit card needed. When the trial ends, continue with the plan that suits you — or stop, without paying anything.`,
      },
      {
        q: "How many stores does a licence cover?",
        a: "Each licence covers one production store. Development and staging stores are included for free. For several brands or agency clients, the Studio plan bundles licences together.",
      },
      {
        q: "What happens if I cancel my subscription?",
        a: "Cancel in one click from your account. Your store keeps running on the last installed version: you only lose access to new updates and support.",
      },
      {
        q: "Are updates included?",
        a: "Every update is included while your subscription is active: new sections, new templates, compatibility with Shopify changes and fixes. A public roadmap lets you vote for upcoming features.",
      },
      {
        q: "Can I uninstall my existing apps?",
        a: "In most cases, yes. Reviews, cross-sells, bundles, timers, mega menu and landing pages are built in. We recommend migrating gradually: enable the equivalent Kinetic feature, check it, then remove the app.",
      },
      {
        q: "Is Kinetic SEO-friendly?",
        a: "Yes: semantic HTML, product and FAQ structured data, configurable meta tags, responsive images and fast load times — all signals search engines take into account.",
      },
    ],
  },

  finalCta: {
    title: "Give your store some momentum.",
    lead: `Install Kinetic tonight, publish when you're ready. ${t}-day full trial, no credit card.`,
    primary: "Start your free trial",
    secondary: "Talk to the team",
  },

  footer: {
    pitch: "The fast, conversion-focused Shopify theme for brands that want to move forward without stacking apps.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    links: {
      features: "Features",
      demos: "Demo stores",
      pricing: "Pricing",
      reviews: "Reviews",
      contact: "Contact",
      partners: "Agency programme",
      login: "Customer area",
      legal: "Legal notice",
      privacy: "Privacy",
      cookies: "Manage cookies",
    },
    rights: "All rights reserved.",
    disclaimer: "Shopify is a registered trademark of Shopify Inc. Kinetic is an independent theme.",
    madeIn: "Designed in France",
  },

  cookies: {
    title: "Your cookie preferences",
    text: "We only use cookies required for the site to work. With your consent, we also measure traffic anonymously to improve our pages.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customise",
    save: "Save my choices",
    necessary: "Necessary",
    necessaryText: "Required for the site to work (theme, language and consent preferences).",
    analytics: "Audience measurement",
    analyticsText: "Anonymous visit statistics. Off by default.",
    alwaysOn: "Always on",
    learnMore: "Privacy policy",
  },

  stickyCta: { text: `${t}-day free trial`, cta: "Get started" },

  featuresPage: {
    eyebrow: "Features",
    title: "It's all in the theme already",
    lead: "Conversion, merchandising, design, performance, SEO and international: a complete view of what Kinetic ships natively, with no third-party app.",
    jump: "Jump to category",
    categories: [
      {
        id: "conversion",
        icon: "cart" as IconName,
        title: "Conversion",
        text: "The levers that turn a visit into an order.",
        items: ["Cart drawer with recommendations", "Free-shipping progress bar", "Bundles and tiered discounts", "Sticky add-to-cart on mobile", "Timer and low-stock indicator", "Pre-order and back-in-stock alerts"],
      },
      {
        id: "merchandising",
        icon: "tag" as IconName,
        title: "Merchandising",
        text: "Highlight the right product at the right time.",
        items: ["Mega menu with visuals", "Advanced collection filters and sorting", "Colour and image variant swatches", "Product comparison", "Customer reviews and photo galleries", "Custom badges"],
      },
      {
        id: "design",
        icon: "palette" as IconName,
        title: "Design system",
        text: "A consistent identity, set once.",
        items: ["Multiple colour palettes and schemes", "Typography and size scales", "Global radii, shadows and spacing", "Nested blocks and dynamic sections", "Subtle scroll animations", "Optional dark mode"],
      },
      {
        id: "performance",
        icon: "gauge" as IconName,
        title: "Performance",
        text: "A lightweight base that stays that way.",
        items: ["Code loaded section by section", "No external JavaScript library", "Responsive, lazy-loaded images", "Optimised fonts", "Smart link prefetching", "Minimal critical CSS"],
      },
      {
        id: "seo",
        icon: "search" as IconName,
        title: "SEO & accessibility",
        text: "Be found, and be usable by everyone.",
        items: ["Semantic HTML", "Product, FAQ and breadcrumb structured data", "Configurable meta and Open Graph tags", "Full keyboard navigation", "WCAG AA-compliant contrast", "Alt text on every visual"],
      },
      {
        id: "international",
        icon: "globe" as IconName,
        title: "International",
        text: "Sell across borders without friction.",
        items: ["Language and currency selector", "Shopify Markets compatible", "RTL-ready layouts", "Localised price formats", "Theme text translations", "Per-country shipping messages"],
      },
    ],
    replaceTitle: "What Kinetic replaces",
    replaceLead: "That many apps you can uninstall — and that many fewer subscriptions.",
    replace: ["Customer reviews", "Upsell & cross-sell", "Page builder", "Bundles", "Mega menu", "Timer", "Announcement bar", "Advanced filters", "Pre-order", "Comparison"],
    supportTitle: "And support to match",
    support: [
      { icon: "book" as IconName, title: "Step-by-step docs", text: "Every setting explained, with screenshots and short videos." },
      { icon: "headset" as IconName, title: "Human support", text: "A team that knows the theme inside out, by email and chat." },
      { icon: "refresh" as IconName, title: "Continuous updates", text: "Regular releases and a public roadmap." },
    ],
  },

  pricingPage: {
    eyebrow: "Pricing",
    title: "Clear pricing, every feature",
    lead: `Every plan includes the full theme, updates and support. ${t}-day free trial, no credit card.`,
    billingLabel: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "−20%",
    perMonth: "€ excl. VAT / mo",
    billedYearly: "billed yearly",
    billedMonthly: "billed monthly",
    popular: "Most popular",
    onQuote: "Custom quote",
    plans: [
      {
        id: "solo",
        name: "Solo",
        desc: "To launch or relaunch a store, with the whole theme from day one.",
        cta: "Try it free",
        features: ["1 production store", "Every section and block", "Built-in conversion tools", "Page templates", "Updates included", "Email support"],
      },
      {
        id: "growth",
        name: "Growth",
        desc: "For brands picking up speed that want closer support.",
        cta: "Try it free",
        features: ["Up to 3 production stores", "Everything in Solo, plus:", "Premium industry templates", "Priority chat support", "Video onboarding session", "Early access to new features"],
      },
      {
        id: "studio",
        name: "Studio",
        desc: "For agencies and freelancers rolling Kinetic out for clients.",
        cta: "Contact us",
        features: ["Multiple licences at volume pricing", "Everything in Growth, plus:", "Access to the theme's Git repository", "Direct line to the tech team", "Client presentation kit", "Listing in the partner directory"],
      },
    ],
    guaranteeTitle: `${site.refundDays}-day money-back guarantee`,
    guaranteeText: `After your trial, you still have ${site.refundDays} days to change your mind. One email is enough — we refund you, no questions asked.`,
    compareTitle: "Compare plans",
    compareFeature: "Feature",
    compareRows: [
      { label: "Production stores", values: ["1", "3", "Unlimited"] },
      { label: "Development stores", values: ["✓", "✓", "✓"] },
      { label: "Sections, blocks and conversion tools", values: ["✓", "✓", "✓"] },
      { label: "Page templates", values: ["Standard", "Standard + premium", "Standard + premium"] },
      { label: "Updates", values: ["✓", "✓ + early access", "✓ + early access"] },
      { label: "Support", values: ["Email", "Priority chat", "Dedicated channel"] },
      { label: "Video onboarding", values: ["—", "✓", "✓"] },
      { label: "Git repository access", values: ["—", "—", "✓"] },
    ],
    yes: "Included",
    no: "Not included",
    faqTitle: "Billing questions",
    faq: [
      { q: "Can I switch plans later?", a: "Yes, any time from your account. The change is immediate and the difference is prorated." },
      { q: "Which payment methods do you accept?", a: "Card (Visa, Mastercard, American Express) and SEPA direct debit. Invoices are available in your account." },
      { q: "Are prices shown excluding VAT?", a: "Yes. Applicable VAT is added based on your country and status (reverse charge for EU businesses with a VAT number)." },
      { q: "What happens at the end of the trial?", a: "Nothing automatic: no payment method is requested during the trial. Pick a plan to continue, or the theme simply stays unpublished." },
    ],
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Let's talk about your store",
    lead: "A question before you start, a technical issue or an agency project? Write to us: a real person will reply.",
    responseTime: "Reply within [24 business hours]",
    channels: [
      { icon: "mail" as IconName, title: "Pre-sales", text: "Advice on plans and migration.", value: site.email },
      { icon: "headset" as IconName, title: "Customer support", text: "Help with installation and settings.", value: site.supportEmail },
    ],
    faqLink: "Read the FAQ",
    form: {
      title: "Send a message",
      name: "Full name",
      email: "Email address",
      store: "Your store URL",
      optional: "optional",
      subject: "Subject",
      subjects: ["Pre-sales question", "Technical support", "Agency partnership", "Other request"],
      message: "Your message",
      messageHint: "At least 20 characters.",
      consent: "I agree that my data may be used to process my request, in line with the",
      consentLink: "privacy policy",
      submit: "Send message",
      sending: "Sending…",
      required: "required",
      success: "Thanks, your message is on its way! We'll get back to you very soon.",
      error: "The message couldn't be sent. Check the highlighted fields or try again in a moment.",
      errors: {
        name: "Enter your name (at least 2 characters).",
        email: "Enter a valid email address, e.g. name@domain.com.",
        store: "Enter a valid URL, e.g. https://my-store.com.",
        subject: "Choose a subject.",
        message: "Your message must be at least 20 characters long.",
        consent: "Your consent is required to process the request.",
      },
      errorSummary: "The form contains errors:",
    },
  },

  legalPage: {
    title: "Legal notice",
    updated: "Last updated: [date]",
    sections: [
      {
        h: "Publisher",
        p: `${site.legalName} — [legal form, share capital] — [registered address] — Company no. [number] — VAT [number] — Contact: ${site.email}`,
      },
      { h: "Publication director", p: "[Name of the publication director]" },
      { h: "Hosting", p: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA — vercel.com. [Update if you change host]" },
      {
        h: "Intellectual property",
        p: "All content on this site (text, visuals, logo, code) belongs to the publisher unless stated otherwise. Illustration photos come from Unsplash and are used under the Unsplash licence.",
      },
    ],
    placeholder: "[Page to be completed and reviewed by your legal advisor]",
  },

  privacyPage: {
    title: "Privacy policy",
    updated: "Last updated: [date]",
    sections: [
      { h: "Data collected", p: "Through the contact form: name, email address, store URL (optional) and message content. This data is only used to answer your request." },
      {
        h: "Cookies",
        p: "The site only stores necessary items (light/dark theme, language, consent choice). Audience measurement is only enabled with your consent and can be withdrawn any time via “Manage cookies” in the footer.",
      },
      { h: "Retention", p: "Messages are kept for [duration] at most, then deleted." },
      {
        h: "Your rights",
        p: `You have the right to access, rectify, erase, object and port your data. To exercise it: ${site.email}. You can also contact your data protection authority.`,
      },
    ],
    placeholder: "[Page to be completed and reviewed by your legal advisor / DPO]",
  },

  notFound: {
    title: "This page took a shortcut.",
    text: "The link may be old or mistyped. Don't worry: everything else is still here.",
    home: "Back to home",
    contact: "Report the link",
  },
};
