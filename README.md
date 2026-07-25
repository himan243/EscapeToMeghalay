# Escape to Meghalaya - Premium Luxury Travel Platform

An award-winning, cinematic, fully responsive landing page for **Escape to Meghalaya** built with Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## 🌟 Features Overview

- **Cinematic Atmospheric Design**:
  - Nature-inspired palette: Deep Forest Green (`#061E14`), Emerald (`#10B981`), Cloud White, Mist Grey, Fog Blue, and Turquoise Water (`#06B6D4`).
  - Dynamic weather control: Toggle live ambient mist & rain particle overlay.
  - Frosted glass scroll-activated navigation (`Header.tsx`).
- **Editorial Showcase (`MeghalayaShowcase.tsx`)**:
  - Story-driven chapters highlighting Dawki River, Nohkalikai Falls, Living Root Bridges, Laitlum Canyons, Krang Suri, and Sacred Groves with elevation facts and key moments.
- **Handcrafted Experiences (`Experiences.tsx`)**:
  - Filterable packages (Private Tours, Group Expeditions, Community Tourism, Weekend Escapes, Custom Expeditions).
  - Interactive package drawer modal with difficulty ratings, best seasons, and instant inquiry action.
- **Infinite Vertical Testimonial Wall (`TestimonialWall.tsx`)**:
  - 3 independent vertical columns scrolling endlessly in opposite directions and speeds.
  - Interactive pause-on-hover effect, frosted glass cards, 5-star ratings, and traveler verification badges.
- **Cinematic Visual Gallery (`Gallery.tsx`)**:
  - Masonry grid layout with category filters, hover zoom, and lightbox modal viewer.
  - Instagram handle reference comments (`@escape_to_meghalaya`) for straightforward production replacement.
- **Interactive Booking & Inquiry Engine (`InquiryModal.tsx`)**:
  - Multi-input trip builder (Dates, Travelers, Budget tier, Preferred Experience, Notes).
  - Live client validation, success state, and celebratory confetti effect.
- **Dual Mist Themes**:
  - Forest Dark Theme (Forest after rainfall) & Sunrise Light Theme with smooth CSS custom variable transitions.

---

## 📁 Directory Structure

```
d:\EscapeToMegh
├── public/
│   └── images/              # High-resolution generated photography assets
├── src/
│   ├── app/
│   │   ├── globals.css      # Glassmorphism utilities & CSS custom variables
│   │   ├── layout.tsx       # Root layout with SEO metadata & Google Fonts
│   │   └── page.tsx         # Main landing page assembly
│   ├── components/
│   │   ├── brand/
│   │   │   └── Logo.tsx     # SVG vector logo (Horizontal & Icon badge)
│   │   ├── landing/
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MeghalayaShowcase.tsx
│   │   │   ├── Experiences.tsx
│   │   │   ├── ValueProps.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── TestimonialWall.tsx
│   │   │   ├── InquirySection.tsx
│   │   │   ├── InquiryModal.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── RainParticles.tsx
│   ├── context/
│   │   └── ThemeContext.tsx # Dual theme & ambient weather state
│   └── data/
│       ├── packages.json    # Handcrafted travel itineraries
│       ├── destinations.json# Storytelling chapters & facts
│       ├── testimonials.json# 15 traveler reviews
│       └── gallery.json     # Visual gallery items
├── tailwind.config.js       # Custom colors, keyframe animations, typography
├── tsconfig.json            # TypeScript configuration
└── README.md
```

---

## 🚀 Future Backend Scalability

The project is structured with JSON-backed data models and clean React state management to enable seamless backend integration without refactoring UI components:

1. **Email Integration (EmailJS / Resend)**:
   - In `src/components/landing/InquiryModal.tsx`, replace the `handleSubmit` timeout with `resend.emails.send(...)` or `emailjs.send(...)` passing the `formData` JSON object.
2. **Supabase / Firebase Database Integration**:
   - Save inquiry submissions directly to a `inquiries` table:
     ```ts
     const { data, error } = await supabase
       .from('inquiries')
       .insert([formData]);
     ```
3. **Dynamic CMS / Headless Backend**:
   - Replace `import packagesData from '@/data/packages.json'` with Next.js server component fetches (`await fetch('/api/packages')`) or Sanity / Strapi CMS client calls.

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build Production Bundle**:
   ```bash
   npm run build
   ```
