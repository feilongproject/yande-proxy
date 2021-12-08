import { GetJson } from '../../mod/GetJson'
import { getTagsType } from '../../mod/GetTagsType'
import { ConverBit } from '../../mod/ConverBit'
import { tagType } from '../../var'
//import { page } from './info.html'


export async function GetPageInfo(postId: number): Promise<string> {
    const link = "https://yande.re/post.json?tags=id:" + postId
    const postInfo = (await GetJson(link))[0]
    console.log(postInfo)

    var tagsData = await getTagsType(postInfo.tags)
    console.log("tagsData:", tagsData)
    var tagsShow =
        `<h5>Tags</h5>
        <details style="background-color: rgba(255, 255, 255, 0.1);"><summary>源标签</summary>${postInfo.tags.replaceAll(" ", "<br>")}</details>" +
        <ul id="tag-sidebar">`

    for (var i = 0; i < tagsData.length; i++) {
        tagsShow += `<li class="tag-type-${tagType[tagsData[i].type].source}">
            <a href="/post?tags=${tagsData[i].name}">[${tagType[tagsData[i].type].chinese}]${tagsData[i].name}</a>
            <span class="post-count">${tagsData[i].count}</span>
            </li>`
    }

    tagsShow += "</ul>"
    console.log(tagsShow)



    //console.log(json.created_at)
    var date = new Date(postInfo.created_at * 1000 + 8 * 3600 * 1000)

    var dateStrD =
        date.getFullYear()
        + "-" +
        (date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)))
        + "-" +
        (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()))
    /*
      var dateStrT =
        (date.getHours() > 9 ? date.getHours() : ("0" + date.getHours()))
        + ":" +
        (date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes()))
        + ':' +
        (date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()))
    */
    //console.log(dateStrD + " " + dateStrT)


    var postSoure: string
    if (postInfo.source == "" || !postInfo.source) {
        postSoure = ""
    } else if (postInfo.source.includes("https://") || postInfo.source.includes("http://")) {
        postSoure = `<li>Source:<a target="_blank" href="${postInfo.source}">${postInfo.source}</a></li>`
    } else {
        postSoure = `<li>${postInfo.source}</li>`
    }

    var postStatus =
        `<h5>统计数据</h5>
        <ul>
        <li>Id:${postId}</li>
        <li>发布时间: 
        <a tittle="${dateStrD}" href="/post?tags=date:${dateStrD}">${dateStrD}</a>
        by <a href="/user/show/${postInfo.creator_id}">${postInfo.author}</a>
        </li>
        <li>
        大小: ${postInfo.width}x${postInfo.height}
        </li>
        ${postSoure}
        <li>${postInfo.source}</li><li>评级: ${postInfo.rating}</li>
        <li>得分: ${postInfo.score}</li>
        </ul>`

    //console.log("|" + json.source + "|")
    //console.log(postStatus)




    var postOptions =
        `<h5>选项</h5>
        <ul>
        <li>` +
        (postInfo.file_ext == "jpg" ?
            `<a class="original-file-changed highres-show" id="highres-show" href="${postInfo.file_url}">下载大文件 (${ConverBit(postInfo.file_size)} JPG)</a>` :
            `<a class="original-file-changed highres-show" id="highres-show" href="${postInfo.jpeg_url}">下载大文件 (${ConverBit(postInfo.jpeg_file_size)} JPG)</a>`
        ) +
        `</li>
        <li>` +
        (postInfo.file_ext == "png" ?
            `<a class="original-file-changed highres-show" id="highres-show" href="${postInfo.file_url}">下载大文件 (${ConverBit(postInfo.file_size)} PNG)</a>` :
            ""
        ) +
        `</li>
        </ul>`


    var postImg = `<img alt="${postInfo.tags}" id="image" class="image js-notes-manager--toggle js-notes-manager--image" width="${postInfo.sample_width}" height="${postInfo.sample_height}" large_width="${postInfo.width}" large_height="${postInfo.height}" src="${postInfo.sample_url}">`


    var page = await (await fetch("https://raw.githubusercontent.com/feilongproject/yande-proxy/master/html/PostInfo.html")).text()

    //console.log(page)

    var postTitle = "#" + postId + " | " + postInfo.tags + " | yande.ml"
    console.log(postTitle)
    return page
        .replaceAll("<!--TITLE-->", postTitle)
        .replaceAll("<!--TAG SHOW-->", tagsShow)
        .replaceAll("<!--POST STATUS-->", postStatus)
        .replaceAll("<!--POST OPTIONS-->", postOptions)
        .replaceAll("<!--IMG SHOW-->", postImg)

}
