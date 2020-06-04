export default async function({ redirect, app }) {
    // THIS MIDDLEWARE PROTECTS ROUTES
    if (!app.$isSignedIn()) {
        redirect('/auth')
    }
}
