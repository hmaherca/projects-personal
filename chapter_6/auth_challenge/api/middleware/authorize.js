/* 
	TASK 4: In this file, you will create a middleware that will check a request for the authToken.
	If a token is found it should verify the token with the secret key used to generate the token
	If the token is verified, the contents of the token should be stored in the request and the request should be passed on.
	
	If no token is found or cannot be verified, then send back a response with a status code of 403 along with an appropriate error message.
	Remember to require jsonwebtoken here.
*/
