import { typeColors } from "../data/typeColors";
import "./FilterBar.css";

export default function FilterBar({
  types,
  activeType,
  onTypeChange,
  showOnlyFavourites,
  onToggleFavouritesFilter,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-section type-section">
        <div className="type-pills">
          <button
            className={`pill ${activeType === null ? "active" : ""}`}
            onClick={() => onTypeChange(null)}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type}
              className={`pill ${activeType === type ? "active" : ""}`}
              onClick={() => onTypeChange(type)}
              style={
                activeType === type
                  ? { backgroundColor: typeColors[type], borderColor: typeColors[type] }
                  : { borderColor: typeColors[type] }
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section controls-section">
        <div className="controls">
          <div className="sort-buttons">
            {["name", "hp", "attack"].map((option) => (
              <button
                key={option}
                className={`sort-btn ${sortBy === option ? "active" : ""}`}
                onClick={() => onSortChange(option)}
              >
                {option === "name" && "Name"}
                {option === "hp" && "HP"}
                {option === "attack" && "Attack"}
              </button>
            ))}
          </div>

          <button
            className={`favourites-toggle ${showOnlyFavourites ? "active" : ""}`}
            onClick={() => onToggleFavouritesFilter(!showOnlyFavourites)}
            aria-label="Show favourites only"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
