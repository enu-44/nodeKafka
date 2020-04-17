const PUBLIC_VAPID_KEY ='BI9FmDHLEnCUEdoolK-kcKDOfr14vN5Xs4D-R9q1BsJP7cMKYmItJ3R0qraeTQPplrRJFdFsD53bLXHpPtXDWSM'

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const suscriptions = async () => {

// Service Worker register
 const register =  await navigator.serviceWorker.register('./worker.js',{
        scope : '/'
    });
    console.log("New Service Worker");


//register.pushManager.unsubscribe()

  const suscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey : urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });
    console.log(suscription);
    

    // Enviar al server la suscripcion al pushmanager
    await fetch('/v1/suscription',{
        method: 'POST',
        body : JSON.stringify(suscription),
        headers: {
            'Content-type' : 'application/json'
        }
        
    })
    console.log('Suscrito');
    
}

/* function unsubscribe() {
  navigator.serviceWorker.ready
  .then(function(registration) {
    return registration.pushManager.getSubscription();
  }).then(function(subscription) {
    return subscription.unsubscribe()
      .then(function() {
        console.log('Unsubscribed', subscription.endpoint);
        return fetch('unregister', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            subscription: subscription
          })
        });
      });
  }).then(setSubscribeButton);
} */
//unsubscribe()
suscriptions();