import axios from "axios";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string;
};

const getCharacters = async () => {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  const characters: Character[] = response.data.results;
  return characters;
};

export default async function Home() {
  const characters = await getCharacters();
  return (
    <div className="container mx-auto px-4 py-8 font-mono">
      <h1 className="flex items-center justify-center text-7xl">
        Rick and Morty
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character) => (
          <li
            className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            key={character.id}
          >
            <div className="mb-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <h2 className="text-lg font-bold mb-2">{character.name}</h2>
            <div className="flex items-center space-x-2">
              {character.status === "Alive" && (
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
              {character.status === "Dead" && (
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
              {character.status === "unknown" && (
                <div className="h-3 w-3 bg-gray-500 rounded-full animate-pulse"></div>
              )}
              <p className="text-gray-600">{character.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
