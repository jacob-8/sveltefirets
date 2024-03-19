export function getCookie(name: string, cookies?) {
  if (cookies == null) {
    if (typeof window === 'undefined') {
      return undefined;
    }
    cookies = document.cookie;
  }

  const kv = cookies && cookies.split(';').find((part) => part.trim().startsWith(name));

  if (!kv) return undefined;

  const cookieValue = kv.split('=')[1];
  if (!cookieValue) return undefined;

  return decodeURIComponent(cookieValue.trim());
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  document.cookie = formatCookie(name, value, options)
}

interface CookieOptions {
  domain?: string;
  expires?: string | Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

function formatCookie(name: string, value: string, options: CookieOptions = {}) {
  if (options.expires instanceof Date)
    options.expires = options.expires.toUTCString()

  const updatedCookie = {
    [encodeURIComponent(name)]: encodeURIComponent(value),
    sameSite: 'strict',
    path: '/',
    ...options,
  }

  const cookie = Object.entries(updatedCookie)
    .filter(([key]) => key !== 'secure')
    .map((kv) => kv.join('='))
    .join(';')

  return options.secure === false ? cookie : `${cookie};secure`
}
