import { getRandomSubset } from '../../utils/gameUtils';

const movieQuoteQuestions = [
    {
        quote: "That wasn't flying, that was falling with style.",
        options: ["Toy Story", "Toy Story 2", "A Bug's Life", "Monsters, Inc."],
        answer: "Toy Story"
    },
    {
        quote: "When life gets you down, you know what you gotta do? Just keep swimming.",
        options: ["Finding Dory", "Finding Nemo", "The Little Mermaid", "Moana"],
        answer: "Finding Nemo"
    },
    {
        quote: "Oh yes, the past can hurt. But the way I see it, you can either run from it or learn from it.",
        options: ["The Lion King", "The Lion King II", "Brother Bear", "Tarzan"],
        answer: "The Lion King"
    },
    {
        quote: "You know, it just a house.",
        options: ["Up", "Monster House", "The Incredibles", "Ratatouille"],
        answer: "Up"
    },
    {
        quote: "We are Groot.",
        options: ["Guardians of the Galaxy Vol. 2", "Guardians of the Galaxy", "Avengers: Infinity War", "Thor: Ragnarok"],
        answer: "Guardians of the Galaxy"
    },
    {
        quote: "Your only limit is your soul. What I say is true - anyone can cook, but only the fearless can be great.",
        options: ["Ratatouille", "The Incredibles", "Soul", "Coco"],
        answer: "Ratatouille"
    },
    {
        quote: "The greatest gift and honor is having you for a daughter.",
        options: ["Mulan", "Moana", "Brave", "Pocahontas"],
        answer: "Mulan"
    },
    {
        quote: "Listen with your heart, you will understand.",
        options: ["Pocahontas", "Mulan", "The Princess and the Frog", "Tangled"],
        answer: "Pocahontas"
    },
    {
        quote: "You can't just sit here in the middle of nowhere.",
        options: ["Madagascar", "Ice Age", "Rio", "The Wild"],
        answer: "Madagascar"
    },
    {
        quote: "I've a feeling we're not in Kansas anymore.",
        options: ["The Wizard of Oz", "Alice in Wonderland", "Peter Pan", "Willy Wonka"],
        answer: "The Wizard of Oz"
    },
    {
        quote: "This is the day you will always remember as the day you almost caught Captain Jack Sparrow.",
        options: ["Pirates of the Caribbean", "Treasure Planet", "Peter Pan", "Sinbad"],
        answer: "Pirates of the Caribbean"
    },
    {
        quote: "That's not flying, that's just falling with style.",
        options: ["Toy Story", "The Incredibles", "Cars", "A Bug's Life"],
        answer: "Toy Story"
    },
    {
        quote: "I am a nice shark, not a mindless eating machine.",
        options: ["Finding Nemo", "Shark Tale", "Finding Dory", "The Little Mermaid"],
        answer: "Finding Nemo"
    },
    {
        quote: "You can't! You can't! There's no way you can quit!",
        options: ["The Incredibles", "The Incredibles 2", "Ratatouille", "Inside Out"],
        answer: "The Incredibles"
    },
    {
        quote: "What do you want me to do? Dress in drag and do the hula?",
        options: ["The Lion King", "Aladdin", "Hercules", "Mulan"],
        answer: "The Lion King"
    },
    {
        quote: "You have forgotten who you are and so have forgotten me.",
        options: ["The Lion King", "The Lion King II", "Tarzan", "Brother Bear"],
        answer: "The Lion King"
    },
    {
        quote: "Strange things are happening to me.",
        options: ["Toy Story", "Toy Story 2", "Monsters, Inc.", "A Bug's Life"],
        answer: "Toy Story"
    },
    {
        quote: "Not everyone can become a great artist, but a great artist can come from anywhere.",
        options: ["Ratatouille", "Coco", "Soul", "Inside Out"],
        answer: "Ratatouille"
    },
    {
        quote: "You are not a cooking robot. You are a chef!",
        options: ["Ratatouille", "The Incredibles", "WALL-E", "Big Hero 6"],
        answer: "Ratatouille"
    },
    {
        quote: "Change is nature, the part that we can influence. And it starts when we decide.",
        options: ["Ratatouille", "Up", "Inside Out", "Zootopia"],
        answer: "Ratatouille"
    },
    {
        quote: "Don't let them in, don't let them see. Be the good girl you always have to be.",
        options: ["Frozen", "Frozen II", "Tangled", "Moana"],
        answer: "Frozen"
    },
    {
        quote: "Fear will be your enemy.",
        options: ["Frozen", "Frozen II", "Brave", "Moana"],
        answer: "Frozen"
    },
    {
        quote: "Love is putting someone else's needs before yours.",
        options: ["Frozen", "Beauty and the Beast", "Tangled", "The Princess and the Frog"],
        answer: "Frozen"
    },
    {
        quote: "An act of true love will thaw a frozen heart.",
        options: ["Frozen", "Frozen II", "Beauty and the Beast", "Sleeping Beauty"],
        answer: "Frozen"
    },
    {
        quote: "I was hiding under your porch because I love you.",
        options: ["Up", "Bolt", "The Secret Life of Pets", "Finding Dory"],
        answer: "Up"
    },
    {
        quote: "You know what? You can't keep the bird. It's wild.",
        options: ["Up", "Rio", "Finding Nemo", "Ice Age"],
        answer: "Up"
    },
    {
        quote: "I do not like the Cone of Shame.",
        options: ["Up", "Bolt", "The Secret Life of Pets", "Finding Dory"],
        answer: "Up"
    },
    {
        quote: "You are my greatest adventure.",
        options: ["Up", "The Incredibles", "Finding Nemo", "Inside Out"],
        answer: "Up"
    },
    {
        quote: "I’m always watching, Wazowski.",
        options: ["Monsters, Inc.", "Toy Story", "Frozen", "Up"],
        answer: "Monsters, Inc."
    },
    {
        quote: "We scare because we care.",
        options: ["Monsters, Inc.", "Toy Story", "Frozen", "Up"],
        answer: "Monsters, Inc."
    },
    {
        quote: "Put that thing back where it came from or so help me!",
        options: ["Monsters, Inc.", "Toy Story", "Frozen", "Up"],
        answer: "Monsters, Inc."
    },
    {
        quote: "I’m watching you, always watching.",
        options: ["Monsters, Inc.", "Toy Story", "Frozen", "Up"],
        answer: "Monsters, Inc."
    },
    {
        quote: "Release your inner child.",
        options: ["Monsters, Inc.", "Toy Story", "Frozen", "Up"],
        answer: "Monsters, Inc."
    },
    {
        quote: "Ogres are like onions.",
        options: ["Shrek", "Toy Story", "Frozen", "Up"],
        answer: "Shrek"
    },
    {
        quote: "For you, baby, I could be.",
        options: ["Shrek", "Shrek 2", "Tangled", "Beauty and the Beast"],
        answer: "Shrek"
    },
    {
        quote: "What are you doing in my swamp?!",
        options: ["Shrek", "Shrek 2", "Shrek Forever After", "The Princess and the Frog"],
        answer: "Shrek"
    },
    {
        quote: "I need a hero!",
        options: ["Shrek 2", "Shrek", "Hercules", "Mulan"],
        answer: "Shrek 2"
    },
    {
        quote: "I like to move it, move it.",
        options: ["Madagascar", "Toy Story", "Frozen", "Up"],
        answer: "Madagascar"
    },
    {
        quote: "Smile and wave, boys. Smile and wave.",
        options: ["Madagascar", "Toy Story", "Frozen", "Up"],
        answer: "Madagascar"
    },
    {
        quote: "Just smile and wave.",
        options: ["Madagascar", "Toy Story", "Frozen", "Up"],
        answer: "Madagascar"
    },
    {
        quote: "You didn’t see anything.",
        options: ["Madagascar", "Toy Story", "Frozen", "Up"],
        answer: "Madagascar"
    },
    {
        quote: "We’re gonna need a bigger boat.",
        options: ["Madagascar", "Toy Story", "Frozen", "Up"],
        answer: "Madagascar"
    },
    {
        quote: "I am your father.",
        options: ["Star Wars", "Toy Story", "Frozen", "Up"],
        answer: "Star Wars"
    },
    {
        quote: "May the Force be with you.",
        options: ["Star Wars", "Toy Story", "Frozen", "Up"],
        answer: "Star Wars"
    },
    {
        quote: "Help me, Obi-Wan Kenobi. You’re my only hope.",
        options: ["Star Wars", "Toy Story", "Frozen", "Up"],
        answer: "Star Wars"
    },
    {
        quote: "Do or do not. There is no try.",
        options: ["Star Wars", "Toy Story", "Frozen", "Up"],
        answer: "Star Wars"
    },
    {
        quote: "Chewie, we’re home.",
        options: ["Star Wars", "Toy Story", "Frozen", "Up"],
        answer: "Star Wars"
    },
    {
        quote: "Darkness. No parents. Continued darkness.",
        options: ["The Lego Batman Movie", "The Lego Movie", "The Batman", "The Dark Knight"],
        answer: "The Lego Batman Movie"
    },
    {
        quote: "Introducing the double-decker couch!",
        options: ["The Lego Movie", "The Lego Batman Movie", "The Lego Movie 2", "Toy Story"],
        answer: "The Lego Movie"
    },
    {
        quote: "I'm not just a character, I'm a person!",
        options: ["The Lego Movie", "The Lego Movie 2", "Toy Story", "Wreck-It Ralph"],
        answer: "The Lego Movie"
    },
    {
        quote: "Greater good? I am your wife! I'm the greatest good you are ever gonna get!",
        options: ["The Incredibles", "The Incredibles 2", "Ratatouille", "Inside Out"],
        answer: "The Incredibles"
    },
    {
        quote: "You want to do something for your family? Then be Mr. Incredible.",
        options: ["The Incredibles", "The Incredibles 2", "Big Hero 6", "Sky High"],
        answer: "The Incredibles"
    },
    {
        quote: "I'm The Underminer! I'm always beneath you, but nothing is beneath me!",
        options: ["The Incredibles", "Megamind", "Despicable Me", "The Lego Batman Movie"],
        answer: "The Incredibles"
    },
    {
        quote: "Luck favors the prepared.",
        options: ["The Incredibles", "The Incredibles 2", "Ratatouille", "Big Hero 6"],
        answer: "The Incredibles"
    },
    {
        quote: "Just keep swimming.",
        options: ["Finding Nemo", "Toy Story", "Frozen", "Up"],
        answer: "Finding Nemo"
    },
    {
        quote: "P. Sherman, 42 Wallaby Way, Sydney.",
        options: ["Finding Nemo", "Toy Story", "Frozen", "Up"],
        answer: "Finding Nemo"
    },
    {
        quote: "I shall call him Squishy and he shall be mine.",
        options: ["Finding Nemo", "Toy Story", "Frozen", "Up"],
        answer: "Finding Nemo"
    },
    {
        quote: "Mine! Mine! Mine!",
        options: ["Finding Nemo", "Toy Story", "Frozen", "Up"],
        answer: "Finding Nemo"
    },
    {
        quote: "I’m having fish tonight!",
        options: ["Finding Nemo", "Toy Story", "Frozen", "Up"],
        answer: "Finding Nemo"
    },
    {
        quote: "There are those who say fate is something beyond our command. That destiny is not our own, but I know better.",
        options: ["Brave", "Mulan", "Moana", "Pocahontas"],
        answer: "Brave"
    },
    {
        quote: "Legends are lessons. They ring with truth.",
        options: ["Brave", "Moana", "Mulan", "The Princess and the Frog"],
        answer: "Brave"
    },
    {
        quote: "Some say our destiny is tied to the land, as much a part of us as we are of it.",
        options: ["Brave", "Pocahontas", "Moana", "Brother Bear"],
        answer: "Brave"
    },
    {
        quote: "The wisp will lead me to my fate.",
        options: ["Brave", "Frozen", "Tangled", "Moana"],
        answer: "Brave"
    },
    {
        quote: "Do you trust me?",
        options: ["Aladdin", "Frozen", "Tangled", "Beauty and the Beast"],
        answer: "Aladdin"
    },
    {
        quote: "I can show you the world.",
        options: ["Aladdin", "Tangled", "The Little Mermaid", "Frozen"],
        answer: "Aladdin"
    },
    {
        quote: "Ten thousand years will give you such a crick in the neck!",
        options: ["Aladdin", "The Emperor's New Groove", "Hercules", "Moana"],
        answer: "Aladdin"
    },
    {
        quote: "I'm a street rat, remember?",
        options: ["Aladdin", "The Princess and the Frog", "Tangled", "The Hunchback of Notre Dame"],
        answer: "Aladdin"
    },
    {
        quote: "Everything the light touches is our kingdom.",
        options: ["The Lion King", "The Lion King II", "Brother Bear", "Tarzan"],
        answer: "The Lion King"
    },
    {
        quote: "Oh yes, the past can hurt. But from the way I see it, you can either run from it, or learn from it.",
        options: ["The Lion King", "The Lion King II", "Brother Bear", "Kung Fu Panda"],
        answer: "The Lion King"
    },
    {
        quote: "Life's not fair, is it?",
        options: ["The Lion King", "The Lion King 1½", "Brother Bear", "The Jungle Book"],
        answer: "The Lion King"
    },
    {
        quote: "I'm ten times the king Mufasa was!",
        options: ["The Lion King", "The Lion King II", "The Lion King 1½", "Brother Bear"],
        answer: "The Lion King"
    },
    {
        quote: "Does it come in black?",
        options: ["Batman Begins", "The Dark Knight", "The Dark Knight Rises", "Batman"],
        answer: "Batman Begins"
    },
    {
        quote: "I'm not wearing hockey pads.",
        options: ["The Dark Knight", "Batman Begins", "The Dark Knight Rises", "Batman v Superman"],
        answer: "The Dark Knight"
    },
    {
        quote: "This city deserves a better class of criminal.",
        options: ["The Dark Knight", "Batman Begins", "The Dark Knight Rises", "Joker"],
        answer: "The Dark Knight"
    },
    {
        quote: "Let's put a smile on that face!",
        options: ["The Dark Knight", "Joker", "Batman", "The Dark Knight Rises"],
        answer: "The Dark Knight"
    }
];

export default getRandomSubset(movieQuoteQuestions, 10);
