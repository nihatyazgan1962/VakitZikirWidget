Add-Type -AssemblyName System.Drawing

$source = "C:\Users\Nihat\.gemini\antigravity-ide\brain\d01ad0d0-5499-40c9-bdd7-c121d49b6801\app_launcher_icon_1790609964829.jpg"
$img = [System.Drawing.Image]::FromFile($source)

$sizes = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

foreach ($folder in $sizes.Keys) {
    $s = $sizes[$folder]
    $dir = Join-Path $PSScriptRoot "android\app\src\main\res\$folder"
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }

    $dest = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $s, $s)
    $g.Dispose()

    $dest.Save((Join-Path $dir "ic_launcher.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Save((Join-Path $dir "ic_launcher_round.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Save((Join-Path $dir "ic_launcher_foreground.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()

    Write-Host "Updated icons in $folder ($s x $s)"
}

$img.Dispose()
Write-Host "All launcher icons generated successfully!"
