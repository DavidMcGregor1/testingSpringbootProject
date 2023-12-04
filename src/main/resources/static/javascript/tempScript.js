const adjectives = [
  "Adventurous",
  "Brilliant",
  "Calm",
  "Daring",
  "Energetic",
  "Fierce",
  "Gentle",
  "Happy",
  "Inquisitive",
  "Joyful",
  "Kind",
  "Lively",
  "Magical",
  "Noble",
  "Optimistic",
  "Playful",
  "Quick",
  "Radiant",
  "Spirited",
  "Thoughtful",
  "Unique",
  "Vibrant",
  "Witty",
  "Amiable",
  "Bountiful",
  "Diligent",
  "Eloquent",
  "Festive",
  "Genuine",
  "Jovial",
  "Keen",
  "Luminous",
  "Majestic",
  "Poetic",
  "Quirky",
  "Resilient",
  "Sincere",
  "Tranquil",
  "Passionate",
  "Courageous",
];

const nouns = [
  "Apple",
  "Banana",
  "Car",
  "Dog",
  "Elephant",
  "Flower",
  "Guitar",
  "House",
  "Ice cream",
  "Jacket",
  "Kangaroo",
  "Lemon",
  "Mountain",
  "Notebook",
  "Ocean",
  "Piano",
  "Quilt",
  "Robot",
  "Sunflower",
  "Tiger",
  "Umbrella",
  "Violin",
  "Watermelon",
  "Zebra",
  "Airplane",
  "Book",
  "Camera",
  "Dolphin",
  "Feather",
  "Island",
  "Jellyfish",
  "Lighthouse",
  "Moon",
  "Necklace",
  "Owl",
  "Pizza",
  "Rainbow",
  "Sailboat",
  "Telescope",
  "Backpack",
  "Cactus",
  "Diamond",
  "Envelope",
  "Anchor",
];

const apiUrl = "http://localhost:8082/addUser";

var count = 0;
for (const adjective of adjectives) {
  for (const noun of nouns) {
    const username = `${adjective}${noun}`;
    count = count + 1;

    console.log(username);
    console.log(count);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
}
