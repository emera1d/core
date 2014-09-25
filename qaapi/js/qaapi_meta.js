'use strict';

var _U_ID_ = {
	cookie: 'aid'
};

var qa_meta = {
	accessLinkGet: {
		url: 'accessLinkGet'
		, params: {
			user_id: _U_ID_
			, context: {}
			, partner_id: {}
		}
	}

	, userVerifyPhone: {
		url: 'userVerifyPhone'
		, params: {
			user_id: _U_ID_
			, phone: {
				initial: '1234567890'
			}
		}
	}

	, userCleanTrustedNetwork: {
		url: 'userCleanTrustedNetwork'
		, params: {
			user_id: _U_ID_
		}
	}

	, chatSendMessage: {
		url: 'chatSendMessage'
		, params: {
			user_id: _U_ID_
			, contact_user_id: {}
			, message: { initial: 'hello' }
		}
	}

	, userAddCredits: {
		url: 'userAddCredits'
		, params: {
			user_id: _U_ID_
			, amount: {}
		}
	}

	, userRemoveCredits: {
		url: 'userRemoveCredits'
		, params: {
			user_id: _U_ID_
			, amount: {}
		}
	}

	, userDetachFacebook: {
		url: 'userDetachFacebook'
		, params: {
			user_id: _U_ID_
		}
	}

	, userAddSppSubscription: {
		url: 'userAddSppSubscription'
		, params: {
			user_id: _U_ID_
			, aggregator_id: {}
		}
	}
};

/*

userGet
	Retrieve users' data
	Return array 
params:
	search (string)  – Can be id, email or phone number


hitAdd
	Add hit from one user to another
	Return bool 
params:
	user_id (int)
	user_id_from (int)
	is_visible (bool)  – optional, default = false
	from (string)  – optional, default = ''


hitDelete
	Delete hit
	Return bool 
params:
	user_id (int)
	user_id_from (int)



laccessOffline
	Make user offline
	Return array|mixed
params:
	user_id (int)
 

laccessOnline
	Make user online
	Return array|mixed 
params:
	user_id (int)


photoModerate
	Moderate photo for user
	Return array 
params:
	user_id (int)
	photo_id (int)
	moderation_status (string)  – optional set of Approved, ApprovedBad, Trash, Erotic, Other, Friends, Children. Default value is "Approved".
	forced (bool)  – optional, default = false


photoUpload
	Uploads photo for user
	Return array 
params:
	user_id (int)
	photo (string)  – url or base64 encoded image data
	entry_id (string)  – can be "me", "other", "private" (AlbumTriad::getClasses()) or exactly id of album. If absent, photos uploaded to "photos of me".


userAttachPhone
	Attach phone for user
	Return array 
params:
	user_id (int)
	phoneNumber (int)  – should be passed with country code
	is_confirmed (bool)  – optional default true

userDetachPhone
	Detach phones from user
	Return array
params:
	user_id

userGetPhone
	Retrieve user's phone
	Return array|false|null 
params:
	user_id


*/

