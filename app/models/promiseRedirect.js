class Redirect {
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
}

module.exports = Redirect;