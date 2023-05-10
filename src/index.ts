document.addEventListener("DOMContentLoaded", () : void=>{
    const boxes : NodeListOf<HTMLDivElement> = document.querySelectorAll(".box")
    let items : NodeListOf<HTMLDivElement> = document.querySelectorAll(".item")
    boxes.forEach((b : HTMLDivElement) => {
        b.addEventListener("drop", handleItemDrop)
        b.addEventListener("dragover", (ev : DragEvent)=> {
            ev.preventDefault();
        })
    })
    update();
})

function update() {
    let items: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item")
    console.log("Items: "+items.length)
    items.forEach((i: HTMLDivElement) => {
        i.addEventListener("drag", (ev : DragEvent)=> {ev.preventDefault()})
        i.addEventListener("dragstart", handleItemDrag)
    })
}

function handleItemDrop(this: HTMLDivElement, ev: DragEvent) {
    if (ev.dataTransfer !== null) {
        const itemtitle : string = ev.dataTransfer.getData("text/plain")
        console.log("Drop: " + itemtitle)
        let elem = document.createElement("div")
        elem.innerHTML = itemtitle
        elem.classList.add("item")
        elem.setAttribute("draggable", "true");
        let old : HTMLDivElement | null = document.querySelector(".dragged");
        if (old !== null && old.parentNode !== null) {
            old.parentNode.removeChild(old);
        }
        this.appendChild(elem);
        update();
    }
}
