function Drawer(el, open = false) {
  this.el = el;
  this.isOpen = open;
  Object.assign(this.el.style, {
    display: "block",
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    width: "200px",
    padding: "10px",
    backgroundColor: "white",
    boxShadow: "0 0 36px rgba(0,0,0,0.1)",
    transition: "all 0.4s ease-out",
  });
  this.isOpen ? this.open() : this.close();
}

Drawer.prototype.open = function () {
  this.el.style.transform = "translate(0px)";
  this.isOpen = true;
};

Drawer.prototype.close = function () {
  this.el.style.transform = "translate(220px)";
  this.isOpen = false;
};

const sideMenu = new Drawer(document.querySelector(".drawer"));

document.getElementById("drawer-opener").addEventListener("click", () => {
  if (!sideMenu.isOpen) {
    sideMenu.open();
  } else {
    sideMenu.close();
  }
  console.log(sideMenu.isOpen);
});
