'use strict';

import Rx          from 'rxjs/Rx'
import Good        from 'good';
import GoodConsole from 'good-console';

export default {

	setup: {
		config     : {},
		connection : {}
	},

	register: (server, name) => Rx.Observable.create(subscriber => {

		let response = {name:name};

		server.register({
			register : Good,
			options  : {
				reporters: [{
					reporter : GoodConsole,
					events   : {
						log      : '*',
						response : '*',
						error    : '*'
					}
				}]
			}
		}, err => {
			if (err) return subscriber.error(err);
			subscriber.next(response);
			subscriber.complete();
		})

		return () => {}
	})
};