import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Stephen Wise',
    description: 'Personal website and blog of Stephen Wise',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
} 