const webpush  = require('web-push')

webpush.setVapidDetails('mailto:modsin@interedes.com.co',
        process.env.PUBLIC_VAPID_KEY,
        process.env.PRIVATE_VAPID_KEY)


module.exports = webpush;
