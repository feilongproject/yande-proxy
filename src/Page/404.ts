export async function Get404() {
    return await (await fetch("https://raw.githubusercontent.com/feilongproject/yande-proxy/main/html/404.html")).text()

}