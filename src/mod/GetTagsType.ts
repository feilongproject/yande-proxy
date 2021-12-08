

interface TagIdInfo {
    "id": number,
    "name": string,
    "count": number,
    "type": number,
    "ambiguous": boolean

}

export async function getTagsType(tags: string) {
    const tag = tags.split(" ")
    console.log(tag)
    var p: TagIdInfo[] =[]

    for (var i = 0; i < tag.length; i++) {
        var t = await fetch("https://yande.re/tag.json?order=count&name=" + tag[i]).then(res => {
            return res.text()
        }).then(res=>{
            return JSON.parse(res)[0]
        })
        p.push(t)


    }
    console.log(p)

    p.sort(function (r1, r2) {
        //console.log(r1.type, r2.type)
        if (r1.type > r2.type) {
            return -1;
        } else if (r1.type < r2.type) {
            return 1;
        } else {
            return 0;
        }
    })
    return p

}