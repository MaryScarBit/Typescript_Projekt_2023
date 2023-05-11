(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", () => {
        const boxes = document.querySelectorAll(".box");
        document.querySelectorAll(".item");
        boxes.forEach((b) => {
            b.addEventListener("drop", handleItemDrop);
            b.addEventListener("dragover", (ev) => {
                ev.preventDefault();
            });
        });
        update();
    });
    /*
    Die EventListener für Drag und Drop verschwinden für die Objekte, die ich neu hinzugefügt habe. Demnach muss ich mit einer Funktion
    diese wieder laufend hinzufügen. Sonst wird Drag nicht aufgerufen.
     */
    function update() {
        let items = document.querySelectorAll(".item");
        console.log("Items: " + items.length);
        items.forEach((i) => {
            i.addEventListener("drag", (ev) => { ev.preventDefault(); });
            i.addEventListener("dragstart", handleItemDrag);
        });
    }
    /*
    Wird ausgeführt, wenn man ein Item über den Boxen fallenlässt. Ich erstelle ein frisches Element und schmeiße es in die
    entsprechende Box
     */
    function handleItemDrop(ev) {
        if (ev.dataTransfer !== null) {
            const itemtitle = ev.dataTransfer.getData("text/plain");
            console.log("Drop: " + itemtitle);
            let elem = document.createElement("div");
            elem.innerHTML = itemtitle;
            elem.classList.add("item");
            elem.setAttribute("draggable", "true");
            let old = document.querySelector(".dragged");
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
    function handleItemDrag(ev) {
        if (ev.dataTransfer !== null) {
            ev.dataTransfer.setData("text/plain", this.innerHTML);
            console.log("Drag: " + this.innerHTML);
            ev.dataTransfer.dropEffect = "move";
            this.classList.add("dragged");
        }
    }
    //Button
    document.addEventListener("DOMContentLoaded", () => {
        const addButton = document.getElementById("add-button");
        if (addButton) {
            addButton.addEventListener("click", handleAddButtonClick);
        }
        function handleAddButtonClick() {
            const input = document.getElementById("text-input");
            const newItemText = input.value.trim();
            if (newItemText !== "") {
                const box = document.querySelector(".box");
                const newItem = document.createElement("div");
                newItem.classList.add("item");
                newItem.draggable = true;
                newItem.contentEditable = "true";
                newItem.textContent = newItemText;
                newItem.addEventListener("drag", (ev) => {
                    ev.preventDefault();
                });
                newItem.addEventListener("dragstart", handleItemDrag);
                box.appendChild(newItem);
                input.value = "";
            }
        }
        function handleItemDrag(ev) {
            if (ev.dataTransfer) {
                const draggedItem = ev.target;
                ev.dataTransfer.setData("text/plain", draggedItem.innerHTML);
                console.log("Drag: " + draggedItem.innerHTML);
                ev.dataTransfer.dropEffect = "move";
                draggedItem.classList.add("dragged");
            }
        }
    });

})();
