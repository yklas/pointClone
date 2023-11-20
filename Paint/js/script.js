const canvas = document.querySelector('canvas'),
  toolsBtns = document.querySelectorAll('.tool'),
  fill_color = document.querySelector('#fill_color'),
  sizeSlider = document.querySelector('#size_slider'),
  colorBtn = document.querySelectorAll('.colors .option'),
  colorPicker = document.querySelector('#color_picker'),
  clearCanvas = document.querySelector('.clear_canvas'),
  saveImg = document.querySelector('.save_img')


  // VARIABLE with default value
let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth = 5,
    selectedTool = 'brush',
    selectedColor = '#000',
    prevMouseX,
    prevMouseY,
    snapshot



// SET CANVAS BACKGROUND
const setCanvasBackground = () =>{
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = selectedColor
}


// SET CANVAS WIDTH AND HEIGHT
window.addEventListener('load', ()=>{
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    setCanvasBackground()
})


// START DRAWING
const startDraw = e =>{
 isDrawing = true
 prevMouseX = e.offsetX
 prevMouseY = e.offsetY
 ctx.beginPath()
 ctx.lineWidth = brushWidth
 ctx.strokeStyle = selectedColor
 ctx.fillStyle = selectedColor
 snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
 console.log(snapshot)
}


// DRAW RECTANGLE
const drawRectangle = e =>{
    fill_color.checked
    ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// DRAW CIRCLE
const drawCircle = e =>{
    ctx.beginPath()
    const radius = 
    Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2)) + Math.pow(prevMouseY - e.offsetY, 2)
 ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
 fill_color.checked ? ctx.fill() : ctx.stroke()
 ctx.stroke()
}


// DRAW TRAINGLE
const drawTraingle = e =>{
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fill_color.checked ? ctx.fill() : ctx.stroke()
    ctx.stroke()
}

// DRAWING
const drawing = e =>{
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        break
        case "restangle":
            drawRectangle(e)
            break
            case "circle":
                drawCircle(e)
                break
            case "triangle":
                drawTraingle(e)
              break
              case 'eraser':
                ctx.strokeStyle = '#fff'
                ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
                break
        default:
            break;
    }
}

// CHANGE BRUSH WITH
sizeSlider.addEventListener('change', ()=> (brushWidth = sizeSlider.value))

// SET COLOR TO SHAPES
colorBtn.forEach(btn => {
    btn.addEventListener('click', e =>{
        document.querySelector('.options .selected').classList.remove("selected")
        btn.classList.add("selected")
        const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
        selectedColor = bgColor
   console.log(bgColor)
    })
})

// SET COLOR FRON COLOR PICKER
colorPicker.addEventListener('change', ()=>{
    colorPicker.parentElement.style.background = colorPicker.value
    colorPicker.parentElement.click()
})

// CLEAR CANVAS BUTTON
clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCanvasBackground()
})

// SAVE LIKE IMAGE PAINT
saveImg.addEventListener('click', ()=>{
    const link = document.createElement('a')
    link.download = `Ikhlas-point${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()
})



// STOP DRAWING
const stopDraw = ()=>{
    isDrawing = false
}

toolsBtns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        document.querySelector('.options .active').classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
        console.log(`selected tool ${selectedTool}`)
    })
})

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)