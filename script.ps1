# Get param year and day
param ($year, $day)

# Get today year and day
$todayYear = Get-Date -Format yyyy
$todayDay = Get-Date -Format %d

# Get AoC session cookie from external file
$SettingsObject = Get-Content -Path settings.json | ConvertFrom-Json
$AOC_COOKIE = $SettingsObject.aoc_cookie

# Log param
Write-Host "Year: $year : $todayYear"
Write-Host "day: $day : $todayDay"

if ($year.Length -ne 0) {
  #Invoke-WebRequest -URI https://adventofcode.com/$year/day/$day/input -WebSession "session=$AOC_COOKIE" -OutFile in.txt
  curl --cookie "session=$AOC_COOKIE" https://adventofcode.com/$year/day/$day/input > in.txt
} else {
  #Invoke-WebRequest -URI https://adventofcode.com/$todayYear/day/$todayDay/input -WebSession "session=$AOC_COOKIE" -OutFile in.txt
  curl --cookie "session=$AOC_COOKIE" https://adventofcode.com/$todayYear/day/$todayDay/input > in.txt
}
