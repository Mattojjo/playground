const questions = [
  {
    hint: 'Tropical fruit often used in smoothies',
    answer: 'MANGO',
    allowedLetters: ['M', 'A', 'N', 'G', 'O', 'R', 'L', 'T'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Planet known as the Red Planet',
    answer: 'MARS',
    allowedLetters: ['M', 'A', 'R', 'S', 'E', 'T', 'V', 'P'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Instrument with black and white keys',
    answer: 'PIANO',
    allowedLetters: ['P', 'I', 'A', 'N', 'O', 'T', 'R', 'L'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Fastest land animal',
    answer: 'CHEETAH',
    allowedLetters: ['C', 'H', 'E', 'T', 'A', 'L', 'R', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Classic arcade game with falling blocks',
    answer: 'TETRIS',
    allowedLetters: ['T', 'E', 'R', 'I', 'S', 'A', 'L', 'O'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Bird known for mimicking sounds',
    answer: 'PARROT',
    allowedLetters: ['P', 'A', 'R', 'O', 'T', 'L', 'E', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Largest ocean on Earth',
    answer: 'PACIFIC',
    allowedLetters: ['P', 'A', 'C', 'I', 'F', 'R', 'L', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Color made from red and blue',
    answer: 'PURPLE',
    allowedLetters: ['P', 'U', 'R', 'L', 'E', 'A', 'T', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Tool used to hit nails',
    answer: 'HAMMER',
    allowedLetters: ['H', 'A', 'M', 'E', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Device used to take photos',
    answer: 'CAMERA',
    allowedLetters: ['C', 'A', 'M', 'E', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Gas plants absorb from the air',
    answer: 'CARBON',
    allowedLetters: ['C', 'A', 'R', 'B', 'O', 'N', 'L', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Season after summer',
    answer: 'AUTUMN',
    allowedLetters: ['A', 'U', 'T', 'M', 'N', 'L', 'R', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'World currency used in Japan',
    answer: 'YEN',
    allowedLetters: ['Y', 'E', 'N', 'A', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Star at the center of our solar system',
    answer: 'SUN',
    allowedLetters: ['S', 'U', 'N', 'A', 'R', 'L', 'T', 'E'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Triangle-shaped snack chip',
    answer: 'NACHO',
    allowedLetters: ['N', 'A', 'C', 'H', 'O', 'R', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Largest mammal in the ocean',
    answer: 'WHALE',
    allowedLetters: ['W', 'H', 'A', 'L', 'E', 'R', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Frozen dessert on a cone',
    answer: 'ICECREAM',
    allowedLetters: ['I', 'C', 'E', 'R', 'A', 'M', 'L', 'T'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Plant that grows in a pod and is green',
    answer: 'PEA',
    allowedLetters: ['P', 'E', 'A', 'R', 'L', 'T', 'S', 'N'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Metal used in coins and wiring',
    answer: 'COPPER',
    allowedLetters: ['C', 'O', 'P', 'E', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Gem often used in engagement rings',
    answer: 'DIAMOND',
    allowedLetters: ['D', 'I', 'A', 'M', 'O', 'N', 'L', 'R'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Animal that carries its home',
    answer: 'TURTLE',
    allowedLetters: ['T', 'U', 'R', 'L', 'E', 'A', 'S', 'N'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Smallest continent',
    answer: 'EUROPE',
    allowedLetters: ['E', 'U', 'R', 'O', 'P', 'L', 'T', 'A'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Device that rings in the morning',
    answer: 'ALARM',
    allowedLetters: ['A', 'L', 'A', 'R', 'M', 'E', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Month with a leap day',
    answer: 'FEBRUARY',
    allowedLetters: ['F', 'E', 'B', 'R', 'U', 'A', 'Y', 'L'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Tool for cutting paper',
    answer: 'SCISSORS',
    allowedLetters: ['S', 'C', 'I', 'S', 'O', 'R', 'T', 'L'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Sport played on ice with sticks',
    answer: 'HOCKEY',
    allowedLetters: ['H', 'O', 'C', 'K', 'E', 'Y', 'L', 'R'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Large body of freshwater',
    answer: 'LAKE',
    allowedLetters: ['L', 'A', 'K', 'E', 'R', 'T', 'S', 'N'],
    maxLetterGuesses: 3
  },
  {
    hint: 'A building where books are borrowed',
    answer: 'LIBRARY',
    allowedLetters: ['L', 'I', 'B', 'R', 'A', 'Y', 'T', 'S'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Animal known for its stripes',
    answer: 'ZEBRA',
    allowedLetters: ['Z', 'E', 'B', 'R', 'A', 'L', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Vehicle with two wheels and pedals',
    answer: 'BICYCLE',
    allowedLetters: ['B', 'I', 'C', 'Y', 'C', 'L', 'E', 'R'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Mountain in Japan with snow cap',
    answer: 'FUJI',
    allowedLetters: ['F', 'U', 'J', 'I', 'A', 'R', 'L', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Shape with three sides',
    answer: 'TRIANGLE',
    allowedLetters: ['T', 'R', 'I', 'A', 'N', 'G', 'L', 'E'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Large cat known as the king of the jungle',
    answer: 'LION',
    allowedLetters: ['L', 'I', 'O', 'N', 'A', 'R', 'T', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Yellow fruit with a peel',
    answer: 'BANANA',
    allowedLetters: ['B', 'A', 'N', 'A', 'N', 'R', 'T', 'S'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Tool for writing with ink',
    answer: 'PEN',
    allowedLetters: ['P', 'E', 'N', 'A', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Kitchen device that keeps food cold',
    answer: 'FRIDGE',
    allowedLetters: ['F', 'R', 'I', 'D', 'G', 'E', 'L', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Public place to watch movies',
    answer: 'CINEMA',
    allowedLetters: ['C', 'I', 'N', 'E', 'M', 'A', 'R', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Beverage made from tea leaves',
    answer: 'TEA',
    allowedLetters: ['T', 'E', 'A', 'R', 'L', 'S', 'N', 'P'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Famous clock tower in London',
    answer: 'BIGBEN',
    allowedLetters: ['B', 'I', 'G', 'E', 'N', 'A', 'R', 'T'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Instrument with six strings',
    answer: 'GUITAR',
    allowedLetters: ['G', 'U', 'I', 'T', 'A', 'R', 'L', 'S'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Red condiment often on fries',
    answer: 'KETCHUP',
    allowedLetters: ['K', 'E', 'T', 'C', 'H', 'U', 'P', 'L'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Device used to listen to music on the go',
    answer: 'HEADPHONES',
    allowedLetters: ['H', 'E', 'A', 'D', 'P', 'O', 'N', 'S'],
    maxLetterGuesses: 7
  },
  {
    hint: 'Ocean animal with eight arms',
    answer: 'OCTOPUS',
    allowedLetters: ['O', 'C', 'T', 'P', 'U', 'S', 'L', 'R'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Tool used to open a lock',
    answer: 'KEY',
    allowedLetters: ['K', 'E', 'Y', 'A', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 2
  },
  {
    hint: 'The closest star to Earth',
    answer: 'SUN',
    allowedLetters: ['S', 'U', 'N', 'A', 'R', 'L', 'T', 'E'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Desert known for its pyramids',
    answer: 'SAHARA',
    allowedLetters: ['S', 'A', 'H', 'R', 'A', 'L', 'T', 'E'],
    maxLetterGuesses: 5
  },
  {
    hint: 'Tall plant with a woody trunk',
    answer: 'TREE',
    allowedLetters: ['T', 'R', 'E', 'E', 'A', 'L', 'S', 'N'],
    maxLetterGuesses: 3
  },
  {
    hint: 'A small computer in your pocket',
    answer: 'PHONE',
    allowedLetters: ['P', 'H', 'O', 'N', 'E', 'A', 'R', 'T'],
    maxLetterGuesses: 4
  },
  {
    hint: 'Sport with a hoop and a ball',
    answer: 'BASKETBALL',
    allowedLetters: ['B', 'A', 'S', 'K', 'E', 'T', 'L', 'R'],
    maxLetterGuesses: 7
  },
  {
    hint: 'Animal that says "moo"',
    answer: 'COW',
    allowedLetters: ['C', 'O', 'W', 'A', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Natural satellite of Earth',
    answer: 'MOON',
    allowedLetters: ['M', 'O', 'O', 'N', 'A', 'R', 'T', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'City known as the Big Apple',
    answer: 'NEWYORK',
    allowedLetters: ['N', 'E', 'W', 'Y', 'O', 'R', 'K', 'L'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Liquid that falls from the sky',
    answer: 'RAIN',
    allowedLetters: ['R', 'A', 'I', 'N', 'E', 'L', 'T', 'S'],
    maxLetterGuesses: 3
  },
  {
    hint: 'Device for typing on a computer',
    answer: 'KEYBOARD',
    allowedLetters: ['K', 'E', 'Y', 'B', 'O', 'A', 'R', 'D'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Green gemstone often in jewelry',
    answer: 'EMERALD',
    allowedLetters: ['E', 'M', 'R', 'A', 'L', 'D', 'S', 'T'],
    maxLetterGuesses: 6
  },
  {
    hint: 'Large vehicle that carries passengers',
    answer: 'BUS',
    allowedLetters: ['B', 'U', 'S', 'A', 'R', 'L', 'T', 'E'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Frozen water',
    answer: 'ICE',
    allowedLetters: ['I', 'C', 'E', 'A', 'R', 'L', 'T', 'S'],
    maxLetterGuesses: 2
  },
  {
    hint: 'Tool used to paint walls',
    answer: 'BRUSH',
    allowedLetters: ['B', 'R', 'U', 'S', 'H', 'A', 'L', 'T'],
    maxLetterGuesses: 4
  },
  {
    type: 'phrase',
    hint: 'A promise made on the spot',
    answer: 'PINKY SWEAR',
    allowedLetters: ['P', 'I', 'N', 'K', 'Y', 'S', 'W', 'E', 'A', 'R'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'A storm with thunder and lightning',
    answer: 'SUMMER STORM',
    allowedLetters: ['S', 'U', 'M', 'E', 'R', 'T', 'O', 'N', 'L', 'A'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'Going for a quick jog',
    answer: 'MORNING RUN',
    allowedLetters: ['M', 'O', 'R', 'N', 'I', 'G', 'U', 'L', 'A', 'T'],
    maxLetterGuesses: 7
  },
  {
    type: 'phrase',
    hint: 'A short trip taken for fun',
    answer: 'DAY OUT',
    allowedLetters: ['D', 'A', 'Y', 'O', 'U', 'T', 'R', 'N', 'L', 'S'],
    maxLetterGuesses: 5
  },
  {
    type: 'phrase',
    hint: 'A task that must be done',
    answer: 'TO DO',
    allowedLetters: ['T', 'O', 'D', 'A', 'R', 'L', 'S', 'N'],
    maxLetterGuesses: 4
  },
  {
    type: 'phrase',
    hint: 'A cozy place by the fire',
    answer: 'WARM CORNER',
    allowedLetters: ['W', 'A', 'R', 'M', 'C', 'O', 'N', 'E', 'L', 'T'],
    maxLetterGuesses: 8
  },
  {
    type: 'phrase',
    hint: 'A fresh start on Monday',
    answer: 'NEW WEEK',
    allowedLetters: ['N', 'E', 'W', 'K', 'A', 'R', 'L', 'S', 'T', 'I'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'Spending the night away from home',
    answer: 'SLEEPOVER PARTY',
    allowedLetters: ['S', 'L', 'E', 'P', 'O', 'V', 'R', 'T', 'A', 'Y'],
    maxLetterGuesses: 9
  },
  {
    type: 'phrase',
    hint: 'A sweet treat after dinner',
    answer: 'ICE CREAM',
    allowedLetters: ['I', 'C', 'E', 'R', 'A', 'M', 'S', 'T', 'N', 'L'],
    maxLetterGuesses: 6
  },
  {
    type: 'phrase',
    hint: 'A special meal with family',
    answer: 'SUNDAY LUNCH',
    allowedLetters: ['S', 'U', 'N', 'D', 'A', 'Y', 'L', 'C', 'H', 'T'],
    maxLetterGuesses: 8
  }
];

export default questions;
