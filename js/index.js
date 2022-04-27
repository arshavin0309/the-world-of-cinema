let btn = document.querySelectorAll('.header__btn')
let category = document.querySelectorAll('.hero__span')
let heroList = document.querySelector('.hero__list')
let heroItem = document.querySelectorAll('.hero__item')
let itemsOnPage = 10
let nav = document.querySelector('.hero__pagination')
let infoContainer = document.querySelector('.info__container')

const categoryInStorage = localStorage.getItem('category')

if (localStorage.getItem('category')) {
    renderList(categoryInStorage)
}

function renderList(category) {
    if (!infoContainer) {
        if (category == 'отменить фильтр') {
            for (const item of heroItem) {
                heroList.append(item)
                createCountPages(heroItem)
                saveList(category)
            }
        } else {
            heroList.innerHTML= ''
            filterArr(category)
        }
    }
}

function filterArr(category) {
    if (!infoContainer) {
        let heroItemsAfterFilter = []
        for (const item of heroItem) {
            if (item.innerText.indexOf(category) != -1) {
                heroList.append(item)
                heroItemsAfterFilter.push(item)
            }
        }
        console.log(heroItemsAfterFilter)
        nav.innerHTML = ''
        createCountPages(heroItemsAfterFilter)
        saveList(category)
    }
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

let pages = document.querySelectorAll('.hero__page')

function splitOnPages(array) {
    for (const item of pages) {

        // document.addEventListener('DOMContentLoaded', () => {
        //     let page = 1
    
        //     let start = (page - 1) * itemsOnPage
        //     let end = start + itemsOnPage
        //     let newArr = Object.values(array)
        //     let notes = newArr.slice(start, end)
    
        //     heroList.innerHTML = ''
        //     for (const note of notes) {
        //         heroList.append(note)
        //     }
        // })

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

for (const item of heroItem) {
    item.addEventListener('click', () => {
        let title = item.querySelector('.hero__heading').textContent
        let info = item.querySelector('.hero__info').textContent
        let location = item.querySelector('.hero__location').textContent
        let date = item.querySelector('.hero__date').textContent
        let categ = item.querySelector('.hero__category').textContent

        console.log(title)

        localStorage.setItem('title', title)
        localStorage.setItem('info', info)
        localStorage.setItem('location', location)
        localStorage.setItem('date', date)
        localStorage.setItem('categ', categ)
    })
}

if (infoContainer) {
    let title = document.createElement('h1')
    title.textContent = localStorage.getItem('title')
    let info = document.createElement('p')
    info.textContent = localStorage.getItem('info')
    let location = document.createElement('div')
    location.textContent = localStorage.getItem('location')
    let date = document.createElement('div')
    date.textContent = localStorage.getItem('date')
    let categ = document.createElement('div')
    categ.textContent = localStorage.getItem('categ')

    infoContainer.append(title)
    infoContainer.append(info)
    infoContainer.append(location)
    infoContainer.append(date)
    infoContainer.append(categ)
}