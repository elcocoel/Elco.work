import { redirect } from 'next/navigation';

/** Former prototype URL; canonical home is `/`. */
export default function HomeAltRedirectPage() {
  redirect('/');
}
