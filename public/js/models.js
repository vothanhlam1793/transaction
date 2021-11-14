var Transaction = Backbone.Model.extend({
    urlRoot: '/api/transactions',
});
var Transactions = Backbone.Collection.extend({
    urlRoot: '/api/transactions'
});

var Note = Backbone.Model.extend({
    urlRoot: "/api/notes"
})
var Notes = Backbone.Collection.extend({
    urlRoot: "/api/notes"
})