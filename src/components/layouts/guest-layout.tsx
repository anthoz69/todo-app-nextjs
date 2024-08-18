export default function GuestLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="container relative grid flex-col items-center justify-center h-screen">
            {children}
        </div>
    );
}