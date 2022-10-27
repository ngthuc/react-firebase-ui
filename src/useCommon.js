export default function useCommon() {
	function signOut(auth, firebaseSignOut, customAuthException = false) {
		return new Promise((resolve, reject) => {
			if (!auth || !firebaseSignOut) {
				return reject(new Error('auth and firebaseSignOut are required'));
			}
			if (customAuthException) {
				localStorage.removeItem('auth_key');
				sessionStorage.removeItem('auth_code');
				return resolve();
			}
			firebaseSignOut(auth).then(() => {
				resolve(auth);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	return {
		signOut,
	};
}