export const ensurePrefix = (prefix: string, str: string) => {
  if (!str.startsWith(prefix)) {
    return prefix + str
  } else {
    return str
  }
}
