import Nav from "@/components/nav"

export default function MainLayout({children}: { children: React.ReactNode }) {
  return (
    <div>
      <Nav/>
      <div className="container py-16">
        {children}
      </div>
    </div>
  )
}
