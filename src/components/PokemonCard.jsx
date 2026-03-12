import { useState } from "react";
import { typeColors } from "../data/typeColors";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon, isFavourite, onToggleFavourite }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const accentColor = typeColors[pokemon.type];

  return (
    <div className="card-container">
      {/* Heart icon for favourites */}
      <button
        className="favourite-btn"
        onClick={() => onToggleFavourite(pokemon.id)}
        aria-label="Toggle favourite"
      >
        {isFavourite ? "❤️" : "🤍"}
      </button>

      {/* Flippable card */}
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="flip-card-front">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="pokemon-sprite"
          />
          <h3>{pokemon.name}</h3>
        </div>

        {/* Back of card */}
        <div className="flip-card-back" style={{ backgroundColor: accentColor }}>
          <div className="type-badge">{pokemon.type}</div>
          <div className="stats-group">
            <div className="stat">
              <span className="stat-label">HP</span>
              <span className="stat-value">{pokemon.hp}</span>
            </div>
            <div className="stat">
              <span className="stat-label">ATK</span>
              <span className="stat-value">{pokemon.attack}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
