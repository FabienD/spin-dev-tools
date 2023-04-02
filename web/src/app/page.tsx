import Uuid from "@/components/uuid";

export default function Page() {
    return <>
        <header className="py-10">
            <h1 className="font-extrabold text-8xl">
                Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">tools</span>
            </h1>
            <h2>A little example of app hosted by Fermyon, with Wasm backend.</h2>
        </header>
        <section>
            <Uuid />
        </section>
        <footer></footer>
    </>;
}