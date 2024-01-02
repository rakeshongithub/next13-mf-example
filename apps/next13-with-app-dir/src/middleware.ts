import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18nConfig } from '@/i18nConfig'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18nConfig.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const defaultLocale = i18nConfig.defaultLocale;
  const otherLocales = i18nConfig.otherLocales;

  // Check if the default locale is in the pathname
  // console.log(pathname, '=====1')
  // console.log(pathname.startsWith(`/${defaultLocale}/`), '=====2')
  if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
    // e.g. incoming request is /en/products
    // The new URL is now /products
    return NextResponse.redirect(
      new URL(pathname.replace(`/${defaultLocale}`, pathname === `/${defaultLocale}` ? '/' : `${i18nConfig.basePath}`), request.url)
    )
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = otherLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  const locale = getLocale(request);
  if (pathnameIsMissingLocale) {
    if(locale === defaultLocale) {
      return NextResponse.rewrite(
        new URL(`${i18nConfig.basePath}/${defaultLocale}${pathname}`, request.url)
      )
    }
    
    // const locale = getLocale(request)
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `${i18nConfig.basePath}/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}