import { GetPagePost } from './Page/post'
import { GetPageInfo } from './Page/info/Info'
import { Get404 } from './Page/404'
import { GetPageRandom } from './Page/random/random'
import { GetHeaders } from './mod/GetHeaders'

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
        case "robots.txt":
            console.log("robot page")
            return new Response(robot, GetHeaders("txt"))
        case "":
            console.log("post page")
            var post = requestURL.searchParams.get("page")
            if (!post) post = "1"
            return new Response(await GetPagePost(parseInt(post)), GetHeaders("html"))
        case "post":
            switch (Path[1]) {
                case "":
                    console.log("post page")
                    var post = requestURL.searchParams.get("page")
                    if (!post) post = "1"
                    return new Response(await GetPagePost(parseInt(post)), GetHeaders("html"))
                case "show":
                    var postId = parseInt(Path[2])
                    console.log(`post info page ,id: ${postId}`)
                    if (postId) return new Response(await GetPageInfo(postId), GetHeaders("html"))
                    else return new Response(await Get404(), GetHeaders("html"))
                case "random":
                    console.log("post random page")
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