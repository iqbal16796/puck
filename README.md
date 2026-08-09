# Puck Website Builder

A no-code website builder built with **[Puck](https://puckeditor.com/)**, a visual page editor for React. Create beautiful websites by dragging and dropping pre-built components across different business templates.

## Features

- 🎨 **Visual Editor**: Drag-and-drop interface powered by Puck
- 🏢 **Multiple Templates**: Salon, Bakery, Education, Gym, Restaurant, Portfolio, and more
- 🧩 **Rich Components**: Hero sections, galleries, testimonials, pricing tables, FAQs, etc.
- 💾 **Real-time Collaboration**: Multiple editors can work simultaneously
- 📱 **Responsive Design**: All templates work perfectly on mobile and desktop
- 🔄 **Version History**: Track and restore previous versions
- 🚀 **One-click Publishing**: Publish sites with public URLs
- 📤 **Static Export**: Export sites as static HTML/CSS/JS

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Editor**: Puck (@measured/puck)
- **Database**: Supabase (PostgreSQL + Realtime)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Content**: Groq
- **Language**: TypeScript

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 20.9.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Supabase Account**: For database and authentication

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iqbal16796/puck.git
cd puck
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Content Generation (Optional)
GROQ_API_KEY=your_groq_api_key
```

### 4. Database Setup

#### Option A: Using Supabase Dashboard
1. Create a new Supabase project
2. Go to the SQL editor in your Supabase dashboard
3. Run the schema from `sql/site_versions.sql`
4. Create the main `sites` table:

```sql
CREATE TABLE sites (
  site_name TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  puck_data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Add policies as needed for your authentication setup
```

#### Option B: Using Supabase CLI (Advanced)
```bash
npx supabase init
npx supabase db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx            # Landing page with template gallery
│   ├── editor/[siteId]/    # Interactive Puck editor
│   ├── preview/[siteId]/   # Private preview pages
│   ├── [siteId]/           # Public published pages
│   └── api/                # API routes
├── blocks/                 # Puck components (Hero, Gallery, etc.)
├── components/             # UI components and editor chrome
├── configs/                # Template configurations
│   ├── education.config.tsx # Education template with 14 components
│   ├── salon.config.tsx    # Salon template
│   ├── bakery.config.tsx   # Bakery template
│   └── index.ts            # Template registry
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and helpers
└── utils/                  # Supabase and other utilities
```

## Available Templates

### 🎓 Education Template (Featured)
A comprehensive template for educational institutions with 14 components:
- Hero section with call-to-action
- Statistics showcase
- Course listings
- Why choose us section
- Featured course highlight
- Learning process steps
- Tutor profiles
- Class schedule
- Student results
- Testimonials
- University partners
- Pricing plans
- FAQ section
- Enrollment call-to-action

### 💇 Salon Template
Perfect for beauty salons and spas with components for services, team profiles, galleries, and booking.

### 🥐 Bakery Template
Showcase baked goods with product menus, chef bios, testimonials, and location information.

### 🏋️ Gym Template
Fitness-focused template with class schedules, trainer profiles, and membership tiers.

### 🍽️ Restaurant Template
Restaurant template with menus, chef specials, atmosphere galleries, and reservations.

### 🎨 Portfolio Template
Creative portfolio template for designers and artists.

### And more...
Additional templates for clothing stores, legal services, Ayurvedic practices, and crafts.

## Usage

### Creating a New Site
1. Visit the homepage
2. Choose a template
3. Enter a site name
4. Start editing with the visual editor

### Editing Content
- **Drag & Drop**: Add new components from the left panel
- **Edit Properties**: Select components to edit in the right panel
- **Live Preview**: See changes in real-time
- **Auto-save**: Changes save automatically

### Publishing
1. Click "Publish" in the editor
2. Your site gets a public URL: `yourdomain.com/your-site-name`
3. Share the link with the world!

## Adding New Templates

See `ARCHITECTURE.md` for detailed instructions on adding new templates and components.

## Deployment

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GROQ_API_KEY` | Groq API key for AI content | No |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- 📖 **Documentation**: Check `ARCHITECTURE.md` for technical details
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Use GitHub Discussions for questions

## Acknowledgments

- Built with [Puck](https://puckeditor.com/) by Measured
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)