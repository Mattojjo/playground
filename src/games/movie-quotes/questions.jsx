const movieQuoteQuestions = [
    {
        quote: "To infinity and beyond!",
        options: ["Toy Story", "Finding Nemo", "Shrek", "Spirited Away"],
        answer: "Toy Story"
    },
    {
        quote: "Just keep swimming.",
        options: ["Finding Nemo", "Frozen", "Monsters, Inc.", "Kiki's Delivery Service"],
        answer: "Finding Nemo"
    },
    {
        quote: "The past can hurt. But you can either run from it, or learn from it.",
        options: ["The Lion King", "Up", "Howl's Moving Castle", "Kung Fu Panda"],
        answer: "The Lion King"
    },
    {
        quote: "Adventure is out there!",
        options: ["Up", "Coco", "My Neighbor Totoro", "Madagascar"],
        answer: "Up"
    },
    {
        quote: "I am Groot.",
        options: ["Guardians of the Galaxy", "Big Hero 6", "Shrek", "Castle in the Sky"],
        answer: "Guardians of the Galaxy"
    },
    {
        quote: "You must not let anyone define your limits because of where you come from.",
        options: ["Ratatouille", "Frozen", "Ponyo", "Tangled"],
        answer: "Ratatouille"
    },
    {
        quote: "The flower that blooms in adversity is the most rare and beautiful of all.",
        options: ["Mulan", "Brave", "Princess Mononoke", "Shrek 2"],
        answer: "Mulan"
    },
    {
        quote: "Sometimes the right path is not the easiest one.",
        options: ["Pocahontas", "Inside Out", "Spirited Away", "Madagascar"],
        answer: "Pocahontas"
    },
    {
        quote: "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
        options: ["Madagascar", "Cars", "Onward", "Castle in the Sky"],
        answer: "Madagascar"
    },
    {
        quote: "There's no place like home.",
        options: ["The Wizard of Oz", "Finding Dory", "Kiki's Delivery Service", "Frozen"],
        answer: "The Wizard of Oz"
    },
    {
        quote: "Reach for the sky!",
        options: ["Toy Story", "Up", "Monsters, Inc.", "Frozen"],
        answer: "Toy Story"
    },
    {
        quote: "You are a toy!",
        options: ["Toy Story", "Finding Nemo", "Shrek", "Coco"],
        answer: "Toy Story"
    },
    {
        quote: "Fish are friends, not food.",
        options: ["Finding Nemo", "Shark Tale", "Madagascar", "Frozen"],
        answer: "Finding Nemo"
    },
    {
        quote: "I never look back, darling. It distracts from the now.",
        options: ["The Incredibles", "Toy Story", "Frozen", "Up"],
        answer: "The Incredibles"
    },
    {
        quote: "Hakuna Matata!",
        options: ["The Lion King", "Madagascar", "Finding Nemo", "Up"],
        answer: "The Lion King"
    },
    {
        quote: "Remember who you are.",
        options: ["The Lion King", "Up", "Frozen", "Toy Story"],
        answer: "The Lion King"
    },
    {
        quote: "You’ve got a friend in me.",
        options: ["Toy Story", "Frozen", "Up", "Monsters, Inc."],
        answer: "Toy Story"
    },
    {
        quote: "I will never be good enough for you.",
        options: ["Ratatouille", "Frozen", "Up", "Toy Story"],
        answer: "Ratatouille"
    },
    {
        quote: "Anyone can cook.",
        options: ["Ratatouille", "Frozen", "Toy Story", "Up"],
        answer: "Ratatouille"
    },
    {
        quote: "The only thing predictable about life is its unpredictability.",
        options: ["Ratatouille", "Up", "Frozen", "Toy Story"],
        answer: "Ratatouille"
    },
    {
        quote: "Let it go.",
        options: ["Frozen", "Up", "Toy Story", "Ratatouille"],
        answer: "Frozen"
    },
    {
        quote: "The cold never bothered me anyway.",
        options: ["Frozen", "Up", "Toy Story", "Ratatouille"],
        answer: "Frozen"
    },
    {
        quote: "Some people are worth melting for.",
        options: ["Frozen", "Up", "Toy Story", "Ratatouille"],
        answer: "Frozen"
    },
    {
        quote: "Do you want to build a snowman?",
        options: ["Frozen", "Up", "Toy Story", "Ratatouille"],
        answer: "Frozen"
    },
    {
        quote: "I have just met you, and I love you.",
        options: ["Up", "Toy Story", "Frozen", "Ratatouille"],
        answer: "Up"
    },
    {
        quote: "Thanks for the adventure—now go have a new one!",
        options: ["Up", "Toy Story", "Frozen", "Ratatouille"],
        answer: "Up"
    },
    {
        quote: "Squirrel!",
        options: ["Up", "Toy Story", "Frozen", "Ratatouille"],
        answer: "Up"
    },
    {
        quote: "I’m not crying, you’re crying.",
        options: ["Up", "Toy Story", "Frozen", "Ratatouille"],
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
        quote: "Better out than in, I always say.",
        options: ["Shrek", "Toy Story", "Frozen", "Up"],
        answer: "Shrek"
    },
    {
        quote: "This is the part where you run away.",
        options: ["Shrek", "Toy Story", "Frozen", "Up"],
        answer: "Shrek"
    },
    {
        quote: "Donkey, you have the right to remain silent.",
        options: ["Shrek", "Toy Story", "Frozen", "Up"],
        answer: "Shrek"
    },
    {
        quote: "Somebody once told me the world is gonna roll me.",
        options: ["Shrek", "Toy Story", "Frozen", "Up"],
        answer: "Shrek"
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
        quote: "I’m Batman.",
        options: ["The Lego Movie", "Toy Story", "Frozen", "Up"],
        answer: "The Lego Movie"
    },
    {
        quote: "Everything is awesome!",
        options: ["The Lego Movie", "Toy Story", "Frozen", "Up"],
        answer: "The Lego Movie"
    },
    {
        quote: "I’m a master builder.",
        options: ["The Lego Movie", "Toy Story", "Frozen", "Up"],
        answer: "The Lego Movie"
    },
    {
        quote: "Honey, where is my super suit?",
        options: ["The Incredibles", "Toy Story", "Frozen", "Up"],
        answer: "The Incredibles"
    },
    {
        quote: "I am not a baby! I am a grown man!",
        options: ["The Incredibles", "Toy Story", "Frozen", "Up"],
        answer: "The Incredibles"
    },
    {
        quote: "No capes!",
        options: ["The Incredibles", "Toy Story", "Frozen", "Up"],
        answer: "The Incredibles"
    },
    {
        quote: "I never look back, darling.",
        options: ["The Incredibles", "Toy Story", "Frozen", "Up"],
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
        quote: "I’m not a princess.",
        options: ["Brave", "Frozen", "Toy Story", "Up"],
        answer: "Brave"
    },
    {
        quote: "Our fate lives within us. You only have to be brave enough to see it.",
        options: ["Brave", "Frozen", "Toy Story", "Up"],
        answer: "Brave"
    },
    {
        quote: "If you had the chance to change your fate, would you?",
        options: ["Brave", "Frozen", "Toy Story", "Up"],
        answer: "Brave"
    },
    {
        quote: "I’m Merida, and I’ll be shooting for my own hand!",
        options: ["Brave", "Frozen", "Toy Story", "Up"],
        answer: "Brave"
    },
    {
        quote: "I am not a prize to be won.",
        options: ["Aladdin", "Frozen", "Toy Story", "Up"],
        answer: "Aladdin"
    },
    {
        quote: "A whole new world.",
        options: ["Aladdin", "Frozen", "Toy Story", "Up"],
        answer: "Aladdin"
    },
    {
        quote: "You ain’t never had a friend like me.",
        options: ["Aladdin", "Frozen", "Toy Story", "Up"],
        answer: "Aladdin"
    },
    {
        quote: "Phenomenal cosmic powers! Itty bitty living space.",
        options: ["Aladdin", "Frozen", "Toy Story", "Up"],
        answer: "Aladdin"
    },
    {
        quote: "I’m surrounded by idiots.",
        options: ["The Lion King", "Frozen", "Toy Story", "Up"],
        answer: "The Lion King"
    },
    {
        quote: "Long live the king.",
        options: ["The Lion King", "Frozen", "Toy Story", "Up"],
        answer: "The Lion King"
    },
    {
        quote: "Simba, you deliberately disobeyed me.",
        options: ["The Lion King", "Frozen", "Toy Story", "Up"],
        answer: "The Lion King"
    },
    {
        quote: "It’s the circle of life.",
        options: ["The Lion King", "Frozen", "Toy Story", "Up"],
        answer: "The Lion King"
    },
    {
        quote: "I’m not a monster. I’m just ahead of the curve.",
        options: ["The Dark Knight", "Frozen", "Toy Story", "Up"],
        answer: "The Dark Knight"
    },
    {
        quote: "Why so serious?",
        options: ["The Dark Knight", "Frozen", "Toy Story", "Up"],
        answer: "The Dark Knight"
    },
    {
        quote: "You either die a hero or live long enough to see yourself become the villain.",
        options: ["The Dark Knight", "Frozen", "Toy Story", "Up"],
        answer: "The Dark Knight"
    },
    {
        quote: "Some men just want to watch the world burn.",
        options: ["The Dark Knight", "Frozen", "Toy Story", "Up"],
        answer: "The Dark Knight"
    }
];

// Limit to 10 random questions per round
const limitedQuestions = movieQuoteQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

export default limitedQuestions;
