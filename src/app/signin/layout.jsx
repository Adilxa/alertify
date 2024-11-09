import Header from "@/components/header";

export default function SignInLayout({ children }) {
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
