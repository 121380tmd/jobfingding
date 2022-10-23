// 文件操作相关工具函数

/**
 * 文件下载，使用 fetch 请求下载，防止浏览器直接打开预览图片、pdf等文件
 * @param url 下载url
 * @param filename 下载文件名称
 */
function downloadFile(url, filename = "") {
  const a = document.createElement("a")
  if (filename) {
    a.download = filename
  } else {
    const items = url.split("/")
    a.download = items[items.length - 1]
  }
  a.style.display = "none"
  const download = (a, url) => {
    if (url.constructor === String) {
      a.href = url
    } else if (url.constructor === Blob) {
      a.href = URL.createObjectURL(url)
    }
    document.body.appendChild(a)
    a.click()
    // 移除元素
    document.body.removeChild(a)
  }
  if (fetch) { // 若 fetch 存在
    fetch(url).then(res => {
      return res.blob()
    }).then((blob) => {
      download(a, blob)
    })
  } else {
    a.target = "_blank"
    download(a, url)
  }
}

export {
  downloadFile,
}
