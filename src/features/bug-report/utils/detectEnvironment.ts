export function getDetectedEnvironment() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return "Entorno no disponible automáticamente";
  }

  const userAgent = navigator.userAgent;

  let browser = "Otro navegador";
  if (userAgent.includes("Edg")) {
    browser = "Edge";
  } else if (userAgent.includes("Chrome")) {
    browser = "Chrome";
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari";
  }

  let operatingSystem = "Sistema no identificado";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    operatingSystem = "iOS";
  } else if (userAgent.includes("Android")) {
    operatingSystem = "Android";
  } else if (userAgent.includes("Windows")) {
    operatingSystem = "Windows";
  } else if (userAgent.includes("Mac")) {
    operatingSystem = "macOS";
  } else if (userAgent.includes("Linux")) {
    operatingSystem = "Linux";
  }

  const currentLocation = window.location.host || window.location.href;

  return `Navegador: ${browser} | Sistema: ${operatingSystem} | URL: ${currentLocation}`;
}
