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

    console.log(request.url)
    const requestURL = new URL(request.url)
    const path = (requestURL.pathname + "/").replaceAll("//", "/")
    console.log(path)



    if (path == "/robots.txt") {
        console.log("robot page")
        return new Response(robot, GetHeaders("txt"))

    } else if (path == "/post/" || path == "/") {
        console.log("post page")
        var post = requestURL.searchParams.get("page")
        if (!post) post = "1"
        return new Response(await GetPagePost(parseInt(post)), GetHeaders("html"))

    } else if (path == "/post/random/") {
        console.log("post random page")
        return new Response(await GetPageRandom(), GetHeaders("html"))

    } else if (path.startsWith("/post/show/")) {
        var postId = path.split("/")[3]
        console.log(`post info page ,id: ${postId}`)
        if (postId) return new Response(await GetPageInfo(parseInt(postId)), GetHeaders("html"))
        else return new Response(await Get404(), GetHeaders("html"))

    } else {
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