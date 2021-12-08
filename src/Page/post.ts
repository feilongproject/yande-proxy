import { GetJson } from '../mod/GetJson'

export async function GetPagePost(postPage: number): Promise<string> {

    var Pages = postPage
    console.log(Pages)


    var link = "https://yande.re/post.json?page=" + Pages

    const json = await GetJson(link)
    console.log(json)

    var page = await (await fetch("https://raw.githubusercontent.com/feilongproject/yande-proxy/main/html/post.html")).text()//

    var preview_list = ""


    for (var i = 0; i < json.length; i++) {
        var post = json[i]
        var id = post.id

        var Pwidth = post.preview_width
        var Pheight = post.preview_height
        var Swidth = post.width
        var Sheight = post.height

        var rating = post.rating
        var score = post.score
        var tags = post.tags
        var user = post.author
        var alt = "Rating: " + rating + " Score: " + score + " Tags: " + tags + " User: " + user
        var preview_image_url = post.preview_url
        var source_image_url = post.file_url

        preview_list +=
            `<li style="width: 160px;">
            <div class="inner" style=" width: 150px; height: 150px;">
            <a class="thumb" style=\"display:block;\" href="/post/show/${id}">
            <img src="${preview_image_url}" style="margin-left: 0px;" alt="${alt}" class="preview" title="${alt}"  width="${Pwidth}" height="${Pheight}">
            </a>
            </div>
            <a class="directlink largeimg" href="${source_image_url}">
            <span class=\"directlink-res\"> ${Sheight}x${Swidth} </span>
            </a>
            </li>`



    }
    page = (page).replaceAll("<!--PREVIEW LIST-->", preview_list)



    var returnpage = ""
    if (Pages)
        if (Pages <= 6) {

            for (i = 1; i < Pages; i++) {
                returnpage += `<a aria-label="Page ${i}" href="/post?page=${i}">"${i}"</a>`
            }
            returnpage += `<em class="current" aria-label="Page ${Pages}" aria-current="page">${Pages}</em>`
            for (i = (Pages + 1); i <= (Pages + 4); i++) {
                returnpage += `<a aria-label="Page ${i}" href="/post?page=${i}">${i}</a>`

            }
        } else {


            console.log("超出5")

            returnpage =
                `<a aria-label="Page 1" href="/post?page=1">1</a>
                <a aria-label="Page 2" href="/post?page=2">2</a>
                <a aria-label="Page 3" href="/post?page=3">3</a>
                <span class="gap\">…</span>

                <a aria-label="Page ${Pages - 2}" href="/post?page=${Pages - 2}">${Pages - 2}</a>
                <a aria-label="Page ${Pages - 1}" href="/post?page=${Pages - 1}">${Pages - 1}</a>
                <em class="current" aria-label="Page ${Pages}" aria-current="page">${Pages}</em>
                <a aria-label="Page ${Pages + 1}" href="/post?page=${Pages + 1}">${Pages + 1}</a>
                <a aria-label="Page ${Pages + 2}" href="/post?page=${Pages + 2}">${Pages + 2}</a>
                `

        }
    page = (page).replaceAll("<!--PAGE RETURN-->", returnpage)
    return page

}
