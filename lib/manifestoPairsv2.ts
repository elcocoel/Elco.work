export interface ManifestoStage {
  top: string;
  ecTwoLines: boolean;
  verb: string;
  rest: string;
}

export const MANIFESTO_STAGES_V2: ManifestoStage[] = [
  {
    top: 'Civilizations run on coordination systems.',
    ecTwoLines: true,
    verb: 'explores',
    rest: 'how humans coordinate in an age of intelligent machines.',
  },
  {
    top: 'The map is not the territory. But without maps, no coordination.',
    ecTwoLines: false,
    verb: 'designs',
    rest: 'communication architectures that make coordination legible.',
  },
  {
    top: 'We coordinate through stories, incentives, and sometimes spreadsheets.',
    ecTwoLines: false,
    verb: 'studies',
    rest: 'how meaning moves through human systems.',
  },
  {
    top: 'Coordination determines the future. Technology enables it.',
    ecTwoLines: false,
    verb: 'builds',
    rest: 'governance and coordination systems for emerging networks and institutions.',
  },
  {
    top: 'Humans live inside systems they barely perceive: markets, institutions, networks.',
    ecTwoLines: false,
    verb: 'in\u00ADves\u00ADti\u00ADgates',
    rest: 'how these systems shape collective agency — and how to expand it.',
  },
  {
    top: 'Ideas do not survive as ideas. They survive as artifacts.',
    ecTwoLines: false,
    verb: 'produces',
    rest: 'cultural artifacts that make institutional identity real.',
  },
];
