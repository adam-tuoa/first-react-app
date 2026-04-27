import { useState, useMemo } from "react";
import { pokemons } from "./data/pokemons";
import PokemonCard from "./components/PokemonCard";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // State management
  const [activeType, setActiveType] = useState(null);
  const [showOnlyFavourites, setShowOnlyFavourites] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [favourites, setFavourites] = useState(new Set());

  // Get unique types from pokemons
  const types = [...new Set(pokemons.map((p) => p.type))].sort();

  // Filter and sort logic
  const filteredPokemons = useMemo(() => {
    let result = pokemons;

    // Filter by type
    if (activeType) {
      result = result.filter((p) => p.type === activeType);
    }

    // Filter by favourites
    if (showOnlyFavourites) {
      result = result.filter((p) => favourites.has(p.id));
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      } else if (sortBy === "hp") {
        return b.hp - a.hp;
      } else if (sortBy === "attack") {
        return b.attack - a.attack;
      }
      return 0;
    });

    return result;
  }, [activeType, showOnlyFavourites, sortBy, favourites]);

  // Toggle favourite
  const handleToggleFavourite = (pokemonId) => {
    const newFavourites = new Set(favourites);
    if (newFavourites.has(pokemonId)) {
      newFavourites.delete(pokemonId);
    } else {
      newFavourites.add(pokemonId);
    }
    setFavourites(newFavourites);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pokémon Explorer</h1>
        <p className="subtitle">Celebrating 30 years</p>
      </header>

      <FilterBar
        types={types}
        activeType={activeType}
        onTypeChange={setActiveType}
        showOnlyFavourites={showOnlyFavourites}
        onToggleFavouritesFilter={setShowOnlyFavourites}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="pokemon-grid">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavourite={favourites.has(pokemon.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))
        ) : (
          <div className="no-results">No Pokémon found</div>
        )}
      </div>

      <Footer
        attribution={{
          text: "Yan Holtz's D3-loves-react course",
          href: "http://d3-loves-react.com",
        }}
        links={[
          {
            href: "https://adam-tuoa.github.io/homepage/",
            label: "Homepage",
            icon: "home",
          },
          {
            href: "https://github.com/adam-tuoa",
            label: "GitHub",
            icon: "github",
          },
        ]}
      />
    </div>
  );
}

export default App;
