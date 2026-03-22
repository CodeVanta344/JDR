param(
    [string]$name
)

$targetDir = "d:\JDR\tokens\$name"

Write-Host "Processing $name..."

# Ensure target dir exists
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

# Define paths
$sheetPath = "d:\JDR\tokens\${name}_sheet.png"
$transparentPath = "d:\JDR\tokens\${name}_sheet_transparent.png"
$removeBgScript = "d:\JDR\remove_white_bg.py"
$splitScript = "d:\JDR\split_tokens_robust.py"

# Step 1: Remove Background
Write-Host "Removing background from $sheetPath..."
if (Test-Path $sheetPath) {
    python $removeBgScript $sheetPath
} else {
    Write-Error "Sheet file not found: $sheetPath"
    exit 1
}

# Step 2: Split Tokens
Write-Host "Splitting tokens from $transparentPath..."
if (Test-Path $transparentPath) {
    python $splitScript $transparentPath
} else {
    Write-Error "Transparent file not generated: $transparentPath"
    exit 1
}

# Step 3: Move Tokens
Write-Host "Moving tokens to $targetDir..."
$tokens = Get-ChildItem "d:\JDR\tokens\${name}_sheet_transparent_token_*.png"
if ($tokens) {
    Move-Item -Path "d:\JDR\tokens\${name}_sheet_transparent_token_*.png" -Destination $targetDir -Force
    Write-Host "Moved $($tokens.Count) tokens."
} else {
    Write-Warning "No tokens found to move."
}

Write-Host "Done processing $name."
