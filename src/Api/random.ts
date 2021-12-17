const ratType = [
    "",
    "  s",//1->001
    " q ",//2->010
    " qs",//3->011
    "e  ",//4->100
    "e s",//5->101
    "eq ",//6->110
    "eqs",//7->111
]
/**
 * 
 * @param rat 等级
 * 可选001->111（二进制）
 * 第一位：safe,第二位questionable,第三位explicit
 * @param mobile 是否手机格式
 * @param tag tag
 * @returns fetch后资源
 */
export async function ApiGetRandom(rat: number, mobile: boolean, tag: string,): Promise<Response> {
    console.log(`rat: ${ratType[rat]}\nmobile: ${mobile}\ntag: ${tag}`)


    var link = `https://yande.re/post.json?tags=order:random ${tag}`

    const json = await fetch(link).then(res => {
        return res.text()
    }).then(res => {
        return JSON.parse(res)
    })
    //console.log(json)

    for (var i = 0; i < json.length; i++) {
        var post = json[i]
        //
        /*
        var id = post.id

        var Pwidth = post.preview_width
        var Pheight = post.preview_height

        var score = post.score
        var tags = post.tags
        var user = post.author
        var alt = "Rating: " + rating + " Score: " + score + " Tags: " + tags + " User: " + user

        var preview_image_url = post.preview_url
        var source_image_url = post.file_url
        */
        var m = false
        var Swidth = post.width, Sheight = post.height

        if (!(Sheight >= 1.3 * Swidth || Swidth >= 1.3 * Sheight)) continue;

        if (Swidth < Sheight) m = true

        var rating = post.rating


        if (ratType[rat].includes(rating) && m == mobile) {
            var sample_url = post.sample_url
            console.log(`${JSON.stringify(post)}`)

            //console.log(`fetch info:\nurl: ${sample_url}\nSwidth: ${Swidth}\nSheight: ${Sheight}`)

            var pic_blob = await fetch(sample_url)

            //console.log(`${JSON.stringify(pic_blob)}`)
            return new Response(pic_blob.body, {
                headers: {
                    "content-type": "image/jpeg"
                }
            })

        }


    }

    return new Response("404")

}
