"use strict";
class AppFeature {
    constructor(decoratedApp) {
        this.decoratedApp = decoratedApp;
    }
    getFeatures() {
        return this.features;
    }
    addFeature(Feature) {
        return this.decoratedApp.addFeature(Feature);
    }
    Run(props) {
        console.log(JSON.stringify(this.getFeatures()));
    }
}
// Exported from Dashboard File
//  Abstract Feature Class
class DashFeature extends AppFeature {
    constructor(decoratedApp) {
        super(decoratedApp);
        this.features = decoratedApp.getFeatures();
    }
    setFeature(feature, settings) {
        this.features[feature] = settings;
    }
}
//  Base DashBoard
class Dash {
    constructor() {
        this.features = {
            Header: '',
            SideBar: '',
            Body: ''
        };
    }
    getFeatures() {
        return this.features;
    }
    addFeature(Feature) {
        return new Feature(this);
    }
    Run(props) {
        console.log(JSON.stringify(this.getFeatures()));
    }
}
// Exported From Accounts Feature Folder
class AccountsFeature extends DashFeature {
    constructor(App) {
        super(App);
        const Feature = {
            SignInButton: 'Sign In Button',
            SignOutButton: 'Sign Out Button'
        };
        this.setFeature('Accounts', Feature);
    }
}
// Exported From Feedback Feature Folder
class FeedbackFeature extends DashFeature {
    constructor(App) {
        super(App);
        const Feature = {
            FeedbackButton: 'Feedback Button'
        };
        this.setFeature('Feedback', Feature);
    }
}
// Implementation In Root App
let myDash = new Dash();
myDash.addFeature(AccountsFeature);
myDash.addFeature(FeedbackFeature);
myDash.Run({});
//# sourceMappingURL=index.js.map