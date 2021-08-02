import isValidDomain from 'is-valid-domain'

const PERMITTED_PROTOCOLS = ['http:', 'https:']

export function isValidUrl(urlString?: string): boolean {
  if (!urlString) return false
  // The methods invoked here return undefined if the URL is invalid
  try {
    const url = new URL(urlString)
    // Do not permit ports
    if (url.port) return false
    // Ensure domain name is valid
    if (!isValidDomain(url.host)) return false
    // Only allow permitted protocols
    if (PERMITTED_PROTOCOLS.indexOf(url.protocol) === -1) return false
  } catch (e) {
    // If URL is unparseable, return false
    console.error('Could not parse URL!', e)
    return false
  }
  return true
}

export function getShortUrlForId(id: string) {
  return `http://localhost:3000/${id}`
}
