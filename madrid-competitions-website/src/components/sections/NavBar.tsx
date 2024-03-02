import { ModeToggle } from "../mode-toggle"


export const NavBar = () => {
  return (
    <section className="flex justify-between items-center px-5 py-5 bg-border">
        <div id="logo">

        </div>
        <nav>

        </nav>
        <div>
            <ModeToggle/>
        </div>
    </section>
  )
}
