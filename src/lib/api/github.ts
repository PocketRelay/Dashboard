

export interface GitHubRelease {
    html_url: string,
    tag_name: string,
}

/**
 * Gets the latest GitHub release version from GitHubs API
 * 
 * @returns Promise that resolves to the latest release version
 */
export async function getLatestRelease(): Promise<GitHubRelease> {
    const response = await fetch("https://api.github.com/repos/PocketRelay/Server/releases/latest");
    const json: GitHubRelease = await response.json();

    return {
        html_url: json.html_url,
        tag_name: json.tag_name
    }

}
