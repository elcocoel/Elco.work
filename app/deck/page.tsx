import { DeckView } from '@/components/deck/DeckView';
import { HARNESS_DECK } from '@/lib/deckData';

export const metadata = {
  title: 'The Harness — Deck | Elementary Complexity',
  description: 'How Elementary Complexity runs its system.',
};

export default function DeckPage() {
  return <DeckView deck={HARNESS_DECK} />;
}
