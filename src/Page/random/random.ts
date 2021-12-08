import { GetJson } from '../../mod/GetJson'

export async function GetPageRandom(): Promise<string> {


    var link = "https://yande.re/post.json?tags=order%3Arandom"

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

    return page

}
