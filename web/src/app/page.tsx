import Base64 from "@/components/base64";
import Url from "@/components/url";
import Uuid from "@/components/uuid";

export default function Page() {
    return <>
        <header className="p-4 sm:py-10">
            <h1 className="font-extrabold text-6xl sm:text-8xl">
                Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 ">tools</span>
            </h1>
            <h2 className="pl-2"><strong>Wasm</strong> server side sample application.</h2>
        </header>
        <section className="p-2">
            <Uuid />
            <Base64 />
            <Url />
        </section>
        <footer>
            <div className="sm:flex justify-center sm:space-x-4 my-5 text-gray-400">
                <div className="text-center">
                    Run on <a href="https://www.fermyon.com/cloud" target="_blank" className="underline decoration-sky-500 hover:text-sky-500">Fermyon Cloud</a>
                </div>
                <div className="text-center">
                    Contribute on <a href="https://github.com/FabienD/spin-dev-tools" target="_blank" className="underline decoration-pink-500 hover:text-pink-500"> Github</a>
                </div>
            </div>
        </footer>
    </>;
}