"use strict";
(function (tiers) {
    tiers[tiers["client"] = 0] = "client";
    tiers[tiers["server"] = 1] = "server";
    tiers[tiers["log"] = 2] = "log";
})(exports.tiers || (exports.tiers = {}));
var tiers = exports.tiers;
exports.current_tier = tiers.client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGllcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvdGllcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFdBQVksS0FBSztJQUNiLHFDQUFNLENBQUE7SUFDTixxQ0FBTSxDQUFBO0lBQ04sK0JBQUcsQ0FBQTtBQUNQLENBQUMsRUFKVyxhQUFLLEtBQUwsYUFBSyxRQUloQjtBQUpELElBQVksS0FBSyxHQUFMLGFBSVgsQ0FBQTtBQUVVLG9CQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyJ9