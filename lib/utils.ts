export function isHttp(path: string): boolean {
  return /^http:\/\//.test(path);
}

export function isHttps(path: string): boolean {
  return /^https:\/\//.test(path);
}
