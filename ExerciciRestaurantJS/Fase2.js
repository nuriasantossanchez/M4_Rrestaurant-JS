class Menu{

    platoMenuPrecioMap = new Map();
    constructor(menuArray,precioPlatoArray){
        this.menuArray = menuArray;
        this.precioPlatoArray = precioPlatoArray;
        this.platoMenuPrecioMap=this.getPlatoMenuPrecioMap(menuArray,precioPlatoArray);
    }

    getPlatoMenuPrecioMap(menuArray,precioPlatoArray){
        Array.prototype.toUpperCase = function() {
            return this.map(word => word.toUpperCase())
          };
        menuArray = menuArray.toUpperCase();
        for(let i = 0;i<menuArray.length; i++){
            this.platoMenuPrecioMap.set(menuArray[i],precioPlatoArray[i]);
        }
        return this.platoMenuPrecioMap;
    }

}

class PedidoMenu{

    constructor(nombrePlato,opcionMasComida){
        this.nombrePlato=nombrePlato;
        this.opcionMasComida=opcionMasComida;
    }
}

class UtilsFase2{
    pedidoList = [];
    constructor(){
    }

    getPedidoList(){
        return this.pedidoList;
    }
    
    setPedidoList(pedidoList){
        this.pedidoList=pedidoList;
    }

    addPlatoAPedidoList(nombrePlato){
        nombrePlato=nombrePlato.trim();
        this.pedidoList.push(nombrePlato.toUpperCase());
    }

    deletePlatoDePedidoList(pedidoList, nombrePlato){
        nombrePlato=nombrePlato.trim();
        nombrePlato=nombrePlato.toUpperCase();
        this.pedidoList=pedidoList;
        for(let i=0;i<this.pedidoList.length;i++){
            if(this.pedidoList[i]===nombrePlato){
                this.pedidoList.splice(i, 1); 
                this.setPedidoList(this.pedidoList);
                return;
            }
        }
    }

    getPrecioPlato(platoMenuPrecioMap,nombrePlato){
        nombrePlato=nombrePlato.trim();
        nombrePlato=nombrePlato.toUpperCase();
        if (platoMenuPrecioMap.has(nombrePlato)){
            var precioPlato = platoMenuPrecioMap.get(nombrePlato.toUpperCase());
            return precioPlato;
        }else{
            return 0;
        }
    }

}


class UIFase2{
    addPedido(pedidoMenu){
        const divPedidoList = document.getElementById('pedido-list');
        const element = document.createElement('div');
        element.innerHTML =`
            <div class='card text-left mb-2'> 
                <div class='card-body'>
                    <strong>Pedido</strong>: ${pedidoMenu.nombrePlato}
                    <a href='#' class='btn btn-danger float-right' name='borrar'>Borrar</a>
                </div>
            </div>           
        `;
        divPedidoList.appendChild(element);
        this.showMessage('Pedido agregado satisfactoriamente', 'success');
    }

    resetForm(){
        document.getElementById('pedido-menu-form').reset();
    }

    disableForm(){
        var elementosEnForm = document.forms['pedido-form'].elements;
        for (var i=0; i<elementosEnForm.length; i++) {
            elementosEnForm[i].disabled=true;
        } 
    }

    deletePedido(element){
        if(element.name==='borrar'){
            var pedidoBorrado = this.getPedidoBorrado(element);
            element.parentElement.parentElement.parentElement.remove();
            this.getFocusForm();
            this.showMessage('Pedido eliminado satisfactoriamente', 'success');
            return pedidoBorrado;
        }
    }

    getPedidoBorrado(element) {
        var arrayDeCadenas = element.parentElement.innerHTML.split('<strong>Pedido</strong>:');
        arrayDeCadenas = arrayDeCadenas[1].split('<a');        
        return arrayDeCadenas[0];
    }

    showMessage(message,cssClass){
        const div = document.createElement('div');
        div.className=`alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //MOSTRAR MENSAJE EN DOM
        const container = document.querySelector('.container-fluid');
        const app = document.querySelector('#Fase2');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    showMenu(menuMap){
        for (let [key, value] of menuMap) {
            const menu = document.getElementById('menu');
            const div = document.createElement('div');
            div.className = 'col-md-12';
            div.innerHTML = `
                <div class='card-header mt-1'> 
                        <strong>${key}</strong>: ${value} €
                </div>           
            `;
            menu.appendChild(div);
          }

    }

    reloadDIV (precioTotal) {
        var div=document.getElementById("precio-total");
        div.remove();
        const ui = new UIFase1();
        ui.showPrecioTotal(precioTotal);
    }

    getFocusForm(){
        document.getElementById("nombre-plato").focus();
    }

}

//EVENTOS DEL DOM
const menu = new Menu(utilsFase1.menuArray,utilsFase1.precioPlatoArray);
window.addEventListener("load", function(e) {

    const ui = new UIFase2();
    ui.showMenu(menu.platoMenuPrecioMap);
    ui.getFocusForm();

    e.preventDefault();

  });

const utilsFase2 = new UtilsFase2();
document.getElementById('pedido-menu-form')
    .addEventListener('submit', function(e){

        const nombrePlato = document.getElementById('nombre-plato').value;
        const opcionMasComida = document.getElementById('opcion-mas-comida').value;

        const pedidoMenu = new PedidoMenu(nombrePlato,opcionMasComida);
       
        const ui = new UIFase2();
        ui.getFocusForm();
        
        if(pedidoMenu.nombrePlato === '' || pedidoMenu.opcionMasComida === ''){
            ui.showMessage('Complete los campos, por favor', 'danger');
            e.preventDefault();
            return;
        }


        ui.addPedido(pedidoMenu);
        ui.resetForm();

        utilsFase2.addPlatoAPedidoList(pedidoMenu.nombrePlato);
        
        var precioPlato=utilsFase2.getPrecioPlato(menu.platoMenuPrecioMap,pedidoMenu.nombrePlato);
        precioPlato=parseFloat(precioPlato);
        if(precioPlato!=0){
            utilsFase1.setPrecioTotal(precioPlato);
            ui.reloadDIV(utilsFase1.getPrecioTotal());
        }

        if(pedidoMenu.opcionMasComida === '0'){
            ui.disableForm();
            document.getElementById('pedido-list').removeEventListener('click',myFunctionDeletePlatoPedido);
        }

        e.preventDefault();
});

const myFunctionDeletePlatoPedido = function (e) {

    const ui = new UIFase2();
    var nombrePlato = ui.deletePedido(e.target);
    utilsFase2.deletePlatoDePedidoList(utilsFase2.getPedidoList(), nombrePlato);
    var precioPlato = utilsFase2.getPrecioPlato(menu.platoMenuPrecioMap, nombrePlato);
    precioPlato = parseFloat(precioPlato);
    if (precioPlato != 0) {
        precioPlato = precioPlato - (precioPlato * 2);
        utilsFase1.setPrecioTotal(precioPlato);
        ui.reloadDIV(utilsFase1.getPrecioTotal());
    }

    e.preventDefault();
};

document.getElementById('pedido-list').addEventListener('click', myFunctionDeletePlatoPedido);


