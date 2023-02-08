"user strict"

const notificationButton = document.getElementById("enableNotifications")
let swRegistration = null

initializeApp()

function initializeApp() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported")

    // Register the service worker
    navigator.serviceWorker.register("sw.js").then(swReg => {
      console.log("Service Worker is registered", swReg)

      swRegistration = swReg
      initializeUi()
    }).catch(error => {
      console.log("Service Worker Error", error)
    })
  } else {
    console.log("Push messagin is not supported")
    notificationButton.textContent = "Push Not Supported"
  }
}

function initializeUi () {
  notificationButton.addEventListener("click", () => {
    displayNotification()
  })
}

function displayNotification () {
  if(window.Notification && Notification.permission === "granted") {
    notification()
  } else if(window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(status => {
      if(status === "granted") {
        notification()
      } else {
        alert("알림 설정을 승인해주세요.")
      }
    })
  } else {
    alert("알림 설정을 승인해주세요.")
  }
}

function notification () {
  const options = {
    body: "Testing Our Notification",
    icon: "/imgs/bell.png"
  }
  swRegistration.showNotification("PWA 알림", options)
}