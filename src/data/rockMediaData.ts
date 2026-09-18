import {
  ProcessStep,
  ServiceItem,
  PortfolioProject,
  StudioItem,
  EquipmentItem,
  ClientItem,
  FAQItem,
  TeamMember,
  MediaServicePackage,
} from "../types";

export const HERO_DATA = {
  name: "Kamal Azam",
  role: "Content Creator & Media Production",

  videoMp4: "https://res.cloudinary.com/spk1t8xs/video/upload/0917_3.mp4",
  videoWebm: "https://res.cloudinary.com/spk1t8xs/video/upload/0917_3.webm",

  posterUrl:
    "https://kamalazam.com/assets/hero_cinematic_automotive_1789133676136-Bf8Y8A7B.jpg",

  logoUrl: "/kamal-azam-logo.png",

  phone: "01011633339",
  phoneDisplay: "01011633339",

  // WhatsApp links should use the international number without "+"
  whatsappUrl: "https://wa.me/201011633339",

  email: "contact@kamalazam.com",

  tagline: "We start with art.",

  subtagline:
    "Synthesizing cinematic craft with measurable commercial performance. Precision frame craft from principal cinematography to omnichannel distribution.",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Pre-Production",
    description:
      "Creative strategy, script development, shot list engineering, casting, and precision location scouting across tailored production environments.",
    deliverables: [
      "Creative Strategy & Concept Blueprint",
      "Scriptwriting & Storyboard Matrix",
      "Location Scouting & Talent Casting",
      "Production Schedule & Call Sheets",
    ],
  },

  {
    number: "02",
    title: "Production",
    description:
      "On-set cinematic execution utilizing anamorphic cinema packages, high-output lighting, and meticulous optical choreography.",
    deliverables: [
      "Cinema Camera Units & Anamorphic Optics",
      "Precision Lighting & Multi-Track Sound",
      "On-Set Art Direction & Frame Choreography",
      "Live Directorial Monitoring & Playback",
    ],
  },

  {
    number: "03",
    title: "Post-Production",
    description:
      "Sculpting visual narrative through DaVinci Resolve color mastering, spatial sound design, and omnichannel platform distribution formats.",
    deliverables: [
      "Editorial Assembly & Narrative Pacing",
      "DaVinci Resolve HDR Color Mastering",
      "Bespoke Sound Design & Dynamic Mix",
      "Omnichannel Multi-Format Delivery (16:9, 9:16, DCI-4K)",
    ],
  },
];

export const SERVICES_ITEMS: ServiceItem[] = [
  {
    id: "cinematic-video",
    title: "Cinematic Video Production",
    shortDesc:
      "Commercial direction, anamorphic cinematography, and high-impact brand films engineered to capture attention and convert.",
    fullDesc:
      "From 60-second national television spots to episodic brand films, our video production combines cinema-grade optics, compelling storytelling, and technical rigor to command authority.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b701_film.svg",
    bgImage:
      "https://kamalazam.com/assets/service_cinematic_video_1789133980920-Ds0gRJe3.jpg",
  },

  {
    id: "editorial-photography",
    title: "Editorial & Stills Photography",
    shortDesc:
      "High-contrast chiaroscuro, automotive stills, luxury product photography, and architectural visual storytelling.",
    fullDesc:
      "Capturing the essence of luxury brands and products with medium-format precision, controlled studio lighting, and high-end frequency separation retouching.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b705_aperture.svg",
    bgImage:
      "https://kamalazam.com/assets/service_editorial_photo_1789133996251-DKyOkjmc.jpg",
  },

  {
    id: "digital-media-strategy",
    title: "Digital Media & Strategy",
    shortDesc:
      "Closing the loop between creative assets and calculated digital performance through media buying and social direction.",
    fullDesc:
      "Content creation without strategic distribution is incomplete. We orchestrate targeted ad campaigns, A/B creative testing, and organic social engines designed for measurable business growth.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b704_smartphone.svg",
    bgImage:
      "https://kamalazam.com/assets/service_digital_media_1789134008680-D11hFe1_.jpg",
  },

  {
    id: "documentary-film",
    title: "Documentary & Founder Stories",
    shortDesc:
      "Human resonance, emotional authenticity, and documentary finesse that builds lasting brand authority and trust.",
    fullDesc:
      "Authentic, character-driven storytelling capturing pivotal milestones, institutional heritage, and executive vision with cinematic intimacy.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b702_laptop.svg",
    bgImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "podcast-broadcast",
    title: "Podcast & Vodcast Production",
    shortDesc:
      "Turnkey multicam 4K vodcasts, premium acoustic treatment, live-switched streams, and dynamic sound recording.",
    fullDesc:
      "Equipped with Shure broadcast microphones, 4K multi-angle cinema cameras, and real-time live switching for modern content creators and brands.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b703_support-alt.svg",
    bgImage:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67c478d542c290eedb23b82d_Podcast-studio-set-609688.jpg",
  },

  {
    id: "post-color-grading",
    title: "Post-Production & HDR Grading",
    shortDesc:
      "DaVinci Resolve color mastering, VFX title design, immersive foley soundscapes, and final master encoding.",
    fullDesc:
      "Every cut, transition, and color grade is calibrated on reference monitors. We develop custom show LUTs and deliver stunning HDR and Rec.709 outputs tailored for cinema and web screens.",
    icon:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/67c478d542c290eedb23b706_cards.svg",
    bgImage:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "ka3b-commercial",
    title: "Ka3b Footwear Campaign",
    category: "Commercial Ads",
    client: "Ka3b Footwear",
    year: "2024",
    duration: "0:45",
    thumbnail:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67fe6b7e846b6e8c5d08fcad_tv%20ad%20.png",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "A fast-paced commercial showcasing footwear durability and style across historic architecture and modern streets.",
    featured: true,
  },

  {
    id: "voices-in-motion-podcast",
    title: "Voices in Motion Podcast Showreel",
    category: "Podcasts",
    client: "Kamal Azam Media Production",
    year: "2024",
    duration: "1:30",
    thumbnail:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67fe6b43c76742c0fdfbfc8f_podcast.png",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "Multicam 4K vodcast production featuring dynamic acoustic lighting, Shure SM7B arrays, and live video switching.",
    featured: true,
  },

  {
    id: "castrol-power-performance",
    title: "Castrol Power & Performance",
    category: "Commercial Ads",
    client: "Castrol",
    year: "2024",
    duration: "1:15",
    thumbnail:
      "https://kamalazam.com/assets/hero_cinematic_automotive_1789133676136-Bf8Y8A7B.jpg",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "High-adrenaline commercial film demonstrating engine resilience under extreme conditions with specialized high-speed cinema optics.",
    featured: true,
  },

  {
    id: "bosta-logistics-story",
    title: "Bosta: Fast Forward Delivery",
    category: "Documentaries",
    client: "Bosta Logistics",
    year: "2023",
    duration: "3:20",
    thumbnail:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "An intimate documentary exploring the dispatch centers, algorithms, and human stories fueling Egypt's e-commerce revolution.",
    featured: true,
  },

  {
    id: "elsewedy-energy-film",
    title: "ElSewedy: Powering Horizons",
    category: "Brand Films",
    client: "ElSewedy Electric",
    year: "2024",
    duration: "2:10",
    thumbnail:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "Epic cinematic brand film documenting mega-infrastructure transformations across industrial landscapes with sweeping drone cinematography.",
    featured: false,
  },

  {
    id: "motion-animation-spacetoon",
    title: "Spacetoon 2D World Explorers",
    category: "2D Animation",
    client: "Spacetoon",
    year: "2024",
    duration: "1:00",
    thumbnail:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67fe6b6cf767bde84c429e5b_anmimation.png",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "Hand-crafted 2D animation and stylized vector kinetic sequences designed for youth entertainment broadcasting.",
    featured: false,
  },

  {
    id: "cbe-financial-inclusion",
    title: "Central Bank of Egypt: Financial Future",
    category: "E-learning",
    client: "Central Bank of Egypt",
    year: "2023",
    duration: "2:45",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "Clean educational series explaining banking tools, micro-financing, and digital wallets for millions of Egyptian citizens.",
    featured: false,
  },

  {
    id: "beyooot-lifestyle",
    title: "Beyooot Real Estate Experience",
    category: "Brand Films",
    client: "Beyooot Egypt",
    year: "2024",
    duration: "1:40",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    videoUrl:
      "https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3",
    description:
      "Luxury interior cinematography and lifestyle vignettes highlighting contemporary living spaces in New Cairo.",
    featured: false,
  },
];

export const STUDIOS_DATA: StudioItem[] = [
  {
    id: "studio-2",
    name: "Studio #2 (Acoustic Blackbox)",
    tag: "Multi-Cam / Commercials",
    description:
      "Fully soundproofed acoustic studio equipped with motorized overhead lighting grid, cyclorama capabilities, and direct control room link.",
    features: [
      "Acoustic Soundproofing (STC 60+)",
      "Pre-rigged RGB Cine Lights",
      "3-Phase Clean Power Grid",
      "Separate VIP & Makeup Lounge",
    ],
    dimensions: "180 m² | 5.5m Ceiling Height",
    image:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67c478d542c290eedb23b817_4.jpg",
  },

  {
    id: "podcast-set",
    name: "Podcast & Broadcast Suite",
    tag: "Dedicated Audio / Video Podcast",
    description:
      "Turnkey podcast studio with 4-person table layout, automated PTZ and cinema cameras, acoustic slat walls, and warm ambient neon backdrops.",
    features: [
      "4x Shure SM7B Audio Chain",
      "Multi-angle 4K Video Setup",
      "Acoustically Treated Environment",
      "Instant Cloud Recording & Teleprompter",
    ],
    dimensions: "65 m² | Dedicated Control Room",
    image:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67c478d542c290eedb23b82d_Podcast-studio-set-609688.jpg",
  },

  {
    id: "company-decor",
    name: "Company Decor & Corporate Boardroom",
    tag: "Interviews / Corporate",
    description:
      "Modern executive office set with walnut timber finishes, glass partitioning, and soft daylight illumination for interviews and presentations.",
    features: [
      "Natural Daylight Control",
      "Modular Executive Furniture",
      "Built-in Presentation Displays",
      "High-Speed Fiber Connectivity",
    ],
    dimensions: "110 m² | Executive Suite",
    image:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/6a18f033b52156163bd57040_6a18348e7cab933fab36dda2_Company%2520Decor%25201.png",
  },

  {
    id: "villa-1",
    name: "Villa #1 & Living Space Set",
    tag: "Lifestyle / Domestic Adverts",
    description:
      "Spacious contemporary residence styled set with open kitchen, architectural staircase, and lush garden courtyard in Mokattam.",
    features: [
      "Full Operational Gourmet Kitchen",
      "Garden Patio Exterior Shots",
      "Private Driveway Vehicle Access",
      "Warm Domestic Lighting Balance",
    ],
    dimensions: "320 m² Indoor & Outdoor",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "warehouse-set",
    name: "Industrial Warehouse Set",
    tag: "Music Videos / High-Concept",
    description:
      "Raw textured concrete architecture with dramatic high bay trusses, haze machine ducting, and industrial roll-up doors.",
    features: [
      "Heavy Rigging Trusses",
      "Haze & Atmosphere Friendly",
      "High-Amperage Generator Ingress",
      "Vehicle Drive-in Capability",
    ],
    dimensions: "450 m² | 8m Clear Ceiling",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
];

// Media Production Services Catalog
export const PRODUCTION_SERVICES_DATA: MediaServicePackage[] = [
  {
    id: "commercial-tv-production",
    name: "Full-Scale TV Commercial & Brand Film",
    category: "Video Production",
    tagline: "Broadcast-tier commercial ads and television campaigns",
    badge: "Flagship Production",
    pricing: "From $4,500",
    ratePeriod: "per project",
    turnaround: "2 - 3 Weeks",
    specs:
      "Full 10-person cinema crew, Director, DP, Gaffer, 4K/8K Anamorphic setup, dedicated studio/location permits, and full post-production master.",
    deliverables: [
      "60s & 30s Master Broadcast Commercial Cuts",
      "3x High-CTR 15s/6s Social Cutdowns",
      "DCI-4K, Rec.709 & HDR Delivery Packages",
      "Behind-The-Scenes Photography & Teaser",
    ],
    image:
      "https://kamalazam.com/assets/service_cinematic_video_1789133980920-Ds0gRJe3.jpg",
    popular: true,
  },

  {
    id: "social-video-sprint",
    name: "Social Video Sprint (30 Vertical Reels)",
    category: "Video Production",
    tagline: "High-volume short-form content designed for TikTok & Instagram",
    badge: "Most Popular",
    pricing: "From $2,200",
    ratePeriod: "monthly retainer",
    turnaround: "5 - 7 Days",
    specs:
      "2 shoot days per month in Cairo/Dubai studio, hook-focused scripting, dynamic motion kinetic captions, sound design, and rapid delivery.",
    deliverables: [
      "30x Polished 9:16 Vertical Videos with Captions",
      "A/B Hook Variations & Custom Thumbnails",
      "Raw B-Roll Archive & Audio Stems",
      "Monthly Content Performance Strategy",
    ],
    image:
      "https://kamalazam.com/assets/service_digital_media_1789134008680-D11hFe1_.jpg",
    popular: true,
  },

  {
    id: "brand-documentary-film",
    name: "Brand Documentary & Founder Story Film",
    category: "Video Production",
    tagline: "Cinematic human-interest narrative establishing industry authority",
    badge: "Storytelling Master",
    pricing: "From $3,800",
    ratePeriod: "per project",
    turnaround: "3 - 4 Weeks",
    specs:
      "Multi-location documentary filming, executive interviews, archival integration, custom emotive scoring, and festival-grade cinematography.",
    deliverables: [
      "5-12 Minute Hero Documentary Master",
      "90s Theatrical/Social Trailer",
      "Director's Cut & Audio Master",
      "Executive Portrait Photo Set",
    ],
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "editorial-luxury-photo",
    name: "Editorial & Luxury Campaign Stills",
    category: "Editorial & Stills",
    tagline:
      "High-contrast chiaroscuro, automotive, and fashion editorial photography",
    badge: "Editorial Master",
    pricing: "From $1,800",
    ratePeriod: "per shoot day",
    turnaround: "4 - 5 Days",
    specs:
      "Medium-format 100MP & full-frame capture, high-output Broncolor/Profoto lighting, on-set digital tech with tethered grading, and luxury retouching.",
    deliverables: [
      "35x High-End Master Retouched Key Visuals",
      "High-Res TIFF Prints & Web-Ready Formats",
      "Full Commercial Licensing & Raw Selects",
      "Color-Calibrated Proofing Gallery",
    ],
    image:
      "https://kamalazam.com/assets/service_editorial_photo_1789133996251-DKyOkjmc.jpg",
    popular: false,
  },

  {
    id: "ecommerce-product-suite",
    name: "Commercial & E-Commerce Product Suite",
    category: "Editorial & Stills",
    tagline:
      "Precision lighting, macro detail optics, and 360° product visuals",
    badge: "High Volume",
    pricing: "From $950",
    ratePeriod: "per session",
    turnaround: "48 - 72 Hours",
    specs:
      "Seamless cyclorama studio setup, motorized turntable 360° capture, specialized macro glass, dust & scratch digital cleanup.",
    deliverables: [
      "30+ Hero Product Composition Angles",
      "Transparent Alpha PNG & Pure White Backdrops",
      "Shopify, Amazon & E-comm Optimized Exports",
      "Stop-Motion Product Teasers",
    ],
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "turnkey-podcast-studio",
    name: "Turnkey 4K Multi-Cam Podcast Production",
    category: "Audio & Vodcasts",
    tagline:
      "Broadcast-ready audio & video vodcast production with multi-track sound",
    badge: "Turnkey Vodcast",
    pricing: "From $650",
    ratePeriod: "per 3-hr session",
    turnaround: "24 Hours",
    specs:
      "Acoustically tuned environment, 4x Shure SM7B broadcast microphones, 3x Sony 4K Cinema cameras, teleprompter, and live video switcher.",
    deliverables: [
      "4K Multi-Cam Live-Switched Master",
      "Isolated Audio WAV Tracks (ISO Multi-Track)",
      "3x Viral Social Snippets with Subtitles",
      "Instant Cloud Export Delivery",
    ],
    image:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b71b/67c478d542c290eedb23b82d_Podcast-studio-set-609688.jpg",
    popular: true,
  },

  {
    id: "davinci-hdr-color-grade",
    name: "DaVinci Resolve HDR Color Grading Suite",
    category: "Post-Production & VFX",
    tagline:
      "Film emulation, skin tone perfection, and theatrical color mastering",
    badge: "Color Suite",
    pricing: "From $850",
    ratePeriod: "per project",
    turnaround: "48 Hours",
    specs:
      "Flanders Scientific calibrated OLED monitoring, ACES color management, custom film look LUT engineering, and noise reduction.",
    deliverables: [
      "ACEScc Managed Color Master",
      "DCI-P3, Rec.709 & HDR10 Export Packages",
      "Custom Show Look LUTs for Future Shoots",
      "XML & EDL Project Conform Roundtrip",
    ],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "vfx-motion-graphics",
    name: "3D Motion Graphics & Brand Title VFX",
    category: "Post-Production & VFX",
    tagline: "Custom CGI logo resolves, kinetic typography, and HUD overlays",
    badge: "3D / VFX",
    pricing: "From $1,400",
    ratePeriod: "per sequence",
    turnaround: "5 - 7 Days",
    specs:
      "Cinema 4D / Blender 3D modeling, particle dynamics, camera tracking, and sound-synchronized kinetic typography.",
    deliverables: [
      "4K 60fps Alpha Channel Video Exports",
      "Editable Motion Project Template",
      "Sound FX & Audio Synchronized Layer",
      "Vertical & Widescreen Aspect Ratios",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
];

// Backward-compatible alias for existing imports
export const EQUIPMENT_DATA: EquipmentItem[] =
  PRODUCTION_SERVICES_DATA.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    specs: item.specs,
    image: item.image,
    pricing: item.pricing,
    deliverables: item.deliverables,
  }));

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: "elsewedy",
    name: "ElSewedy Electric",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/6816a39c97d1a7046e02ed84_ElSewedy%20White%20.png",
    industry: "Energy & Infrastructure",
  },

  {
    id: "cbe",
    name: "Central Bank of Egypt",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/6816a39d69618caad405b692_Central_Bank_of_Egypt%20White%20.png",
    industry: "Government & Banking",
  },

  {
    id: "bosta",
    name: "Bosta",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/6816a39c4d966f2665a8024f_Bosta%20White%20.png",
    industry: "Tech & Logistics",
  },

  {
    id: "efe",
    name: "EFE Egypt",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/6816a39d1ad1b7fb65be6eaa_EFE%20White%20.png",
    industry: "Education & Non-Profit",
  },

  {
    id: "beyooot",
    name: "Beyooot",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/6816a39d63bd8dbd189d2419_Beyooot%20White%20.png",
    industry: "Real Estate",
  },

  {
    id: "spacetoon",
    name: "Spacetoon",
    logo:
      "https://cdn.prod.website-files.com/67c478d542c290eedb23b6f5/681673d655955501351ccca0_Spacetoon%20White%20.png",
    industry: "Entertainment & Media",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is your typical production turnaround time?",
    answer:
      "Turnaround depends on project scope. Social sprint packages deliver in 5-7 days; standard commercial ads and vodcast suites take 1-2 weeks. Full-scale brand documentaries and television campaigns typically span 2-4 weeks from concept approval to final master.",
  },

  {
    question: "How do we order media production services or book a package?",
    answer:
      "You can browse our Media Production Services shop list, select the package that fits your goals (e.g., TV Commercials, Social Sprint 30-Pack, or Turnkey Vodcast Production), and click 'Book Service' to submit your brief directly. Our team reviews your requirements and sends a tailored production proposal within 24 hours.",
  },

  {
    question: "Do you travel for on-location and international shoots?",
    answer:
      "Yes, we regularly shoot across international locations and on-site brand facilities with complete mobile cinema packages and dedicated technical crew.",
  },

  {
    question: "What equipment and cinema cameras do you shoot on?",
    answer:
      "We deploy industry-standard cinema cameras including RED, Sony FX cinema line, ARRI packages, anamorphic and prime lenses, paired with motorized gimbals, drones, and pro lighting arrays.",
  },

  {
    question: "Do you provide end-to-end media strategy and paid distribution?",
    answer:
      "Yes. In addition to principal filming, we develop creative strategy, hook testing, vertical formatting, and targeted media buying to guarantee your visual assets reach the intended audience and generate measurable ROI.",
  },
];

export const TEAM_DATA: TeamMember[] = [
  {
    name: "Kamal Azam",
    role: "Executive Director & Content Creator",
    bio:
      "Visionary filmmaker and content strategist synthesizing cinematic frame craft with data-backed audience acquisition across Egypt, the Gulf, and international markets.",
  },

  {
    name: "Tamer El-Sayed",
    role: "Director of Photography",
    bio:
      "Specialist in anamorphic optics, high-contrast chiaroscuro, and automotive cinematography with 12+ years on major commercial sets.",
  },

  {
    name: "Laila Mansour",
    role: "Lead Post-Production & Colorist",
    bio:
      "DaVinci Resolve HDR certified colorist sculpting emotive visual atmospheres for international campaigns and festival brand documentaries.",
  },

  {
    name: "Ziad Mostafa",
    role: "Head of Digital Media & Growth",
    bio:
      "Performance media buyer and social campaign strategist engineering high-converting creative ad matrices.",
  },
];