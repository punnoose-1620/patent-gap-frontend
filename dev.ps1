# dev.ps1
# Directly set PATH to use nvm's Node.js 20.19.6
$nvmNodePath = "C:\Users\punno\AppData\Roaming\nvm\v20.19.6"
$currentPath = $env:Path

# Remove old Node.js paths
$cleanPath = ($currentPath -split ';' | Where-Object { 
    $_ -ne "C:\Program Files\nodejs" -and 
    $_ -ne "" -and 
    $_ -notlike "*Program Files\nodejs*" 
}) -join ';'

# Prepend nvm's Node.js path
$env:Path = "$nvmNodePath;$cleanPath"

# Verify
$nodeVersion = & "$nvmNodePath\node.exe" --version
Write-Host "Using Node.js: $nodeVersion" -ForegroundColor Green

# Run npm with the correct Node.js
& "$nvmNodePath\npm.cmd" run dev