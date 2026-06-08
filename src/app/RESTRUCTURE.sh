#!/bin/bash

################################################################################
# Rooted Tales - Project Restructuring Script (Unix/macOS/Linux)
# 
# Purpose: Moves App.tsx, main.tsx, and index.css from root to src/ folder
#          Updates all import paths to use @ aliases
#          Completes the production-ready project structure
#
# Usage: ./RESTRUCTURE.sh
#
# IDEMPOTENT: Safe to run multiple times (checks before moving)
################################################################################

set -e  # Exit on any error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌲 Rooted Tales - Project Restructuring Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

################################################################################
# Step 1: Verify we're in the correct directory
################################################################################

echo "📁 Step 1: Verifying project directory..."

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

if ! grep -q "Rooted Tales" package.json; then
    echo -e "${YELLOW}⚠️  Warning: This doesn't appear to be the Rooted Tales project.${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

echo -e "${GREEN}✅ Project directory verified${NC}"
echo ""

################################################################################
# Step 2: Check if restructuring is needed
################################################################################

echo "🔍 Step 2: Checking if restructuring is needed..."

NEEDS_RESTRUCTURE=false

if [ -f "App.tsx" ] && [ ! -f "src/App.tsx" ]; then
    echo "  • App.tsx found at root (needs to move to src/)"
    NEEDS_RESTRUCTURE=true
fi

if [ -f "main.tsx" ] && [ ! -f "src/main.tsx" ]; then
    echo "  • main.tsx found at root (needs to move to src/)"
    NEEDS_RESTRUCTURE=true
fi

if [ -f "index.css" ] && [ ! -f "src/index.css" ]; then
    echo "  • index.css found at root (needs to move to src/)"
    NEEDS_RESTRUCTURE=true
fi

if [ "$NEEDS_RESTRUCTURE" = false ]; then
    echo -e "${GREEN}✅ Project is already restructured!${NC}"
    echo ""
    echo "All files are in their correct locations."
    echo "Nothing to do. Exiting."
    exit 0
fi

echo ""

################################################################################
# Step 3: Create backup
################################################################################

echo "💾 Step 3: Creating backup..."

BACKUP_DIR=".restructure_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

[ -f "App.tsx" ] && cp "App.tsx" "$BACKUP_DIR/"
[ -f "main.tsx" ] && cp "main.tsx" "$BACKUP_DIR/"
[ -f "index.css" ] && cp "index.css" "$BACKUP_DIR/"

echo -e "${GREEN}✅ Backup created at: $BACKUP_DIR${NC}"
echo ""

################################################################################
# Step 4: Move files to src/
################################################################################

echo "📦 Step 4: Moving files to src/..."

# Move App.tsx
if [ -f "App.tsx" ] && [ ! -f "src/App.tsx" ]; then
    mv "App.tsx" "src/"
    echo -e "${GREEN}  ✓ Moved App.tsx → src/App.tsx${NC}"
fi

# Move main.tsx
if [ -f "main.tsx" ] && [ ! -f "src/main.tsx" ]; then
    mv "main.tsx" "src/"
    echo -e "${GREEN}  ✓ Moved main.tsx → src/main.tsx${NC}"
fi

# Move index.css (if it exists and styles/globals.css doesn't)
if [ -f "index.css" ] && [ ! -f "src/index.css" ]; then
    mv "index.css" "src/"
    echo -e "${GREEN}  ✓ Moved index.css → src/index.css${NC}"
elif [ ! -f "src/index.css" ] && [ -f "src/styles/globals.css" ]; then
    echo -e "${BLUE}  ℹ Using src/styles/globals.css (no index.css move needed)${NC}"
fi

echo ""

################################################################################
# Step 5: Update imports in src/main.tsx
################################################################################

echo "🔧 Step 5: Updating imports in src/main.tsx..."

if [ -f "src/main.tsx" ]; then
    # Update App import
    sed -i.bak "s|from './App'|from './App'|g" "src/main.tsx"
    sed -i.bak "s|from '../App'|from './App'|g" "src/main.tsx"
    
    # Update CSS import
    if [ -f "src/index.css" ]; then
        sed -i.bak "s|from './styles/globals.css'|from './index.css'|g" "src/main.tsx"
        sed -i.bak "s|from '../styles/globals.css'|from './index.css'|g" "src/main.tsx"
    else
        sed -i.bak "s|from './index.css'|from './styles/globals.css'|g" "src/main.tsx"
        sed -i.bak "s|from '../index.css'|from './styles/globals.css'|g" "src/main.tsx"
    fi
    
    # Remove backup file
    rm -f "src/main.tsx.bak"
    
    echo -e "${GREEN}  ✓ Updated imports in src/main.tsx${NC}"
else
    echo -e "${YELLOW}  ⚠️  src/main.tsx not found (may need manual creation)${NC}"
fi

echo ""

################################################################################
# Step 6: Update imports in src/App.tsx
################################################################################

echo "🔧 Step 6: Updating imports in src/App.tsx..."

if [ -f "src/App.tsx" ]; then
    # Update component imports to use @ alias
    sed -i.bak "s|from './components/|from '@/components/|g" "src/App.tsx"
    sed -i.bak "s|from '../components/|from '@/components/|g" "src/App.tsx"
    
    # Update utils imports
    sed -i.bak "s|from './utils/|from '@/utils/|g" "src/App.tsx"
    sed -i.bak "s|from '../utils/|from '@/utils/|g" "src/App.tsx"
    
    # Update styles imports
    sed -i.bak "s|from './styles/|from '@/styles/|g" "src/App.tsx"
    sed -i.bak "s|from '../styles/|from '@/styles/|g" "src/App.tsx"
    
    # Remove backup file
    rm -f "src/App.tsx.bak"
    
    echo -e "${GREEN}  ✓ Updated imports in src/App.tsx${NC}"
else
    echo -e "${RED}  ❌ src/App.tsx not found${NC}"
fi

echo ""

################################################################################
# Step 7: Update index.html
################################################################################

echo "🔧 Step 7: Updating index.html..."

if [ -f "index.html" ]; then
    # Update main.tsx reference
    sed -i.bak 's|/main.tsx|/src/main.tsx|g' "index.html"
    sed -i.bak 's|src="/main.tsx"|src="/src/main.tsx"|g' "index.html"
    
    # Remove backup file
    rm -f "index.html.bak"
    
    echo -e "${GREEN}  ✓ Updated index.html to reference /src/main.tsx${NC}"
else
    echo -e "${RED}  ❌ index.html not found${NC}"
fi

echo ""

################################################################################
# Step 8: Verify structure
################################################################################

echo "🔍 Step 8: Verifying final structure..."

ERRORS=0

# Check that files are in src/
if [ ! -f "src/App.tsx" ]; then
    echo -e "${RED}  ❌ src/App.tsx not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}  ✓ src/App.tsx${NC}"
fi

if [ ! -f "src/main.tsx" ]; then
    echo -e "${RED}  ❌ src/main.tsx not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}  ✓ src/main.tsx${NC}"
fi

# Check that files are NOT at root
if [ -f "App.tsx" ]; then
    echo -e "${YELLOW}  ⚠️  App.tsx still exists at root (may need manual cleanup)${NC}"
fi

if [ -f "main.tsx" ]; then
    echo -e "${YELLOW}  ⚠️  main.tsx still exists at root (may need manual cleanup)${NC}"
fi

# Check key directories
if [ ! -d "src/components" ]; then
    echo -e "${RED}  ❌ src/components/ not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}  ✓ src/components/${NC}"
fi

if [ ! -d "src/utils" ]; then
    echo -e "${RED}  ❌ src/utils/ not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}  ✓ src/utils/${NC}"
fi

if [ ! -d "src/styles" ]; then
    echo -e "${RED}  ❌ src/styles/ not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}  ✓ src/styles/${NC}"
fi

if [ ! -d "src/lib" ]; then
    echo -e "${YELLOW}  ⚠️  src/lib/ not found${NC}"
else
    echo -e "${GREEN}  ✓ src/lib/${NC}"
fi

if [ ! -d "src/hooks" ]; then
    echo -e "${YELLOW}  ⚠️  src/hooks/ not found${NC}"
else
    echo -e "${GREEN}  ✓ src/hooks/${NC}"
fi

echo ""

################################################################################
# Step 9: Clean up
################################################################################

echo "🧹 Step 9: Cleaning up..."

# Ask user if they want to delete the backup
echo ""
read -p "Delete backup folder? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$BACKUP_DIR"
    echo -e "${GREEN}  ✓ Backup deleted${NC}"
else
    echo -e "${BLUE}  ℹ Backup kept at: $BACKUP_DIR${NC}"
fi

# Ask user if they want to delete this script
echo ""
read -p "Delete this restructuring script? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    SCRIPT_NAME=$(basename "$0")
    echo -e "${GREEN}  ✓ Script will be deleted after exit${NC}"
    
    # Delete script after exiting
    trap "rm -f '$0'" EXIT
fi

echo ""

################################################################################
# Step 10: Final summary
################################################################################

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Restructuring Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed!${NC}"
    echo ""
    echo "Your project is now in the correct structure."
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm install"
    echo "  2. Run: npm run dev"
    echo "  3. Test the application"
    echo "  4. Run: npm run build"
    echo "  5. Run: npx cap sync android"
    echo ""
    echo "The project is now ready for:"
    echo "  ✓ GitHub deployment"
    echo "  ✓ Google Play Store submission"
    echo "  ✓ Team collaboration"
    echo ""
else
    echo -e "${RED}⚠️  $ERRORS error(s) detected.${NC}"
    echo ""
    echo "Please review the errors above and fix them manually."
    echo "Your backup is available at: $BACKUP_DIR"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
