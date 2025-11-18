function Layout( { headerLeft, headerRight, header, noHeader = false, children }) {
    return (
        <div className="app-root">
            {/* HEADER OPCIONAL */}
            {!noHeader && (
                <header className="app-header container">
                    <div className="header-left">
                        {headerLeft ?? null}
                    </div>

                    <div className="header">
                        {header ?? null}
                    </div>
                    
                    <div className="header-right">
                        {headerRight ?? null}
                    </div>
                </header>
            )}

            {/* CONTENIDO */}
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Layout;