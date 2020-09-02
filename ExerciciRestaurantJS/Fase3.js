class UtilsFase3 {

    constructor() {
        this.pedidoFueraDeMenu = new Array();
    }

    getPedidoFueraDeMenu() {
        return this.pedidoFueraDeMenu;
    }

    setPedidoFueraDeMenu(pedidoFueraDeMenu) {
        this.pedidoFueraDeMenu = pedidoFueraDeMenu;
    }

    damePedidoComidaFueraDeMenu(pedidoComida, menu) {
        menu = menu.toUpperCase();

        for (let i = 0; i < pedidoComida.length; i++) {
            var cont = 0;
            for (let j = 0; j < menu.length; j++) {
                if (pedidoComida[i] === menu[j]) {
                    break;
                }
                else {
                    cont++;
                }
            }

            if (cont === menu.length) {
                this.pedidoFueraDeMenu.push(pedidoComida[i]);
            }
        }
        this.setPedidoFueraDeMenu(this.pedidoFueraDeMenu);
    }

    dameTicketPedido(pedido, platoMenuPrecioMap) {
        var ticketPedidoMapTemp = new Map();
        var ticketPedidoMap = new Map();
    
        for (let i = 0; i < pedido.length; i++) {
            if (platoMenuPrecioMap.has(pedido[i])) {
                ticketPedidoMapTemp.set(pedido[i], platoMenuPrecioMap.get(pedido[i]));
                var unidades=0;
                var precio = 0;
                for (let j = 0; j < pedido.length; j++) {
                    if (pedido[i] === pedido[j]) {
                        unidades++;
                        precio= Number.parseFloat(unidades * platoMenuPrecioMap.get(pedido[i]));
                        ticketPedidoMapTemp.set(pedido[i], precio);
                    }
                }
                if(unidades===1){
                    ticketPedidoMap .set(pedido[i], precio + "€ x " + unidades + " unidad");
                }else{
                    ticketPedidoMap .set(pedido[i], precio + "€ x " + unidades + " unidades");
                }
            }
        }
        return ticketPedidoMap;
    }
}

class UIFase3 {

    showTicket(ticketPedidoMap, precioTotal) {
        const ticket = document.getElementById('ticket');

        const divTitle = document.createElement('div');
        divTitle.innerHTML = `
              <div class='card-body'> 
                <p class='text-info'>Fase 3</p>
                <h6><strong class='text-success'>Ticket</strong></h6>
              </div>           
          `;
        ticket.appendChild(divTitle);

        for (let [key, value] of ticketPedidoMap) {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class='card-header'> 
                        <strong>${key}</strong>: ${value}
                </div>           
            `;
            ticket.appendChild(div);
        }

        const divTotal = document.createElement('div');
        divTotal.innerHTML = `
              <div class='card-header'> 
                      <strong>Total a pagar</strong>: ${precioTotal}€
              </div>           
          `;
        ticket.appendChild(divTotal);
    }

    showPedidoFueraDeMenu(pedidoFueraDeMenu) {
        for (let i = 0; i < pedidoFueraDeMenu.length; i++) {
            const divPedidoFueraDeMenu = document.getElementById('pedido-fuera-de-menu');
            const div = document.createElement('div');
            div.innerHTML = `
            <div class='card-body'> 
                Ha pedido: <strong>${pedidoFueraDeMenu[i]}</strong>. Este producto no existe en el menu
            </div>           
            `;
            divPedidoFueraDeMenu.appendChild(div);
        }
    }

    showDesglosePago(billeteDeDesglose, contBilletes) {
        const opcionPago = document.getElementById('opcion-de-pago');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class='card-header'> 
            Billetes de <strong>${billeteDeDesglose}€</strong>: ${contBilletes}
        </div>           
        `;
        opcionPago.appendChild(div);
    }

    
    desglosarEnBilletesPrecioTotalTicket(precioTotal, billetes500, billetes200, billetes100, billetes50,
        billetes20, billetes10, billetes5) {
        var contBilletes5 = 0, contBilletes10 = 0, contBilletes20 = 0, contBilletes50 = 0, contBilletes100 = 0,
            contBilletes200 = 0, contBilletes500 = 0;
        var totalTicket = precioTotal;

        const divTitle = document.getElementById('opcion-de-pago');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class='card-body'> 
                <h6><strong class='text-success'>Opción de pago</strong></h6>
        </div>           
        `;
        divTitle.appendChild(div);

        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes500, contBilletes500);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes200, contBilletes200);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes100, contBilletes100);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes50, contBilletes50);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes20, contBilletes20);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes10, contBilletes10);
        totalTicket = this.desglosandoEnBilletes(totalTicket, billetes5, contBilletes5);

    }

    desglosandoEnBilletes(totalTicket, billeteDeDesglose, contBilletes) {
        contBilletes = Number.parseInt((totalTicket - totalTicket % billeteDeDesglose) / billeteDeDesglose);
        if (contBilletes > 0) {
            this.showDesglosePago(billeteDeDesglose,contBilletes);
            totalTicket -= billeteDeDesglose * contBilletes;
        }
        return totalTicket;
    }

}

//EVENTOS DEL DOM
const utilsFase3 = new UtilsFase3();
document.getElementById('pedido-menu-form')
    .addEventListener('submit', function (e) {

        const ui = new UIFase3();
        var elementForm = document.forms['pedido-form'].elements['guardar-pedido'];
        if (elementForm.disabled === true) {
            
            if(utilsFase1.getPrecioTotal()!=0){
                var ticketPedido = utilsFase3.dameTicketPedido(utilsFase2.getPedidoList(), menu.platoMenuPrecioMap);
                ui.showTicket(ticketPedido, utilsFase1.getPrecioTotal());
                ui.desglosarEnBilletesPrecioTotalTicket(utilsFase1.getPrecioTotal(), utilsFase1.billete500, 
                    utilsFase1.billete200,utilsFase1.billete100, utilsFase1.billete50,utilsFase1.billete20,
                    utilsFase1.billete10,utilsFase1.billete5);
            }
          
            utilsFase3.damePedidoComidaFueraDeMenu(utilsFase2.getPedidoList(), utilsFase1.menuArray);
            ui.showPedidoFueraDeMenu(utilsFase3.getPedidoFueraDeMenu());
        }

        e.preventDefault();

    });