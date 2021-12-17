import { GetPagePost } from './Page/post'
import { GetPageInfo } from './Page/info/Info'
import { Get404 } from './Page/404'
import { GetPageRandom } from './Page/random/random'
import { GetHeaders } from './mod/GetHeaders'
import { ApiGetRandom } from './Api/random'

const robot = `User-agent: AhrefsBot
Disallow: /
User-agent: MJ12bot
Disallow: /
`

async function Main(request: Request): Promise<Response> {

    console.log(`request url: ${request.url}`)
    const requestURL = new URL(request.url)

    const path = (requestURL.pathname + "/").replaceAll("//", "/").split("/")
    const Path = [path[1], path[2], path[3]]

    console.log(`\npath0: ${Path[0]}\npath1: ${Path[1]}\npath2: ${Path[2]}\npath3: ${Path[3]}`)


    switch (Path[0]) {
        case "favicon.ico":
            return await fetch("https://raw.githubusercontent.com/feilongproject/yande-proxy/main/html/404.html")
        case "robots.txt":
            console.log("page: robot")
            return new Response(robot, GetHeaders("txt"))
        case "":
            console.log("page: post")
            var post = requestURL.searchParams.get("page")
            if (!post) post = "1"
            return new Response(await GetPagePost(parseInt(post)), GetHeaders("html"))
        case "api":
            console.log("api getting")
            switch (Path[1]) {
                case "random":
                    console.log("api: random")
                    var ratt = requestURL.searchParams.get("rat"), rat
                    var mobile = requestURL.searchParams.get("m") ? true : false
                    var tags = requestURL.searchParams.get("tags")
                    if (ratt?.split("").length == 3)
                        rat = parseInt(ratt, 2)
                    else rat = ratt ? parseInt(ratt) : 1
                    if (!tags) tags = "arknights"

                    return ApiGetRandom(rat, mobile, tags)
            }
        case "post":
            switch (Path[1]) {
                case "":
                    console.log("page: post")
                    var post = requestURL.searchParams.get("page")
                    if (!post) post = "1"
                    return new Response(await GetPagePost(parseInt(post)), GetHeaders("html"))
                case "show":
                    var postId = parseInt(Path[2])
                    console.log(`page: post info ,id: ${postId}`)
                    if (postId) return new Response(await GetPageInfo(postId), GetHeaders("html"))
                    else return new Response(await Get404(), GetHeaders("html"))
                case "random":
                    console.log("page: post random")
                    return new Response(await GetPageRandom(), GetHeaders("html"))
            }
        default:
            console.log("null page")
            return new Response(await Get404(), GetHeaders("html"))
    }

}



addEventListener("fetch", (event) => {
    event.respondWith(
        Main(event.request)/*.catch(
            (err) => new Response(err.stack, { status: 500 })
        )*/
    );
});