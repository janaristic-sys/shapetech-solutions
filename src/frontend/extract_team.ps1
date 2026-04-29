$content = Get-Content about_page.html -Raw
$names = [regex]::Matches($content, 'class="sts_team-memebr--name"><a.*?>(.*?)</a>') | ForEach-Object { $_.Groups[1].Value.Trim() }
$roles = [regex]::Matches($content, 'class="sts_team-memebr--description">(.*?)</div>') | ForEach-Object { $_.Groups[1].Value.Trim() }

$data = @()
for ($i = 0; $i -lt $names.Count; $i++) {
    $data += [PSCustomObject]@{
        name = $names[$i]
        role = $roles[$i]
    }
}

$data | ConvertTo-Json | Out-File -FilePath team_data.json -Encoding utf8
Write-Host "Found $($names.Count) team members"
