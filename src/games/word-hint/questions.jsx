const questions = [
  {
    hint: 'An erupting mountain',
    answer: 'VOLCANO',
    allowedLetters: ['R', 'V', 'C', 'T', 'O', 'N', 'L', 'A'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Intelligent marine mammal',
    answer: 'DOLPHIN',
    allowedLetters: ['O', 'T', 'N', 'D', 'L', 'H', 'P', 'I'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Gas essential for breathing',
    answer: 'OXYGEN',
    allowedLetters: ['A', 'G', 'O', 'R', 'Y', 'N', 'X', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Dense tropical rainforest',
    answer: 'JUNGLE',
    allowedLetters: ['T', 'N', 'J', 'L', 'R', 'G', 'U', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Eight-legged web-spinning creature',
    answer: 'SPIDER',
    allowedLetters: ['L', 'D', 'S', 'A', 'P', 'R', 'I', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Soft natural fabric from a plant',
    answer: 'COTTON',
    allowedLetters: ['R', 'C', 'L', 'T', 'A', 'N', 'O', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Fast bird of prey',
    answer: 'FALCON',
    allowedLetters: ['T', 'L', 'F', 'O', 'R', 'A', 'N', 'C'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Small fruit that grows in clusters on a vine',
    answer: 'GRAPES',
    allowedLetters: ['A', 'T', 'G', 'S', 'L', 'R', 'E', 'P'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Reflective glass surface',
    answer: 'MIRROR',
    allowedLetters: ['T', 'R', 'L', 'M', 'A', 'I', 'S', 'O'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Medieval stone fortress',
    answer: 'CASTLE',
    allowedLetters: ['R', 'S', 'C', 'L', 'N', 'A', 'E', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Large arctic animal with tusks',
    answer: 'WALRUS',
    allowedLetters: ['N', 'R', 'W', 'T', 'A', 'S', 'L', 'U'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Tallest living land animal',
    answer: 'GIRAFFE',
    allowedLetters: ['L', 'A', 'G', 'E', 'T', 'R', 'F', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Spice often paired with salt',
    answer: 'PEPPER',
    allowedLetters: ['A', 'R', 'N', 'E', 'T', 'P', 'L', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Machine that performs tasks automatically',
    answer: 'ROBOT',
    allowedLetters: ['L', 'O', 'A', 'R', 'S', 'B', 'N', 'T'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Planet with famous rings',
    answer: 'SATURN',
    allowedLetters: ['P', 'T', 'S', 'N', 'L', 'U', 'A', 'R'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Large area covered with trees',
    answer: 'FOREST',
    allowedLetters: ['L', 'O', 'A', 'S', 'F', 'T', 'R', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Japanese dish with rice and fish',
    answer: 'SUSHI',
    allowedLetters: ['A', 'H', 'T', 'S', 'N', 'I', 'R', 'U'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Orange vegetable carved at Halloween',
    answer: 'PUMPKIN',
    allowedLetters: ['T', 'M', 'P', 'N', 'R', 'K', 'U', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Spherical model of Earth',
    answer: 'GLOBE',
    allowedLetters: ['O', 'R', 'G', 'T', 'B', 'A', 'E', 'L'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Sheltered area where ships dock',
    answer: 'HARBOR',
    allowedLetters: ['T', 'B', 'H', 'L', 'S', 'A', 'O', 'R'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Desert plant with sharp spines',
    answer: 'CACTUS',
    allowedLetters: ['L', 'T', 'C', 'N', 'A', 'S', 'R', 'U'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Wobbly sweet food made from fruit',
    answer: 'JELLY',
    allowedLetters: ['R', 'L', 'J', 'A', 'Y', 'T', 'E', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Armored medieval warrior on horseback',
    answer: 'KNIGHT',
    allowedLetters: ['R', 'G', 'K', 'T', 'L', 'H', 'N', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Object that attracts iron and steel',
    answer: 'MAGNET',
    allowedLetters: ['L', 'G', 'M', 'T', 'R', 'N', 'A', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Shellfish that can produce pearls',
    answer: 'OYSTER',
    allowedLetters: ['A', 'S', 'O', 'L', 'T', 'Y', 'R', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Icy body with a bright tail in space',
    answer: 'COMET',
    allowedLetters: ['R', 'M', 'C', 'L', 'A', 'E', 'T', 'O'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Common crystal mineral found in rocks',
    answer: 'QUARTZ',
    allowedLetters: ['S', 'A', 'Q', 'T', 'L', 'U', 'R', 'Z'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Thin decorative strip of fabric',
    answer: 'RIBBON',
    allowedLetters: ['A', 'B', 'R', 'N', 'T', 'O', 'L', 'I'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Ancient place of worship',
    answer: 'TEMPLE',
    allowedLetters: ['R', 'P', 'T', 'L', 'A', 'M', 'S', 'E'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Low land between two mountains',
    answer: 'VALLEY',
    allowedLetters: ['R', 'L', 'V', 'Y', 'T', 'A', 'S', 'E'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Hard-shelled tree nut',
    answer: 'WALNUT',
    allowedLetters: ['S', 'L', 'W', 'T', 'R', 'A', 'N', 'U'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Thick dairy product made from fermented milk',
    answer: 'YOGURT',
    allowedLetters: ['A', 'G', 'Y', 'T', 'L', 'U', 'R', 'O'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Metal fastener with interlocking teeth',
    answer: 'ZIPPER',
    allowedLetters: ['A', 'P', 'Z', 'R', 'L', 'E', 'T', 'I'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Heavy device that holds ships in place',
    answer: 'ANCHOR',
    allowedLetters: ['T', 'H', 'A', 'L', 'C', 'O', 'R', 'N'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Structure that vents smoke from a fireplace',
    answer: 'CHIMNEY',
    allowedLetters: ['M', 'R', 'C', 'E', 'H', 'N', 'I', 'Y'],
    maxLetterGuesses: 6
  },
  {
    hint: 'When the moon blocks the sun',
    answer: 'ECLIPSE',
    allowedLetters: ['R', 'C', 'E', 'S', 'T', 'L', 'P', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Light growth that covers a bird',
    answer: 'FEATHER',
    allowedLetters: ['L', 'A', 'F', 'H', 'S', 'T', 'E', 'R'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Largest of the great apes',
    answer: 'GORILLA',
    allowedLetters: ['T', 'R', 'G', 'L', 'N', 'O', 'A', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Land completely surrounded by water',
    answer: 'ISLAND',
    allowedLetters: ['R', 'L', 'I', 'D', 'T', 'A', 'N', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Fluffy Australian marsupial that lives in trees',
    answer: 'KOALA',
    allowedLetters: ['R', 'A', 'K', 'S', 'T', 'O', 'N', 'L'],
    maxLetterGuesses: 3
  },
  {
    hint: 'South American pack animal with fluffy fur',
    answer: 'LLAMA',
    allowedLetters: ['R', 'M', 'E', 'L', 'T', 'A', 'N', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Hard stone used in sculptures and floors',
    answer: 'MARBLE',
    allowedLetters: ['T', 'R', 'M', 'E', 'S', 'B', 'L', 'A'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Long thin strip of dough used in pasta',
    answer: 'NOODLE',
    allowedLetters: ['R', 'D', 'N', 'T', 'A', 'O', 'L', 'E'],
    maxLetterGuesses: 4
  },
  {
    hint: 'The path of a planet around the sun',
    answer: 'ORBIT',
    allowedLetters: ['A', 'B', 'O', 'T', 'L', 'R', 'S', 'I'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Flightless black and white Antarctic bird',
    answer: 'PENGUIN',
    allowedLetters: ['T', 'N', 'P', 'I', 'R', 'G', 'U', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Vehicle used for space travel',
    answer: 'ROCKET',
    allowedLetters: ['L', 'C', 'R', 'T', 'A', 'K', 'O', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Highest point of a mountain',
    answer: 'SUMMIT',
    allowedLetters: ['A', 'M', 'S', 'T', 'R', 'I', 'N', 'U'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Award given to competition winners',
    answer: 'TROPHY',
    allowedLetters: ['L', 'O', 'T', 'H', 'A', 'R', 'Y', 'P'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Device used to shield from rain',
    answer: 'UMBRELLA',
    allowedLetters: ['L', 'T', 'U', 'A', 'M', 'R', 'E', 'B'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Purple-blue color named after a flower',
    answer: 'VIOLET',
    allowedLetters: ['A', 'O', 'V', 'T', 'R', 'I', 'E', 'L'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Fictional magic user in fantasy stories',
    answer: 'WIZARD',
    allowedLetters: ['T', 'Z', 'W', 'D', 'L', 'A', 'R', 'I'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Classical dance performed on stage',
    answer: 'BALLET',
    allowedLetters: ['R', 'L', 'B', 'T', 'N', 'A', 'S', 'E'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Colored wax stick used for drawing',
    answer: 'CRAYON',
    allowedLetters: ['T', 'A', 'C', 'N', 'L', 'Y', 'O', 'R'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Dry sandy landscape with little rain',
    answer: 'DESERT',
    allowedLetters: ['A', 'S', 'D', 'T', 'L', 'R', 'N', 'E'],
    maxLetterGuesses: 4
  },
  {
    hint: 'A large kingdom ruled by an emperor',
    answer: 'EMPIRE',
    allowedLetters: ['A', 'P', 'E', 'R', 'L', 'M', 'T', 'I'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Preserved remains of an ancient creature',
    answer: 'FOSSIL',
    allowedLetters: ['A', 'S', 'F', 'L', 'R', 'O', 'T', 'I'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Warm coverings worn on hands',
    answer: 'GLOVES',
    allowedLetters: ['T', 'O', 'G', 'S', 'A', 'V', 'L', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Small furry rodent kept as a pet',
    answer: 'HAMSTER',
    allowedLetters: ['S', 'L', 'H', 'R', 'A', 'T', 'M', 'E'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'A long journey by car',
    answer: 'ROAD TRIP',
    allowedLetters: ['S', 'D', 'R', 'P', 'N', 'O', 'L', 'T', 'A', 'I'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'Famous science fiction film franchise',
    answer: 'STAR WARS',
    allowedLetters: ['N', 'A', 'S', 'O', 'L', 'T', 'I', 'R', 'E', 'W'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'An evening meal everyone loves',
    answer: 'PIZZA NIGHT',
    allowedLetters: ['R', 'Z', 'P', 'G', 'L', 'A', 'T', 'N', 'H', 'I'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'A group that reads together',
    answer: 'BOOK CLUB',
    allowedLetters: ['A', 'K', 'B', 'U', 'R', 'O', 'N', 'C', 'T', 'L'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'The glow of an urban area at night',
    answer: 'CITY LIGHTS',
    allowedLetters: ['A', 'T', 'C', 'H', 'R', 'L', 'S', 'Y', 'G', 'I'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'A gathering on the sandy shore',
    answer: 'BEACH PARTY',
    allowedLetters: ['C', 'S', 'B', 'T', 'H', 'A', 'Y', 'P', 'R', 'E'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'The moon at its brightest phase',
    answer: 'FULL MOON',
    allowedLetters: ['A', 'M', 'F', 'N', 'T', 'O', 'S', 'L', 'R', 'U'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'A short sleep to recharge energy',
    answer: 'POWER NAP',
    allowedLetters: ['S', 'W', 'P', 'N', 'L', 'E', 'T', 'A', 'R', 'O'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'An unpredictable or surprising element',
    answer: 'WILD CARD',
    allowedLetters: ['T', 'L', 'W', 'A', 'S', 'D', 'N', 'C', 'R', 'I'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'A day off due to heavy snowfall',
    answer: 'SNOW DAY',
    allowedLetters: ['R', 'N', 'S', 'A', 'L', 'W', 'T', 'O', 'D', 'Y'],
    maxLetterGuesses: 6
  }
];

export default questions;
