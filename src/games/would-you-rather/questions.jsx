// Import utility function for cleaner shuffling
import { getRandomSubset } from '../../utils/gameUtils';

let wouldYouRatherQuestions = [
    {
        question: "Would you rather be able to fly or be invisible?",
        options: [
            { text: "Fly", funFact: "The fastest bird, the peregrine falcon, can reach speeds of over 240 mph!" },
            { text: "Invisible", funFact: "Some animals, like the octopus, can camouflage so well they seem invisible!" }
        ]
    },
    {
        question: "Would you rather live in the mountains or by the sea?",
        options: [
            { text: "Mountains", funFact: "Mount Everest is the highest mountain in the world at 29,032 feet." },
            { text: "Sea", funFact: "The Pacific Ocean is the largest and deepest ocean on Earth." }
        ]
    },
    {
        question: "Would you rather have more time or more money?",
        options: [
            { text: "Time", funFact: "The concept of time travel has fascinated scientists and writers for centuries." },
            { text: "Money", funFact: "The largest denomination of U.S. currency ever printed was the $100,000 bill." }
        ]
    },
    {
        question: "Would you rather always be too hot or always be too cold?",
        options: [
            { text: "Too hot", funFact: "The highest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California." },
            { text: "Too cold", funFact: "The coldest temperature ever recorded was -128.6°F (-89.2°C) in Antarctica." }
        ]
    },
    {
        question: "Would you rather travel to the past or the future?",
        options: [
            { text: "Past", funFact: "The oldest known written story is the Epic of Gilgamesh from ancient Mesopotamia." },
            { text: "Future", funFact: "Futurology is the study of predicting future trends and technologies." }
        ]
    },
    {
        question: "Would you rather never use social media again or never watch another movie?",
        options: [
            { text: "No social media", funFact: "The first social media site was Six Degrees, launched in 1997." },
            { text: "No movies", funFact: "The first public movie screening was held in Paris in 1895." }
        ]
    },
    {
        question: "Would you rather be able to speak every language or play every instrument?",
        options: [
            { text: "Speak every language", funFact: "There are over 7,000 languages spoken in the world today." },
            { text: "Play every instrument", funFact: "The piano has over 12,000 parts, 10,000 of which are moving." }
        ]
    },
    {
        question: "Would you rather be famous or rich?",
        options: [
            { text: "Famous", funFact: "The most followed person on Instagram is Cristiano Ronaldo." },
            { text: "Rich", funFact: "The richest person in history is believed to be Mansa Musa, ruler of Mali in the 14th century." }
        ]
    },
    {
        question: "Would you rather have a pause or a rewind button in your life?",
        options: [
            { text: "Pause", funFact: "Pausing to meditate can reduce stress and improve focus." },
            { text: "Rewind", funFact: "The first video cassette recorder was invented in 1956." }
        ]
    },
    {
        question: "Would you rather be the funniest person in the room or the most intelligent?",
        options: [
            { text: "Funniest", funFact: "Laughter can boost your immune system and relieve pain." },
            { text: "Most intelligent", funFact: "Albert Einstein's brain was preserved for scientific study after his death." }
        ]
    },
    {
        question: "Would you rather never eat chocolate again or never drink coffee again?",
        options: [
            { text: "No chocolate", funFact: "Chocolate was once used as currency by the ancient Aztecs." },
            { text: "No coffee", funFact: "Coffee is the second most traded commodity in the world after oil." }
        ]
    },
    {
        question: "Would you rather be able to teleport anywhere or be able to read minds?",
        options: [
            { text: "Teleport", funFact: "Quantum teleportation is a real phenomenon in physics, but it doesn't move matter." },
            { text: "Read minds", funFact: "Some animals, like dolphins, communicate with complex signals that seem almost telepathic." }
        ]
    },
    {
        question: "Would you rather always have to sing instead of speaking or dance everywhere you go?",
        options: [
            { text: "Sing", funFact: "Singing releases endorphins, making you feel happier." },
            { text: "Dance", funFact: "Dancing can improve your memory and reduce stress." }
        ]
    },
    {
        question: "Would you rather lose your keys or lose your phone?",
        options: [
            { text: "Keys", funFact: "The oldest known lock and key device dates back to ancient Egypt." },
            { text: "Phone", funFact: "The first mobile phone call was made in 1973." }
        ]
    },
    {
        question: "Would you rather be without internet for a week or without your phone for a week?",
        options: [
            { text: "No internet", funFact: "The internet was invented in 1983 as ARPANET." },
            { text: "No phone", funFact: "The first telephone was invented by Alexander Graham Bell in 1876." }
        ]
    },
    {
        question: "Would you rather be feared by all or loved by all?",
        options: [
            { text: "Feared", funFact: "Genghis Khan was one of the most feared leaders in history." },
            { text: "Loved", funFact: "Mother Teresa is remembered worldwide for her compassion and love." }
        ]
    },
    {
        question: "Would you rather never be stuck in traffic again or never get another cold?",
        options: [
            { text: "No traffic", funFact: "The longest traffic jam in history lasted over 12 days in China." },
            { text: "No colds", funFact: "The common cold is caused by more than 200 different viruses." }
        ]
    },
    {
        question: "Would you rather have unlimited pizza or unlimited ice cream?",
        options: [
            { text: "Pizza", funFact: "The world's largest pizza was over 13,000 square feet!" },
            { text: "Ice cream", funFact: "The most popular ice cream flavor in the U.S. is vanilla." }
        ]
    },
    {
        question: "Would you rather be able to control fire or water?",
        options: [
            { text: "Fire", funFact: "Lightning is five times hotter than the surface of the sun." },
            { text: "Water", funFact: "About 71% of Earth's surface is covered by water." }
        ]
    },
    {
        question: "Would you rather always have to whisper or always have to shout?",
        options: [
            { text: "Whisper", funFact: "Whispering uses different muscles than regular speech." },
            { text: "Shout", funFact: "The loudest shout ever recorded was 121.7 decibels." }
        ]
    },
    {
        question: "Would you rather be able to stop time or go back in time?",
        options: [
            { text: "Stop time", funFact: "Some animals, like hummingbirds, can slow their heart rate to almost stop time." },
            { text: "Go back", funFact: "The concept of time travel appears in stories as early as the 18th century." }
        ]
    },
    {
        question: "Would you rather have a pet dinosaur or a pet dragon?",
        options: [
            { text: "Dinosaur", funFact: "Dinosaurs lived on Earth for over 165 million years." },
            { text: "Dragon", funFact: "Dragons are legendary creatures found in myths around the world." }
        ]
    },
    {
        question: "Would you rather be able to breathe underwater or fly?",
        options: [
            { text: "Breathe underwater", funFact: "The deepest part of the ocean is called the Mariana Trench." },
            { text: "Fly", funFact: "The Wright brothers invented and flew the first airplane in 1903." }
        ]
    },
    {
        question: "Would you rather live without music or without television?",
        options: [
            { text: "No music", funFact: "Music can improve your mood and memory." },
            { text: "No television", funFact: "The first television was invented in 1927." }
        ]
    },
    {
        question: "Would you rather be the best at your worst job or the worst at your dream job?",
        options: [
            { text: "Best at worst job", funFact: "Some of the world's most successful people started in humble jobs." },
            { text: "Worst at dream job", funFact: "Many people pursue their dreams despite challenges and setbacks." }
        ]
    },
    {
        question: "Would you rather have free travel for life or free food for life?",
        options: [
            { text: "Free travel", funFact: "The longest flight in the world lasts over 18 hours." },
            { text: "Free food", funFact: "The largest buffet ever had over 5,000 dishes!" }
        ]
    },
    {
        question: "Would you rather always be 10 minutes late or always be 20 minutes early?",
        options: [
            { text: "10 minutes late", funFact: "In some cultures, being late is considered polite!" },
            { text: "20 minutes early", funFact: "Arriving early can reduce stress and improve productivity." }
        ]
    },
    {
        question: "Would you rather have super strength or super speed?",
        options: [
            { text: "Super strength", funFact: "The strongest animal relative to its size is the dung beetle." },
            { text: "Super speed", funFact: "Usain Bolt holds the world record for the fastest 100m sprint." }
        ]
    },
    {
        question: "Would you rather be able to talk to animals or speak all human languages?",
        options: [
            { text: "Talk to animals", funFact: "Dogs can understand up to 250 words and gestures." },
            { text: "Speak all languages", funFact: "The Bible is the most translated book in the world." }
        ]
    },
    {
        question: "Would you rather have a personal chef or a personal chauffeur?",
        options: [
            { text: "Chef", funFact: "The world's most expensive meal costs over $25,000 per person." },
            { text: "Chauffeur", funFact: "The longest limousine ever built was over 100 feet long." }
        ]
    },
    {
        question: "Would you rather live in space or under the sea?",
        options: [
            { text: "Space", funFact: "The International Space Station travels at 17,500 mph around Earth." },
            { text: "Under the sea", funFact: "The Great Barrier Reef is the largest living structure on Earth." }
        ]
    },
    {
        question: "Would you rather always have perfect weather or never have to sleep?",
        options: [
            { text: "Perfect weather", funFact: "The highest recorded temperature difference in one day is 103°F." },
            { text: "Never sleep", funFact: "The world record for the longest time without sleep is 11 days." }
        ]
    },
    {
        question: "Would you rather be able to see the future or change the past?",
        options: [
            { text: "See future", funFact: "Some animals, like sharks, can sense changes in the environment before they happen." },
            { text: "Change past", funFact: "The butterfly effect describes how small changes can have big impacts." }
        ]
    },
    {
        question: "Would you rather have free Wi-Fi wherever you go or free coffee wherever you go?",
        options: [
            { text: "Free Wi-Fi", funFact: "The first Wi-Fi network was created in 1991." },
            { text: "Free coffee", funFact: "Coffee beans are actually seeds from the coffee cherry." }
        ]
    },
    {
        question: "Would you rather be able to eat anything without gaining weight or need only one hour of sleep?",
        options: [
            { text: "Eat anything", funFact: "The world record for most hot dogs eaten in 10 minutes is 76." },
            { text: "One hour sleep", funFact: "Some animals, like giraffes, sleep less than two hours a day." }
        ]
    },
    {
        question: "Would you rather always know when someone is lying or always get away with lying?",
        options: [
            { text: "Know lies", funFact: "Polygraph tests measure physiological responses to detect lies." },
            { text: "Get away with lies", funFact: "The phrase 'white lie' refers to a harmless or trivial lie." }
        ]
    },
    {
        question: "Would you rather have a photographic memory or be able to forget anything you want?",
        options: [
            { text: "Photographic memory", funFact: "Some people can recall images with incredible detail, a skill called eidetic memory." },
            { text: "Forget anything", funFact: "The average person forgets 50% of new information within an hour." }
        ]
    },
    {
        question: "Would you rather be stuck on a broken ski lift or in a broken elevator?",
        options: [
            { text: "Ski lift", funFact: "The longest ski lift in the world is over 5 miles long." },
            { text: "Elevator", funFact: "The fastest elevator in the world travels at 47 mph." }
        ]
    },
    {
        question: "Would you rather have to always wear shoes two sizes too big or one size too small?",
        options: [
            { text: "Too big", funFact: "The largest shoe ever made was a size 37!" },
            { text: "Too small", funFact: "Wearing shoes that are too small can cause foot problems like bunions." }
        ]
    },
    {
        question: "Would you rather have unlimited first-class tickets or never have to pay for food at restaurants?",
        options: [
            { text: "First-class tickets", funFact: "The most expensive first-class airline ticket cost over $30,000." },
            { text: "Free restaurant food", funFact: "The largest restaurant in the world can seat over 6,000 people." }
        ]
    },
    {
        question: "Would you rather always have to skip breakfast or dinner?",
        options: [
            { text: "Skip breakfast", funFact: "Breakfast is often called the most important meal of the day." },
            { text: "Skip dinner", funFact: "Some cultures eat their largest meal at midday instead of dinner." }
        ]
    },
    {
        question: "Would you rather be able to change your appearance at will or change your voice at will?",
        options: [
            { text: "Change appearance", funFact: "Chameleons can change their skin color to blend in with their surroundings." },
            { text: "Change voice", funFact: "The human voice is unique, like a fingerprint." }
        ]
    },
    {
        question: "Would you rather have the ability to see 10 minutes into the future or 100 years into the future?",
        options: [
            { text: "10 minutes", funFact: "A lot can happen in just 10 minutes!" },
            { text: "100 years", funFact: "The world population is expected to reach nearly 11 billion by 2100." }
        ]
    },
    {
        question: "Would you rather be able to control animals or control electronics with your mind?",
        options: [
            { text: "Control animals", funFact: "Some animals, like dolphins, can be trained to perform complex tasks." },
            { text: "Control electronics", funFact: "Brain-computer interfaces are being developed to control devices with thoughts." }
        ]
    },
    {
        question: "Would you rather always have to wear formal clothes or always have to wear pajamas?",
        options: [
            { text: "Formal clothes", funFact: "The tuxedo was named after Tuxedo Park in New York." },
            { text: "Pajamas", funFact: "The word 'pajamas' comes from the Persian word for 'leg garment.'" }
        ]
    },
    {
        question: "Would you rather have free Wi-Fi wherever you go or free coffee wherever you go?",
        options: [
            { text: "Free Wi-Fi", funFact: "The first Wi-Fi network was created in 1991." },
            { text: "Free coffee", funFact: "Coffee beans are actually seeds from the coffee cherry." }
        ]
    }
];

// Use utility function to get 20 random questions per round
export default getRandomSubset(wouldYouRatherQuestions, 20);
