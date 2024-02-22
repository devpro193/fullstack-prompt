import Nav from "@components/Nav"
import Provider from "@components/Provider"
import "@styles/globals.css"
import QueryProvider from "@utils/queryProvider"

export const metadata = {
    title: "Promtopia",
    description: "Discover & Share AI Propmts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <QueryProvider>
                        <div className="main">
                            <div className="gradient"></div>
                        </div>

                        <main className="app">
                            <Nav />
                            {children}
                        </main>
                    </QueryProvider>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout