var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AppFeature = /** @class */ (function () {
    function AppFeature(decoratedApp) {
        this.decoratedApp = decoratedApp;
    }
    AppFeature.prototype.getFeatures = function () {
        return this.features;
    };
    AppFeature.prototype.addFeature = function (Feature) {
        return this.decoratedApp.addFeature(Feature);
    };
    AppFeature.prototype.Run = function (props) {
        console.log(JSON.stringify(this.getFeatures()));
    };
    return AppFeature;
}());
// Exported from Dashboard File
//  Abstract Feature Class
var DashFeature = /** @class */ (function (_super) {
    __extends(DashFeature, _super);
    function DashFeature(decoratedApp) {
        var _this = _super.call(this, decoratedApp) || this;
        _this.features = decoratedApp.getFeatures();
        return _this;
    }
    DashFeature.prototype.setFeature = function (feature, settings) {
        this.features[feature] = settings;
    };
    return DashFeature;
}(AppFeature));
//  Base DashBoard
var Dash = /** @class */ (function () {
    function Dash() {
        this.features = {
            Header: '',
            SideBar: '',
            Body: ''
        };
    }
    Dash.prototype.getFeatures = function () {
        return this.features;
    };
    Dash.prototype.addFeature = function (Feature) {
        return new Feature(this);
    };
    Dash.prototype.Run = function (props) {
        console.log(JSON.stringify(this.getFeatures()));
    };
    return Dash;
}());
// Exported From Accounts Feature Folder
var AccountsFeature = /** @class */ (function (_super) {
    __extends(AccountsFeature, _super);
    function AccountsFeature(App) {
        var _this = _super.call(this, App) || this;
        var Feature = {
            SignInButton: 'Sign In Button',
            SignOutButton: 'Sign Out Button'
        };
        _this.setFeature('Accounts', Feature);
        return _this;
    }
    return AccountsFeature;
}(DashFeature));
// Exported From Feedback Feature Folder
var FeedbackFeature = /** @class */ (function (_super) {
    __extends(FeedbackFeature, _super);
    function FeedbackFeature(App) {
        var _this = _super.call(this, App) || this;
        var Feature = {
            FeedbackButton: 'Feedback Button'
        };
        _this.setFeature('Feedback', Feature);
        return _this;
    }
    return FeedbackFeature;
}(DashFeature));
// Implementation In Root App
var myDash = new Dash();
myDash.addFeature(AccountsFeature);
myDash.addFeature(FeedbackFeature);
myDash.Run({});
