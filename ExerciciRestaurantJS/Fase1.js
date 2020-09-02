class UtilsFase1 {

    constructor() {
        this.billete5 = 5;
        this.billete10 = 10;
        this.billete20 = 20;
        this.billete50 = 50;
        this.billete100 = 100;
        this.billete200 = 200;
        this.billete500 = 500;
        this.precioTotal = 0;
        this.menuArray = ["Agua", "Pan", "Paella", "Fideua", "Crema Verduras", "Ensalada", "Ensaladilla", "Entrecot", "Calamares", "Rape", "Pollo", "Pizza Carbonara"];
        this.precioPlatoArray = new Array();
    }

    getPrecioTotal() {
        return this.precioTotal.toFixed(2);
    }

    setPrecioTotal(precioPlatoMenu){
        this.precioTotal = parseFloat(this.precioTotal) + parseFloat(precioPlatoMenu);

    }

    addPrecioPlatoMenu(menuArray) {
        menuArray.forEach(element => {
            switch (element) {
                case "Agua":
                    this.precioPlatoArray.push(this.billete5.toFixed(2));
                    break;

                case "Pan":
                    this.precioPlatoArray.push(this.billete10.toFixed(2));
                    break;

                case "Paella":
                    this.precioPlatoArray.push(this.billete50.toFixed(2));
                    break;

                case "Fideua":
                    this.precioPlatoArray.push((this.billete20 + this.billete20).toFixed(2));
                    break;

                case "Crema Verduras":
                    this.precioPlatoArray.push((this.billete20 + this.billete10).toFixed(2));
                    break;

                case "Ensalada":
                    this.precioPlatoArray.push(this.billete10.toFixed(2));
                    break;

                case "Ensaladilla":
                    this.precioPlatoArray.push(this.billete20.toFixed(2));
                    break;

                case "Entrecot":
                    this.precioPlatoArray.push(this.billete100.toFixed(2));
                    break;

                case "Calamares":
                    this.precioPlatoArray.push((this.billete50 + this.billete10).toFixed(2));
                    break;

                case "Rape":
                    this.precioPlatoArray.push((this.billete50 + this.billete20).toFixed(2));
                    break;

                case "Pollo":
                    this.precioPlatoArray.push(this.billete5.toFixed(2));
                    break;

                case "Pizza Carbonara":
                    this.precioPlatoArray.push((this.billete10 + this.billete5).toFixed(2));
                    break;
            }
        });
        return this.precioPlatoArray;
    }
}

class UIFase1 {
    showInfoMenu(message, infoMenu) {
        const fase1 = document.getElementById('Fase1');
        const element = document.createElement('div');
        element.className = 'col-md-12';
        element.innerHTML = `
            <div class='card mt-1'> 
                <div class='card-body'>
                    <strong>${message}</strong>: ${infoMenu}
                   
                </div>
            </div>           
        `;
        fase1.appendChild(element);
    }

    showPrecioTotal(precioTotal) {
        const fase1 = document.getElementById('Fase1');
        const element = document.createElement('div');
        element.id='precio-total'
        element.className = 'col-md-12';
        element.innerHTML = `
            <div class='card mt-1'> 
                <div class='card-body'>
                    <strong>Precio total</strong>: ${precioTotal}€
                   
                </div>
            </div>           
        `;
        fase1.appendChild(element);
    }
}


//EVENTOS DEL DOM
const utilsFase1 = new UtilsFase1();
var precioPlatoArray = utilsFase1.addPrecioPlatoMenu(utilsFase1.menuArray);
var precioTotal = utilsFase1.getPrecioTotal();

window.addEventListener("load", function(e) {
    const ui = new UIFase1();
    ui.showInfoMenu('Menu', utilsFase1.menuArray);
    ui.showInfoMenu('Precio Menu', precioPlatoArray);
    ui.showPrecioTotal(precioTotal);

    e.preventDefault();
  });






