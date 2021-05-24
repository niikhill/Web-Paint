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
let downloadElem = document.querySelector(".save");
let clearElem = document.querySelector(".new");
let theme_btn = document.querySelector(".theme_container")
let theme_icon = document.querySelector(".theme_icon");
let toolContainer = document.querySelector(".tool_container");
let control_container = document.querySelector(".control_container");
let popout_menu = document.querySelector(".popout-menu");
let popout_menu_er = document.querySelector(".er");




// console.log(toolBar.offsetHeight,window.innerHeight)
let is_penToolSelected = false;
let is_eraseToolSelected = false;
let isMouseDown = false;
let lineWidthSize = 3;
let erasersize = 3;
let pen_color = "black";
let currentTheme = "light";

// tool.fillStyle = "#EAF2EF";
// tool.fillRect(0, 0, board.width, board.height);
// board.width = window.innerWidth;
// board.height = window.innerHeight;

theme_btn.addEventListener("click", (e) => {
    if (currentTheme === "light") {
        // tool.fillStyle = "#0D090A";
        // tool.fillRect(0, 0, board.width, board.height);
        board.style.background = "#0D090A"
        toolBar.style.backgroundColor = "#EAF2EF";
        toolContainer.style.backgroundColor = "#C84630"
        control_container.style.backgroundColor = "#C84630"
        theme_btn.style.backgroundColor = "#C84630"
        popout_menu.style.backgroundColor = "#C84630"
        popout_menu_er.style.backgroundColor = "#C84630"
        // console.log(theme_icon.classList)
        theme_icon.classList.remove("fa-sun");
        theme_icon.classList.add("fa-moon");
        currentTheme = "dark";
    } else {
        // tool.fillStyle = "#EAF2EF";
        // tool.fillRect(0, 0, board.width, board.height);
        board.style.background = "#EAF2EF"
        toolBar.style.backgroundColor = "#0D090A";
        toolContainer.style.backgroundColor = "#8D80AD"
        control_container.style.backgroundColor = "#8D80AD"
        theme_btn.style.backgroundColor = "#8D80AD";
        popout_menu.style.backgroundColor = "#8D80AD";
        popout_menu_er.style.backgroundColor = "#8D80AD";
        // console.log(theme_icon.classList)
        theme_icon.classList.remove("fa-moon");
        theme_icon.classList.add("fa-sun");
        currentTheme = "light";
    }
})


clearElem.addEventListener("click", () => {
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let url = board.toDataURL();
            let file_name = getFormattedTime();
            let a = document.createElement("a");
            a.download = `niikhill.com_${file_name}.jpeg`
            a.href = url;
            a.click();
            a.remove();
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            tool.clearRect(0, 0, board.width, board.height);
        }
    })

})
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
        document.body.style.cursor = "url(pen.cur),auto"
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
        document.body.style.cursor = "default"
    }
})


eraser_icon.addEventListener('click', (e) => {
    let is_Active = eraser_btn.classList.contains("active");
    if (is_Active == false) {
        is_penToolSelected = false;
        is_eraseToolSelected = true;
        document.body.style.cursor = "url(Eraser.cur),auto"
        eraser_btn.classList.add("active");
        pen_tool_btn.classList.remove("active");
        console.log(currentTheme)
        if (currentTheme == "dark") {
            console.log(currentTheme)
            tool.strokeStyle = "#0D090A";
        } else {
            tool.strokeStyle = "#FFFFFF";
            console.log(currentTheme)
        }

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
                // tool.arc(x, y, 8, 0, Math.PI * 2, false);
                tool.lineTo(x, y);
                // tool.fill();
                tool.stroke();
            }
        })
    } else {
        is_eraseToolSelected = false;
        document.body.style.cursor = "default";
        eraser_btn.classList.remove("active");
        console.log("Remove ho gya")
    }
})


//Download Image
downloadElem.addEventListener("click", () => {
    let url = board.toDataURL();
    let file_name = getFormattedTime();
    let a = document.createElement("a");
    a.download = `niikhill.com_${file_name}.jpeg`
    a.href = url;
    a.click();
    a.remove();
})

function getFormattedTime() {
    let today = new Date();
    let y = today.getFullYear();
    // JavaScript months are 0-based.
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let h = today.getHours();
    let mi = today.getMinutes();
    let s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
}