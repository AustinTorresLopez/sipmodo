import { useState } from "react";
import LanguageToggle from "./components/LanguageToggle.jsx";
import TabBar from "./components/TabBar.jsx";
import Recetario from "./pages/Recetario.jsx";
import "./index.css";
import Layout from "./components/Layout.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("recetario"); //por defecto
  const [language, setLanguage] = useState("es");

  return (
      
    <Layout header={<h1>sipmodo</h1>} headerRight={<><LanguageToggle language={language} setLanguage={setLanguage} /> </>}>
      
    

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ marginTop: "1rem" }}>
        {activeTab === "recetario" && <Recetario language={language} />}
        
        {activeTab === "tiptracker" && (
          <p>
            {language === "es"
              ? "tip tracker (proximamente)..."
              : "tip tracker (coming soon)..."}
          </p>
        )}

        {activeTab === "calculator" && (
          <p>
            {language === "es"
              ? "calculadora de bebidas (próximamente)…"
              : "drink calculator (coming soon)…"}
          </p>
          
        )}
      </main>
      </Layout>
  );
}

export default App;
