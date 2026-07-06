$file = "c:\Users\CDM-PM\Documents\st-site\src\frontend\src\pages\AboutPage.tsx"
$content = Get-Content $file -Raw

function Get-Bio {
    param($Name, $Role)
    $FirstName = $Name.Split(" ")[0]
    if ($Role -match "DevOps") { return "$FirstName leads our infrastructure practices, ensuring secure, scalable, and highly available environments for all client projects." }
    if ($Role -match "Operations") { return "$FirstName drives our operational workflows, focusing on building strong partnerships and internal efficiency." }
    if ($Role -match "Client") { return "$FirstName ensures seamless communication and project alignment, serving as the trusted point of contact for our enterprise clients." }
    if ($Role -match "Full-stack") { return "$FirstName builds robust full-stack features, blending frontend elegance with reliable backend architecture." }
    if ($Role -match "Back-end") { return "$FirstName engineers scalable backend services, optimizing data flows and system performance across complex platforms." }
    if ($Role -match "Lead" -or $Role -match "Owner") { return "$FirstName orchestrates engineering teams and owns the end-to-end delivery of specialized commerce solutions." }
    if ($Role -match "QA") { return "$FirstName spearheads our quality assurance processes, rigorously testing applications to guarantee flawless user experiences." }
    if ($Role -match "Project") { return "$FirstName manages project lifecycles from discovery to deployment, ensuring on-time and on-budget delivery." }
    if ($Role -match "HR") { return "$FirstName champions our company culture and talent acquisition, building high-performing and happy teams." }
    if ($Role -match "Design" -or $Role -match "UI/UX") { return "$FirstName crafts intuitive and beautiful interfaces that elevate the user experience across all digital touchpoints." }
    if ($Role -match "Front-end") { return "$FirstName specializes in creating responsive, pixel-perfect front-end applications with modern web technologies." }
    if ($Role -match "Admin") { return "$FirstName provides essential administrative support, keeping our daily operations organized and efficient." }
    if ($Role -match "Marketing") { return "$FirstName develops our marketing strategies, driving brand awareness and growth across diverse channels." }
    if ($Role -match "Mobile") { return "$FirstName develops robust mobile applications, delivering seamless native experiences for iOS and Android platforms." }
    if ($Role -match "Data") { return "$FirstName leverages data analytics to unlock valuable insights, empowering data-driven decision making." }
    return "$FirstName is an integral part of the ShapeTech team, contributing expertise and dedication to our shared goals."
}

# Use regex to find and replace empty bios
$pattern = '(?s)name:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*bio:\s*""'

$content = [regex]::Replace($content, $pattern, {
    param($match)
    $name = $match.Groups[1].Value
    $role = $match.Groups[2].Value
    $bio = Get-Bio -Name $name -Role $role
    return "name: `"$name`",`n    role: `"$role`",`n    bio: `"$bio`""
})

Set-Content $file $content -NoNewline
Write-Host "Bios updated successfully."
