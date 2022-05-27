param ([string]$versionSuffix = "",
  [string]$configuration = "Release")
$ErrorActionPreference = "Stop"

# Set location to the Solution directory
(Get-Item $PSScriptRoot).Parent.FullName | Push-Location

[xml] $versionFile = Get-Content "./build/DependencyVersions.props"
$commerceNode = $versionFile.SelectSingleNode("Project/PropertyGroup/CommerceVersion")
$commerceVersion = $commerceNode.InnerText
$commerceParts = $commerceVersion.Split(".")
$commerceMajor = [int]::Parse($commerceParts[0]) + 1
$commerceNextMajorVersion = ($commerceMajor.ToString() + ".0.0")

[xml] $versionFile = Get-Content "./build/version.props"
$version = $versionFile.SelectSingleNode("Project/PropertyGroup/VersionPrefix").InnerText + $versionSuffix 

Remove-Item -Path ./zipoutput -Recurse -Force -Confirm:$false -ErrorAction Ignore

Copy-Item "./CsrExtensions/clientResources/dist" -Destination "./zipoutput/CsrExtensions/clientResources/dist" -Recurse

[xml] $moduleFile = Get-Content "./CsrExtensions/module.config"
$module = $moduleFile.SelectSingleNode("module")
$module.Attributes["clientResourceRelativePath"].Value = $version
$moduleFile.Save("./zipoutput/CsrExtensions/module.config")

New-Item -Path "./zipoutput/CsrExtensions" -Name "$version" -ItemType "directory"
Move-Item -Path "./zipoutput/CsrExtensions/clientResources" -Destination "./zipoutput/CsrExtensions/$version/clientresources"

$compress = @{
  Path = "./zipoutput/CsrExtensions/*"
  CompressionLevel = "Optimal"
  DestinationPath = "./zipoutput/CsrExtensions.zip"
}
Compress-Archive @compress

dotnet pack --no-restore --no-build -c $configuration /p:PackageVersion=$version /p:CommerceVersion=$commerceVersion /p:CommerceNextMajorVersion=$commerceNextMajorVersion CsrExtensions.sln
