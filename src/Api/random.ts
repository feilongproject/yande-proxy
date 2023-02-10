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
    console.log(`rat: ${ratType[rat]}\nmobile: ${mobile}\ntag: ${tag}`);

    var link = `https://yande.re/post.json?tags=order:random ${tag}`;
    var notFind = 10;

    while (notFind--) {
        const json: any = await fetch(link).then(res => { return res.json() });

        for (const post of json) {
            const Swidth = post.width, Sheight = post.height;
            const m = Swidth < Sheight ? true : false;
            const rating = post.rating;
            const sample_url = post.sample_url;

            if (!ratType[rat].includes(rating)) continue;
            if (m != mobile) continue;

            var pic_blob = await fetch(sample_url);
            console.log(`${JSON.stringify(post)}`);
            //console.log(`fetch info:\nurl: ${sample_url}\nSwidth: ${Swidth}\nSheight: ${Sheight}`)
            //console.log(`${JSON.stringify(pic_blob)}`)

            return new Response(pic_blob.body, {
                headers: {
                    "content-type": "image/jpeg",
                    "_fileUrl": post.file_url,
                    "_id": post.id,
                    "_tags": post.tags,
                }
            });
        }
    }

    return new Response(JSON.stringify({ error: "not found" }));
}
