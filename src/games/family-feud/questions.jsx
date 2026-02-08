let questions = [
    { question: "Name something you do before going to bed.", answers: [ { text: "Brush teeth", points: 35 }, { text: "Read", points: 20 }, { text: "Watch TV", points: 15 }, { text: "Set alarm", points: 10 }, { text: "Drink water", points: 8 }, { text: "Pray", points: 7 }, { text: "Check phone", points: 5 } ] },
    { question: "Name a popular pizza topping.", answers: [ { text: "Pepperoni", points: 40 }, { text: "Mushrooms", points: 20 }, { text: "Sausage", points: 15 }, { text: "Onions", points: 10 }, { text: "Olives", points: 8 }, { text: "Green peppers", points: 7 } ] },
    { question: "Name something people do when they wake up in the morning.", answers: [ { text: "Check phone", points: 30 }, { text: "Brush teeth", points: 25 }, { text: "Shower", points: 20 }, { text: "Eat breakfast", points: 15 }, { text: "Stretch", points: 10 } ] },
    { question: "Name a reason people might be late to work.", answers: [ { text: "Traffic", points: 40 }, { text: "Overslept", points: 25 }, { text: "Missed bus/train", points: 15 }, { text: "Forgot something", points: 10 }, { text: "Bad weather", points: 10 } ] },
    { question: "Name a fruit you might put in a smoothie.", answers: [ { text: "Banana", points: 35 }, { text: "Strawberry", points: 25 }, { text: "Blueberry", points: 15 }, { text: "Mango", points: 15 }, { text: "Pineapple", points: 10 } ] },
    { question: "Name a popular board game.", answers: [ { text: "Monopoly", points: 30 }, { text: "Scrabble", points: 25 }, { text: "Chess", points: 20 }, { text: "Clue", points: 15 }, { text: "Candy Land", points: 10 } ] },
    { question: "Name a type of flower.", answers: [ { text: "Rose", points: 30 }, { text: "Tulip", points: 25 }, { text: "Daisy", points: 20 }, { text: "Lily", points: 15 }, { text: "Sunflower", points: 10 } ] },
    { question: "Name a common pet.", answers: [ { text: "Dog", points: 40 }, { text: "Cat", points: 30 }, { text: "Fish", points: 15 }, { text: "Bird", points: 10 }, { text: "Hamster", points: 5 } ] },
    { question: "Name a country in Europe.", answers: [ { text: "France", points: 25 }, { text: "Germany", points: 20 }, { text: "Italy", points: 20 }, { text: "Spain", points: 15 }, { text: "United Kingdom", points: 10 } ] },
    { question: "Name a color in the rainbow.", answers: [ { text: "Red", points: 20 }, { text: "Blue", points: 20 }, { text: "Green", points: 20 }, { text: "Yellow", points: 20 }, { text: "Orange", points: 10 }, { text: "Violet", points: 10 } ] },
    { question: "Name a type of tree.", answers: [ { text: "Oak", points: 25 }, { text: "Pine", points: 20 }, { text: "Maple", points: 20 }, { text: "Birch", points: 15 }, { text: "Willow", points: 10 } ] },
    { question: "Name a famous landmark.", answers: [ { text: "Eiffel Tower", points: 30 }, { text: "Statue of Liberty", points: 25 }, { text: "Great Wall of China", points: 20 }, { text: "Big Ben", points: 15 }, { text: "Pyramids", points: 10 } ] },
    { question: "Name a type of transportation.", answers: [ { text: "Car", points: 30 }, { text: "Bus", points: 25 }, { text: "Train", points: 20 }, { text: "Bicycle", points: 15 }, { text: "Airplane", points: 10 } ] },
    { question: "Name a type of weather.", answers: [ { text: "Sunny", points: 25 }, { text: "Rainy", points: 20 }, { text: "Cloudy", points: 20 }, { text: "Snowy", points: 15 }, { text: "Windy", points: 10 } ] },
    { question: "Name a type of shoe.", answers: [ { text: "Sneakers", points: 30 }, { text: "Boots", points: 25 }, { text: "Sandals", points: 20 }, { text: "Heels", points: 15 }, { text: "Loafers", points: 10 } ] },
    { question: "Name a type of pasta.", answers: [ { text: "Spaghetti", points: 30 }, { text: "Macaroni", points: 25 }, { text: "Penne", points: 20 }, { text: "Lasagna", points: 15 }, { text: "Ravioli", points: 10 } ] },
    { question: "Name a type of hat.", answers: [ { text: "Baseball cap", points: 25 }, { text: "Beanie", points: 20 }, { text: "Fedora", points: 20 }, { text: "Beret", points: 15 }, { text: "Cowboy hat", points: 10 } ] },
    { question: "Name a type of insect.", answers: [ { text: "Ant", points: 25 }, { text: "Bee", points: 20 }, { text: "Butterfly", points: 20 }, { text: "Mosquito", points: 15 }, { text: "Ladybug", points: 10 } ] },
    { question: "Name a type of candy.", answers: [ { text: "Chocolate", points: 30 }, { text: "Gummy bears", points: 25 }, { text: "Lollipop", points: 20 }, { text: "Jelly beans", points: 15 }, { text: "Candy corn", points: 10 } ] },
    { question: "Name a type of sport.", answers: [ { text: "Soccer", points: 30 }, { text: "Basketball", points: 25 }, { text: "Baseball", points: 20 }, { text: "Tennis", points: 15 }, { text: "Golf", points: 10 } ] },
    { question: "Name a type of vegetable.", answers: [ { text: "Carrot", points: 25 }, { text: "Broccoli", points: 20 }, { text: "Potato", points: 20 }, { text: "Tomato", points: 15 }, { text: "Spinach", points: 10 } ] },
    { question: "Name a type of bird.", answers: [ { text: "Parrot", points: 25 }, { text: "Eagle", points: 20 }, { text: "Sparrow", points: 20 }, { text: "Owl", points: 15 }, { text: "Penguin", points: 10 } ] },
    { question: "Name a type of fish.", answers: [ { text: "Goldfish", points: 25 }, { text: "Salmon", points: 20 }, { text: "Tuna", points: 20 }, { text: "Trout", points: 15 }, { text: "Shark", points: 10 } ] },
    { question: "Name a type of nut.", answers: [ { text: "Almond", points: 25 }, { text: "Peanut", points: 20 }, { text: "Cashew", points: 20 }, { text: "Walnut", points: 15 }, { text: "Pistachio", points: 10 } ] },
    { question: "Name a type of cheese.", answers: [ { text: "Cheddar", points: 25 }, { text: "Mozzarella", points: 20 }, { text: "Swiss", points: 20 }, { text: "Parmesan", points: 15 }, { text: "Brie", points: 10 } ] }
];

questions = questions.sort(() => Math.random() - 0.5).slice(0, 10);

export default questions;
