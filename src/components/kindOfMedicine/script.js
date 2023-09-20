let elements = document.querySelectorAll(".text");
console.log(elements);

for (element of elements) {
    element.addEventListener("click",function () {
       
        if (!this.dataset.clicked) {
            this.setAttribute("data-clicked", "true");
            this.style.backgroundColor = "#555";
            this.style.color = "#fff";
        } else {
            this.removeAttribute("data-clicked");
            this.removeAttribute("style");
        }
    })
}
var data =[]
function add() {

    var item_pharmacyCode = document.getElementById("pharmacyCode").value
    var item_pharmacyName = document.getElementById("pharmacyName").value
    var item = {
  
        pharmacyCode: item_pharmacyCode,
        pharmacyName: item_pharmacyName
    }
    data.push(item)
    console.log(data);
}
// for (element of elements) {
//     element.addEventListener("click", function clear () {

//         if (!this.dataset.clicked) {
//             this.setAttribute("data-clicked", "true");
//             this.style.backgroundColor = "#555";
//             this.style.color = "#fff";
//             element.removeAttribute();
//         } else {
//             this.removeAttribute("data-clicked");
//             this.removeAttribute("style");
//         }
//     })
// }
