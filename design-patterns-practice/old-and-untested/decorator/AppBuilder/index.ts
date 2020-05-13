type Component = Object | Function | string;

// This part can be abstracted out to a utility library
//  It is designed to be reusable across apps
interface GenericFeatures {
	[key: string]: any;
}
interface App {
	getFeatures(): Object;
	addFeature<App>(Feature: { new (...args: any[]): App }): App;
	Run(props: Object): void;
}

abstract class AppFeature implements App {
	protected abstract features: GenericFeatures;
	private decoratedApp: App;
	constructor(decoratedApp: App) {
		this.decoratedApp = decoratedApp;
	}
	protected abstract setFeature(feature: string, settings: Object): void;
	getFeatures(): Object {
		return this.features;
	}
	addFeature<App>(Feature: { new (...args: any[]): App }): App {
		return this.decoratedApp.addFeature(Feature);
	}
	Run(props: Object): void {
		console.log(JSON.stringify(this.getFeatures()));
	}
}

// DashBoard App Specific
// Type Declarations
type ExtendableFeatures = 'Accounts' | 'Feedback';
type HeaderFeatureInterface = Component;
type SideBarFeatureInterface = Component;
type BodyFeatureInterface = Component;
type AccountsFeatureInterface = {
	SignInButton: Component;
	SignOutButton: Component;
};
type FeedbackFeatureInterface = {
	FeedbackButton: Component;
};
interface DashFeatures {
	Header: HeaderFeatureInterface;
	SideBar: SideBarFeatureInterface;
	Body: BodyFeatureInterface;
	Accounts?: AccountsFeatureInterface;
	Feedback?: FeedbackFeatureInterface;
}

// Exported from Dashboard File

//  Abstract Feature Class
abstract class DashFeature extends AppFeature {
	protected features: DashFeatures;
	constructor(decoratedApp: Dash) {
		super(decoratedApp);
		this.features = decoratedApp.getFeatures();
	}
	protected setFeature(feature: ExtendableFeatures, settings: any): void {
		this.features[feature] = settings;
	}
}

//  Base DashBoard
class Dash implements App {
	private features: DashFeatures = {
		Header: '',
		SideBar: '',
		Body: ''
	};
	getFeatures(): DashFeatures {
		return this.features;
	}
	addFeature<App>(Feature: { new (...args: any[]): App }): App {
		return new Feature(this);
	}
	Run(props: Object): void {
		console.log(JSON.stringify(this.getFeatures()));
	}
}

// Exported From Accounts Feature Folder
class AccountsFeature extends DashFeature {
	constructor(App: Dash) {
		super(App);
		const Feature: AccountsFeatureInterface = {
			SignInButton: 'Sign In Button',
			SignOutButton: 'Sign Out Button'
		};
		this.setFeature('Accounts', Feature);
	}
}

// Exported From Feedback Feature Folder
class FeedbackFeature extends DashFeature {
	constructor(App: Dash) {
		super(App);
		const Feature: FeedbackFeatureInterface = {
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
