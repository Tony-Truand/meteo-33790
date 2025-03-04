import clsx from 'clsx'
export function cn(...args: any[]) {
  const expr = (c: any) => typeof c === 'string' && c.includes('?:');

  // We fix typo if somewhere we wrote ?:test it should be ?: test
  const ARGS = args.map(arg => typeof arg === 'string' ? arg.replace(/\?:\b/, '?: ') : arg)
  const hasDefault = ARGS.filter(expr).map(String);
  const others = ARGS.filter(c => !expr(c));
  const merged = clsx(others);
  const ret = hasDefault && hasDefault.length > 0 ? hasDefault.reduce((prev, curr) => {
    return prev.replaceAll('?', curr.replace('?:', ''));
  }, merged) : merged;
  return ret.trim();
}