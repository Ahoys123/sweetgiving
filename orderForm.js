// Ahoy, sal!

// interface FoodItem {
//     name: string
//     moniker: string
//     cost: string
//     img: string
//     entry: string
//     singular: string
//     plural: string
// }


// WARNING: if you bypass this on the website, your order will still NOT be made!
// Timestamps are recorded on the google form. Sorry, we need enough prep time to bake your goods.
const sales = [
    {
        pickup: "Order deadline: Mon, July 17, 2023, 11:59pm<br>Neighbors, drop by Laura's house from 1-4pm on Sat the 22nd<br>Church members, pickup after service on Sun the 23rd",
        lastOrder: new Date("7/17/2023 23:59"),
    },
    {
        pickup: "Order deadline: Thur, July 27, 2023, 11:59pm<br>Pickup at work on Mon the 31st from Tina or Lavell",
        lastOrder: new Date("7/27/2023 23:59"),
    }
]

const orderable = [ // : FoodItem[] = 
    {name: "Chocolate Chip Cookies", 
        moniker: "Crispy-on-the-outside-chewy-on-the-inside",
        cost: "4 large cookies per $5 bag", img: "images/chocChip.png", entry: "726004286",
        singular: "bag", plural: "bags",
    },
    {name: "Oatmeal Raisin Cookies", 
        moniker: "Soft",
        cost: "4 large cookies per $5 bag", img: "images/oatmealRasin.png", entry: "710107511",
        singular: "bag", plural: "bags",
    },
    {name: "Brownies", 
        moniker: "Ooey Gooey",
        cost: "2 large brownie squares per $5 bag", img: "images/brownies.png", entry: "1348222176",
        singular: "bag", plural: "bags",
    },
    {name: "Blueberry Coffee Cake", 
        moniker: "Crumbly",
        cost: "1 large slice per $5 box", img: "images/coffeeCake.png", entry: "836750915",
        singular: "box", plural: "boxes",
    },
    {name: "Red Velvet Cupcake with Cream Cheese Frosting", 
        moniker: "Fluffy, Rich", 
        cost: "1 cupcake per $5 box", img: "images/redVelvet.png", entry: "1710212009",
        singular: "box", plural: "boxes",
        allergens: "Contains chocolate"
    },
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    maximumFractionDigits: 0,
})

const dateElement = document.getElementById("date")
const orderList = document.getElementById("order-list")
const placeOrder = document.getElementById("place-order")

initialize()

function initialize() {

    var date = checkDate()
    if (date === null) {
        dateElement.innerHTML = "Sorry, the order deadline for all currently planned bakesales has passed! Please check back in later."
        return
    }

    dateElement.innerHTML = date

    placeOrder.onclick = () => {
        for (let i = 0; i < orderable.length; i++) {
            if (orderable[i].amount !== 0) {
                document.body.appendChild(getNamePopup())
                _focus()
                return
            }
        }

        document.body.appendChild(getErrPopup("Please order at least one item first!"))
        return
    }

    fillOrderList()
}

function fillOrderList() {
    orderable.forEach(order => {
        order.amount = 0
        var div = document.createElement("div")
        div.classList.add("food-box")

        var img = document.createElement("img")
        img.setAttribute("src", order.img)
        div.appendChild(img)

        if (order.moniker !== undefined) {
            var monikerLabel = document.createElement("p")
            monikerLabel.textContent = order.moniker
            monikerLabel.classList.add("food-label")
            div.appendChild(monikerLabel)
        }

        var nameLabel = document.createElement("h3")
        nameLabel.textContent = order.name
        nameLabel.classList.add("food-label")
        div.appendChild(nameLabel)

        var costLabel = document.createElement("p")
        costLabel.textContent = order.cost
        costLabel.classList.add("food-label")
        div.appendChild(costLabel)

        if (order.allergens !== undefined) {
            var allergensLabel = document.createElement("p")
            allergensLabel.textContent = order.allergens
            allergensLabel.classList.add("food-label")
            allergensLabel.classList.add("emphasis")
            div.appendChild(allergensLabel)
        }

        var arrows = document.createElement("div")
        arrows.classList.add("food-row")
        arrows.style = "justify-self: end;"
        div.appendChild(arrows)
        
        var lessButton = document.createElement("button")
        lessButton.textContent = "-"
        lessButton.classList.add("amount-button")
        arrows.appendChild(lessButton)

        var number = document.createElement("p")
        updateOrderLabel(number, order)
        number.classList.add("amount-label")
        arrows.appendChild(number)

        var morebutton = document.createElement("button")
        morebutton.textContent = "+"
        morebutton.classList.add("amount-button")
        arrows.appendChild(morebutton)
        
        lessButton.onclick = () => {
            if (order.amount > 0) {
                order.amount--
            }
            updateOrderLabel(number, order)
        }

        morebutton.onclick = () => { 
            if (order.amount < 15) {
                order.amount++
            }
            updateOrderLabel(number, order)
        }

        orderList.appendChild(div)
    })
}

function checkDate() {
    today = new Date()
    for (let i = 0; i < sales.length; i++) {
        if (today < sales[i].lastOrder) {
            return sales[i].pickup
        }
    }
    return null
}

var _dimmer
var _focus
var namePopupError

function getNamePopup() {
    if (_dimmer !== undefined) {
        return _dimmer
    }

    _dimmer = document.createElement("div")
    _dimmer.id = "dimmer"
    var nameGetter = document.createElement("div")
    nameGetter.id = "name-getter"
    nameGetter.classList.add("col")
    _dimmer.appendChild(nameGetter)

    var exit = document.createElement("button")
    exit.textContent = "X"
    exit.classList.add("exit-button")
    nameGetter.appendChild(exit)
    exit.onclick = () => {
        _dimmer.remove()
    }

    var pickup = document.createElement("p")
    pickup.innerHTML = "Pay on pickup.<br>Cash only!"
    pickup.classList.add("emphasis")
    nameGetter.appendChild(pickup)

    var label = document.createElement("p")
    label.textContent = "Name for pickup:"
    label.style = "margin: 4px;"
    nameGetter.appendChild(label)

    var nameField = document.createElement("input")
    nameField.setAttribute("type", "text")
    nameGetter.appendChild(nameField)
    _focus = () => { nameField.select() }

    var contactLabel = document.createElement("p")
    contactLabel.textContent = "Contact Info (email or phone #):"
    contactLabel.style = "margin: 4px;"
    nameGetter.appendChild(contactLabel)

    var contactField = document.createElement("input")
    contactField.setAttribute("type", "text")
    nameGetter.appendChild(contactField)

    var submit = document.createElement("button")
    submit.classList.add("nav-button")
    submit.textContent = "Submit Order!"
    nameGetter.appendChild(submit)

    var error = document.createElement("p")
    error.classList.add("emphasis")
    namePopupError = (err) => {
        error.textContent = err
        nameGetter.appendChild(error)
    }

    submit.onclick = () => {
        if (sendForm(nameField.value, contactField.value, exit.onclick)) {
            nameField.value = ""
            contactField.value = ""
            error.remove()
        }
    }

    _dimmer.onkeydown = (ev) => { if (ev.key === 'Enter') { submit.onclick() } }

    return _dimmer
}

var _error

function getErrPopup(err) {
    if (_error !== undefined) {
        _error.children[0].children[1].textContent = err
        return _error
    }

    _error = document.createElement("div")
    _error.id = "dimmer"
    var errFlex = document.createElement("div")
    errFlex.id = "name-getter"
    errFlex.classList.add("col")
    _error.appendChild(errFlex)

    var exit = document.createElement("button")
    exit.textContent = "X"
    exit.classList.add("exit-button")
    errFlex.appendChild(exit)
    exit.onclick = () => {
        _error.remove()
    }

    var msg = document.createElement("p")
    msg.textContent = err
    errFlex.appendChild(msg)

    return _error
}

function sendForm(name, contact, exit) {
    name = name.trim()
    if (name === "") {
        namePopupError("Please enter an identifiable name!")
        return false
    }
    contact = contact.trim()
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contact) || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(contact))) {
        namePopupError("Please enter a valid email/phone#!")
        return false
    }

    // wining the idgaf war about injections, client opens in their own browser anyways on a public google form...
    // but just because people might enter "&" or "?" into their name and mess everything up, let's encode the name
    // NOTE: if there's two pages, do add "&pageHistory=0%2C1" to the end
    var url = `https://docs.google.com/forms/d/e/1FAIpQLSdIsatKXc_rQLXIwwNkqFTK79wZtCK42kQgvmvxiSVr5oVq_Q/formResponse?entry.799258786=${encodeURIComponent(name)}&entry.1040922454=${encodeURIComponent(contact)}`
    orderable.forEach(order => {
        url += order.amount <= 0 ? `` : 
            order.amount == 1 ? `&entry.${order.entry}=1+${order.singular}` :
            order.amount <= 4 ? `&entry.${order.entry}=${order.amount}+${order.plural}` :
            `&entry.${order.entry}=__other_option__&entry.${order.entry}.other_option_response=${order.amount}+${order.plural}`
    })

    exit()

    window.open(url, '_blank')
    return true
}

function updateOrderLabel(label, order) {
    label.textContent = order.amount == 1 ? `1 ${order.singular}` : `${order.amount} ${order.plural}`
    var totalCost = 0
    orderable.forEach(order => {
        totalCost += 5 * order.amount
    })

    placeOrder.textContent = `place order (${formatter.format(totalCost)})`
}
