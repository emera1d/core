'use strict';

var qa_meta = {
	accessLinkGet: {
		url: 'accessLinkGet'
		, params: {
			user_id: {
				cookie: 'aid'
			}
			, context: {}
			, partner_id: {}
		}
	}

	, userVerifyPhone: {
		url: 'userVerifyPhone'
		, params: {
			user_id: {
				cookie: 'aid'
			}
			, phone: {
				initial: '1234567'
			}
		}
	}

	, userCleanTrustedNetwork: {
		url: 'userCleanTrustedNetwork'
		, params: {
			user_id: {
				cookie: 'aid'
			}
		}
	}

	, userDetachFacebook: {
		url: 'userDetachFacebook'
		, params: {
			user_id: {
				cookie: 'aid'
			}
		}
	}

	, userAddSppSubscription: {
		url: 'userAddSppSubscription'
		, params: {
			user_id: {
				cookie: 'aid'
			}
			, aggregator_id: {}
		}
	}

};
