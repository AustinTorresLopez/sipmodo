import { useState } from "react";
import { recipes } from "../data/recipes.js";

function Recetario({ language }) {
  const [search, setSearch] = useState("");

  const filtered = recipes.filter((r) => {
    const name = r.name[language].toLowerCase();
    const matchName = name.includes(search.toLowerCase());
    const matchTag = r.tags[language].some((t) =>
      t.toLowerCase().includes(search.toLowerCase())
    );
    return matchName || matchTag;
  });

  return (
    <div>
      <h2>{language === "es" ? "buscar receta..." : "search recipe..."}</h2>

      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.8rem" }}>
        {language === "es"
          ? "busca por nombre de coctel o por palabra clave (tequila, whisky, dulce...)."
          : "search by cocktail name or keyword (tequila, whiskey, sweet...)."}
      </p>

      <input
        type="text"
        placeholder={language === "es" ? "buscar receta..." : "search recipe..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0.4rem 0.6rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "grid", gap: "1rem" }}>
        {filtered.map((recipe) => (
          <article
            key={recipe.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "0.8rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {recipe.imageUrl && (
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#00000010",
                }}
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name[language]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            )}

            <h3 style={{ fontWeight: "600", marginBottom: "0.3rem" }}>
              {recipe.name[language]}
            </h3>

            <p
              style={{
                fontSize: "0.8rem",
                color: "#777",
                marginBottom: "0.4rem",
              }}
            >
              {recipe.tags[language].join(", ")}
            </p>

            <strong style={{ fontSize: "0.85rem" }}>
              {language === "es" ? "ingredientes:" : "ingredients:"}
            </strong>

            <ul style={{ fontSize: "0.85rem", marginLeft: "1.2rem" }}>
              {recipe.ingredients[language].map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <strong style={{ fontSize: "0.85rem" }}>
              {language === "es" ? "pasos:" : "steps:"}
            </strong>

            <ol style={{ fontSize: "0.85rem", marginLeft: "1.2rem" }}>
              {recipe.steps[language].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </article>
        ))}

        {filtered.length === 0 && (
          <p style={{ fontSize: "0.9rem", color: "#777" }}>
            {language === "es"
              ? "No encontré recetas con ese término."
              : "No recipes found with that term."
            }
          </p>
        )}
      </div>
    </div>
  );
}

export default Recetario;
