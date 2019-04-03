var Order = /** @class */ (function () {
    function Order() {
        this.paymentPendingState = new PaymentPendingState(this);
        this.cancelledOrderState = new CancelledOrderState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.currentState = this.paymentPendingState;
    }
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    Order.prototype.getCurrentState = function () {
        return this.currentState;
    };
    return Order;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log('This order is already cancelled');
        this.order.setState(this.order.cancelledOrderState);
    };
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log('The order is cancelled, you cannot pay anymore.');
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log('The order is cancelled, you cannot ship it anymore.');
    };
    return CancelledOrderState;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(order) {
        this.order = order;
    }
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log('Cancelling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    };
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log('Payment verified! Shipping soon.');
        this.order.setState(this.order.orderBeingPreparedState);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log('Cannot ship order when payment is pending!');
    };
    return PaymentPendingState;
}());
var OrderBeingPreparedState = /** @class */ (function () {
    function OrderBeingPreparedState(order) {
        this.order = order;
    }
    OrderBeingPreparedState.prototype.cancelOrder = function () {
        console.log('Cancelling your order.. You will be refunded.');
        this.order.setState(this.order.cancelledOrderState);
    };
    OrderBeingPreparedState.prototype.verifyPayment = function () {
        console.log('Payment is already verified.');
    };
    OrderBeingPreparedState.prototype.shipOrder = function () {
        console.log('Shipping your order now..');
        this.order.setState(this.order.orderShippedState);
    };
    return OrderBeingPreparedState;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(order) {
        this.order = order;
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log('You cannot cancel an order that has been shipped.');
    };
    OrderShippedState.prototype.verifyPayment = function () {
        console.log('Payment is already verified');
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log('Order is already shipped');
    };
    return OrderShippedState;
}());
var order = new Order();
order.getCurrentState().verifyPayment();
order.getCurrentState().shipOrder();
order.getCurrentState().cancelOrder();
console.log('Order state: ' + order.getCurrentState().constructor.name);
