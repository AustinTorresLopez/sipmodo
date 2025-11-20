import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Recetario({ language }) {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [baseLiquorFilter, setBaseLiquorFilter] = useState("all");
  const [occasionFilter, setOccasionFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase.from("recipes").select("*");

        console.log("SUPABASE RAW RESPONSE:", { data, error });

        if (error) {
          console.error("SUPABASE ERROR:", error);
          setError(
            language === "es"
              ? `Error al cargar recetas: ${error.message}`
              : `Error loading recipes: ${error.message}`
          );
          setRecipes([]);
        } else {
          setRecipes(data || []);
        }
      } catch (err) {
        console.error("EXCEPTION EN FETCHRECIPES:", err);
        setError(
          language === "es"
            ? "Error inesperado al cargar recetas."
            : "Unexpected error loading recipes."
        );
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  {
    /*useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.from("recipes").select("*");
      //console.log("SUPABASE DATA:", data, "ERROR:", error);

      if (error) {
        console.error(error);
        setError(
          language === "es"
            ? "Error al cargar recetas."
            : "Error loading recipes."
        );
      } else {
        setRecipes(data || []);
      }

      setLoading(false);
    };

    fetchRecipes();
  }, []); */
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div className="spinner"></div>
        <p>{language === "es" ? "Cargando..." : "Loading..."}</p>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const splitLines = (text = "") => {
    return text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const splitTags = (text = "") => {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const filtered = recipes.filter((r) => {
    const name = language === "es" ? r.name_es : r.name_en;
    const tagsText = language === "es" ? r.tags_es || "" : r.tags_en || "";
    const tags = splitTags(tagsText);

    const textMatch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const liquorMatch =
      baseLiquorFilter === "all" ||
      (r.base_liquor || "").toLowerCase() === baseLiquorFilter;

    const occasionMatch =
      occasionFilter === "all" ||
      (r.occasion || "").toLowerCase() === occasionFilter;

    return textMatch && liquorMatch && occasionMatch;
  });

  return (
    <div>
      <h2>
        {language === "es" ? "recetario de bartender" : "bartender recipe book"}
      </h2>
      {/*nuevo*/}
      {/* filtros por licor y ocasion */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.8rem",
        }}
      >
        {/*filtro de licor*/}
        <select
          value={baseLiquorFilter}
          onChange={(e) => setBaseLiquorFilter(e.target.value)}
        >
          <option value="all">
            {language === "es" ? "Todos los licores" : "All liquors"}
          </option>
          <option value="tequila">tequila</option>
          <option value="whiskey">whiskey / whisky</option>
          <option value="vodka">vodka</option>
          <option value="rum">rum / ron</option>
        </select>

        {/*filtro de ocasion*/}
        <select
          value={occasionFilter}
          onChange={(e) => setOccasionFilter(e.target.value)}
        >
          <option value="all">
            {language === "es" ? "Todas las ocasiones" : "All occasions"}
          </option>
          <option value="halloween">halloween</option>
          <option value="navidad">navidad / christmas</option>
          <option value="verano">verano / summer</option>
          <option value="none">
            {language === "es" ? "sin ocasión" : "no occasion"}
          </option>
        </select>
      </div>

      {/*buscador*/}
      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.8rem" }}>
        {language === "es"
          ? "busca por nombre de coctel o por palabra clave (tequila, whisky, dulce...)."
          : "search by cocktail name or keyword (tequila, whiskey, sweet...)."}
      </p>

      <input
        type="text"
        placeholder={
          language === "es" ? "buscar receta..." : "search recipe..."
        }
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
      {/*lista de recetas*/}
      <div style={{ display: "grid", gap: "1rem" }}>
        {filtered.map((recipe) => {
          const name =
            language === "es" ? recipe.name_es || "" : recipe.name_en || "";

          const ingredientsText =
            language === "es"
              ? recipe.ingredients_es || ""
              : recipe.ingredients_en || "";
          const ingredients = splitLines(ingredientsText);

          const stepsText =
            language === "es" ? recipe.steps_es || "" : recipe.steps_en || "";
          const steps = splitLines(stepsText);

          const tags = splitTags(
            language === "es" ? recipe.tags_es || "" : recipe.tags_en || ""
          );

          return (
            <article
              key={recipe.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "0.8rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {recipe.image_url && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9", // alto fijo tipo banner
                    overflow: "hidden",
                    borderRadius: "6px",
                    marginBottom: "0.5rem",
                    backgroundColor: "#111", // por si tarda en cargar
                  }}
                >
                  <img
                    src={recipe.image_url}
                    alt={name}
                    style={{
                      position: "absolute",
                      inset: 0, // top:0, right:0, bottom:0, left:0
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // recorta sin deformar
                      objectPosition: "center", // recorte centrado
                      display: "block",
                    }}
                  />
                </div>
              )}

              <h3 style={{ fontWeight: "600", marginBottom: "0.3rem" }}>
                {name}
              </h3>

              {tags.length > 0 && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#777",
                    marginBottom: "0.3rem",
                  }}
                >
                  {tags.join(" . ")}
                </p>
              )}

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#555",
                  marginBottom: "0.5rem",
                }}
              >
                {language === "es" ? "Licor base: " : "Base liquor:"}
                {recipe.base_liquor ||
                  (language === "es" ? "desconocido" : "unknown")}
                {" · "}
                {language === "es" ? "Ocasión: " : "Occasion: "}
                {recipe.occasion || (language === "es" ? "ninguna" : "none")}
              </p>

              <strong style={{ fontSize: "0.85rem" }}>
                {language === "es" ? "Ingredientes:" : "Ingredients:"}
              </strong>
              <ul style={{ fontSize: "0.85rem", marginLeft: "1.2rem" }}>
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <strong style={{ fontSize: "0.85rem" }}>
                {language === "es" ? "Pasos:" : "Steps:"}
              </strong>

              <ol style={{ fontSize: "0.85rem", marginLeft: "1.2rem" }}>
                {steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p style={{ fontSize: "0.9rem", color: "#777" }}>
            {language === "es"
              ? "No encontré recetas con ese término."
              : "No recipes found with that term."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Recetario;
