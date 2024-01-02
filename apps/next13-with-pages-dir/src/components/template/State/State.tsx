import React from 'react';
import { useRouter } from 'next/router';
import { getPathSegments } from '@/src/utils/common';

function State({locale, state}: {locale: string, state: string}) {
  const router = useRouter();
  const pathname = router.pathname;
  const pathSegments = getPathSegments(pathname);
  console.log(pathSegments)

  return (
    <div>=== StatePage - {state} - {locale} - {pathname}</div>
  )
}

export default State;
