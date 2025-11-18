const tabs = [
  { id: "recetario", labelEs: "recetario", labelEn: "recipes" },
  { id: "tiptracker", labelEs: "tip tracker", labelEn: "tip tracker" },
  { id: "calculator", labelEs: "calc. bebidas", labelEn: "drink calc." },
];

function TabBar({ activeTab, setActiveTab }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: "0.5rem",
        borderBottom: "1px solid #ddd",
        paddingBottom: "0.5rem",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "999px",
              border: isActive ? "1px solid #111" : "1px solid #ccc",
              backgroundColor: isActive ? "#111" : "#f5f5f5",
              color: isActive ? "#fff" : "#111",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            {tab.labelEn}
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;
