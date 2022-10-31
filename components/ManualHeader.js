import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()
    // useMoralis = Hooks let you "hook into" React state adn lifecycle features
    // isWeb3EnableLoading - check if metamask is loading

    // some button that connects us and changes connected to be true
    // check if there is any account connected, it yes > show 'Connected!'

    useEffect(() => {
        //if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            // if connected has value, go enableWeb3
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    // useEffect - take function as 1st param & array as 2nd, it keeps listening 2nd param if yes it will perform the 1st param
    // if no 2nd param(no dependency array): run anytime something re-renders
    // CAREFUL with this! b/c you can get circular render
    // if use [] = blank dependency array, run once on load

    //useEffect - check if we disconnected
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                // no account connected
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
