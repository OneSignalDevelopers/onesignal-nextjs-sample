export const sendUserNotification = async (userId: string) => {
  try {
    const json = JSON.stringify({ userId })
    fetch("/api/notify", {
      method: "POST",
      body: json,
    })
  } catch (e) {
    console.error("Failed to send notification", e)
  }
}
