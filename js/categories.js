function initCategories(selector, categories) {
    const parent = document.getElementById(selector)
    parent.innerHTML = ''

    for (let index = 0; index < categories.length; index += 1) {
        const category = categories[index]

        const container = document.createElement('figure')
        container.className = 'promotional-item'
        const img = document.createElement('img')
        img.src = category.image_url
        container.append(img)

        container.onclick = function() {
            console.log('abrir', categories)
        }
        
        parent.append(container)
    }
}

initCategories('promotional', categories)