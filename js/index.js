let btn = document.querySelectorAll('.header__btn')
let category = document.querySelectorAll('.hero__span')
let heroList = document.querySelector('.hero__list')
let heroItem = document.querySelectorAll('.hero__item')
let itemsOnPage = 10
let nav = document.querySelector('.hero__pagination')

const categoryInStorage = localStorage.getItem('category')

if (localStorage.getItem('category')) {
    renderList(categoryInStorage)
}

function renderList(category) {
    if (category == 'отменить фильтр') {
        for (const item of heroItem) {
            heroList.append(item)
            saveList(category)
            createCountPages(heroItem)
            // splitOnPages(heroItem)
        }
    } else {
        heroList.innerHTML= ''
        filterArr(category)
    }
}

function filterArr(category) {
    let heroItemsAfterFilter = []
    for (const item of heroItem) {
        if (item.innerText.indexOf(category) != -1) {
            heroList.append(item)
            heroItemsAfterFilter.push(item)
        }
    }
    console.log(heroItemsAfterFilter)
    saveList(category)
    nav.innerHTML = ''
    createCountPages(heroItemsAfterFilter)
    return
}

for (const item of btn) {
    if (categoryInStorage == item.textContent) {
        item.classList.add('active')
    }

    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            item.classList.remove('active')
            renderList('отменить фильтр')
        } else {
            for (const elem of btn) {
                elem.classList.remove('active')
            }
            item.classList.add('active')
            renderList(item.textContent)
        }
    })
}

function saveList(category) {
    localStorage.setItem('category', category)
}

// определяем кол-во страниц
function createCountPages(array) {
    let lengthOfPagination = Math.ceil(array.length / itemsOnPage)
    nav.innerHTML = ''

    for (let i = 1; i <= lengthOfPagination; i++) {
        let btn = document.createElement('button')
        btn.classList.add('hero__page')
        btn.textContent = i
        nav.append(btn)
    }
}
createCountPages(heroItem)

// получает все что есть с данным классом, это неправильно, при фильтре работать будет некорректно
let pages = document.querySelectorAll('.hero__page')

// разделяем на страницы
function splitOnPages(array, numberOfPage = 1) {
    let page = numberOfPage
    
    let start = (page - 1) * itemsOnPage
    let end = start + itemsOnPage
    let newArr = Object.values(array)
    let notes = newArr.slice(start, end)

    heroList.innerHTML = ''
    for (const note of notes) {
        heroList.append(note)
    }

    for (const item of pages) {
        item.addEventListener('click', () => {

            let page = item.textContent
    
            let start = (page - 1) * itemsOnPage
            let end = start + itemsOnPage
            let newArr = Object.values(array)
            let notes = newArr.slice(start, end)
    
            heroList.innerHTML = ''
            for (const note of notes) {
                heroList.append(note)
            }
        })
    }
}

splitOnPages(heroItem)