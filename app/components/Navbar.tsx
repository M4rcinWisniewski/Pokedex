
export default function Navbar() {
    return (
        <main className="flex justify-center items-center my-4">
            <nav className="bg-[#ff0000] w-[40vw] h-[8vh] rounded-[30px]">
                <li className="flex justify-center items-center h-full gap-24 text-white">
                    <button className="focus:bg-focus p-1 rounded-[10px]">Pokemon search</button>
                    <button className="focus:bg-focus p-1 rounded-[10px]">Pokedex</button>
                </li>
            </nav>
        </main>
    )
}