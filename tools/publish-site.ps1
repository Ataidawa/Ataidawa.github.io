param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $root
function Run-Checked($program, $arguments) { & $program @arguments; if ($LASTEXITCODE -ne 0) { throw "Command failed: $program ($LASTEXITCODE)" } }
try {
 $node = (Get-Command node -ErrorAction SilentlyContinue).Source
 if (-not $node) { $node = 'C:/Program Files/Adobe/Adobe Creative Cloud Experience/libs/node.exe' }
 if (-not (Test-Path -LiteralPath $node)) { throw 'Node.js is missing. Install Node.js first.' }
 Run-Checked $node @('tools/update-playlist.cjs')
 Run-Checked $node @('node_modules/hexo/bin/hexo','generate')
 if ($CheckOnly) { Write-Host 'Build passed. No files pushed.'; exit 0 }
 $checkout = [IO.Path]::GetFullPath((Join-Path $root '.runtime/source-publish'))
 if (-not $checkout.StartsWith($root + [IO.Path]::DirectorySeparatorChar)) { throw 'Invalid publish target' }
 if (-not (Test-Path -LiteralPath (Join-Path $checkout '.git'))) { throw 'Publish checkout missing. Ask Codex to restore it.' }
 $dirty = & git -C $checkout status --porcelain
 if ($dirty) { throw 'Publish checkout has uncommitted changes. Resolve them before syncing.' }
 $gitOptions = @()
 if (Test-NetConnection 127.0.0.1 -Port 7897 -InformationLevel Quiet -WarningAction SilentlyContinue) { $gitOptions = @('-c','http.proxy=socks5h://127.0.0.1:7897') }
 Run-Checked git ($gitOptions + @('-C',$checkout,'pull','--ff-only','origin','main'))
 foreach ($folder in @('.github','api','docs','scaffolds','scripts','source','tests','themes','tools',([string][char]0x7f51+[char]0x7ad9+[char]0x7ba1+[char]0x7406))) {
  $target = [IO.Path]::GetFullPath((Join-Path $checkout $folder))
  if (-not $target.StartsWith($checkout + [IO.Path]::DirectorySeparatorChar)) { throw 'Invalid sync target' }
  & robocopy (Join-Path $root $folder) $target /MIR /NFL /NDL /NJH /NJS /NP /XD .git node_modules | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "File sync failed: $folder" }
 }
 foreach ($file in @('.gitignore','README.md','_config.frame.yml','_config.yml','edgeone.json','vercel.json','package.json','package-lock.json','Update-Website.cmd')) { Copy-Item -LiteralPath (Join-Path $root $file) -Destination $checkout }
 Run-Checked git @('-C',$checkout,'add','.')
 & git -C $checkout diff --cached --quiet
 if ($LASTEXITCODE -eq 0) { Write-Host 'No changes to publish.'; exit 0 }
 Run-Checked git @('-C',$checkout,'-c','user.name=Ataidawa','-c','user.email=Ataidawa@users.noreply.github.com','commit','-m',('Update website '+(Get-Date -Format 'yyyy-MM-dd HH:mm')))
 Run-Checked git ($gitOptions + @('-C',$checkout,'push','origin','main'))
 Write-Host 'Uploaded successfully. Cloud deployment starts automatically.' -ForegroundColor Green
} catch { Write-Host $_ -ForegroundColor Red; exit 1 }
