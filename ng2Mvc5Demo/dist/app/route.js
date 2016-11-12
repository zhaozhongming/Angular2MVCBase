var router_1 = require('@angular/router');
var app_1 = require('./app');
var about_1 = require('./about/about');
// Route Configuration
exports.routes = [
    { path: '', component: app_1.AppComponent },
    { path: 'about', component: about_1.AboutComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=route.js.map