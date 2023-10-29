const header = document.getElementById("header")
const spacer = document.getElementById("spacer")

spacer.setAttribute("style", "height: " + header.clientHeight + "px;")

const observer = new ResizeObserver((entries) => {
    spacer.setAttribute("style", "height: " + entries[0].target.clientHeight + "px;")
})

observer.observe(header)