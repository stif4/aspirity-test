export function transformOptions(options: string[]) {
  return options.map((o) => o.toString().toUpperCase()).filter((o) => o !== '');
}
