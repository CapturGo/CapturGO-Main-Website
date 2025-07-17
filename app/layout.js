export const metadata = {
  title: 'CapturGO',
  description: 'CapturGO Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
