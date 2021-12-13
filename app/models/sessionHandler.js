class SessionHandler {
    saveSessionAndRedirect(request, response, redirectPath) {
        new Promise((resolve, reject) => {
            request.session.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve(response.redirect(redirectPath));
            });
        });
    }

    returnSessionAndDelete(request, sessionName) {
        const sessionValue = request.session[sessionName];
        delete request.session[sessionName];
        return sessionValue;
    }
}

module.exports = SessionHandler;