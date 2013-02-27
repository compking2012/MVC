// MVC-based WebApp Framework
// 
// Author: 		Yang Yang
// Date:		2012/07/10
// 

MVC = {};

// Base Controller
MVC.Controller = Backbone.Router.extend({
	parentController: null,
	
	node: null,
	view: null,
	
	initialize: function(node, parentController) {
		this.parentController = parentController;
		this.node = node;
		if(this.routes) {
			Backbone.history.start();
		}
    },
    
    destroy: function() {
    	this.off();
    },
    
    pass: function(event, parent) {
    	this.on(event, $.proxy(function() {
    		if(parent) {
    			var args = [event];
    			$.each(arguments, function(i, arg) {
    				args.push(arg);
    			});
    			parent.trigger.apply(parent, args);
    		}
    	}, this));
    }
});

// Base View
MVC.View = Backbone.View.extend({
	template: null,

	initialize: function() {
		var html = _.template(this.template)();
		this.setElement(html);
	},
	
	render: function() {
	},
	
	destroy: function() {
		this.remove();
		this.off();
	},

	getElement: function(selector) {
		return $(selector, this.$el);
	},
	
    pass: function(event, parent) {
    	this.on(event, $.proxy(function() {
    		if(parent) {
    			var args = [event];
    			$.each(arguments, function(i, arg) {
    				args.push(arg);
    			});
    			parent.trigger.apply(parent, args);
    		}
    	}, this));
    }
});

// Base Model and Collection
MVC.Model = Backbone.Model.extend({
	sync: function(method, model, options) {
		//model.url = "services/httproxy.php?mode=native&url=" + encodeURIComponent(model.url());
		Backbone.sync(method, model, options);
	},
	
	pass: function(event, parent) {
    	this.on(event, $.proxy(function() {
    		if(parent) {
    			var args = [event];
    			$.each(arguments, function(i, arg) {
    				args.push(arg);
    			});
    			parent.trigger.apply(parent, args);
    		}
    	}, this));
	}
});

MVC.Collection = Backbone.Collection.extend({
	sync: function(method, model, options) {
		//model.url = "services/httproxy.php?mode=native&url=" + encodeURIComponent(model.url());
		Backbone.sync(method, model, options);
	},
	
	pass: function(event, parent) {
		this.on(event, $.proxy(function() {
			if(parent) {
    			var args = [event];
    			$.each(arguments, function(i, arg) {
    				args.push(arg);
    			});
    			parent.trigger.apply(parent, args);
    		}
		}, this));
	}
});