export interface ManifestoStage {
  top: string;
  ecTwoLines: boolean;
  verb: string;
  rest: string;
}

export const MANIFESTO_STAGES: ManifestoStage[] = [
  {
    top: 'Civilizations run on coordination systems.',
    ecTwoLines: true,
    verb: 'explores',
    rest: 'how humans coordinate in an age of intelligent machines.',
  },
  {
    top: 'The map is not the territory. But no maps, no coordination.',
    ecTwoLines: false,
    verb: 'designs',
    rest: 'communication architectures that make complex coordination legible.',
  },
  {
    top: 'We coordinate through stories, incentives, and sometimes spreadsheets.',
    ecTwoLines: false,
    verb: 'studies',
    rest: 'how meaning emerges inside human systems.',
  },
  {
    top: 'Coordination determines the future. Technology enables it.',
    ecTwoLines: false,
    verb: 'builds',
    rest: 'technology-enabled coordination systems for emerging networks and institutions.',
  },
  {
    top: 'Humans live inside systems they barely understand: markets, institutions, networks.',
    ecTwoLines: false,
    verb: 'in\u00ADves\u00ADti\u00ADgates',
    rest: 'how these systems emerge and shape the worlds we inhabit.',
  },
  {
    top: 'Ideas do not survive as ideas. They survive as artifacts.',
    ecTwoLines: false,
    verb: 'creates',
    rest: 'cultural artifacts that crystallize institutional identity.',
  },
];
