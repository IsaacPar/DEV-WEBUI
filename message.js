export default function (req) {
    return `

                \u001b[34m------------\u001b[0m
                \u001b[33;1m \u001b[7mDATA WEBUI\u001b[0m
                \u001b[34m------------\u001b[0m\n

            \u001b[7mIP: ${ req.ip }\u001b[0m

        \u001b[7mAcessed on:  \u001b[4m${new Date().toLocaleString()}\u001b[0m\n

    `
}