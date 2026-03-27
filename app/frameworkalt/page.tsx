import { redirect } from 'next/navigation';

/** Former prototype URL; canonical framework is `/framework`. */
export default function FrameworkAltRedirectPage() {
  redirect('/framework');
}
