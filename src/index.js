'use strict';

import Rx          from 'rxjs/Rx';
import LoDash      from 'lodash';
import Good        from 'good';
import GoodConsole from 'good-console';

let Setup = {
	name : 'console',
	opts : {   // These are the plugin's options
		events : {
			log      : '*',
			response : '*',
			error    : '*'
		}
	},
	conf : {}  // these will be used on hapi instantiation
	conn : {}, // These will be used on hapi connection setup
};

export default (setup={}) => {

	setup = LoDash.merge(Setup, setup);
	setup.register = server => Rx.Observable.create(subscriber => {

		server.register({
			register : Good,
			options  : {
				reporters: [{
					reporter : GoodConsole,
					events   : setup.opts.events || {}
				}]
			}
		}, err => {
			if (err) return subscriber.error(err);
			subscriber.next(setup);
			subscriber.complete();
		})

		return () => {}
	});

	return setup;
}