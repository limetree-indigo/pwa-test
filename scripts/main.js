"user strict"

const statusBadge = document.getElementById("status")
const notificationButton = document.getElementById("enableNotifications")
const notificationImage = document.getElementById("imgageNotification")
const notificationAction = document.getElementById("actionNotification")
const notificationBtn = document.getElementById("enable")
const exampleNewWindow = document.getElementById("example-new-window")
let swRegistration = null

statusBadge.innerText = navigator.onLine ? "정상" : "비정상"
statusBadge.style.background = navigator.onLine ? "green" : "red"

window.addEventListener('online', () => {
  statusBadge.innerText = "정상"
  statusBadge.style.background = "green"
})

window.addEventListener('offline', () => {
  statusBadge.innerText = "비정상"
  statusBadge.style.background = "red"
})

initializeApp()
displayNotificationBtn()


exampleNewWindow.addEventListener('click', (event) => {
  const promiseChain = self.clients.openWindow('/example.html')
  event.waitUntil(promiseChain)
})

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
    basicNotification()
  })
  notificationBtn.addEventListener("click", () => {
    askNotificationPermission()
  })
  notificationImage.addEventListener("click", () => {
    imageNotification()
  })
  notificationAction.addEventListener("click", () => {
    actionNotification()
  })
}

function displayNotificationBtn () {
  // 사용자의 응답에 따라 단추를 보이거나 숨기도록 설정
  if(Notification.permission === 'denied' || Notification.permission === 'default') {
    notificationBtn.style.display = 'block'
    if(Notification.permission === 'denied') {
      notificationBtn.innerText = "알림 차단"
      notificationBtn.style.background = "red"
      notificationBtn.style.color = 'white'
      notificationBtn.style.border = 'none'
    }
  } else {
    notificationBtn.style.display = 'none'
  }
}

function askNotificationPermission () {
  // 권한을 요구하는 함수
  function handlePermission (permission) {
    // 사용자의 응답에 관계 없이 크롬이 정보를 저장할 수 있도록 함
    if(permission === "denied") {
      alert("알림이 차단되었습니다.")
    }
    if(!('permission' in Notification)) {
      Notification.permission = permission
    }
    displayNotificationBtn()    
  }

  // 브라우저가 알림을 지원하는지 확인
  if(!('Notification' in window)) {
    console.log("이 브라우저는 알림을 지원하지 않습니다.")
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission)
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission)
      })
    }
  }

  function checkNotificationPromise () {
    try {
      Notification.requestPermission().then()
    } catch(e) {
      return false
    }
    return true
  }
}

function checkPermission() {
  return Notification.permission === 'granted' ? true : false
}

function basicNotification () {
  if(!checkPermission()) {
    alert("알림 권한을 확인하세요.")
    return
  }
  const options = {
    body: "알림 테스트1111",
    icon: "/imgs/bell.png",
    data: { url: 'https://naver.com'}
  }
  swRegistration.showNotification("기본 알림", options)
}

function imageNotification () {
  if(!checkPermission()) {
    alert("알림 권한을 확인하세요.")
    return
  }

  const options = {
    body: "Image 1111",
    icon: '/imgs/bell.png',
    image: '/imgs/landscape.jpg',
    data: { url: `${self.location.origin}/example1.html`}
  }
  swRegistration.showNotification("Test", options)
}

// function actionNotification () {
//   const title = 'Action Notification'
//   const options = {
//     actions: [
//       {
//         action: 'naver',
//         title: 'Naver',
//         icon: '/imgs/bell.png'
//       },
//       {
//         action: 'Google',
//         title: 'Google',
//         icon: '/imgs/bell.png'
//       }
//     ]
//   }
//   swRegistration.showNotification(title, options)
// }


