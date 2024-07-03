export function formatMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  const minutesFormated = minutes.toString().padStart(2, "0");
  const secondsFormated = secondsLeft.toFixed(0).toString().padStart(2, "0");

  return `${minutesFormated}:${secondsFormated}`;
}
