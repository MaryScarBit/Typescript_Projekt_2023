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
/*
Die EventListener für Drag und Drop verschwinden für die Objekte, die ich neu hinzugefügt habe. Demnach muss ich mit einer Funktion
diese wieder laufend hinzufügen. Sonst wird Drag nicht aufgerufen.
 */
function update() {
    let items: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item")
    console.log("Items: "+items.length)
    items.forEach((i: HTMLDivElement) => {
        i.addEventListener("drag", (ev : DragEvent)=> {ev.preventDefault()})
        i.addEventListener("dragstart", handleItemDrag)
    })
}
/*
Wird ausgeführt, wenn man ein Item über den Boxen fallenlässt. Ich erstelle ein frisches Element und schmeiße es in die
entsprechende Box
 */
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
/*
Ich kopiere hier den Inhalt des items in den datatransfer und übertrage den so ins Drop Event
 */
function handleItemDrag(this: HTMLDivElement, ev: DragEvent) {
    if (ev.dataTransfer !== null) {
        ev.dataTransfer.setData("text/plain", this.innerHTML)
        console.log("Drag: " + this.innerHTML)
        ev.dataTransfer.dropEffect = "move"
        this.classList.add("dragged")
    }
}

//Button
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-button");
    if (addButton) {
      addButton.addEventListener("click", handleAddButtonClick);
    }
  
    function handleAddButtonClick() {
      const input = document.getElementById("text-input") as HTMLInputElement;
      const newItemText = input.value.trim();
  
      if (newItemText !== "") {
        const box = document.querySelector(".box") as HTMLDivElement;
        const newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.draggable = true;
        newItem.contentEditable = "true";
        newItem.textContent = newItemText;
  
        newItem.addEventListener("drag", (ev: DragEvent) => {
          ev.preventDefault();
        });
        newItem.addEventListener("dragstart", handleItemDrag);
  
        box.appendChild(newItem);
        input.value = "";
      }
    }
  
    function handleItemDrag(ev: DragEvent) {
      if (ev.dataTransfer) {
        const draggedItem = ev.target as HTMLDivElement;
        ev.dataTransfer.setData("text/plain", draggedItem.innerHTML);
        console.log("Drag: " + draggedItem.innerHTML);
        ev.dataTransfer.dropEffect = "move";
        draggedItem.classList.add("dragged");
      }
    }
  });
  