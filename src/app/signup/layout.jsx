import Header from "@/components/header";

export default function AuthLayout({ children }) {
    return (
        <html lang="en">
            <body

            >
                <Header />
                {children}
            </body>
        </html>
    );
}
