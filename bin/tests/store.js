"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var modeliv_1 = require("../modeliv");
var tiers_1 = require("./tiers");
var User = (function () {
    function User(tier) {
        if (tier === void 0) { tier = tiers_1.tiers.client; }
        this.tier = tier;
        this.is_logged_in = false;
        this.projects = [];
        modeliv_1.actions("User", this);
    }
    User.prototype.getAll = function () {
        return {
            is_logged_in: this.is_logged_in,
            projects: this.projects,
            current_project_guid: this.current_project_guid
        };
    };
    User.prototype.dispose = function () {
        modeliv_1.dispose("User", this);
    };
    User.prototype.login = function (name, password) {
        console.log("login!");
        if ("password for " + name === password) {
            this.is_logged_in = true;
            this.projects = [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }];
            this.current_project_guid;
        }
    };
    User.prototype.logout = function () {
        this.is_logged_in = false;
        this.projects = [];
    };
    User.prototype.selectProject = function (guid) {
        this.current_project_guid = guid;
    };
    User.prototype.setProjects = function (projects) {
        console.log("setProjects");
        this.projects = projects;
    };
    __decorate([
        modeliv_1.server
    ], User.prototype, "login", null);
    __decorate([
        modeliv_1.server
    ], User.prototype, "logout", null);
    __decorate([
        modeliv_1.server
    ], User.prototype, "selectProject", null);
    __decorate([
        modeliv_1.server
    ], User.prototype, "setProjects", null);
    User = __decorate([
        modeliv_1.state
    ], User);
    return User;
}());
exports.User = User;
//export const User = new _User();
exports.ActionsClient = modeliv_1.ActionsProxy(tiers_1.tiers.client);
exports.ActionsServer = modeliv_1.ActionsProxy(tiers_1.tiers.server);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLHdCQUE2RCxZQUFZLENBQUMsQ0FBQTtBQUMxRSxzQkFBa0MsU0FBUyxDQUFDLENBQUE7QUFpQjVDO0lBYUksY0FBbUIsSUFBMEI7UUFBakMsb0JBQWlDLEdBQWpDLE9BQXFCLGFBQUssQ0FBQyxNQUFNO1FBQTFCLFNBQUksR0FBSixJQUFJLENBQXNCO1FBWjdDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFZckIsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQVZELHFCQUFNLEdBQU47UUFDSSxNQUFNLENBQUM7WUFDSCxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7U0FDbEQsQ0FBQTtJQUNMLENBQUM7SUFNRCxzQkFBTyxHQUFQO1FBQ0ksaUJBQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUdELG9CQUFLLEdBQUwsVUFBTSxJQUFZLEVBQUUsUUFBZ0I7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQTtRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUdELHFCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBR0QsNEJBQWEsR0FBYixVQUFjLElBQVk7UUFDdEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBR0QsMEJBQVcsR0FBWCxVQUFZLFFBQW1CO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQXpCRDtRQUFDLGdCQUFNO3FDQUFBO0lBVVA7UUFBQyxnQkFBTTtzQ0FBQTtJQU1QO1FBQUMsZ0JBQU07NkNBQUE7SUFLUDtRQUFDLGdCQUFNOzJDQUFBO0lBM0NYO1FBQUMsZUFBSztZQUFBO0lBZ0ROLFdBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLFlBQUksT0ErQ2hCLENBQUE7QUFFRCxrQ0FBa0M7QUFFckIscUJBQWEsR0FBZ0Isc0JBQVksQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQscUJBQWEsR0FBZ0Isc0JBQVksQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLENBQUMifQ==