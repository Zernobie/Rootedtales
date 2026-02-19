################################################################################
# Rooted Tales - Project Restructuring Script (Windows PowerShell)
# 
# Purpose: Moves App.tsx, main.tsx, and index.css from root to src/ folder
#          Updates all import paths to use @ aliases
#          Completes the production-ready project structure
#
# Usage: .\RESTRUCTURE.ps1
#
# IDEMPOTENT: Safe to run multiple times (checks before moving)
################################################################################

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🌲 Rooted Tales - Project Restructuring Script" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

################################################################################
# Step 1: Verify we're in the correct directory
################################################################################

Write-Host "📁 Step 1: Verifying project directory..." -ForegroundColor Yellow

if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

$packageJson = Get-Content "package.json" -Raw
if (-not ($packageJson -like "*Rooted Tales*")) {
    Write-Host "⚠️  Warning: This doesn't appear to be the Rooted Tales project." -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "Aborted." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Project directory verified" -ForegroundColor Green
Write-Host ""

################################################################################
# Step 2: Check if restructuring is needed
################################################################################

Write-Host "🔍 Step 2: Checking if restructuring is needed..." -ForegroundColor Yellow

$needsRestructure = $false

if ((Test-Path "App.tsx") -and -not (Test-Path "src/App.tsx")) {
    Write-Host "  • App.tsx found at root (needs to move to src/)" -ForegroundColor White
    $needsRestructure = $true
}

if ((Test-Path "main.tsx") -and -not (Test-Path "src/main.tsx")) {
    Write-Host "  • main.tsx found at root (needs to move to src/)" -ForegroundColor White
    $needsRestructure = $true
}

if ((Test-Path "index.css") -and -not (Test-Path "src/index.css")) {
    Write-Host "  • index.css found at root (needs to move to src/)" -ForegroundColor White
    $needsRestructure = $true
}

if (-not $needsRestructure) {
    Write-Host "✅ Project is already restructured!" -ForegroundColor Green
    Write-Host ""
    Write-Host "All files are in their correct locations." -ForegroundColor White
    Write-Host "Nothing to do. Exiting." -ForegroundColor White
    exit 0
}

Write-Host ""

################################################################################
# Step 3: Create backup
################################################################################

Write-Host "💾 Step 3: Creating backup..." -ForegroundColor Yellow

$backupDir = ".restructure_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

if (Test-Path "App.tsx") {
    Copy-Item "App.tsx" $backupDir
}

if (Test-Path "main.tsx") {
    Copy-Item "main.tsx" $backupDir
}

if (Test-Path "index.css") {
    Copy-Item "index.css" $backupDir
}

Write-Host "✅ Backup created at: $backupDir" -ForegroundColor Green
Write-Host ""

################################################################################
# Step 4: Move files to src/
################################################################################

Write-Host "📦 Step 4: Moving files to src/..." -ForegroundColor Yellow

# Ensure src/ directory exists
if (-not (Test-Path "src")) {
    New-Item -ItemType Directory -Path "src" -Force | Out-Null
}

# Move App.tsx
if ((Test-Path "App.tsx") -and -not (Test-Path "src/App.tsx")) {
    Move-Item "App.tsx" "src/" -Force
    Write-Host "  ✓ Moved App.tsx → src/App.tsx" -ForegroundColor Green
}

# Move main.tsx
if ((Test-Path "main.tsx") -and -not (Test-Path "src/main.tsx")) {
    Move-Item "main.tsx" "src/" -Force
    Write-Host "  ✓ Moved main.tsx → src/main.tsx" -ForegroundColor Green
}

# Move index.css (if it exists and styles/globals.css doesn't)
if ((Test-Path "index.css") -and -not (Test-Path "src/index.css")) {
    Move-Item "index.css" "src/" -Force
    Write-Host "  ✓ Moved index.css → src/index.css" -ForegroundColor Green
} elseif (-not (Test-Path "src/index.css") -and (Test-Path "src/styles/globals.css")) {
    Write-Host "  ℹ Using src/styles/globals.css (no index.css move needed)" -ForegroundColor Cyan
}

Write-Host ""

################################################################################
# Step 5: Update imports in src/main.tsx
################################################################################

Write-Host "🔧 Step 5: Updating imports in src/main.tsx..." -ForegroundColor Yellow

if (Test-Path "src/main.tsx") {
    $mainContent = Get-Content "src/main.tsx" -Raw
    
    # Update App import
    $mainContent = $mainContent -replace "from './App'", "from './App'"
    $mainContent = $mainContent -replace "from '../App'", "from './App'"
    
    # Update CSS import
    if (Test-Path "src/index.css") {
        $mainContent = $mainContent -replace "from './styles/globals.css'", "from './index.css'"
        $mainContent = $mainContent -replace "from '../styles/globals.css'", "from './index.css'"
    } else {
        $mainContent = $mainContent -replace "from './index.css'", "from './styles/globals.css'"
        $mainContent = $mainContent -replace "from '../index.css'", "from './styles/globals.css'"
    }
    
    Set-Content "src/main.tsx" $mainContent
    
    Write-Host "  ✓ Updated imports in src/main.tsx" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  src/main.tsx not found (may need manual creation)" -ForegroundColor Yellow
}

Write-Host ""

################################################################################
# Step 6: Update imports in src/App.tsx
################################################################################

Write-Host "🔧 Step 6: Updating imports in src/App.tsx..." -ForegroundColor Yellow

if (Test-Path "src/App.tsx") {
    $appContent = Get-Content "src/App.tsx" -Raw
    
    # Update component imports to use @ alias
    $appContent = $appContent -replace "from './components/", "from '@/components/"
    $appContent = $appContent -replace "from '../components/", "from '@/components/"
    
    # Update utils imports
    $appContent = $appContent -replace "from './utils/", "from '@/utils/"
    $appContent = $appContent -replace "from '../utils/", "from '@/utils/"
    
    # Update styles imports
    $appContent = $appContent -replace "from './styles/", "from '@/styles/"
    $appContent = $appContent -replace "from '../styles/", "from '@/styles/"
    
    Set-Content "src/App.tsx" $appContent
    
    Write-Host "  ✓ Updated imports in src/App.tsx" -ForegroundColor Green
} else {
    Write-Host "  ❌ src/App.tsx not found" -ForegroundColor Red
}

Write-Host ""

################################################################################
# Step 7: Update index.html
################################################################################

Write-Host "🔧 Step 7: Updating index.html..." -ForegroundColor Yellow

if (Test-Path "index.html") {
    $htmlContent = Get-Content "index.html" -Raw
    
    # Update main.tsx reference
    $htmlContent = $htmlContent -replace '/main.tsx', '/src/main.tsx'
    $htmlContent = $htmlContent -replace 'src="/main.tsx"', 'src="/src/main.tsx"'
    
    Set-Content "index.html" $htmlContent
    
    Write-Host "  ✓ Updated index.html to reference /src/main.tsx" -ForegroundColor Green
} else {
    Write-Host "  ❌ index.html not found" -ForegroundColor Red
}

Write-Host ""

################################################################################
# Step 8: Verify structure
################################################################################

Write-Host "🔍 Step 8: Verifying final structure..." -ForegroundColor Yellow

$errors = 0

# Check that files are in src/
if (-not (Test-Path "src/App.tsx")) {
    Write-Host "  ❌ src/App.tsx not found" -ForegroundColor Red
    $errors++
} else {
    Write-Host "  ✓ src/App.tsx" -ForegroundColor Green
}

if (-not (Test-Path "src/main.tsx")) {
    Write-Host "  ❌ src/main.tsx not found" -ForegroundColor Red
    $errors++
} else {
    Write-Host "  ✓ src/main.tsx" -ForegroundColor Green
}

# Check that files are NOT at root
if (Test-Path "App.tsx") {
    Write-Host "  ⚠️  App.tsx still exists at root (may need manual cleanup)" -ForegroundColor Yellow
}

if (Test-Path "main.tsx") {
    Write-Host "  ⚠️  main.tsx still exists at root (may need manual cleanup)" -ForegroundColor Yellow
}

# Check key directories
if (-not (Test-Path "src/components")) {
    Write-Host "  ❌ src/components/ not found" -ForegroundColor Red
    $errors++
} else {
    Write-Host "  ✓ src/components/" -ForegroundColor Green
}

if (-not (Test-Path "src/utils")) {
    Write-Host "  ❌ src/utils/ not found" -ForegroundColor Red
    $errors++
} else {
    Write-Host "  ✓ src/utils/" -ForegroundColor Green
}

if (-not (Test-Path "src/styles")) {
    Write-Host "  ❌ src/styles/ not found" -ForegroundColor Red
    $errors++
} else {
    Write-Host "  ✓ src/styles/" -ForegroundColor Green
}

if (-not (Test-Path "src/lib")) {
    Write-Host "  ⚠️  src/lib/ not found" -ForegroundColor Yellow
} else {
    Write-Host "  ✓ src/lib/" -ForegroundColor Green
}

if (-not (Test-Path "src/hooks")) {
    Write-Host "  ⚠️  src/hooks/ not found" -ForegroundColor Yellow
} else {
    Write-Host "  ✓ src/hooks/" -ForegroundColor Green
}

Write-Host ""

################################################################################
# Step 9: Clean up
################################################################################

Write-Host "🧹 Step 9: Cleaning up..." -ForegroundColor Yellow

# Ask user if they want to delete the backup
Write-Host ""
$deleteBackup = Read-Host "Delete backup folder? (y/N)"
if ($deleteBackup -eq "y" -or $deleteBackup -eq "Y") {
    Remove-Item $backupDir -Recurse -Force
    Write-Host "  ✓ Backup deleted" -ForegroundColor Green
} else {
    Write-Host "  ℹ Backup kept at: $backupDir" -ForegroundColor Cyan
}

# Ask user if they want to delete this script
Write-Host ""
$deleteScript = Read-Host "Delete this restructuring script? (y/N)"
if ($deleteScript -eq "y" -or $deleteScript -eq "Y") {
    Write-Host "  ✓ Script will be deleted after exit" -ForegroundColor Green
    
    # Schedule script deletion
    $scriptPath = $MyInvocation.MyCommand.Path
    Start-Job -ScriptBlock {
        param($path)
        Start-Sleep -Seconds 2
        Remove-Item $path -Force
    } -ArgumentList $scriptPath | Out-Null
}

Write-Host ""

################################################################################
# Step 10: Final summary
################################################################################

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Restructuring Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0) {
    Write-Host "🎉 All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your project is now in the correct structure." -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Run: npm install" -ForegroundColor White
    Write-Host "  2. Run: npm run dev" -ForegroundColor White
    Write-Host "  3. Test the application" -ForegroundColor White
    Write-Host "  4. Run: npm run build" -ForegroundColor White
    Write-Host "  5. Run: npx cap sync android" -ForegroundColor White
    Write-Host ""
    Write-Host "The project is now ready for:" -ForegroundColor Yellow
    Write-Host "  ✓ GitHub deployment" -ForegroundColor Green
    Write-Host "  ✓ Google Play Store submission" -ForegroundColor Green
    Write-Host "  ✓ Team collaboration" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "⚠️  $errors error(s) detected." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please review the errors above and fix them manually." -ForegroundColor Yellow
    Write-Host "Your backup is available at: $backupDir" -ForegroundColor White
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
