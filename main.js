let pen_tool_btn = document.querySelector(".pen");
let pen_tool_icon = document.querySelector(".fa-pen")
let eraser_icon = document.querySelector(".fa-eraser")
let eraser_btn = document.querySelector(".eraser");
let toolBar = document.querySelector(".toolbar");
let board = document.getElementById("board");
board.height = window.innerHeight;
board.width = window.innerWidth;
let tool = board.getContext("2d");
let width_size = document.getElementById("pensize");
let eraser_size = document.getElementById("ersize");
let colorElem = document.querySelectorAll(".color");


// console.log(toolBar.offsetHeight,window.innerHeight)
let is_penToolSelected = false;
let is_eraseToolSelected = false;
let isMouseDown = false;
let lineWidthSize = 3;
let erasersize = 3;
let pen_color = "black";


width_size.addEventListener("input", (e) => {
    lineWidthSize = e.target.value;
})

eraser_size.addEventListener("input", (e) => {
    erasersize = e.target.value;
})



for (let i = 0; i < colorElem.length; i++) {
    colorElem[i].addEventListener("click", (e) => {
        pen_color = e.target.classList[1]
    })
}





pen_tool_icon.addEventListener("click", (e) => {
    let is_Active = pen_tool_btn.classList.contains("active");
    if (is_Active == false) {
        is_penToolSelected = true;
        is_eraseToolSelected = false;
        pen_tool_btn.classList.add("active");
        eraser_btn.classList.remove("active");
        board.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            tool.beginPath();
            // console.log(is_penToolSelected);
        })
        board.addEventListener("mouseup", (e) => {
            isMouseDown = false;
            // console.log(is_penToolSelected);
        })
        board.addEventListener("mousemove", (e) => {
            let x = e.clientX - board.offsetLeft;
            let y = e.clientY - board.offsetTop;
            // console.log(x, y)
            if (isMouseDown == true && is_penToolSelected == true) {
                tool.globalCompositeOperation = "source-over";
                tool.lineWidth = lineWidthSize;
                tool.strokeStyle = pen_color;
                tool.lineTo(x, y);
                tool.stroke();
            }
        })

    } else {
        //Draw 
        // tool.beginPath();
        is_penToolSelected = false;
        pen_tool_btn.classList.remove("active");
    }
})


eraser_icon.addEventListener('click', (e) => {
    let is_Active = eraser_btn.classList.contains("active");
    if (is_Active == false) {
        is_penToolSelected = false;
        is_eraseToolSelected = true;
        eraser_btn.classList.add("active");
        pen_tool_btn.classList.remove("active");
        board.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            tool.beginPath();
            console.log(is_penToolSelected);
        })
        board.addEventListener("mouseup", (e) => {
            isMouseDown = false;
            // console.log(is_penToolSelected);
        })
        board.addEventListener("mousemove", (e) => {
            let x = e.clientX - board.offsetLeft;
            let y = e.clientY - board.offsetTop;
            // console.log(x, y)
            if (isMouseDown == true && is_eraseToolSelected == true) {
                tool.lineWidth = erasersize;
                tool.globalCompositeOperation = "destination-out";
                tool.strokeStyle = "#FFFFFF";
                // tool.arc(x, y, 8, 0, Math.PI * 2, false);
                tool.lineTo(x, y);
                // tool.fill();
                tool.stroke();
            }
        })
    } else {
        is_eraseToolSelected = false;
        eraser_btn.classList.remove("active");
        console.log("Remove ho gya")
    }
})