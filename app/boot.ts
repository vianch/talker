import {bootstrap} from "angular2/platform/browser";
import App from "./modules/home/home.component";


bootstrap(App, []).then(
	success => console.log(`Bizagi cloud load success`),
	error => console.error(error)
);
