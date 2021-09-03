const new_Command = (p) => `<button type="button" class="collapsible">${p.name}<span> - ${p.sect}</span></button><div class="content"><h4 style="color: #cccccc;">Accion:</h4><p>${p.desc}</p>${p.cooldown ? `<h4 style="color: #cccccc;">Cooldown:</h4><p>${p.cooldown}</p>` : ""}<h4 style="color: #cccccc;">Ejemplo:</h4><p>${p.example.join("<br>")}</p></div>`
var getJSON = function (url) { return new Promise((resolve, reject) => { var xhr = new XMLHttpRequest(); xhr.open('GET', url, true); xhr.responseType = 'json'; xhr.onload = function () { var status = xhr.status; if (status === 200) { resolve(xhr.response) } else reject() }; xhr.send(); }) }
async function index() {
    try {
        getJSON("http://lightningneko.ddns.net/data").then(x => console.log(x))


        let data = await getJSON("commands.json")
        data.forEach((com) => { var gen_div = new_Command(com); $("#myCmd").append(gen_div) })
        var coll = document.getElementsByClassName("collapsible")
        var i
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active")
                var content = this.nextElementSibling
                if (content.style.display === "block") { content.style.display = "none" } else { content.style.display = "block" }
            })
        }
        function hideAll() { $("#myCmd > div").each((i, x) => x.style.display = "none") }
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase()
                hideAll()
                $("#myCmd button").filter(function () { $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) })
            })
        })

    } catch (ex) { window.location = "error.html" }
}
index()
