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
        const buttons = document.querySelectorAll(".btn-add");
        if (buttons !== null) {
            buttons.forEach((y) => {
                y.addEventListener('click', addElement);
            });
        }
    });
    /*
    Die EventListener für Drag und Drop verschwinden für die Objekte, die ich neu hinzugefügt habe. Demnach muss ich mit einer Funktion
    diese wieder laufend hinzufügen. Sonst wird Drag nicht aufgerufen.
     */
    function update() {
        let items = document.querySelectorAll(".item");
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
            let elem = document.createElement("div");
            elem.setAttribute("contentEditable", "true");
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
            ev.dataTransfer.dropEffect = "move";
            this.classList.add("dragged");
        }
    }
    function addElement() {
        let elem = document.createElement("div");
        elem.setAttribute("contentEditable", "true");
        elem.classList.add("item");
        elem.setAttribute("draggable", "true");
        let container = this.parentNode;
        if (container !== null) {
            container = container.parentNode;
            container.appendChild(elem);
        }
        update();
    }
    //btn-add> ändern, container

})();
