"use strict";
class Order {
    constructor() {
        this.paymentPendingState = new PaymentPendingState(this);
        this.cancelledOrderState = new CancelledOrderState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.currentState = this.paymentPendingState;
    }
    setState(state) {
        this.currentState = state;
    }
    getCurrentState() {
        return this.currentState;
    }
}
class CancelledOrderState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('This order is already cancelled');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('The order is cancelled, you cannot pay anymore.');
    }
    shipOrder() {
        console.log('The order is cancelled, you cannot ship it anymore.');
    }
}
class PaymentPendingState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('Cancelling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    }
    shipOrder() {
        console.log('Cannot ship order when payment is pending!');
    }
}
class OrderBeingPreparedState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('Cancelling your order.. You will be refunded.');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Payment is already verified.');
    }
    shipOrder() {
        console.log('Shipping your order now..');
        this.order.setState(this.order.orderShippedState);
    }
}
class OrderShippedState {
    constructor(order) {
        this.order = order;
    }
    cancelOrder() {
        console.log('You cannot cancel an order that has been shipped.');
    }
    verifyPayment() {
        console.log('Payment is already verified');
    }
    shipOrder() {
        console.log('Order is already shipped');
    }
}
let order = new Order();
order.getCurrentState().verifyPayment();
order.getCurrentState().shipOrder();
order.getCurrentState().cancelOrder();
console.log('Order state: ' + order.getCurrentState().constructor.name);
//# sourceMappingURL=index.js.map