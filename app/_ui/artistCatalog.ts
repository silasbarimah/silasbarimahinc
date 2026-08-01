export type ArtistProject = {
  title: string;
  type: "Music" | "Lyrics" | "Film" | "Poetry" | "Visual";
  year: string;
  description: string;
  meter: string;
};

export type ArtistProfile = {
  slug: string;
  name: string;
  stageName: string;
  location: string;
  focus: string;
  headline: string;
  bio: string;
  accent: string;
  featuredProject: string;
  catalog: ArtistProject[];
};

export const artists: ArtistProfile[] = [
  {
    slug: "sonia-lune",
    name: "Sonia Lune",
    stageName: "Sonia Lune",
    location: "Accra, Ghana",
    focus: "Music • Lyrics • Storytelling",
    headline: "Velvet vocals with cinematic storytelling.",
    bio: "Sonia blends soulful melody, loose poetry, and intimate songwriting into a catalogue that feels like a living diary of movement and memory.",
    accent: "from-fuchsia-500 via-rose-500 to-orange-400",
    featuredProject: "Midnight Transit",
    catalog: [
      {
        title: "Midnight Transit",
        type: "Music",
        year: "2026",
        description: "A transportive single shaped by soft percussion and luminous synth textures.",
        meter: "4 min",
      },
      {
        title: "Letters from the Rooftop",
        type: "Lyrics",
        year: "2026",
        description: "A lyrical collection exploring restlessness, belonging, and resilience.",
        meter: "12 pieces",
      },
      {
        title: "The Bloom Before Dawn",
        type: "Film",
        year: "2025",
        description: "A visual short that mirrors her songwriting in color, silence, and rhythm.",
        meter: "12 min",
      },
    ],
  },
  {
    slug: "mika-ross",
    name: "Mika Ross",
    stageName: "Mika Ross",
    location: "Brooklyn, NY",
    focus: "Poetry • Spoken word • Visuals",
    headline: "Sharp language, warm delivery, and a dreamlike visual identity.",
    bio: "Mika turns poetic fragments into immersive sets with motion graphics, live readings, and short-form video capsules that hold deeply personal themes.",
    accent: "from-sky-500 via-cyan-500 to-emerald-400",
    featuredProject: "After the Door Closes",
    catalog: [
      {
        title: "After the Door Closes",
        type: "Poetry",
        year: "2026",
        description: "A spoken-word suite about ambition, grief, and reinvention.",
        meter: "8 poems",
      },
      {
        title: "Static Hearts",
        type: "Visual",
        year: "2026",
        description: "A short visual essay pairing voiceover with abstract motion design.",
        meter: "7 min",
      },
      {
        title: "Open Window Sessions",
        type: "Music",
        year: "2025",
        description: "An acoustic release grounded in intimate piano and low-lit improvisation.",
        meter: "6 tracks",
      },
    ],
  },
  {
    slug: "zuri-noir",
    name: "Zuri Noir",
    stageName: "Zuri Noir",
    location: "Lagos, Nigeria",
    focus: "Film • Music • Visual direction",
    headline: "Bold cinematic worlds with a pulse for the street and the sacred.",
    bio: "Zuri’s catalogue sits at the crossroads of film, rhythm, and visual worlds—balancing documentary honesty with immersive, highly stylized craft.",
    accent: "from-violet-500 via-purple-500 to-pink-500",
    featuredProject: "Neon Prayer",
    catalog: [
      {
        title: "Neon Prayer",
        type: "Film",
        year: "2026",
        description: "A short film exploring city faith, memory, and tension through bold color grades.",
        meter: "14 min",
      },
      {
        title: "Soundtrack for the Empty Road",
        type: "Music",
        year: "2025",
        description: "A moody instrumental project shaped by percussion and ambient field recordings.",
        meter: "9 tracks",
      },
      {
        title: "City Notes",
        type: "Lyrics",
        year: "2024",
        description: "A lyric collection written in transit and translated into performance.",
        meter: "20 notes",
      },
    ],
  },
];

export const curatedCollections = [
  {
    title: "New this week",
    description: "Freshly minted projects from independent artists and storytellers.",
  },
  {
    title: "Poetry in motion",
    description: "Spoken word, essays, and short films with a lyrical edge.",
  },
  {
    title: "The catalogue drop",
    description: "A deeper look at an artist’s full body of work and creative universe.",
  },
];
