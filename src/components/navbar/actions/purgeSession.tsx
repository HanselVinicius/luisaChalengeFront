export default async function purgeSession() {
    const response = await fetch("/api/v1/logout");
    if (response.ok) {
        window.location.href = response.redirected ? response.url : "/login";
    }
}