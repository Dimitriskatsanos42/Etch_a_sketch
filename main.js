const grid = document.querySelector('.gridContainer')
const resetButton = document.querySelector('button.reset')
const darkModeButton = document.querySelector('button.darkGrid')
const lightModeButton = document.querySelector('button.lightGrid')
const rgbModeButton = document.querySelector('button.rgbMode')
const body = document.querySelector('body')

let defaultSize = 20

createGrid(defaultSize)

function createGrid(gridSize) {
    for (let i = 1; i <= gridSize; i++) {
        const gridRow = document.createElement('div')
        gridRow.classList.add('row')
        grid.appendChild(gridRow)
        for (let j = 1; j <= gridSize; j++) {
            const box = document.createElement('div')
            box.classList.add('row', `${i}`)
            box.classList.add('box', `${j}`)
            if (gridSize >= 50) {
                box.classList.add('smallBox')
            }
            gridRow.appendChild(box)
        }
    }
    const gridBoxes = document.querySelectorAll('.box')
    
    gridBoxes.forEach(box => box.addEventListener('mouseover', e => changeBoxColor(e.target)))  
    resetButton.addEventListener('click', () => resetColor(gridBoxes)) 
    darkModeButton.addEventListener('click', () => changeToDarkGrid())
    lightModeButton.addEventListener('click', () => changeToLightGrid())
    rgbModeButton.addEventListener('click', () => changeToRgbMode())

}

function changeBoxColor(currentBox) {
    currentBox.classList.add('hovered')
}

function resetColor(gridBoxes) {
    gridBoxes.forEach(box => box.classList.remove('hovered'))
    body.style.backgroundColor = ""
    removeGrid()
    createGrid(defaultSize)
}


function removeGrid() {
    const allRows = document.querySelectorAll('.row')
    for (row of allRows) {
        row.parentNode.removeChild(row)
    }
}

function changeToDarkGrid() {
    grid.classList.add('gridContainerDark')
}

function changeToLightGrid() {
    grid.classList.remove('gridContainerDark')
}


const userInput = document.getElementById('gridSize')
userInput.addEventListener("keypress", event => changeGridSize(event))

function changeGridSize(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        removeGrid()
        let newSize = Number(userInput.value)
        if (newSize >= 2 && newSize <= 100) {
            createGrid(newSize)
        } else {
            createGrid(defaultSize)
        }
    }
}


function getRandomHexCode() {
    const characters = '0123456789ABCDEF'
    let hexCode = '#'
    for (let i = 0; i < 6; i++) {
        hexCode += characters[Math.floor(Math.random() * 16)]
    }
    return hexCode
}

function changeToRgbMode() {
    body.style.backgroundColor = getRandomHexCode()

    const gridBoxes = document.querySelectorAll('.box')
    gridBoxes.forEach(box => box.addEventListener('mouseover', function(e) {
        e.target.style.backgroundColor = getRandomHexCode()
        resetButton.addEventListener('click', () => resetColor(gridBoxes)) 
        darkModeButton.addEventListener('click', () => changeToDarkGrid())
        lightModeButton.addEventListener('click', () => changeToLightGrid())
    }))
    
}