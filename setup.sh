#!/bin/bash

# Puck Website Builder Setup Script
echo "🎨 Setting up Puck Website Builder..."

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node --version | cut -d'v' -f2)
required_version="20.9.0"

if ! node -e "process.exit(process.version.slice(1).split('.').reduce((a,v,i)=>a+v*Math.pow(10,4-i*2),0) >= '20.9.0'.split('.').reduce((a,v,i)=>a+v*Math.pow(10,4-i*2),0) ? 0 : 1)" 2>/dev/null; then
    echo "❌ Node.js version $node_version detected. Please upgrade to v20.9.0 or higher."
    echo "   Visit https://nodejs.org/ to download the latest version."
    exit 1
fi
echo "✅ Node.js version $node_version is compatible."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your npm configuration."
    exit 1
fi

# Setup environment file
if [ ! -f ".env.local" ]; then
    echo "⚙️  Setting up environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "📝 Please edit .env.local with your actual environment variables:"
    echo "   - Supabase URL and keys"
    echo "   - Groq API key (optional)"
else
    echo "✅ .env.local already exists"
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "🔧 Supabase CLI not found. You can install it with:"
    echo "   npm install -g supabase"
    echo "   or visit https://supabase.com/docs/guides/cli for other installation methods"
else
    echo "✅ Supabase CLI is available"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Set up your Supabase database using the schema in sql/site_versions.sql"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For detailed setup instructions, see README.md"
echo "🏗️  For architecture details, see ARCHITECTURE.md"