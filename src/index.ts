//Logic: wird ausgeführt, wenn DOM geladen ist. 1. EventListeners für D&D, 2.update, 3. buttons


document.addEventListener("DOMContentLoaded", (): void => {
  const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box")
  let items: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item")
  boxes.forEach((b: HTMLDivElement) => {
    b.addEventListener("drop", handleItemDrop)
    b.addEventListener("dragover", (ev: DragEvent) => {
      ev.preventDefault();
    })
  })
  update();
  const buttons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".btn-add")
  if (buttons !== null) {
    buttons.forEach((y: HTMLButtonElement) => {
      y.addEventListener('click', addElement)
    })
  }
})


/*
Stellt sicher, dass D&D für neu hinzugefügte Elemente funktioniert. Sonst wird Drag nicht aufgerufen
 */
function update() {
  let items: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item")
  items.forEach((i: HTMLDivElement) => {
    i.addEventListener("drag", (ev: DragEvent) => { ev.preventDefault() })
    i.addEventListener("dragstart", handleItemDrag)
  })
}
/*
Wird ausgeführt, wenn man ein Item über den Boxen fallenlässt: es folgt ein frisches Element in der
entsprechende Box
 */
function handleItemDrop(this: HTMLDivElement, ev: DragEvent) {
  if (ev.dataTransfer !== null) {
    const itemtitle: string = ev.dataTransfer.getData("text/plain")
    let elem = document.createElement("div")
    elem.setAttribute("contentEditable", "true")
    elem.innerHTML = itemtitle
    elem.classList.add("item")
    elem.setAttribute("draggable", "true");
    let old: HTMLDivElement | null = document.querySelector(".dragged");
    if (old !== null && old.parentNode !== null) {
      old.parentNode.removeChild(old);
    }
    this.appendChild(elem);
    update();
  }
}

//Ich kopiere hier den Inhalt des items in den datatransfer und übertrage den so ins Drop Event

function handleItemDrag(this: HTMLDivElement, ev: DragEvent) {
  if (ev.dataTransfer !== null) {
    ev.dataTransfer.setData("text/plain", this.innerHTML)
    ev.dataTransfer.dropEffect = "move"
    this.classList.add("dragged")
  }
}

// erstellt ein neues Element und fügt es dem übergeordneten Container hinzu
function addElement(this: HTMLButtonElement) {
  let elem = document.createElement("div")
  elem.setAttribute("contentEditable", "true")
  elem.classList.add("item")
  elem.setAttribute("draggable", "true");
  let container: HTMLDivElement | null = this.parentNode as HTMLDivElement
  if (container !== null) {
    container = container.parentNode as HTMLDivElement
    container.appendChild(elem)
  }
  update()
}


