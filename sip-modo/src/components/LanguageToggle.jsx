function LanguageToggle( { language, setLanguage} ) {
    const isSpanish = language === "es";

    const handleClick = () => {
        setLanguage(isSpanish ? "en" : "es");
    };

    return (
        <button onClick={handleClick}
        style={{
        padding: "0.3rem 0.7rem",
        borderRadius: "999px",
        border: "1px solid #ccc",
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
        fontSize: "0.8rem",
        color:"black",
      }}
      >
        {isSpanish ? "english" : "español"}
        </button>
    );
}

export default LanguageToggle;
